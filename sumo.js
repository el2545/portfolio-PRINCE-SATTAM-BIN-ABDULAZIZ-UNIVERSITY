(() => {
  const zones = {
    maarif: {
      label: "Maarif",
      center: [33.5866, -7.6325],
      zoom: 14,
      heatmap: "maarif_heatmap.json",
      simulation: "maarif_simulation_geo.json",
      analysis: "Maarif: central dense fabric. The heatmap highlights traffic concentration; simulation mode displays vehicles from geo-corrected SUMO FCD outputs."
    },
    hay_hassani: {
      label: "Hay Hassani",
      center: [33.5607, -7.69],
      zoom: 14,
      heatmap: "hay_hassani_heatmap.json",
      simulation: "hay_hassani_simulation_geo.json",
      analysis: "Hay Hassani: peripheral flows and transition zones. This view helps identify localized slowdowns and vehicle accumulation."
    },
    ben_msick: {
      label: "Ben M'Sick",
      center: [33.55, -7.58],
      zoom: 14,
      heatmap: "ben_msick_heatmap.json",
      simulation: "ben_msick_simulation_geo.json",
      analysis: "Ben M'Sick: dense urban network. The dashboard supports review of secondary-road intensity, conflict points, and speed variations."
    },
    sidi_maarouf: {
      label: "Sidi Maarouf",
      center: [33.525, -7.65],
      zoom: 14,
      heatmap: "sidi_maarouf_heatmap.json",
      simulation: "sidi_maarouf_simulation_geo.json",
      analysis: "Sidi Maarouf: strategic employment and arterial area. Simulation mode shows flows linked to business poles and major roads."
    },
    bd_mohammed_v: {
      label: "Bd. Mohammed V",
      center: [33.595, -7.61],
      zoom: 15,
      heatmap: "bd_mohammed_v_heatmap.json",
      simulation: "bd_mohammed_v_simulation_geo.json",
      analysis: "Boulevard Mohammed V: major corridor. Heatmap and simulation views identify concentration and slowdown segments."
    }
  };

  const maxHeatPoints = 12000;
  const maxVehiclesPerFrame = 1600;
  const byId = (id) => document.getElementById(id);
  const setText = (id, value) => {
    const element = byId(id);
    if (element) element.textContent = value;
  };

  let map = null;
  let heatLayer = null;
  let canvas = null;
  let context = null;
  let mode = "heatmap";
  let zoneKey = "maarif";
  let currentData = null;
  let heatPoints = [];
  let stepIndex = 0;
  let playing = false;
  let animationFrame = null;
  let lastFrame = 0;

  async function loadJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(path);
    return response.json();
  }

  function resizeCanvas() {
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const density = window.devicePixelRatio || 1;
    canvas.width = rect.width * density;
    canvas.height = rect.height * density;
    context.setTransform(density, 0, 0, density, 0, 0);
  }

  function clearCanvas() {
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
  }

  function removeHeat() {
    if (map && heatLayer) map.removeLayer(heatLayer);
    heatLayer = null;
  }

  function initMap() {
    if (!window.L) {
      setText("sumoStatus", "Leaflet is unavailable. Reload the page to display the map.");
      return false;
    }
    const zone = zones[zoneKey];
    map = L.map("sumoMap", {
      center: zone.center,
      zoom: zone.zoom,
      zoomControl: true,
      attributionControl: true,
      preferCanvas: true
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    canvas = byId("sumoCanvas");
    context = canvas.getContext("2d");
    resizeCanvas();
    map.on("move zoom resize", () => {
      resizeCanvas();
      if (mode === "simulation") drawStep();
    });
    window.addEventListener("resize", () => {
      resizeCanvas();
      if (mode === "simulation") drawStep();
    });
    return true;
  }

  function updateUI() {
    const heatmapMode = mode === "heatmap";
    const zone = zones[zoneKey];
    document.querySelectorAll(".sumo-mode").forEach((button) => {
      button.classList.toggle("active", button.dataset.sumoMode === mode);
    });
    document.querySelectorAll(".sumo-zone").forEach((button) => {
      button.classList.toggle("active", button.dataset.sumoZone === zoneKey);
    });
    byId("sumoHeatControls").classList.toggle("sumo-hidden", !heatmapMode);
    byId("sumoSimulationControls").classList.toggle("sumo-hidden", heatmapMode);
    byId("sumoHeatLegend").classList.toggle("sumo-hidden", !heatmapMode);
    byId("sumoSimulationLegend").classList.toggle("sumo-hidden", heatmapMode);
    setText("sumoZoneTitle", zone.label);
    setText("sumoAnalysis", zone.analysis);
    setText("sumoMainLabel", heatmapMode ? "POINTS" : "VISIBLE");
    ["sumoKpiMain", "sumoKpiVehicles", "sumoKpiSteps", "sumoKpiSpeed"].forEach((id) => setText(id, "-"));
  }

  async function loadCurrent() {
    if (!map) return;
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
    playing = false;
    stepIndex = 0;
    removeHeat();
    clearCanvas();
    updateUI();
    const zone = zones[zoneKey];
    map.setView(zone.center, zone.zoom);
    if (mode === "heatmap") await loadHeatmap();
    else await loadSimulation();
  }

  function normalizeHeat(points) {
    const normalized = [];
    points.forEach((point) => {
      if (!Array.isArray(point) || point.length < 2) return;
      const lat = Number(point[0]);
      const lng = Number(point[1]);
      const intensity = Number(point[2] || 0.4);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        normalized.push([lat, lng, Math.max(0.05, Math.min(intensity, 1))]);
      }
    });
    if (normalized.length <= maxHeatPoints) return normalized;
    const interval = Math.ceil(normalized.length / maxHeatPoints);
    return normalized.filter((_, index) => index % interval === 0).slice(0, maxHeatPoints);
  }

  function fitPoints(points) {
    if (!map || !points || !points.length) return;
    const bounds = L.latLngBounds(points.map((point) => [point[0], point[1]]));
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30], maxZoom: zones[zoneKey].zoom });
  }

  function drawHeatmap() {
    removeHeat();
    if (!map || !heatPoints.length || !L.heatLayer) return;
    const radius = Number(byId("sumoRadius").value);
    const blur = Number(byId("sumoBlur").value);
    const multiplier = Number(byId("sumoIntensity").value) / 12;
    const points = heatPoints.map((point) => [point[0], point[1], Math.min(0.55, point[2] * multiplier)]);
    heatLayer = L.heatLayer(points, {
      radius,
      blur,
      maxZoom: 18,
      minOpacity: 0.08,
      max: 1,
      gradient: { 0.15: "#00d99b", 0.35: "#ffd166", 0.6: "#ff9f43", 1: "#ff5d6c" }
    }).addTo(map);
    fitPoints(points);
  }

  function updateHeatKpis() {
    const kpis = currentData.kpis || {};
    setText("sumoKpiMain", heatPoints.length.toLocaleString("en-US"));
    setText("sumoKpiVehicles", Number(kpis.vehicleRecords || 0).toLocaleString("en-US"));
    setText("sumoKpiSteps", Number(kpis.steps || 0).toLocaleString("en-US"));
    setText("sumoKpiSpeed", `${Number(kpis.averageSpeed || 0).toFixed(2)} m/s`);
  }

  async function loadHeatmap() {
    const zone = zones[zoneKey];
    setText("sumoStatus", "Loading SUMO heatmap...");
    try {
      currentData = await loadJson(zone.heatmap);
      if (!currentData.points) throw new Error("Invalid heatmap format");
      setText("sumoStatus", `Loaded: ${zone.heatmap}`);
      heatPoints = normalizeHeat(currentData.points);
      drawHeatmap();
      updateHeatKpis();
    } catch {
      setText("sumoStatus", `Unable to load heatmap: ${zone.heatmap}`);
    }
  }

  function vehicleLocation(vehicle) {
    const lat = Number(vehicle.lat);
    const lng = Number(vehicle.lng);
    return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
  }

  function fitSimulation() {
    if (!currentData || !currentData.timesteps) return;
    const points = [];
    for (const timestep of currentData.timesteps) {
      for (const vehicle of timestep.vehicles || []) {
        const location = vehicleLocation(vehicle);
        if (location) points.push(location);
      }
      if (points.length > 3000) break;
    }
    fitPoints(points);
    drawStep();
  }

  function sampleVehicles(vehicles, max) {
    if (vehicles.length <= max) return vehicles;
    const interval = Math.ceil(vehicles.length / max);
    return vehicles.filter((_, index) => index % interval === 0);
  }

  function speedColor(speed) {
    if (speed < 3) return "#ff5d6c";
    if (speed < 8) return "#ffd166";
    return "#00d99b";
  }

  function roundedRect(x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }

  function drawVehicle(x, y, speed, angle) {
    const size = Number(byId("sumoVehicleSize").value) || 6;
    const color = speedColor(speed);
    context.save();
    context.translate(x, y);
    context.rotate((Number(angle || 0) - 90) * Math.PI / 180);
    context.fillStyle = color;
    context.strokeStyle = "rgba(255,255,255,0.95)";
    context.lineWidth = 1.3;
    context.shadowBlur = 9;
    context.shadowColor = color;
    roundedRect(-size, -size / 2, size * 2.4, size * 1.15, Math.max(2, size / 2));
    context.fill();
    context.stroke();
    context.restore();
  }

  function drawStep() {
    if (mode !== "simulation" || !currentData || !currentData.timesteps) return;
    const timestep = currentData.timesteps[stepIndex];
    if (!timestep) return;
    clearCanvas();
    const vehicles = sampleVehicles(timestep.vehicles || [], maxVehiclesPerFrame);
    let count = 0;
    let speedTotal = 0;
    vehicles.forEach((vehicle) => {
      const location = vehicleLocation(vehicle);
      if (!location) return;
      const point = map.latLngToContainerPoint(location);
      const speed = Number(vehicle.speed || 0);
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
      drawVehicle(point.x, point.y, speed, Number(vehicle.angle || 0));
      count += 1;
      speedTotal += speed;
    });
    setText("sumoKpiMain", count.toLocaleString("en-US"));
    setText("sumoKpiVehicles", count.toLocaleString("en-US"));
    setText("sumoKpiSpeed", `${(count ? speedTotal / count : 0).toFixed(2)} m/s`);
  }

  function animationLoop(timestamp) {
    if (mode !== "simulation" || !currentData || !currentData.timesteps) return;
    const delay = Math.max(20, 280 - (Number(byId("sumoSpeed").value) || 6) * 20);
    if (playing && timestamp - lastFrame >= delay) {
      drawStep();
      stepIndex = (stepIndex + 1) % currentData.timesteps.length;
      lastFrame = timestamp;
    }
    animationFrame = requestAnimationFrame(animationLoop);
  }

  async function loadSimulation() {
    const zone = zones[zoneKey];
    setText("sumoStatus", "Loading SUMO geo simulation...");
    try {
      currentData = await loadJson(zone.simulation);
      if (!currentData.timesteps) throw new Error("Invalid simulation format");
      setText("sumoStatus", `Loaded: ${zone.simulation}`);
      setText("sumoKpiSteps", currentData.timesteps.length.toLocaleString("en-US"));
      setText("sumoKpiSpeed", `${Number((currentData.kpis || {}).averageSpeed || 0).toFixed(2)} m/s`);
      window.setTimeout(() => {
        resizeCanvas();
        fitSimulation();
        playing = true;
        cancelAnimationFrame(animationFrame);
        lastFrame = 0;
        animationFrame = requestAnimationFrame(animationLoop);
      }, 150);
    } catch {
      setText("sumoStatus", `Unable to load simulation: ${zone.simulation}`);
    }
  }

  function bindDashboard() {
    document.querySelectorAll(".sumo-mode").forEach((button) => {
      button.addEventListener("click", () => {
        mode = button.dataset.sumoMode;
        loadCurrent();
      });
    });
    document.querySelectorAll(".sumo-zone").forEach((button) => {
      button.addEventListener("click", () => {
        zoneKey = button.dataset.sumoZone;
        loadCurrent();
      });
    });
    ["sumoRadius", "sumoBlur", "sumoIntensity"].forEach((id) => {
      byId(id).addEventListener("input", () => {
        if (mode === "heatmap") drawHeatmap();
      });
    });
    byId("sumoResetHeatmap").addEventListener("click", () => {
      if (mode === "heatmap") drawHeatmap();
    });
    byId("sumoPlay").addEventListener("click", () => { playing = true; });
    byId("sumoPause").addEventListener("click", () => { playing = false; });
    byId("sumoRestart").addEventListener("click", () => {
      stepIndex = 0;
      drawStep();
    });
    byId("sumoVehicleSize").addEventListener("input", drawStep);
    byId("sumoResetSimulation").addEventListener("click", fitSimulation);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const dashboard = byId("sumo-dashboard");
    if (!dashboard) return;
    bindDashboard();
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      if (initMap()) loadCurrent();
    };
    if (location.hash === "#simulation") start();
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      start();
    }, { rootMargin: "320px 0px", threshold: 0.01 });
    observer.observe(dashboard);
  });
})();

const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];

const arabicTranslations = {
  "Skip to main content": "تجاوز إلى المحتوى الرئيسي",
  "PSAU Digital Transformation Portfolio": "ملف التحول الرقمي بجامعة الأمير سطام",
  "Why PSAU": "لماذا جامعة الأمير سطام",
  "Trajectory": "المسار",
  "Flagship": "المشروع الرئيسي",
  "Projects": "المشاريع",
  "SUMO Map": "خريطة SUMO",
  "Experience": "الخبرة",
  "Skills": "المهارات",
  "Documents": "الوثائق",
  "Contact": "التواصل",
  "Prince Sattam bin Abdulaziz University | Saudi Arabia": "جامعة الأمير سطام بن عبد العزيز | المملكة العربية السعودية",
  "Digital Transformation,": "التحول الرقمي،",
  "AI Governance &": "حوكمة الذكاء الاصطناعي",
  "Smart-City Decision": "وقرارات المدن الذكية",
  "Readiness": "وجاهزية التنفيذ",
  "Applicant to PSAU's Master in": "متقدم لبرنامج الماجستير في",
  "Digital Transformation & Emerging Technologies.": "التحول الرقمي والتقنيات الناشئة بجامعة الأمير سطام.",
  "Management and finance background focused on AI readiness, governance, and smart-city decisions.": "خلفية في الإدارة والمالية مع تركيز على جاهزية الذكاء الاصطناعي والحوكمة وقرارات المدن الذكية.",
  "View Research Fit": "عرض ملاءمة البحث",
  "Download CV": "تحميل السيرة الذاتية",
  "Download SOP": "تحميل خطاب الدافع",
  "View Projects": "عرض المشاريع",
  "Evidence-based profile for an English-taught digital transformation master's program.": "ملف موثق بالأدلة لبرنامج ماجستير في التحول الرقمي يدرس باللغة الإنجليزية.",
  "Applicant": "المتقدم",
  "Target": "البرنامج المستهدف",
  "Master in Digital Transformation and Emerging Technologies": "ماجستير التحول الرقمي والتقنيات الناشئة",
  "Institution": "المؤسسة",
  "Prince Sattam bin Abdulaziz University": "جامعة الأمير سطام بن عبد العزيز",
  "Student type": "نوع الطالب",
  "International applicant": "متقدم دولي",
  "Language": "لغة الدراسة",
  "English-taught program": "برنامج يدرس باللغة الإنجليزية",
  "Duration": "المدة",
  "2 years": "سنتان",
  "Program Fit": "ملاءمة البرنامج",
  "Why PSAU DTET": "لماذا برنامج التحول الرقمي والتقنيات الناشئة في جامعة الأمير سطام",
  "My contribution to this environment is a business-oriented readiness framework that connects strategy, ROI, governance, stakeholder trust, and ethical legitimacy. The fit is not technology adoption alone; it is responsible value realization.": "تتمثل مساهمتي في هذا المجال في إطار جاهزية ذي توجه إداري يربط بين الاستراتيجية والعائد على الاستثمار والحوكمة وثقة أصحاب المصلحة والمشروعية الأخلاقية. فالملاءمة لا تعني تبني التكنولوجيا فقط، بل تحقيق قيمة مسؤولة وقابلة للقياس.",
  "Digital transformation and emerging technologies": "التحول الرقمي والتقنيات الناشئة",
  "The portfolio focuses on readiness: whether AI-enabled and emerging-technology projects can be implemented with measurable managerial value.": "يركز هذا الملف على الجاهزية: أي مدى إمكانية تنفيذ مشاريع مدعومة بالذكاء الاصطناعي والتقنيات الناشئة بما يحقق قيمة إدارية قابلة للقياس.",
  "AI governance and data-driven decision-making": "حوكمة الذكاء الاصطناعي واتخاذ القرار المبني على البيانات",
  "My research direction connects scoring rubrics, data governance, transparency, and decision-support logic instead of treating AI as a black box.": "يربط توجهي البحثي بين معايير التقييم وحوكمة البيانات والشفافية ومنطق دعم القرار، بدلا من التعامل مع الذكاء الاصطناعي كصندوق أسود.",
  "Enterprise architecture and innovation readiness": "هندسة المؤسسات وجاهزية الابتكار",
  "The proposal evaluates capability fit, operational feasibility, implementation risk, and escalation controls before transformation ambition.": "يقيم المقترح ملاءمة القدرات والجدوى التشغيلية ومخاطر التنفيذ وآليات التصعيد قبل الحكم على طموح التحول.",
  "Smart-city and Vision 2030 alignment": "المدن الذكية والاتساق مع رؤية 2030",
  "Saudi smart-city development requires investment logic, public value, stakeholder trust, and institutional coordination alongside technical capability.": "يتطلب تطوير المدن الذكية في المملكة منطق استثمار واضحا وقيمة عامة وثقة أصحاب المصلحة وتنسيقا مؤسسيا إلى جانب القدرة التقنية.",
  "Data privacy, cybersecurity, and responsible implementation": "خصوصية البيانات والأمن السيبراني والتنفيذ المسؤول",
  "The framework includes governance quality, auditability, risk awareness, and ethical legitimacy as criteria for transformation readiness.": "يتضمن الإطار جودة الحوكمة وقابلية التدقيق والوعي بالمخاطر والمشروعية الأخلاقية كمعايير لجاهزية التحول.",
  "Managerial value realization": "تحقيق القيمة الإدارية",
  "My background in management, finance, accounting, procurement, and analytics supports a DTET profile focused on outcomes, not slogans.": "تدعم خلفيتي في الإدارة والمالية والمحاسبة والمشتريات والتحليل ملفا يركز على النتائج العملية لا على الشعارات.",
  "Research Trajectory": "المسار البحثي",
  "From urban ROI modelling to digital transformation readiness": "من نمذجة العائد الحضري إلى جاهزية التحول الرقمي",
  "Each step moved the profile from financial modelling toward governance, smart-city analytics, and emerging-technology decision support.": "نقلت كل مرحلة هذا المسار من النمذجة المالية إلى الحوكمة وتحليلات المدن الذكية ودعم القرار المرتبط بالتقنيات الناشئة.",
  "Casablanca PFE": "مشروع نهاية الدراسة في الدار البيضاء",
  "Traffic simulation, GIS mapping, ROI, CAPEX, OPEX, TCO, break-even logic, purchasing power, and regulatory constraints.": "محاكاة المرور، الخرائط الجغرافية، العائد على الاستثمار، النفقات الرأسمالية، النفقات التشغيلية، التكلفة الكلية للملكية، منطق نقطة التعادل، القدرة الشرائية، والقيود التنظيمية.",
  "2ACOM business modelling": "النمذجة التجارية في 2ACOM",
  "Five-year model and multi-criteria profitability index across Casablanca market zones.": "نموذج مالي لخمس سنوات ومؤشر ربحية متعدد المعايير عبر مناطق سوق الدار البيضاء.",
  "AI-MCDM paper": "بحث الذكاء الاصطناعي واتخاذ القرار متعدد المعايير",
  "XGBoost, MCDA, carbon-adjusted valuation, energy risk, geoeconomic risk, and transparent infrastructure ranking.": "XGBoost، وتحليل القرار متعدد المعايير، والتقييم المعدل بالكربون، ومخاطر الطاقة، والمخاطر الجيو-اقتصادية، وترتيب البنية التحتية بشفافية.",
  "PSAU DTET": "جامعة الأمير سطام | التحول الرقمي والتقنيات الناشئة",
  "Research proposal": "المقترح البحثي",
  "AI-enabled digital transformation readiness for Saudi smart-city megaprojects using NEOM as a bounded conceptual case.": "جاهزية التحول الرقمي المدعوم بالذكاء الاصطناعي للمشاريع السعودية الكبرى للمدن الذكية، مع استخدام نيوم كحالة مفاهيمية محددة.",
  "Flagship Project": "المشروع البحثي الرئيسي",
  "An Integrated Readiness Framework for Assessing AI-Enabled Digital Transformation and Emerging Technologies in Saudi Smart-City Megaprojects": "إطار متكامل للجاهزية لتقييم التحول الرقمي المدعوم بالذكاء الاصطناعي والتقنيات الناشئة في المشاريع السعودية الكبرى للمدن الذكية",
  "NEOM is used as a bounded conceptual case setting. The project does not claim to audit NEOM or use confidential data.": "تستخدم نيوم كإطار مفاهيمي محدد. ولا يدعي المشروع تدقيق نيوم أو استخدام بيانات سرية.",
  "Research problem": "مشكلة البحث",
  "Digital transformation projects can fail when technical ambition is assessed separately from strategic performance, ROI discipline, data governance, operational feasibility, stakeholder trust, and ethical legitimacy.": "قد تفشل مشاريع التحول الرقمي عندما يتم تقييم الطموح التقني بمعزل عن الأداء الاستراتيجي والانضباط في العائد على الاستثمار وحوكمة البيانات والجدوى التشغيلية وثقة أصحاب المصلحة والمشروعية الأخلاقية.",
  "Research question": "سؤال البحث",
  "How can a managerial readiness framework help evaluate AI-enabled digital transformation and emerging-technology initiatives in Saudi smart-city megaprojects?": "كيف يمكن لإطار جاهزية إداري أن يساعد في تقييم مبادرات التحول الرقمي المدعومة بالذكاء الاصطناعي والتقنيات الناشئة في المشاريع السعودية الكبرى للمدن الذكية؟",
  "Methodology": "المنهجية",
  "Public sources, academic literature, synthetic decision scenarios, scoring rubrics, paired comparison, coverage analysis, and sensitivity testing.": "مصادر عامة، أدبيات أكاديمية، سيناريوهات قرار تركيبية، معايير تقييم، مقارنات زوجية، تحليل تغطية، واختبارات حساسية.",
  "Contribution": "المساهمة",
  "A practical decision-support framework that helps managers compare transformation readiness beyond generic digital checklists.": "إطار عملي لدعم القرار يساعد المديرين على مقارنة جاهزية التحول بما يتجاوز قوائم الفحص الرقمية العامة.",
  "Why it matters for PSAU / Saudi smart-city transformation:": "أهمية ذلك لجامعة الأمير سطام والتحول في المدن الذكية السعودية:",
  "The project fits DTET by combining emerging-technology governance, data-supported decisions, Vision 2030-oriented public value, and managerial accountability.": "ينسجم المشروع مع برنامج التحول الرقمي والتقنيات الناشئة لأنه يجمع بين حوكمة التقنيات الناشئة والقرارات المدعومة بالبيانات والقيمة العامة المرتبطة برؤية 2030 والمساءلة الإدارية.",
  "Evidence Projects": "مشاريع داعمة بالأدلة",
  "Projects aligned with PSAU DTET": "مشاريع متوافقة مع برنامج التحول الرقمي والتقنيات الناشئة",
  "PSAU DTET Research Proposal": "مقترح بحثي لبرنامج جامعة الأمير سطام",
  "AI-enabled digital transformation readiness": "جاهزية التحول الرقمي المدعوم بالذكاء الاصطناعي",
  "Problem": "الإشكالية",
  "Technology ambition needs governance, ROI, feasibility, trust, and ethics.": "يتطلب الطموح التقني حوكمة وعائدا على الاستثمار وجدوى وثقة وأخلاقيات.",
  "Methods": "الأساليب",
  "Literature synthesis, document analysis, scoring rubric, synthetic scenarios, paired comparison, sensitivity testing.": "تركيب الأدبيات، تحليل الوثائق، سلم تقييم، سيناريوهات تركيبية، مقارنة زوجية، واختبار الحساسية.",
  "Integrated readiness framework for smart-city megaproject decisions.": "إطار جاهزية متكامل لقرارات المشاريع الكبرى في المدن الذكية.",
  "DTET relevance": "الصلة ببرنامج التحول الرقمي والتقنيات الناشئة",
  "Digital transformation governance, emerging technologies, smart-city readiness, and decision support.": "حوكمة التحول الرقمي، التقنيات الناشئة، جاهزية المدن الذكية، ودعم القرار.",
  "Open Proposal PDF": "فتح المقترح PDF",
  "Download DOCX": "تحميل ملف DOCX",
  "AI-MCDM Research Paper": "بحث الذكاء الاصطناعي واتخاذ القرار متعدد المعايير",
  "Smart-city investment scoring under carbon, energy, and geoeconomic risk": "تقييم استثمارات المدن الذكية في ظل مخاطر الكربون والطاقة والمخاطر الجيو-اقتصادية",
  "NPV-only infrastructure rankings can miss risk, flexibility, carbon, and resilience dimensions.": "قد تتجاهل تصنيفات البنية التحتية المعتمدة على صافي القيمة الحالية فقط أبعاد المخاطر والمرونة والكربون والقدرة على الصمود.",
  "XGBoost demand forecasting, carbon-adjusted valuation, real-options logic, Fuzzy-AHP, MEREC, AROMAN.": "التنبؤ بالطلب باستخدام XGBoost، والتقييم المعدل بالكربون، ومنطق الخيارات الحقيقية، وFuzzy-AHP، وMEREC، وAROMAN.",
  "Auditable, traceable, robust, and transparent decision-support reasoning.": "منطق دعم قرار قابل للتدقيق والتتبع وقوي وشفاف.",
  "Emerging analytics, explainable scoring, governance, and smart-city investment prioritization.": "تحليلات ناشئة، تقييم قابل للتفسير، حوكمة، وترتيب أولويات الاستثمار في المدن الذكية.",
  "Open Paper": "فتح البحث",
  "Bachelor Final Project / PFE": "مشروع نهاية البكالوريوس",
  "Outdoor Advertising Profitability Based on Road Traffic: Casablanca Case": "ربحية الإعلانات الخارجية بناء على حركة المرور: حالة الدار البيضاء",
  "Outdoor advertising profitability depends on more than location; traffic exposure, cost, purchasing power, and regulation matter together.": "تعتمد ربحية الإعلانات الخارجية على أكثر من الموقع؛ فالتعرض المروري والتكلفة والقدرة الشرائية والتنظيم كلها عوامل مترابطة.",
  "SUMO, QGIS, CAPEX, OPEX, TCO, ROI, break-even analysis, and profitability index.": "SUMO وQGIS والنفقات الرأسمالية والتشغيلية والتكلفة الكلية للملكية والعائد على الاستثمار وتحليل نقطة التعادل ومؤشر الربحية.",
  "Bridge between finance, urban data, and investment decision support.": "جسر بين المالية والبيانات الحضرية ودعم قرارات الاستثمار.",
  "Smart-city analytics, spatial data, KPI modelling, and data-driven urban decisions.": "تحليلات المدن الذكية، البيانات المكانية، نمذجة مؤشرات الأداء، والقرارات الحضرية المبنية على البيانات.",
  "Open PFE": "فتح مشروع نهاية الدراسة",
  "Casablanca Smart-City Evidence": "دليل تطبيقي من مدينة الدار البيضاء الذكية",
  "SUMO / Leaflet traffic simulation": "محاكاة المرور باستخدام SUMO وLeaflet",
  "This dashboard reuses geo-corrected SUMO floating-car-data outputs from the Casablanca PFE. It supports the PSAU DTET narrative by showing how traffic simulation, spatial data, and investment logic can inform smart-city decision readiness.": "تعيد هذه اللوحة استخدام مخرجات SUMO المصححة جغرافيا لبيانات المركبات المتحركة من مشروع الدار البيضاء. وهي تدعم ملف برنامج التحول الرقمي والتقنيات الناشئة بإظهار كيف يمكن لمحاكاة المرور والبيانات المكانية ومنطق الاستثمار أن تدعم جاهزية قرارات المدن الذكية.",
  "Leaflet / SUMO Traffic Dashboard": "لوحة مرور Leaflet / SUMO",
  "OpenStreetMap | SUMO FCD | 5 Casablanca zones": "OpenStreetMap | بيانات SUMO FCD | خمس مناطق في الدار البيضاء",
  "Heatmap": "الخريطة الحرارية",
  "Simulation": "المحاكاة",
  "Maarif": "المعاريف",
  "Hay Hassani": "الحي الحسني",
  "Ben M'Sick": "بن مسيك",
  "Sidi Maarouf": "سيدي معروف",
  "Bd. Mohammed V": "شارع محمد الخامس",
  "Preparing SUMO heatmap...": "جار تحضير الخريطة الحرارية من SUMO...",
  "Loading SUMO heatmap...": "جار تحميل الخريطة الحرارية من SUMO...",
  "Loading SUMO geo simulation...": "جار تحميل محاكاة SUMO الجغرافية...",
  "Leaflet is unavailable. Reload the page to display the map.": "مكتبة Leaflet غير متاحة. أعد تحميل الصفحة لعرض الخريطة.",
  "Low concentration": "كثافة منخفضة",
  "Medium": "متوسطة",
  "High": "مرتفعة",
  "Slow": "بطيء",
  "Fast": "سريع",
  "POINTS": "النقاط",
  "VISIBLE": "الظاهرة",
  "VEHICLES": "المركبات",
  "STEPS": "الخطوات",
  "AVG SPEED": "متوسط السرعة",
  "Heat radius": "نصف قطر الحرارة",
  "Blur": "التنعيم",
  "Intensity": "الشدة",
  "Recenter": "إعادة التمركز",
  "Play": "تشغيل",
  "Pause": "إيقاف مؤقت",
  "Restart": "إعادة التشغيل",
  "Animation speed": "سرعة التحريك",
  "Vehicle size": "حجم المركبة",
  "Heatmap based on geo-corrected SUMO FCD outputs. Switch to Simulation to display vehicles step by step.": "تعتمد الخريطة الحرارية على مخرجات SUMO FCD المصححة جغرافيا. انتقل إلى وضع المحاكاة لعرض المركبات خطوة بخطوة.",
  "SUMO FCD": "بيانات SUMO FCD",
  "QGIS context": "سياق QGIS",
  "Smart-city analytics": "تحليلات المدن الذكية",
  "Investment readiness": "جاهزية الاستثمار",
  "Data scope.": "نطاق البيانات.",
  "These bundled JSON files are analytical outputs from the Casablanca final project. They are portfolio evidence for spatial decision support, not real-time municipal traffic monitoring.": "ملفات JSON المرفقة هي مخرجات تحليلية من مشروع الدار البيضاء النهائي. وهي دليل ضمن الملف لدعم القرار المكاني، وليست مراقبة بلدية لحركة المرور في الوقت الفعلي.",
  "Professional Experience": "الخبرة المهنية",
  "Business analysis translated into decision readiness": "تحويل تحليل الأعمال إلى جاهزية لاتخاذ القرار",
  "Business Analysis Intern - Financial Performance": "متدرب في تحليل الأعمال - الأداء المالي",
  "Impact:": "الأثر:",
  "NPL portfolio analysis, collection-priority logic, dashboards, and 40% faster reporting with VBA and Power Query.": "تحليل محفظة القروض المتعثرة، ومنطق تحديد أولويات التحصيل، ولوحات متابعة، وتسريع التقارير بنسبة 40% باستخدام VBA وPower Query.",
  "Risk analytics, operational reporting, and data-supported prioritization.": "تحليلات المخاطر، التقارير التشغيلية، وترتيب الأولويات المدعوم بالبيانات.",
  "Business Analysis Intern - Performance and KPIs": "متدرب في تحليل الأعمال - الأداء ومؤشرات القياس",
  "Five-year financial model and 15+ variable profitability index across five Casablanca market zones.": "نموذج مالي لخمس سنوات ومؤشر ربحية يضم أكثر من 15 متغيرا عبر خمس مناطق سوقية في الدار البيضاء.",
  "KPI modelling, investment readiness, and urban decision analytics.": "نمذجة مؤشرات الأداء، جاهزية الاستثمار، وتحليلات القرار الحضري.",
  "Analysis and Reporting Intern - Client Portfolios and Risk": "متدرب في التحليل وإعداد التقارير - محافظ العملاء والمخاطر",
  "Financial-performance and credit-risk review across 20+ corporate client portfolios.": "مراجعة الأداء المالي ومخاطر الائتمان لأكثر من 20 محفظة لعملاء من الشركات.",
  "Portfolio monitoring, reporting discipline, and decision-support logic.": "متابعة المحافظ، الانضباط في التقارير، ومنطق دعم القرار.",
  "Skills Matrix": "مصفوفة المهارات",
  "Capabilities for digital transformation and emerging-technology governance": "قدرات مرتبطة بالتحول الرقمي وحوكمة التقنيات الناشئة",
  "Digital transformation & governance": "التحول الرقمي والحوكمة",
  "Digital transformation readiness, AI governance, data governance, responsible implementation, stakeholder trust.": "جاهزية التحول الرقمي، حوكمة الذكاء الاصطناعي، حوكمة البيانات، التنفيذ المسؤول، وثقة أصحاب المصلحة.",
  "Data / analytics tools": "أدوات البيانات والتحليل",
  "VBA, Power Query, Excel, dashboarding, KPI modelling, scenario-based evaluation.": "VBA وPower Query وExcel ولوحات المتابعة ونمذجة مؤشرات الأداء والتقييم القائم على السيناريوهات.",
  "Financial and investment modelling": "النمذجة المالية والاستثمارية",
  "ROI, CAPEX, OPEX, TCO, break-even analysis, risk-adjusted investment logic, profitability indexes.": "العائد على الاستثمار، النفقات الرأسمالية، النفقات التشغيلية، التكلفة الكلية للملكية، تحليل نقطة التعادل، منطق الاستثمار المعدل بالمخاطر، ومؤشرات الربحية.",
  "Smart-city and spatial analysis": "المدن الذكية والتحليل المكاني",
  "Smart-city analytics, SUMO traffic simulation, QGIS, urban exposure modelling, spatial decision support.": "تحليلات المدن الذكية، محاكاة المرور باستخدام SUMO، QGIS، نمذجة التعرض الحضري، ودعم القرار المكاني.",
  "Research methods": "مناهج البحث",
  "Literature synthesis, research design, multi-criteria decision analysis, scoring rubrics, sensitivity analysis.": "تركيب الأدبيات، تصميم البحث، تحليل القرار متعدد المعايير، معايير التقييم، وتحليل الحساسية.",
  "Business and operations": "الأعمال والعمليات",
  "Business analysis, procurement analytics, supply chain analytics, portfolio monitoring, reporting discipline.": "تحليل الأعمال، تحليلات المشتريات، تحليلات سلسلة الإمداد، متابعة المحافظ، والانضباط في التقارير.",
  "Document Library": "مكتبة الوثائق",
  "Application evidence": "أدلة ملف التقديم",
  "All files are linked with relative paths and should be uploaded to the repository root with `index.html`, `style.css`, and `script.js`.": "جميع الملفات مرتبطة بمسارات نسبية ويجب رفعها إلى جذر المستودع مع ملفات `index.html` و`style.css` و`script.js`.",
  "Open PDF": "فتح PDF",
  "Research Proposal PSAU DTET": "المقترح البحثي لبرنامج جامعة الأمير سطام",
  "AI-MCDM Smart Cities Paper": "بحث AI-MCDM للمدن الذكية",
  "Casablanca Traffic ROI": "العائد المروري في الدار البيضاء",
  "Bachelor Transcript": "كشف نقاط البكالوريوس",
  "TCF Certificate": "شهادة TCF",
  "TOEFL Report": "تقرير TOEFL",
  "Application Snapshot": "لمحة عن ملف التقديم",
  "Precise fit for PSAU DTET": "ملاءمة دقيقة لبرنامج جامعة الأمير سطام",
  "Academic background": "الخلفية الأكاديمية",
  "Management, Finance and Accounting": "الإدارة والمالية والمحاسبة",
  "Current path": "المسار الحالي",
  "MSc Procurement and Supply Chain Management": "ماجستير العلوم في المشتريات وإدارة سلسلة الإمداد",
  "Research fit": "الملاءمة البحثية",
  "AI-enabled digital transformation, governance, smart-city readiness, decision-support systems": "التحول الرقمي المدعوم بالذكاء الاصطناعي، الحوكمة، جاهزية المدن الذكية، وأنظمة دعم القرار",
  "Language readiness": "الجاهزية اللغوية",
  "French C2, English B2, Arabic native": "الفرنسية C2، الإنجليزية B2، العربية لغة أم",
  "Career direction": "الاتجاه المهني",
  "Digital transformation / AI governance / smart-city decision-support analyst": "التحول الرقمي / حوكمة الذكاء الاصطناعي / تحليل دعم القرار في المدن الذكية",
  "I aim to contribute to digital transformation projects where emerging technologies are evaluated not only by technical ambition, but by governance quality, measurable performance, and public value.": "أطمح إلى الإسهام في مشاريع التحول الرقمي التي تقيم التقنيات الناشئة ليس فقط من زاوية الطموح التقني، بل أيضا من خلال جودة الحوكمة والأداء القابل للقياس والقيمة العامة.",
  "Lyon, France": "ليون، فرنسا",
  "LinkedIn: Elghali Sany": "لينكدإن: Elghali Sany",
  "El Ghali Sany | PSAU DTET Admissions Portfolio": "الغالي ساني | ملف التقديم لبرنامج التحول الرقمي والتقنيات الناشئة بجامعة الأمير سطام"
};

const arabicAttributeTranslations = {
  "Open navigation menu": "فتح قائمة التنقل",
  "Close navigation menu": "إغلاق قائمة التنقل",
  "El Ghali Sany PSAU DTET portfolio home": "الصفحة الرئيسية لملف الغالي ساني بجامعة الأمير سطام",
  "Application snapshot": "لمحة عن ملف التقديم",
  "Portrait of El Ghali Sany": "صورة شخصية للغالي ساني",
  "SUMO dashboard modes": "أوضاع لوحة SUMO",
  "View traffic density heatmap": "عرض الخريطة الحرارية لكثافة المرور",
  "View SUMO vehicle simulation": "عرض محاكاة مركبات SUMO",
  "SUMO zones": "مناطق SUMO",
  "Interactive Casablanca SUMO traffic map": "خريطة تفاعلية لمحاكاة مرور SUMO في الدار البيضاء",
  "SUMO simulation controls and indicators": "عناصر التحكم ومؤشرات محاكاة SUMO"
};

const originalText = new WeakMap();
const originalAttributes = new WeakMap();
const translatableAttributes = ["aria-label", "alt", "title"];

function preserveWhitespace(original, translated) {
  const start = original.match(/^\s*/)?.[0] || "";
  const end = original.match(/\s*$/)?.[0] || "";
  return `${start}${translated}${end}`;
}

function translateDynamicText(text) {
  if (!text) return text;
  const trimmed = text.trim();
  if (arabicTranslations[trimmed]) return preserveWhitespace(text, arabicTranslations[trimmed]);
  if (trimmed.startsWith("Loaded: ")) return preserveWhitespace(text, `تم التحميل: ${trimmed.replace("Loaded: ", "")}`);
  if (trimmed.startsWith("Unable to load heatmap: ")) return preserveWhitespace(text, `تعذر تحميل الخريطة الحرارية: ${trimmed.replace("Unable to load heatmap: ", "")}`);
  if (trimmed.startsWith("Unable to load simulation: ")) return preserveWhitespace(text, `تعذر تحميل المحاكاة: ${trimmed.replace("Unable to load simulation: ", "")}`);
  return text;
}

window.portfolioTranslateText = (text) => (
  document.documentElement.lang === "ar" ? translateDynamicText(text) : text
);

window.portfolioRenderText = (element, value) => {
  if (!element) return;
  const source = String(value);
  element.dataset.i18nSource = source;
  element.textContent = document.documentElement.lang === "ar" ? translateDynamicText(source) : source;
};

function applyLanguage(language) {
  const isArabic = language === "ar";
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isArabic);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest("script, style, textarea")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const dynamicSource = node.parentElement?.dataset.i18nSource;
    if (!dynamicSource && !originalText.has(node)) originalText.set(node, node.textContent);
    const source = dynamicSource || originalText.get(node);
    node.textContent = isArabic ? translateDynamicText(source) : source;
  });

  document.querySelectorAll("*").forEach((element) => {
    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      let stored = originalAttributes.get(element);
      if (!stored) {
        stored = {};
        originalAttributes.set(element, stored);
      }
      if (!stored[attribute]) stored[attribute] = element.getAttribute(attribute);
      const source = stored[attribute];
      const translated = arabicAttributeTranslations[source] || arabicTranslations[source] || source;
      element.setAttribute(attribute, isArabic ? translated : source);
    });
  });

  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.textContent = isArabic ? "English" : "العربية";
    button.setAttribute("aria-label", isArabic ? "Switch to English" : "Switch to Arabic");
  });

  localStorage.setItem("portfolio-language", language);
  window.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language } }));
  syncActiveState();
}

function setMenu(open) {
  navMenu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open
    ? window.portfolioTranslateText("Close navigation menu")
    : window.portfolioTranslateText("Open navigation menu"));
}

function setActiveLink(hash) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

menuButton.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
navLinks.forEach((link) => link.addEventListener("click", () => {
  setActiveLink(link.getAttribute("href"));
  setMenu(false);
}));

document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
    setMenu(false);
  });
});

function updateActiveFromScroll() {
  const offset = 120;
  const hashTarget = location.hash ? document.querySelector(location.hash) : null;
  const hashRect = hashTarget?.getBoundingClientRect();
  const current = hashRect && hashRect.top >= -40 && hashRect.top <= window.innerHeight * 0.35
    ? hashTarget
    : [...sections]
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= offset);
  if (current) setActiveLink(`#${current.id}`);
}

function syncActiveState() {
  if (location.hash && document.querySelector(location.hash)) setActiveLink(location.hash);
  else updateActiveFromScroll();
}

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateActiveFromScroll();
    scrollTicking = false;
  });
});

window.addEventListener("resize", updateActiveFromScroll);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("hashchange", syncActiveState);

const savedLanguage = localStorage.getItem("portfolio-language") === "ar" ? "ar" : "en";
applyLanguage(savedLanguage);

if (location.hash) setActiveLink(location.hash);
window.setTimeout(syncActiveState, 100);
window.setTimeout(syncActiveState, 750);
window.setTimeout(syncActiveState, 2200);
window.addEventListener("load", () => {
  syncActiveState();
  window.setTimeout(syncActiveState, 250);
  window.setTimeout(syncActiveState, 1500);
  let syncCount = 0;
  const syncTimer = window.setInterval(() => {
    syncActiveState();
    syncCount += 1;
    if (syncCount >= 8) window.clearInterval(syncTimer);
  }, 500);
});

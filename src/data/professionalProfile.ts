import { resolveExafuseUrl } from "../config/externalLinks";

/** Professional positioning and delivery facts confirmed by Manish on 7 October 2026.
 * Career/education: existing CV records. Current responsibilities, research
 * status and external collaborations: direct self-reported confirmation.
 * This does not establish institutional endorsement or product qualification.
 */
export const PROFESSIONAL_PROFILE = {
  reviewed: "2026-10-07",
  role: "Head of AI & R&D at Exafuse / ThinkIng – Additive Technology GmbH",
  shortBio: "Manish Sharma is Head of AI & R&D at Exafuse. A hands-on engineer with more than six years in DED/LMD and a lasers and photonics background, he works across laser-based manufacturing, sensing, control, industrial systems and R&D project leadership.",
  research: "External PhD researcher at Ruhr University Bochum, Applied Laser Technology. PhD in progress, expected 2027.",
  languages: "English C1; German B1, progressing toward B2; Hindi native.",
  leadership: "Managed five employees with hiring responsibility; led Exafuse's contribution to BreitbahnDED, including technical coordination, milestones, costs and reporting.",
  deployment: "Monitoring and control deployed across three machines at two sites.",
  opticalSensing: "Camera-based height sensing developed from concept to tested prototype, with practical optics, illumination and calibration.",
  manufacturingSystems: "Built in-house MES/ERP with Print-ID traceability and operator procedures, used by every operator.",
  externalWork: "Recurring invited guest lectures at the Indian Space Research Organisation (ISRO) in India in a personal capacity; contributions to WAAM machine development at ISRO for rocket-nozzle manufacturing; additive-manufacturing advice to ISRO teams, Tata Steel and Bharat Heavy Electricals Limited (BHEL), Haridwar.",
  selectedDelivery: "Duisburg bridge components, 2024: led process monitoring and control work that enabled unattended builds and coordinated delivery scheduling within his scope. Testing was outside his role.",
  integratedSystem: "Built an integrated LMD control system spanning modelling, simulation, path planning, camera and sensor monitoring, software, data processing and live control. This work forms part of his doctoral thesis.",
  websiteDelivery: "Built Exafuse's website, presenting industrial services, technical case studies and tools for preparing engineering enquiries.",
  expertise: [
    { title: "Technical project & R&D leadership", text: "Technical coordination, team leadership and manufacturing delivery. Led Exafuse's contribution to BreitbahnDED, including milestones, costs and reporting; managed five employees with hiring responsibility." },
    { title: "Lasers, photonics & sensing", text: "M.Sc. Lasers and Photonics, alongside practical work in laser processing, cameras, optical sensing, illumination, calibration and process monitoring. Camera-based height sensing taken from concept to tested prototype." },
    { title: "Advanced manufacturing & industrial systems", text: "More than six years in DED/LMD: deposition strategy, robotics, process control, machine integration, manufacturing data and automation. Also practical LPBF build preparation and troubleshooting, plus in-house MES/ERP and traceability." }
  ],
  selectedCases: [
    {
      id: "duisburg", title: "DED/LMD delivery: Duisburg bridge components",
      context: "Long-duration LMD builds for Exafuse's 2024 bridge-component project needed process monitoring, control and coordinated delivery.",
      responsibility: "I led the monitoring and process-control work and coordinated delivery scheduling within my scope.",
      delivery: "Connected process measurements and control with the demands of the component builds.",
      result: "The monitoring/control work enabled unattended builds. Company and partner results remain separately attributed; testing was outside my role.",
      href: "/public-work/exafuse/duisburg-bridge-components", link: "Read the project and my role"
    },
    {
      id: "control-system", title: "Monitoring and control across machines",
      context: "DED/LMD operators need to relate changing process conditions to the machine, sensors and next control action.",
      responsibility: "I led the system architecture, development and integration, coordinating contributors working on sensors and algorithms.",
      delivery: "Built an integrated workflow spanning modelling, cameras, sensor data, machine interfaces and live control.",
      result: "Monitoring and control deployed across three machines at two sites. Each machine still requires its own calibration, commissioning and operating limits.",
      href: "/lab-notes/lmd-control-system/", link: "Inside the LMD control system"
    },
    {
      id: "height-sensing", title: "Camera-based height sensing",
      context: "A usable height signal depends on the optical setup and calibration, as well as image processing.",
      responsibility: "I developed camera-based height sensing from concept to tested prototype.",
      delivery: "Worked with cameras, illumination, optical measurement and calibration to make the measurement interpretable in an industrial process.",
      result: "A tested prototype and an inspectable measurement workflow. The public case does not claim a certified accuracy or universal operating range.",
      href: "/lab-notes/lmd-control-system/#calibration", link: "Explore the optical sensing work"
    },
    {
      id: "manufacturing-records", title: "MES/ERP and operator workflows",
      context: "Manufacturing records need to stay connected from planning through production and quality documentation.",
      responsibility: "I built the in-house MES/ERP and the operator procedures around it.",
      delivery: "Connected quotations, costing, scheduling and manufacturing records through Print-ID traceability.",
      result: "The workflow is used by every operator, giving process records a place in the history of each part.",
      href: "/lab-notes/lmd-control-system/#records", link: "Read about manufacturing records"
    }
  ],
  workCycle: [
    { number: "01", title: "Define the work", text: "Part requirements, CAD, sourcing, quotations, and cost and price considerations." },
    { number: "02", title: "Develop the process", text: "LMD/DED process development, control-system work, sensing and robotic workflows." },
    { number: "03", title: "Measure and review", text: "Camera and sensor integration, process analytics, calibration and quality checks." },
    { number: "04", title: "Deliver the part", text: "Build documentation, team coordination and delivery through to shipment." }
  ],
  engineeringWork: [
    { label: "Integrated manufacturing systems", title: "From models and toolpaths to live control", role: "System development and doctoral research", text: "I built an integrated LMD control system covering modelling, simulation, path planning, camera and sensor monitoring, software, data processing and live control. Monitoring and control have been deployed across three machines at two sites. This work forms part of my doctoral thesis; each machine requires its own integration and commissioning.", href: "/lab-notes/lmd-control-system/", link: "Explore the LMD control system" },
    { label: "Collaborative research", title: "BreitbahnDED", role: "Lead for Exafuse's contribution", text: "I led Exafuse's contribution to BreitbahnDED, including technical coordination, milestones, costs and reporting, and helped develop and write the project proposal. This connects manufacturing requirements, monitoring and software with university research. I also work with Ruhr University Bochum on new research proposals.", href: resolveExafuseUrl("breitbahnDedGuide"), link: "Read the Exafuse project article" },
    { label: "Public technical work", title: "LMD Decision Brief and research", role: "Engineering knowledge made inspectable", text: "My public work includes a portable brief for LMD/DED engineering questions, technical notes and a research publication on lattice-structure deposition. The tools make assumptions and evidence needs explicit; physical inspection remains essential.", href: "/brief-standard", link: "Read the LMD Decision Brief" },
    { label: "Delivered software", title: "Exafuse's website", role: "Website development", text: "I built Exafuse's website. It brings industrial services, technical case studies and enquiry-preparation tools into a public interface for engineering customers.", href: "/public-work#website-development", link: "View the delivered website" }
  ],
  collaborations: [
    { title: "Indian Space Research Organisation (ISRO), India", label: "Invited teaching and engineering contributions", text: "I give recurring invited guest lectures at ISRO in a personal capacity. I also advise ISRO teams on additive manufacturing and contribute to WAAM machine development for rocket-nozzle manufacturing." },
    { title: "Tata Steel and Bharat Heavy Electricals Limited (BHEL), Haridwar", label: "Technical advisory work", text: "I advise teams at Tata Steel and Bharat Heavy Electricals Limited (BHEL), Haridwar on additive manufacturing, drawing on my experience in process development, monitoring and manufacturing workflows." }
  ],
  timeline: [
    { period: "Jan 2024 – Present", role: "Head of AI & R&D", org: "Exafuse / ThinkIng – Additive Technology GmbH, Bochum", text: "I lead R&D and manufacturing projects from sourcing and CAD through processing, monitoring, quality checks and shipment. I have managed five employees with hiring responsibility. My work includes technical coordination, milestones, costs and reporting for Exafuse's BreitbahnDED contribution, alongside quotations, cost comparisons and operational responsibility in a small team." },
    { period: "Jan 2020 – Dec 2023", role: "Machine Learning and Systems Engineer", org: "Exafuse / ThinkIng – Additive Technology GmbH, Bochum", text: "Developed machine-vision monitoring systems, neural-network feature extraction and automation interfaces for LMD, including vision-based height sensing and robotic toolpath work." },
    { period: "Dec 2017 – Jun 2021", role: "University research roles", org: "Ruhr University Bochum", text: "Research Assistant from December 2017 to December 2019, followed by Wissenschaftlicher Mitarbeiter from January 2020 to June 2021. Research covered LMD vision systems, machine learning and lattice-structure deposition." }
  ],
  education: [
    { title: "External PhD — in progress, expected 2027", org: "Ruhr University Bochum · Applied Laser Technology", text: "Research in vision-based LMD process control with artificial intelligence. External doctoral research since March 2020; the PhD has not yet been awarded." },
    { title: "M.Sc. Lasers and Photonics", org: "Ruhr University Bochum", text: "Faculty Prize for best student. Thesis on machine-learning approaches in LMD lattice structures." },
    { title: "B.Tech. Electrical Engineering", org: "Rajasthan Technical University, India", text: "May 2012 – June 2016. Gold Medal / first-rank academic recognition." }
  ],
  talks: [
    { event: "Outokumpu Metal Powder Event", detail: "Krefeld — 25 September 2025. Invited speaker on LMD and powder metallurgy applications.", href: "https://www.linkedin.com/posts/outokumpu_join-us-on-september-25th-in-krefeld-germany-activity-7369306359361736707-bLgx" },
    { event: "Data Science Ruhrgebiet", detail: "Online — 1 July 2021. Process control in metal 3D additive manufacturing with deep learning image processing.", href: "https://data-science.ruhr/rueckblicke/programm-2021/" }
  ]
} as const;

/** Public wording reviewed with Manish on 23 September 2026.
 * Career/education: existing CV records. Current responsibilities, research
 * status and external collaborations: direct self-reported confirmation.
 * This does not establish institutional endorsement or product qualification.
 */
export const PROFESSIONAL_PROFILE = {
  reviewed: "2026-09-23",
  role: "Head of AI & R&D at Exafuse",
  shortBio: "Manish Sharma is Head of AI & R&D at Exafuse. He leads additive-manufacturing projects across process development, sensing, software, quality checks and delivery.",
  research: "PhD research completed; thesis at submission stage at Ruhr University Bochum. The degree has not yet been awarded.",
  languages: "English C1; German B1, studying toward B2 with completion targeted for December 2026; Hindi native.",
  externalWork: "Recurring invited guest lectures at ISRO in India in a personal capacity; contributions to WAAM machine development at ISRO for rocket-nozzle manufacturing; additive-manufacturing advice to ISRO teams, Tata Steel and BHEL Haridwar.",
  workCycle: [
    { number: "01", title: "Define the work", text: "Part requirements, CAD, sourcing, quotations, and cost and price considerations." },
    { number: "02", title: "Develop the process", text: "LMD/DED process development, control-system work, sensing and robotic workflows." },
    { number: "03", title: "Measure and review", text: "Camera and sensor integration, process analytics, calibration and quality checks." },
    { number: "04", title: "Deliver the part", text: "Build documentation, team coordination and delivery through to shipment." }
  ],
  engineeringWork: [
    { label: "Manufacturing systems", title: "From process signals to usable information", role: "AI and R&D leadership at Exafuse", text: "My work combines machine vision, Python and C++, ROS2 sensor integration, KUKA workflows and traceable build documentation. The purpose is to connect process behavior with decisions engineers can review.", href: "/domains/lmd-ded", link: "Explore the LMD/DED work" },
    { label: "Collaborative research", title: "BreitbahnDED", role: "Lead for the company's contribution", text: "I lead our company contribution to BreitbahnDED and helped develop and write the project proposal. My responsibilities connect manufacturing requirements, monitoring and software work with university research. I also work with Ruhr University Bochum on new research proposals.", href: "/about#experience", link: "View my professional background" },
    { label: "Public technical work", title: "LMD Decision Brief and research", role: "Engineering knowledge made inspectable", text: "My public work includes a portable brief for LMD/DED engineering questions, technical notes and a research publication on lattice-structure deposition. The tools make assumptions and evidence needs explicit; physical inspection remains essential.", href: "/brief-standard", link: "Read the LMD Decision Brief" }
  ],
  collaborations: [
    { title: "ISRO, India", label: "Invited teaching and engineering contributions", text: "I give recurring invited guest lectures at ISRO in a personal capacity. I also advise ISRO teams on additive manufacturing and contribute to WAAM machine development for rocket-nozzle manufacturing." },
    { title: "Tata Steel and BHEL Haridwar", label: "Technical advisory work", text: "I advise teams at Tata Steel and BHEL Haridwar on additive manufacturing, drawing on my experience in process development, monitoring and manufacturing workflows." }
  ],
  timeline: [
    { period: "Jan 2024 – Present", role: "Head of AI & R&D", org: "Exafuse, Bochum", text: "I lead R&D and manufacturing projects from sourcing and CAD through processing, monitoring, quality checks and shipment. In our small team, I share operational responsibility and prepare quotations and cost comparisons. I have been involved since the company's inception." },
    { period: "Jan 2020 – Dec 2023", role: "Machine Learning and Systems Engineer", org: "Exafuse, Bochum", text: "Developed machine-vision monitoring systems, neural-network feature extraction and automation interfaces for LMD, including vision-based height sensing and robotic toolpath work." },
    { period: "Dec 2017 – Jun 2021", role: "University research roles", org: "Ruhr University Bochum", text: "Research Assistant from December 2017 to December 2019, followed by Wissenschaftlicher Mitarbeiter from January 2020 to June 2021. Research covered LMD vision systems, machine learning and lattice-structure deposition." }
  ],
  education: [
    { title: "External PhD — submission stage", org: "Ruhr University Bochum", text: "Research work completed in vision-based LMD process control with Artificial Intelligence. Thesis at submission stage; degree not yet awarded. Since March 2020." },
    { title: "M.Sc. Lasers and Photonics", org: "Ruhr University Bochum", text: "April 2017 – January 2020. Faculty Prize / Best Student recognition. Thesis on machine-learning approaches in LMD lattice structures." },
    { title: "B.Tech. Electrical Engineering", org: "Rajasthan Technical University, India", text: "May 2012 – June 2016. Gold Medal / first-rank academic recognition." }
  ],
  talks: [
    "Invited speaker/expert in LMD and powder metallurgy applications, Outokumpu Metal Powder Event, Krefeld — 25 September 2025.",
    "Speaker on Laser Metal Deposition, Data Science Ruhrgebiet, Bochum — 2021."
  ]
} as const;

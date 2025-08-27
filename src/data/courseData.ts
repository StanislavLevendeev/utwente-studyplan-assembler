import { Course } from '../types/Course';

// Helper to create IDs
const cid = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// ---- catalog (from programme page; condensed) ----
export const REQUIRED: Course[] = [
  { id: cid("Machine Learning 1"), code: "202500276", title: "Machine Learning 1", ec: 5, duration: 1, type: "required", given: [{ year: 1, q: 1 }] },
  { id: cid("Managing Big Data"), code: "201200044", title: "Managing Big Data", ec: 5, duration: 1, type: "required", given: [{ year: 1, q: 2 }] },
  { id: cid("Data Science"), code: "202500300", title: "Data Science", ec: 5, duration: 1, type: "required", given: [{ year: 1, q: 2 }, { year: 1, q: 3 }] },
  { id: cid("Information Theory and Statistics"), code: "201700080", title: "Information Theory & Statistics", ec: 5, duration: 1, type: "required", given: [{ year: 1, q: 3 }] },
  { id: cid("Computer Ethics"), code: "191612680", title: "Computer Ethics", ec: 5, duration: 1, type: "required", given: [{ year: 1, q: 2 }] },
  { id: cid("Research Topics"), title: "Research Topics", ec: 10, duration: 2, type: "required", given: [{ year: 2, q: 1 }, { year: 2, q: 2 }] },
  { id: cid("Final Project"), code: "192199978", title: "Final Project (MSc Thesis)", ec: 30, duration: 2, type: "required", given: [{ year: 2, q: 3 }, { year: 2, q: 4 }] },
];

export const ADVANCED: Course[] = [
  { id: cid("Image Processing and Computer Vision"), code: "202200103", title: "Image Processing & Computer Vision", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 1 }] },
  { id: cid("Foundations of Information Retrieval"), code: "201600076", title: "Foundations of Information Retrieval", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 1 }] },
  { id: cid("Natural Language Processing"), code: "202500277", title: "Natural Language Processing", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 1 }] },
  { id: cid("FAIR Data Engineering"), code: "202100258", title: "FAIR Data Engineering", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 1 }] },
  { id: cid("Deep Learning - From Theory to Practice"), code: "201800177", title: "Deep Learning – From Theory to Practice", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 2 }] },
  { id: cid("Architectures of Information Systems"), code: "192320111", title: "Architectures of Information Systems", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 2 }] },
  { id: cid("Probabilistic programming"), code: "201700081", title: "Probabilistic Programming", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 3 }] },
  { id: cid("Multimodal Machine Learning"), code: "202500374", title: "Multimodal Machine Learning", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 3 }] },
  { id: cid("Foundation Models"), code: "202500375", title: "Foundation Models", ec: 5, duration: 1, type: "advanced", given: [{ year: 1, q: 4 }] },
  { id: cid("Ontology-Driven Conceptual Modeling"), code: "202100291", title: "Ontology-Driven Conceptual Modeling", ec: 5, duration: 1, type: "advanced", given: [{ year: 2, q: 4 }] },
];

// A small set of profiling/elective suggestions (you can extend freely)
export const ELECTIVES: Course[] = [
  // Profile (a) - Data Specialist
  { id: cid("Advanced Information Retrieval"), code: "201600083", title: "Advanced Information Retrieval", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist"], given: [{ year: 1, q: 2 }] },
  { id: cid("Advanced Natural Language Processing"), code: "201600081", title: "Advanced Natural Language Processing", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist"], given: [{ year: 1, q: 2 }] },
  { id: cid("Speech Processing"), code: "202500280", title: "Speech Processing", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist"], given: [{ year: 1, q: 2 }] },
  { id: cid("Advanced Speech processing"), code: "201600082", title: "Advanced Speech Processing", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist"], given: [{ year: 2, q: 3 }] },
  { id: cid("Advanced Computer Vision and Pattern Recognition"), code: "201100254", title: "Advanced Computer Vision and Pattern Recognition", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist"], given: [{ year: 2, q: 4 }] },
  
  // Profile (a,b) - Data Specialist + Smart Services
  { id: cid("Internet of Things"), code: "201700075", title: "Internet of Things", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services"], given: [{ year: 1, q: 1 }] },
  { id: cid("Linked Data and Semantic Web"), code: "202100263", title: "Linked Data & Semantic Web", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services"], given: [{ year: 2, q: 3 }] },
  { id: cid("Privacy-Enhancing Technologies"), code: "202300046", title: "Privacy-Enhancing Technologies", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services"], given: [{ year: 1, q: 2 }] },
  
  // Profile (a,b,c,d,e) - All profiles
  { id: cid("Research Experiments in Databases and Information Retrieval (REDI)"), code: "201300074", title: "Research Experiments in Databases and Information Retrieval (REDI)", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services", "algorithms", "multi-disciplinary"], given: [{ year: 2, q: 4 }] },
  { id: cid("Empirical and Design Science Research in Information Systems"), code: "202000029", title: "Empirical and Design Science Research in Information Systems", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services", "algorithms", "multi-disciplinary"], given: [{ year: 2, q: 3 }] },
  { id: cid("Capita Selecta DST"), code: "202200251", title: "Capita Selecta DST", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services", "algorithms", "multi-disciplinary"] },
  
  // Profile (a,c) - Data Specialist + Algorithms
  { id: cid("Complex Networks"), code: "201800222", title: "Complex Networks", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "algorithms"], given: [{ year: 1, q: 1 }] },
  { id: cid("Introduction to Biometrics"), code: "201500040", title: "Introduction to Biometrics", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "algorithms"], given: [{ year: 1, q: 1 }] },
  { id: cid("Spatial Statistics"), code: "201700364", title: "Spatial Statistics", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "algorithms"], given: [{ year: 2, q: 4 }] },
  
  // Profile (a,d) - Data Specialist + Multi-disciplinary
  { id: cid("Data Science Additional Topics"), code: "202500301", title: "Data Science Additional Topics", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "multi-disciplinary"], given: [{ year: 1, q: 2 }, { year: 2, q: 3 }] },
  { id: cid("3D modelling for City Digital Twins based on geospatial information"), code: "201900060", title: "3D Modelling for City Digital Twins based on Geospatial Information", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "multi-disciplinary"], given: [{ year: 1, q: 2 }] },
  { id: cid("Advanced Techniques for Signal Analysis"), code: "193810020", title: "Advanced Techniques for Signal Analysis", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "multi-disciplinary"], given: [{ year: 2, q: 3 }] },
  
  // Profile (b) - Smart Services
  { id: cid("Enterprise Architecture"), code: "201400277", title: "Enterprise Architecture", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 1, q: 1 }] },
  { id: cid("Simulation"), code: "202300064", title: "Simulation", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 1, q: 1 }] },
  { id: cid("Enterprise Security"), code: "202000027", title: "Enterprise Security", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 1, q: 2 }] },
  { id: cid("Business Process Integration lab"), code: "192376500", title: "Business Process Integration Lab", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 1, q: 2 }] },
  { id: cid("Electronic Commerce"), code: "192320501", title: "Electronic Commerce", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 1, q: 2 }] },
  { id: cid("Information Services"), code: "201100051", title: "Information Services", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 2, q: 3 }] },
  { id: cid("Service-oriented Architecture Web Services"), code: "192652150", title: "Service-oriented Architecture Web Services", ec: 5, duration: 1, type: "elective", profiles: ["smart-services"], given: [{ year: 2, q: 3 }] },
  
  // Profile (b,d) - Smart Services + Multi-disciplinary
  { id: cid("Smart Industry"), code: "202000028", title: "Smart Industry", ec: 5, duration: 1, type: "elective", profiles: ["smart-services", "multi-disciplinary"], given: [{ year: 2, q: 4 }] },
  
  // Profile (c) - Algorithms
  { id: cid("Statistics and Probability"), code: "191506103", title: "Statistics and Probability", ec: 5, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 1, q: 1 }] },
  { id: cid("Modeling and Analysis of Concurrent Systems"), code: "192135310", title: "Modeling and Analysis of Concurrent Systems", ec: 5, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 1, q: 1 }] },
  { id: cid("Statistical Learning"), code: "201900115", title: "Statistical Learning", ec: 5, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 1, q: 1 }] },
  { id: cid("Signals with Information"), code: "202001281", title: "Signals with Information", ec: 5, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 1, q: 2 }] },
  { id: cid("Graph Theory"), code: "191520751", title: "Graph Theory", ec: 4, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 2, q: 3 }] },
  { id: cid("Advanced Logic"), code: "192111092", title: "Advanced Logic", ec: 5, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 2, q: 4 }] },
  { id: cid("Time Series Analysis"), code: "191571090", title: "Time Series Analysis", ec: 5, duration: 1, type: "elective", profiles: ["algorithms"], given: [{ year: 2, q: 4 }] },
  
  // Profile (c,d) - Algorithms + Multi-disciplinary
  { id: cid("Graphical Models and Causality"), code: "202100112", title: "Graphical Models and Causality", ec: 5, duration: 1, type: "elective", profiles: ["algorithms", "multi-disciplinary"] },
  
  // Profile (d) - Multi-disciplinary
  { id: cid("Advanced Discrete Event Simulation"), code: "201700196", title: "Advanced Discrete Event Simulation", ec: 5, duration: 1, type: "elective", profiles: ["multi-disciplinary"] },
  { id: cid("Sports Interaction Technology: Designing Interactive Systems for Sports"), code: "202001583", title: "Sports Interaction Technology: Designing Interactive Systems for Sports", ec: 5, duration: 1, type: "elective", profiles: ["multi-disciplinary"], given: [{ year: 2, q: 4 }] },
  { id: cid("Learning Analytics"), code: "202400120", title: "Learning Analytics", ec: 5, duration: 1, type: "elective", profiles: ["multi-disciplinary"], given: [{ year: 1, q: 2 }] },
  
  // Profile (a,b,c,d) - Multiple profiles
  { id: cid("Explainable AI"), code: "202300336", title: "Explainable AI", ec: 5, duration: 1, type: "elective", profiles: ["data-specialist", "smart-services", "algorithms", "multi-disciplinary"], given: [{ year: 2, q: 4 }] },
  
  // Profile (b,c,d) - Smart Services + Algorithms + Multi-disciplinary
  { id: cid("Green Software development"), title: "Green Software Development", ec: 5, duration: 1, type: "elective", profiles: ["smart-services", "algorithms", "multi-disciplinary"], given: [{ year: 1, q: 1 }] },
];

export const ALL_COURSES: Course[] = [...REQUIRED, ...ADVANCED, ...ELECTIVES];

import lighthouseImage from "../assets/about/header-lighthouse.png";
import betsson from "../assets/about/header-betsson.png";
import pokerstars from "../assets/about/header-pokerstars.png";

export const experienceData = [
  {
    id: "2",
    name: "Lighthouse",
    title: "Senior Software Engineer",
    projectImage: lighthouseImage, // Imported image module
    dates: "Feb 2023 – Feb 2025",
    // --- UPDATED: responsibilities is now an array ---
    responsibilities: [
      "Took end-to-end ownership of new feature development, from initial design and API proposals through deployment and post-launch monitoring (2-week sprint cycle).",
      "Engineered predictive pricing and analytics systems supporting over 70,000 hotel customers and 300,000 properties.",
      "Processed and analyzed massive datasets, handling 1.7 Billion daily price change events.",
      "Built interactive dashboards and custom data visualization components for data-driven pricing decisions, integrating historical data, AI-predicted trends, and real-time triggers.",
    ],
    // --- Existing keyFeatures array remains ---
    keyFeatures: [
      "Led the **TypeScript migration** from the legacy codebase, significantly improving type safety, IDE support, and overall code maintainability across the entire monolith.",
      "Architected and implemented the automated **visual regression testing pipeline** using Puppeteer, QUnit, and Mirage, drastically reducing production regressions and enhancing deployment confidence.",
    ],
  },
  {
    id: "3",
    name: "Betsson Group",
    title: "Software Engineer",
    projectImage: betsson,
    dates: "Oct 2020 – Jan 2023",
    // --- UPDATED: responsibilities is now an array ---
    responsibilities: [
      "Maintained and enhanced a multi-tenant iGaming platform serving 1.38 Million active users across 10+ international brands in regulated markets.",
      "Engineered a centralized time-handling component using Day.js to ensure timezone consistency and regional compliance across the distributed user base.",
    ],
    // --- Existing keyFeatures array remains ---
    keyFeatures: [
      "Optimized Terms & Conditions registration flow through UX refinement and progressive disclosure patterns, resulting in an **8% conversion rate improvement**.",
      "Developed responsible gaming UI compliance modules and white-label affiliate configuration systems meeting complex jurisdictional regulatory requirements.",
      "Contributed to the **Selenium-based UAT testing infrastructure**, establishing test structure, coverage standards, and CI integration.",
    ],
  },
  {
    id: "4",
    name: "PokerStars",
    title: "Gaming Operator & Tournament Coordinator",
    projectImage: pokerstars,
    dates: "Jan 2003 – Jul 2016",
    responsibilities: [
      "Managed high-volume tournament operations and gaming floor efficiency for major poker events over 13+ years.",
      "Coordinated table layouts and optimized staffing models to maximize throughput during peak tournament seasons.",
    ],
    keyFeatures: [
      "Forecasted table availability and optimized event layouts, **increasing daily tournament capacity by ~20%**.",
      "Reduced operational resource overhead by **15–25%** through staffing optimization and process refinement.",
    ],
  },
];
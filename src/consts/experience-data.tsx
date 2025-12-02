import lighthouseImage from "../assets/about/header-lighthouse.png";
import betsson from "../assets/about/header-betsson.png";
import pokerstars from "../assets/about/header-pokerstars.png";

export const experienceData = [
  // {
  //   id: "1",
  //   name: "Peach Nutrition",
  //   title: "Co-Founder & E-Commerce/Digital Marketing Lead",
  //   projectImage: "/src/assets/about/header-peach-tool.png",
  //   dates: "Feb 2024 – Present",
  //   responsibilities: "Architected and shipped custom Shopify storefront with hand-coded Liquid templates and responsive design (www.peach-nutrition.com) Implemented automated workflows for product updates, delivery tracking, and customer notifications—reducing manual operational overhead by ~80%",
  //   keyFeatures: [
  //     "Established GitHub Actions CI/CD pipeline ensuring secure, version-controlled deployments and rollback capabilities",
  //     "Managed access control and security governance across company infrastructure, tools, and credentials—demonstrating full-stack operational ownership",
  //     "Developed and executed video-led marketing campaigns and Facebook Ads strategies, optimizing messaging and audience targeting"
  //   ]
  // },
  {
    id: "2",
    name: "Lighthouse",
    title: "Senior Software Engineer",
    projectImage: lighthouseImage, // Imported image module
    dates: "Feb 2023 – Feb 2025",
    responsibilities:
      "Architected and maintained predictive pricing and analytics systems supporting 70,000+ hotel customers and 300,000+ properties, processing 1.7B daily price change events Built interactive dashboards and data visualization components enabling data-driven pricing decisions based on historical trends and real-time event triggers",
    keyFeatures: [
      "Led enterprise TypeScript migration from legacy codebase, improving type safety, IDE support, and code maintainability across 50K+ lines",
      "Designed and integrated automated visual regression testing pipeline using Puppeteer, QUnit, and Mirage—enhancing deployment confidence and reducing production regressions",
    ],
  },
  {
    id: "3",
    name: "Betsson Group",
    title: "Software Engineer",
    projectImage: betsson,
    dates: "Oct 2020 – Jan 2023",
    responsibilities:
      "Maintained and enhanced multi-tenant iGaming platform serving 1.38M active users across 10+ international brands in regulated markets. Engineered centralized time-handling component using dayjs, ensuring timezone consistency and regional compliance across distributed user base",
    keyFeatures: [
      "Optimized Terms & Conditions registration flow through UX refinement and progressive disclosure patterns, resulting in 8% conversion rate improvement—directly impacting user acquisition metrics",
      "Developed responsible gaming UI compliance modules and white-label affiliate configuration systems meeting regulatory requirements across jurisdictions",
      "Contributed to Selenium-based UAT testing infrastructure, establishing test structure, coverage standards, and CI integration",
    ],
  },
  {
    id: "4",
    name: "PokerStars",
    title: "Gaming Operator & Tournament Coordinator",
    projectImage: pokerstars,
    dates: "Jan 2003 – Jul 2016",
    responsibilities:
      "Managed tournament operations and gaming floor efficiency for high-volume poker events over 13+ years. Optimized table layouts and staffing models to maximize throughput during peak tournament seasons.",
    keyFeatures: [
      "Forecasted table availability and optimized event layouts, increasing daily tournament capacity by ~20%",
      "Reduced operational resource overhead by 15–25% through staffing optimization and process refinement",
    ],
  },
];

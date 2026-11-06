// Personal content for every portfolio page. Keep public contact preferences here.
export const siteConfig = {
  "websiteUrl": "",
  "identity": {
    "fullName": "Anurag Nayak",
    "displayName": "ANURAG",
    "profession": "Software Engineer / Backend & AI Developer",
    "roleLine2": "Java/Spring Boot services, AI evaluation systems, and cloud automation",
    "location": "India",
    "availability": "Open to software engineering internships and interesting projects",
    "headline": "BUILD THE THING. MAKE IT MATTER.",
    "intro": "Computer Science undergraduate building Java/Spring Boot services and AWS-hosted automation tools. Built a REST API supporting 1,000 requests/second and reduced manual model evaluation time by 60%.",
    "about": "I am pursuing a B.Tech in Computer Science (AI & Machine Learning) at Aditya University, with graduation expected in April 2028. My work spans backend services, asynchronous model evaluation, graph-based investigation tools, and on-device camera intelligence. I also serve as an OpenAI Campus Lead at Aditya University and have worked as an Unstop Campus Ambassador, helping students explore AI tools, hackathons, and career opportunities.",
    "portrait": "/hero-anurag-editorial.png",
    "portraitAlt": "AI-generated editorial portrait of Anurag Nayak, based on his own photo",
    "resume": "/Anurag-Nayak-Resume.pdf",
    "resumePreview": "/Anurag-Nayak-Resume.png",
    "favicon": "/brand-mark.svg",
    "heroGreeting": "Hello, I'm",
    "heroTopline": "SOFTWARE ENGINEER / BUILDER",
    "heroSpecialties": "BACKEND SYSTEMS · AI PRODUCTS",
    "heroRoleLines": [
      "SOFTWARE",
      "ENGINEER."
    ],
    "availabilityShort": "OPEN TO INTERNSHIPS",
    "heroIntro": "I build Java services and AI products that turn complex workflows into dependable, useful software."
  },
  "contact": {
    "email": "anu870906@gmail.com",
    "phone": "",
    "whatsapp": "",
    "instagram": "",
    "youtube": "",
    "linkedin": "https://www.linkedin.com/in/dark7462",
    "github": "https://github.com/dark7462",
    "behance": "",
    "dribbble": "",
    "otherLinks": []
  },
  "portfolio": {
    "projects": [
      {
        "id": "url-shortener",
        "category": "Backend",
        "role": "Backend developer",
        "summary": "A Spring Boot URL shortener with Redis caching, MongoDB persistence, redirects, and click analytics.",
        "coverImage": "/projects/url-shortener-concept.jpg",
        "sourceUrl": "https://github.com/dark7462/url-shortner",
        "liveUrl": "",
        "title": "URL Shortener API",
        "year": "",
        "description": "Built a Spring Boot REST API supporting 1,000 requests/second with Redis caching and MongoDB persistence. Reused URL mappings to prevent duplicates; implemented HTTP 308 redirects and click analytics. Throttled creation to 5 requests/minute/IP; checked collisions and returned 400/404/429/500 error responses.",
        "responsibilitiesAndOutcomes": [
          "Built a Spring Boot REST API supporting 1,000 requests/second with Redis caching and MongoDB persistence.",
          "Reused URL mappings to prevent duplicates; implemented HTTP 308 redirects and click analytics.",
          "Throttled creation to 5 requests/minute/IP; checked collisions and returned 400/404/429/500 error responses."
        ],
        "tools": [
          "Java",
          "Spring Boot",
          "MongoDB",
          "Redis",
          "Maven"
        ],
        "gallery": [],
        "videoUrl": "",
        "featured": true,
        "imageType": "AI-generated illustrative cover"
      },
      {
        "id": "vibebench",
        "category": "AI",
        "role": "Sole developer",
        "summary": "Automated AI coding-model evaluation through code generation, sandbox execution, and scoring.",
        "coverImage": "/projects/vibebench-concept.jpg",
        "sourceUrl": "https://github.com/dark7462/VibeBench",
        "liveUrl": "https://vibe-bench-six.vercel.app/",
        "title": "VibeBench",
        "year": "",
        "description": "Reduced manual model evaluation time by 60% by automating code generation and testing as the sole developer. Ran 2–8 minute asynchronous Docker jobs on AWS EC2 with CPU/RAM limits, HTTP 202, SSE logs, and cleanup. Scored 5 dimensions: accuracy 40%, quality 20%, realism 15%, security 15%, and cost/latency 10%. Enforced 3 validation gates, assigning a zero score to empty or failed benchmark runs.",
        "responsibilitiesAndOutcomes": [
          "Reduced manual model evaluation time by 60% by automating code generation and testing as the sole developer.",
          "Ran 2–8 minute asynchronous Docker jobs on AWS EC2 with CPU/RAM limits, HTTP 202, SSE logs, and cleanup.",
          "Scored 5 dimensions: accuracy 40%, quality 20%, realism 15%, security 15%, and cost/latency 10%.",
          "Enforced 3 validation gates, assigning a zero score to empty or failed benchmark runs."
        ],
        "tools": [
          "Python",
          "FastAPI",
          "Docker",
          "AWS EC2",
          "React",
          "SQLite"
        ],
        "gallery": [],
        "videoUrl": "",
        "featured": true,
        "imageType": "AI-generated illustrative cover"
      },
      {
        "id": "sherlock",
        "category": "AI",
        "role": "Team contributor - Spring Boot backend, case chat APIs, and JavaFX client",
        "summary": "A team-built evidence-analysis platform connecting case workflows to a Neo4j knowledge graph.",
        "coverImage": "",
        "sourceUrl": "https://github.com/dark7462/sherlock",
        "liveUrl": "",
        "title": "Sherlock",
        "year": "",
        "description": "Connected evidence in Neo4j graphs, contributing to the team’s 70% reduction in SRE investigation time. Developed the Spring Boot backend, case chat APIs, and JavaFX client for the team’s AI investigation platform. Linked case workflows to 168 entities and 222 relationships extracted by the team from a 100,000-word corpus. Collaborated on AI integration; team pipeline processed 500 KB in about 3 minutes; graph queries took 7–8 seconds.",
        "responsibilitiesAndOutcomes": [
          "Connected evidence in Neo4j graphs, contributing to the team’s 70% reduction in SRE investigation time.",
          "Developed the Spring Boot backend, case chat APIs, and JavaFX client for the team’s AI investigation platform.",
          "Linked case workflows to 168 entities and 222 relationships extracted by the team from a 100,000-word corpus.",
          "Collaborated on AI integration; team pipeline processed 500 KB in about 3 minutes; graph queries took 7–8 seconds."
        ],
        "tools": [
          "Java",
          "Spring Boot",
          "JavaFX",
          "Neo4j",
          "REST APIs"
        ],
        "gallery": [],
        "videoUrl": "",
        "featured": true,
        "imageType": ""
      },
      {
        "id": "gridcam",
        "category": "Android",
        "role": "Android and ML developer",
        "summary": "An Android camera app using on-device classification to suggest photography composition grids.",
        "coverImage": "/projects/gridcam-concept.jpg",
        "sourceUrl": "https://github.com/dark7462/GridCam",
        "liveUrl": "https://gridcam.app/",
        "title": "GridCam",
        "year": "",
        "description": "Implemented MobileNetV2 classification of 4 composition classes with 321 training and 91 test images. Exported the model to LiteRT; integrated CameraX preview, capture, and analysis with latest-frame backpressure. Scheduled inference every 1.5 seconds, displaying composition grids above a 60% confidence threshold.",
        "responsibilitiesAndOutcomes": [
          "Implemented MobileNetV2 classification of 4 composition classes with 321 training and 91 test images.",
          "Exported the model to LiteRT; integrated CameraX preview, capture, and analysis with latest-frame backpressure.",
          "Scheduled inference every 1.5 seconds, displaying composition grids above a 60% confidence threshold."
        ],
        "tools": [
          "Java",
          "CameraX",
          "TensorFlow/Keras",
          "MobileNetV2",
          "LiteRT"
        ],
        "gallery": [],
        "videoUrl": "",
        "featured": true,
        "imageType": "AI-generated illustrative cover"
      },
      {
        "id": "geoloanlens",
        "title": "GeoLoanLens",
        "category": "Web",
        "year": "2025",
        "summary": "A team-built loan-verification platform with AI features and geospatial tracking.",
        "description": "A team-built loan-verification platform with AI features and real-time geospatial tracking, developed for the Smart India Hackathon 2025 national grand finals.",
        "role": "Team contributor",
        "tools": [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Supabase",
          "PostgreSQL"
        ],
        "coverImage": "/projects/geoloanlens-concept.jpg",
        "imageType": "AI-generated illustrative cover",
        "gallery": [],
        "videoUrl": "",
        "liveUrl": "https://geoloanlens.vercel.app/",
        "sourceUrl": "https://github.com/dark7462/geoloanlens",
        "featured": false
      }
    ],
    "featuredProjectIds": [
      "url-shortener",
      "vibebench",
      "sherlock",
      "gridcam"
    ],
    "categories": [
      "Backend",
      "AI",
      "Android",
      "Web"
    ],
    "clientLogos": [],
    "processSteps": [
      {
        "number": "01",
        "title": "THE PROBLEM",
        "description": "Start with the real constraint and the person using the product."
      },
      {
        "number": "02",
        "title": "THE SYSTEM",
        "description": "Map the data, boundaries, and interactions before building."
      },
      {
        "number": "03",
        "title": "THE BUILD",
        "description": "Ship a working version and make each part earn its place."
      },
      {
        "number": "04",
        "title": "THE POLISH",
        "description": "Measure, simplify, and make the experience feel complete."
      }
    ],
    "skills": [
      {
        "category": "Languages",
        "items": [
          "Java",
          "Python",
          "C++",
          "SQL",
          "JavaScript"
        ]
      },
      {
        "category": "Backend",
        "items": [
          "Spring Boot",
          "Spring MVC",
          "Spring Data JPA",
          "Hibernate",
          "JDBC",
          "FastAPI",
          "Microservices"
        ]
      },
      {
        "category": "Web & Integration",
        "items": [
          "REST APIs",
          "SOAP",
          "WebSockets",
          "API design",
          "Asynchronous programming"
        ]
      },
      {
        "category": "AI/ML",
        "items": [
          "LLMs",
          "RAG",
          "LangChain",
          "LangGraph",
          "Prompt engineering",
          "PyTorch",
          "TensorFlow/Keras",
          "Hugging Face"
        ]
      },
      {
        "category": "Cloud & DevOps",
        "items": [
          "AWS EC2",
          "AWS S3",
          "AWS EKS",
          "Docker",
          "Kubernetes",
          "Terraform",
          "CI/CD",
          "Linux"
        ]
      },
      {
        "category": "Databases & Caching",
        "items": [
          "AWS DynamoDB",
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Redis",
          "Neo4j",
          "SQLite"
        ]
      },
      {
        "category": "Core CS",
        "items": [
          "Data structures & algorithms",
          "OOP",
          "DBMS",
          "Operating systems",
          "Computer networks"
        ]
      },
      {
        "category": "Engineering",
        "items": [
          "System design (HLD/LLD)",
          "Distributed systems",
          "Design patterns",
          "Unit testing (JUnit)",
          "Agile/Scrum"
        ]
      },
      {
        "category": "Frontend",
        "items": [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Supabase"
        ]
      }
    ],
    "tools": [
      "Git",
      "GitHub",
      "Maven",
      "Postman",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Linux",
      "AWS",
      "Hugging Face"
    ],
    "experience": [
      {
        "organization": "OpenAI",
        "role": "Campus Lead",
        "context": "Campus leadership at Aditya University",
        "location": "Aditya University, India",
        "startDate": "2026-09",
        "endDate": "",
        "current": true,
        "displayDates": "Sep 2026 - Present",
        "responsibilities": [
          "Trained 55+ students in AI tools, resume tailoring, and internship research at a campus workshop.",
          "Created a reusable resume-building skill and hosted a software engineer guest speaker."
        ]
      },
      {
        "organization": "Unstop",
        "role": "Campus Ambassador",
        "location": "",
        "startDate": "2025",
        "endDate": "2026",
        "current": false,
        "displayDates": "2025 - 2026",
        "responsibilities": [
          "Ranked among the Top 6 Campus Ambassadors for connecting students with hackathons and career opportunities.",
          "Earned Tata Group recognition for student outreach supporting the Tata Imagination Challenge."
        ]
      }
    ],
    "education": [
      {
        "institution": "Aditya University",
        "qualification": "B.Tech in Computer Science",
        "specialization": "AI & Machine Learning",
        "location": "Surampalem, India",
        "startDate": "2024-08",
        "endDate": "2028-04",
        "expectedGraduation": true,
        "displayDates": "Aug 2024 - Apr 2028 (Expected)",
        "cgpa": "8.07/10",
        "minor": "Cloud Infrastructure",
        "details": [
          "32-credit minor across 10 courses in Cisco, Red Hat, Oracle, AWS, and Microsoft technologies."
        ]
      }
    ],
    "awards": [
      {
        "title": "Google Big Code 2026",
        "result": "Ranked among the Top 100 participants.",
        "year": "2026",
        "proofUrl": ""
      },
      {
        "title": "OpenAI x Outskill",
        "result": "Placed in the Top 50 with a 78/100 score for independently developed VibeBench.",
        "year": "",
        "proofUrl": ""
      },
      {
        "title": "Smart India Hackathon 2025",
        "result": "Qualified as a National Grand Finalist with a loan-verification team.",
        "year": "2025",
        "proofUrl": ""
      },
      {
        "title": "GDG VIT Vellore",
        "result": "Secured a Top 10 national team finish by building Sherlock, an evidence-analysis platform.",
        "year": "",
        "proofUrl": ""
      },
      {
        "title": "CodeChef",
        "result": "Earned a 2-star rating in competitive programming contests.",
        "year": "",
        "proofUrl": ""
      }
    ],
    "testimonials": [],
    "metrics": [
      {
        "value": "1,000 req/s",
        "label": "URL Shortener API throughput",
        "projectId": "url-shortener",
        "heroValue": "1K",
        "heroLabel": "API REQUESTS / SECOND"
      },
      {
        "value": "60%",
        "label": "Reduction in manual model evaluation time",
        "projectId": "vibebench",
        "heroValue": "60%",
        "heroLabel": "LESS MANUAL EVALUATION"
      },
      {
        "value": "55+",
        "label": "Students trained at a campus AI workshop",
        "context": "OpenAI Campus Lead at Aditya University",
        "heroValue": "55+",
        "heroLabel": "STUDENTS TRAINED"
      }
    ]
  },
  "appearance": {
    "style": "cinematic minimal, premium, editorial, refined typography",
    "theme": "dark",
    "background": "#09090a",
    "text": "#f1efeb",
    "accent": "#e82045",
    "muted": "#9a9a9d",
    "displayFont": "Anton",
    "bodyFont": "Manrope",
    "accentFont": "Caveat",
    "animationIntensity": "expressive",
    "language": "English"
  },
  "preferences": {
    "showAwards": true,
    "showEducation": true,
    "showExperience": true,
    "showBeforeAfter": false,
    "showClientLogos": false,
    "showTestimonials": false,
    "showContactForm": true,
    "showDownloadResume": true,
    "showProjectArchive": true,
    "showPhone": false
  },
  "motion": {
    "mode": "Agents visibly place individual components on the full page",
    "trigger": "Scroll and Rebuild page control",
    "speedMultiplier": 1.5,
    "reverseOnScroll": true,
    "automaticScrolling": false,
    "reducedMotionShowsCompletedPage": true,
    "idleCursors": "Disperse to page edges and take the next component task"
  },
  "featuredTools": [
    "Java",
    "Spring Boot",
    "Python",
    "React",
    "PostgreSQL",
    "Docker"
  ],
  "featuredSystem": {
    "projectId": "vibebench",
    "eyebrow": "INSIDE THE BUILD / VIBEBENCH",
    "titleLines": [
      "FROM PROMPT.",
      "TO PROOF."
    ],
    "description": "VibeBench turns a model prompt into a repeatable evaluation. I built the generation, isolated execution, and scoring workflow as a solo project.",
    "stages": [
      {
        "number": "01",
        "title": "GENERATE",
        "text": "Submit a prompt and model for code generation."
      },
      {
        "number": "02",
        "title": "EXECUTE",
        "text": "Run asynchronous Docker jobs with CPU and memory limits on AWS EC2."
      },
      {
        "number": "03",
        "title": "EVALUATE",
        "text": "Score five dimensions, with validation gates for empty or failed runs."
      }
    ],
    "details": [
      "HTTP 202 + SSE LOGS",
      "2–8 MINUTE JOBS",
      "FIVE SCORING DIMENSIONS"
    ]
  }
};

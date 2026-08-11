export interface PortfolioCallout {
    category: string;
    title: string;
    subtitle: string;
    tags: string[];
    highlights: string[];
    impact: string;
    href?: string;
}

export interface PortfolioActionPanel {
    category: string;
    title: string;
    subtitle: string;
    highlights: string[];
    href: string;
    cta: string;
    download?: string;
}

export interface PortfolioMissionChapter {
    planet: string;
    section: string;
    title: string;
    subtitle: string;
    tags: string[];
    stackLabel?: string;
    impact: string;
    callouts: PortfolioCallout[];
    actionPanel?: PortfolioActionPanel;
}

export const PORTFOLIO_MISSION_DATA: PortfolioMissionChapter[] = [
    {
        planet: 'Sun',
        section: 'Profile',
        title: 'Koushik Mondal',
        subtitle: 'Senior React Engineer | Frontend Architect',
        stackLabel: 'Complete Stack',
        tags: [
            'TypeScript',
            'JavaScript',
            'React',
            'Next.js',
            'Tailwind CSS',
            'ShadCN UI',
            'Cesium JS',
            'Mapbox GL',
            'Node.js',
            'Express.js',
            'REST API',
            'GraphQL',
            'WebSocket',
            'Redux',
            'Zustand',
            'TanStack Query',
            'Apache ECharts',
            'Azure DevOps',
            'GitHub Actions',
            'Git'
        ],
        impact: '3.5 years of experience designing scalable React & Next.js applications, satellite simulation architectures, and telemetry dashboards.',
        callouts: [
            {
                category: 'Identity',
                title: 'Senior React Engineer & Architect',
                subtitle: 'Specializing in frontend architecture, reusable component systems & performance optimization',
                tags: ['3.5 Yrs Exp', 'Next.js App Router', 'Clean Architecture'],
                highlights: [
                    'Proven experience establishing production frontend projects from scratch using Next.js App Router.',
                    'Recipient of Performance Optimization Award & Ownership Award for end-to-end feature leadership.'
                ],
                impact: 'Delivers maintainable, high-performance web applications built for scale.'
            },
            {
                category: 'Current Base',
                title: 'Pune, MH, India',
                subtitle: 'Open to Relocation | Software Engineer with production product teams',
                tags: ['Pune', 'Open to Relocate', 'Full Ownership'],
                highlights: [
                    'Builds reusable component libraries & scalable frontend infrastructure.',
                    'Independent ownership from technical planning to production CI/CD deployment.'
                ],
                impact: 'Strong fit for high-impact product teams building complex web applications.'
            },
            {
                category: 'Contact Signal',
                title: 'koushikm718@gmail.com',
                subtitle: 'Phone: +91 7003885674 | Pune, India',
                tags: ['Email', 'LinkedIn', 'GitHub'],
                highlights: [
                    'LinkedIn: linkedin.com/in/koushik-mondal-0a299723b',
                    'GitHub: github.com/flyingheart1997'
                ],
                impact: 'Direct signal for senior engineering roles, architecture leads & frontend consulting.',
                href: 'mailto:koushikm718@gmail.com'
            }
        ]
    },
    {
        planet: 'Mercury',
        section: 'Frontend',
        title: 'Frontend Engineering',
        subtitle: 'React.js, Next.js App Router, TypeScript, and Reusable UI Systems',
        tags: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'ShadCN UI'],
        impact: 'Establishes component-driven architectures, code splitting, and high-performance UI systems.',
        callouts: [
            {
                category: 'Core Stack',
                title: 'React.js & Next.js App Router',
                subtitle: 'Production application interfaces with modular typed architecture',
                tags: ['React.js', 'Next.js', 'TypeScript'],
                highlights: [
                    'Architects scalable frontend applications from scratch using Next.js App Router & TypeScript.',
                    'Enforces strict typing, code splitting, lazy loading, and SSR optimization.'
                ],
                impact: 'Creates robust frontend foundations that scale cleanly over product lifecycle.'
            },
            {
                category: 'UI Systems',
                title: 'Reusable Component Libraries',
                subtitle: 'Tailwind CSS, ShadCN UI & Modular Design Systems',
                tags: ['18+ Components', 'Tailwind CSS', 'ShadCN UI'],
                highlights: [
                    'Designed reusable component architecture consisting of 18+ shared React components.',
                    'Improves developer productivity and maintains consistent product design system across workflows.'
                ],
                impact: 'Dramatically speeds up feature delivery across multi-screen enterprise applications.'
            },
            {
                category: 'State + Performance',
                title: 'State Management & Optimization',
                subtitle: 'Zustand, Redux, Context API, and TanStack Query',
                tags: ['Zustand', 'TanStack Query', 'Redux', 'Performance'],
                highlights: [
                    'Implements scalable state management patterns tailored to application complexity.',
                    'Won Performance Optimization Award for application speed & rendering optimizations.'
                ],
                impact: 'Keeps dense data screens smooth, responsive, and light on memory usage.'
            }
        ]
    },
    {
        planet: 'Venus',
        section: 'Backend',
        title: 'Backend & APIs',
        subtitle: 'API integration, telemetry services, and reliable data flow',
        tags: ['REST APIs', 'GraphQL', 'Node.js', 'Express.js', 'TanStack Query', 'Apache ECharts'],
        impact: 'Connects modern frontend UIs with clean API services, telemetry pipelines, and efficient data handling.',
        callouts: [
            {
                category: 'API Integration',
                title: 'REST & GraphQL Workflows',
                subtitle: 'Clean API integration patterns using TanStack Query',
                tags: ['REST API', 'GraphQL', 'TanStack Query'],
                highlights: [
                    'Integrated 7 backend APIs seamlessly across 50+ telemetry panels.',
                    'Keeps data fetching, caching, and state synchronization predictable and resilient.'
                ],
                impact: 'Reduces UI data loading overhead and prevents redundant network requests.'
            },
            {
                category: 'Telemetry Data',
                title: 'Grafana to Apache ECharts Migration',
                subtitle: 'High-density telemetry dashboard engineering',
                tags: ['ECharts', 'Grafana Migration', 'Telemetry'],
                highlights: [
                    'Led migration of satellite telemetry dashboards from Grafana to custom Apache ECharts.',
                    'Delivered real-time telemetry panels for satellite simulation metrics.'
                ],
                impact: 'Significantly enhanced dashboard customization, load speed, and user interactivity.'
            },
            {
                category: 'Backend Node Services',
                title: 'Node.js & Express APIs',
                subtitle: 'Lightweight backend endpoints & API services',
                tags: ['Node.js', 'Express.js', 'API Design'],
                highlights: [
                    'Develops utility microservices and REST endpoints in Node.js & Express.',
                    'Works across full-stack boundaries to ensure smooth client-server data flow.'
                ],
                impact: 'Ensures frontend engineers and backend teams maintain strict contract alignment.'
            }
        ]
    },
    {
        planet: 'Earth',
        section: 'Experience',
        title: 'Work Experience',
        subtitle: 'Antaris Space India & Geminus Tech Pvt. Ltd.',
        tags: ['Antaris Space', 'Geminus Tech', 'Frontend Architecture', 'Azure DevOps'],
        impact: '3.5 years of continuous engineering impact across space-tech simulations and enterprise web portals.',
        callouts: [
            {
                category: 'Antaris Space',
                title: 'Software Engineer — Antaris Space',
                subtitle: 'Feb 2023 – Present | Pune, India',
                tags: ['Satellite Simulation', 'Next.js App Router', 'CesiumJS', 'ECharts'],
                highlights: [
                    'Established frontend foundation architecture for Antaris V2 using Next.js App Router & TypeScript.',
                    'Independently owned 15–20 enterprise application screens for satellite simulation and mission planning.',
                    'Built 18+ shared React components used across multiple simulation workflows.',
                    'Led Grafana to Apache ECharts telemetry migration (7 backend APIs across 50+ panels).'
                ],
                impact: 'Established the core web architecture for next-gen satellite simulation platforms.'
            },
            {
                category: 'Geminus Tech',
                title: 'Software Engineer — Geminus Tech',
                subtitle: 'Nov 2022 – Present | Pune, India',
                tags: ['Corporate Portal', 'React.js', 'Next.js', 'Agile'],
                highlights: [
                    'Built company corporate portal from scratch in collaboration with UX team using React & Next.js.',
                    'Designed reusable frontend components following scalable architecture principles.',
                    'Collaborated within Agile teams using Azure DevOps development workflows.'
                ],
                impact: 'Delivered highly responsive corporate identity and scalable web systems.',
                href: 'https://www.geminustech.com/'
            },
            {
                category: 'Recognition',
                title: 'Engineering Awards',
                subtitle: 'Recognized for Technical Leadership & Performance',
                tags: ['Performance Award', 'Ownership Award'],
                highlights: [
                    '🏆 Performance Optimization Award: Recognized for delivering optimized implementations & speed.',
                    '🏆 Ownership Award: Recognized for independently leading complex feature implementation end-to-end.'
                ],
                impact: 'Demonstrated technical excellence and strong ownership mindset.'
            }
        ]
    },
    {
        planet: 'Mars',
        section: 'Project',
        title: 'Satellite Simulation Platform',
        subtitle: 'Antaris V2 satellite design, mission planning & 3D orbital tracking',
        tags: ['Satellite Simulation', 'CesiumJS', 'Mission Planning', 'Apache ECharts'],
        impact: 'Built 15-20 enterprise screens enabling complete satellite lifecycle simulation & telemetry monitoring.',
        callouts: [
            {
                category: 'Configuration',
                title: 'Satellite Design & Builder UI',
                subtitle: 'Payload, bus, and edge system configuration',
                tags: ['Payload Builder', 'Bus Config', 'Mission Planning'],
                highlights: [
                    'Independently owned 15–20 application screens for satellite payload, bus, and component setup.',
                    'Created intuitive workflows for orbital mission planning and satellite parameters.'
                ],
                impact: 'Transforms complex aerospace parameter configuration into streamlined visual workflows.'
            },
            {
                category: 'Telemetry',
                title: '50+ Telemetry Panels',
                subtitle: 'Custom ECharts dashboards integrated with 7 backend APIs',
                tags: ['Apache ECharts', 'Realtime Telemetry', '7 APIs'],
                highlights: [
                    'Migrated telemetry dashboards from Grafana to reusable Apache ECharts.',
                    'Displays live thermal, power, altitude, and payload telemetry metrics.'
                ],
                impact: 'Provides satellite operators real-time visual insights during simulation runs.'
            },
            {
                category: '3D Orbiting',
                title: 'CesiumJS 3D Earth Globe',
                subtitle: 'Real-time 3D satellite propagation & orbit visualizer',
                tags: ['CesiumJS', '3D Orbit Tracks', 'Geospatial'],
                highlights: [
                    'Developed 3D satellite trajectory visualization workflows using CesiumJS.',
                    'Displays orbital ground tracks, coverage cones, and satellite pass predictions.'
                ],
                impact: 'Delivers high-precision spatial context for satellite mission operators.'
            }
        ]
    },
    {
        planet: 'Jupiter',
        section: 'Project',
        title: 'World Monitor & Geospatial UI',
        subtitle: 'Global intelligence monitoring platform with Mapbox GL & CesiumJS',
        tags: ['Geospatial', 'Mapbox GL', 'CesiumJS', 'Realtime Data', 'Layer Control'],
        impact: 'Engineered real-time geospatial visualization interfaces for processing dense map-based layers.',
        callouts: [
            {
                category: 'Geospatial UI',
                title: 'Mapbox GL & Cesium Integration',
                subtitle: 'Map-first interactive visual monitoring platform',
                tags: ['Mapbox GL', 'CesiumJS', 'Map Layers'],
                highlights: [
                    'Integrated Mapbox GL and CesiumJS for high-performance map rendering.',
                    'Designed dynamic layer controls for toggleable geospatial intelligence data.'
                ],
                impact: 'Turns high-density geographical datasets into clear visual insights.'
            },
            {
                category: 'Performance',
                title: 'High-Density Data Rendering',
                subtitle: 'Optimized vector tiles & interactive map states',
                tags: ['Vector Tiles', 'Performance', 'Clean Code'],
                highlights: [
                    'Applied code splitting and memoization to keep map renders smooth at 60 FPS.',
                    'Optimized memory consumption during real-time data streaming.'
                ],
                impact: 'Maintains buttery smooth interaction even with thousands of map entities.'
            },
            {
                category: 'Architecture',
                title: 'Component-Driven Map UI',
                subtitle: 'Modular controls, legends, and spatial toolbars',
                tags: ['React Components', 'Modular Architecture'],
                highlights: [
                    'Built reusable map toolbar components, view switches, and coordinate inspect panels.',
                    'Followed component-driven architecture for rapid UI expansion.'
                ],
                impact: 'Ensures geospatial products can add new data layers with zero refactoring.'
            }
        ]
    },
    {
        planet: 'Saturn',
        section: 'Web Systems',
        title: 'Enterprise Websites & Portals',
        subtitle: 'Production web platforms for Geminus Tech & API Securist',
        tags: ['Next.js', 'React.js', 'Corporate Website', 'API Securist', 'ShadCN UI'],
        impact: 'Delivered production corporate websites from scratch with responsive, high-performance UIs.',
        callouts: [
            {
                category: 'Geminus Tech',
                title: 'Corporate Website Engineering',
                subtitle: 'Full corporate web portal built from scratch',
                tags: ['React.js', 'Next.js', 'Corporate Web'],
                highlights: [
                    'Built Geminus Tech corporate website from scratch in collaboration with the UX team.',
                    'Implemented responsive design, SEO optimization, and clean page layouts.'
                ],
                impact: 'Establishes strong web presence and showcase for Geminus Tech.',
                href: 'https://www.geminustech.com/'
            },
            {
                category: 'API Securist',
                title: 'API Securist Product Site',
                subtitle: 'Modern security product web interface',
                tags: ['Security Product', 'Modern UI', 'Responsive'],
                highlights: [
                    'Engineered the official product website for API Securist.',
                    'Implemented polished visual sections, product feature showcases, and lead flows.'
                ],
                impact: 'Communicates technical API security features with extreme visual clarity.',
                href: 'https://apisecurist.com/'
            },
            {
                category: 'Standards',
                title: 'Clean Architecture & CI/CD',
                subtitle: 'Azure DevOps & GitHub Actions workflows',
                tags: ['Azure DevOps', 'GitHub Actions', 'Code Reviews'],
                highlights: [
                    'Conducted regular code reviews promoting clean architecture and reusable patterns.',
                    'Contributed to Azure DevOps CI/CD pipelines and GitHub Actions workflows.'
                ],
                impact: 'Guarantees reliable, automated production deployments.'
            }
        ]
    },
    {
        planet: 'Uranus',
        section: 'Tools',
        title: 'Core Technologies & Toolkit',
        subtitle: 'Full spectrum of modern frontend, backend, visualization & DevOps tools',
        tags: ['React.js', 'Next.js', 'TypeScript', 'CesiumJS', 'ECharts', 'TanStack Query', 'Azure DevOps'],
        impact: 'Combines technical versatility with strong ownership and architecture standards.',
        callouts: [
            {
                category: 'Frontend & Arch',
                title: 'Frontend & Architecture',
                subtitle: 'React.js, Next.js, TypeScript, App Router, SSR, Tailwind CSS',
                tags: ['React', 'Next.js', 'TypeScript', 'ShadCN UI'],
                highlights: [
                    'Expertise in App Router, SSR, Code Splitting, Lazy Loading & Clean Architecture.',
                    'Mastery over Tailwind CSS, ShadCN UI, and modern styling libraries.'
                ],
                impact: 'Builds maintainable frontend foundations that last.'
            },
            {
                category: 'Visualization',
                title: 'Visualization & State',
                subtitle: 'Apache ECharts, CesiumJS, Mapbox GL, TanStack Query, Zustand',
                tags: ['Apache ECharts', 'CesiumJS', 'Mapbox GL', 'Zustand'],
                highlights: [
                    'Deep domain experience in geospatial visualizers & telemetry charts.',
                    'Mastery of asynchronous state management with TanStack Query.'
                ],
                impact: 'Delivers wowed visual experiences for complex data products.'
            },
            {
                category: 'DevOps & Backend',
                title: 'Backend & CI/CD Pipelines',
                subtitle: 'REST, GraphQL, Node.js, Express.js, Azure DevOps, GitHub Actions, Git',
                tags: ['REST', 'GraphQL', 'Node.js', 'Azure DevOps', 'Git'],
                highlights: [
                    'Experienced with Azure DevOps CI/CD, GitHub Actions, and Git version control.',
                    'Strong ownership mindset with proven track record of leading features independently.'
                ],
                impact: 'Ensures fast, reliable delivery from development to production deployment.'
            }
        ]
    },
    {
        planet: 'Neptune',
        section: 'Contact',
        title: 'Connect & Hire',
        subtitle: 'Available for Senior React Engineer & Frontend Architect roles',
        tags: ['Open to Work', 'Pune / Relocate', 'Senior React Engineer'],
        impact: 'Ready to build high-impact, scalable frontend architectures and interactive products.',
        actionPanel: {
            category: 'Resume PDF',
            title: 'Koushik Mondal Resume',
            subtitle: 'Download Koushik Mondal\'s latest resume',
            highlights: [
                'Latest updated resume (Senior React Engineer / Frontend Architect).',
                'Covers 3.5+ years experience, Antaris Space, Geminus Tech, awards & technical skills.'
            ],
            href: '/Koushik_Mondal_Senior_React_Engineer_Resume.pdf',
            cta: 'Download Resume PDF',
            download: 'Koushik_Mondal_Senior_React_Engineer_Resume.pdf'
        },
        callouts: [
            {
                category: 'Email',
                title: 'koushikm718@gmail.com',
                subtitle: 'Primary contact channel | Phone: +91 7003885674',
                tags: ['Email Direct', 'Fast Response'],
                highlights: [
                    'Email: koushikm718@gmail.com',
                    'Phone: +91 7003885674 (Pune, MH, India — Open to Relocation)'
                ],
                impact: 'Best channel for hiring, role opportunities, and project inquiries.',
                href: 'mailto:koushikm718@gmail.com'
            },
            {
                category: 'LinkedIn',
                title: 'Koushik Mondal on LinkedIn',
                subtitle: 'linkedin.com/in/koushik-mondal-0a299723b',
                tags: ['LinkedIn Profile', 'Professional Network'],
                highlights: [
                    'View detailed work history, endorsements, and project accomplishments.',
                    'Connect directly on LinkedIn for professional opportunities.'
                ],
                impact: 'Direct social proof and professional work background.',
                href: 'https://www.linkedin.com/in/koushik-mondal-0a299723b/'
            },
            {
                category: 'GitHub',
                title: 'flyingheart1997 on GitHub',
                subtitle: 'github.com/flyingheart1997',
                tags: ['GitHub Repos', 'Open Source'],
                highlights: [
                    'Explore code repositories, open source experiments, and portfolio source.',
                    'Demonstrates clean coding standards and passion for continuous learning.'
                ],
                impact: 'Public code verification of engineering craft.',
                href: 'https://github.com/flyingheart1997'
            }
        ]
    }
];


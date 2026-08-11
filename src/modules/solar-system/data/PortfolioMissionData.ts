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
        subtitle: 'Frontend Engineer | React.js | Next.js | TypeScript | Frontend Architecture | Performance Optimization | Enterprise Web Applications',
        stackLabel: 'Complete Stack',
        tags: [
            'TypeScript',
            'JavaScript',
            'React',
            'Next.js',
            'Tailwind CSS',
            'ShadCN UI',
            'CesiumJS',
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
        impact: '3.5 years of experience designing scalable React & Next.js applications, satellite simulation architectures, and high-density telemetry dashboards.',
        callouts: [
            {
                category: 'Identity',
                title: 'Senior React Engineer & Architect',
                subtitle: 'Specializing in frontend architecture, reusable component systems & performance optimization',
                tags: [],
                highlights: [
                    'Proven track record establishing production frontend projects from scratch using Next.js App Router.',
                    'Honored with Performance Optimization Award and Ownership Award for end-to-end feature leadership.'
                ],
                impact: 'Delivers maintainable, high-performance web applications built for enterprise scale.'
            },
            {
                category: 'Location & Mobility',
                title: 'Pune, MH, India',
                subtitle: 'Open to Relocation & Senior Engineering roles',
                tags: [],
                highlights: [
                    'Experienced building reusable component libraries and scalable frontend infrastructure.',
                    'Full ownership mindset from technical planning to production CI/CD deployment.'
                ],
                impact: 'Strong technical lead for high-impact product teams building complex web applications.'
            },
            {
                category: 'Direct Signal',
                title: 'koushikm718@gmail.com',
                subtitle: 'Phone: +91 7003885674 | Pune, India',
                tags: [],
                highlights: [
                    'LinkedIn: linkedin.com/in/koushik-mondal-0a299723b',
                    'GitHub: github.com/flyingheart1997'
                ],
                impact: 'Direct channel for senior engineering roles, architecture leads, and technical consulting.',
                href: 'mailto:koushikm718@gmail.com'
            }
        ]
    },
    {
        planet: 'Mercury',
        section: 'Frontend Architecture',
        title: 'Frontend Architecture & Systems',
        subtitle: 'Next.js App Router, TypeScript, Component Libraries & Performance',
        tags: [
            'Next.js App Router',
            'TypeScript',
            'React.js',
            'Tailwind CSS',
            'ShadCN UI',
            'Zustand',
            'TanStack Query',
            'SSR & Code Splitting'
        ],
        impact: 'Establishes component-driven architectures, modular typing, and high-performance UI foundations.',
        callouts: [
            {
                category: 'Foundation',
                title: 'Next.js App Router & TypeScript',
                subtitle: 'Production infrastructure with strict typing and SSR optimization',
                tags: [],
                highlights: [
                    'Architects scalable frontend applications from scratch using Next.js App Router & TypeScript.',
                    'Enforces strict typing, code splitting, lazy loading, and server-side rendering optimization.'
                ],
                impact: 'Creates robust frontend foundations that scale cleanly over product lifecycles.'
            },
            {
                category: 'Design Systems',
                title: 'Reusable Component Libraries',
                subtitle: 'Tailwind CSS, ShadCN UI & Modular Design Systems',
                tags: [],
                highlights: [
                    'Designed reusable component architecture consisting of 18+ shared React components.',
                    'Improves developer velocity and maintains consistent product design systems across team workflows.'
                ],
                impact: 'Dramatically speeds up feature delivery across multi-screen enterprise applications.'
            },
            {
                category: 'State & Speed',
                title: 'State Management & Optimization',
                subtitle: 'Zustand, Redux, Context API, and TanStack Query',
                tags: [],
                highlights: [
                    'Implements scalable state management patterns tailored to application complexity.',
                    'Awarded Performance Optimization Award for rendering speed and application memory tuning.'
                ],
                impact: 'Keeps dense data screens smooth, responsive, and light on client memory.'
            }
        ]
    },
    {
        planet: 'Venus',
        section: 'Data & Telemetry',
        title: 'Telemetry & Data Systems',
        subtitle: 'Apache ECharts, Satellite Telemetry, REST & GraphQL Services',
        tags: [
            'Apache ECharts',
            'Satellite Telemetry',
            'REST APIs',
            'GraphQL',
            'Node.js',
            'Express.js',
            'TanStack Query'
        ],
        impact: 'Connects modern frontend UIs with clean API services, telemetry pipelines, and efficient data handling.',
        callouts: [
            {
                category: 'Dashboard Migration',
                title: 'Grafana to Apache ECharts Migration',
                subtitle: 'High-density telemetry dashboard engineering',
                tags: [],
                highlights: [
                    'Led migration of satellite telemetry dashboards from Grafana to custom Apache ECharts.',
                    'Delivered real-time telemetry panels monitoring live satellite simulation metrics.'
                ],
                impact: 'Significantly enhanced dashboard customization, render speed, and user interactivity.'
            },
            {
                category: 'API Integration',
                title: 'REST & GraphQL Data Pipelines',
                subtitle: 'Integrated 7 backend APIs across 50+ telemetry panels',
                tags: [],
                highlights: [
                    'Seamlessly integrated 7 backend APIs across 50+ telemetry dashboards using TanStack Query.',
                    'Keeps data fetching, caching, and state synchronization predictable and resilient.'
                ],
                impact: 'Reduces UI data loading overhead and eliminates redundant network requests.'
            },
            {
                category: 'Node Microservices',
                title: 'Node.js & Express Endpoints',
                subtitle: 'Lightweight backend endpoints & client-server contract alignment',
                tags: [],
                highlights: [
                    'Develops utility microservices and REST endpoints using Node.js & Express.',
                    'Works across full-stack boundaries to ensure smooth client-server data flow.'
                ],
                impact: 'Guarantees seamless frontend-backend API contract alignment.'
            }
        ]
    },
    {
        planet: 'Earth',
        section: 'Experience',
        title: 'Professional Work Experience',
        subtitle: 'Antaris Space India & Geminus Tech Pvt. Ltd.',
        tags: [
            'Antaris Space (Feb 2023 - Present)',
            'Geminus Tech (Nov 2022 - Present)',
            '3.5 Yrs Experience',
            'Azure DevOps',
            'Agile Workflows'
        ],
        impact: '3.5 years of continuous engineering impact across space-tech simulations and enterprise web portals.',
        callouts: [
            {
                category: 'Antaris Space',
                title: 'Software Engineer — Antaris Space',
                subtitle: 'Feb 2023 – Present | Pune, India',
                tags: [],
                highlights: [
                    'Established frontend foundation architecture for Antaris using Next.js App Router & TypeScript.',
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
                tags: [],
                highlights: [
                    'Built company corporate portal from scratch in collaboration with UX team using React & Next.js.',
                    'Designed reusable frontend components following scalable architecture principles.',
                    'Collaborated within Agile teams using Azure DevOps development workflows.'
                ],
                impact: 'Delivered highly responsive corporate identity and scalable web systems.',
                href: 'https://www.geminustech.com/'
            },
            {
                category: 'Awards',
                title: 'Engineering Recognition',
                subtitle: 'Recognized for Technical Leadership & Performance Excellence',
                tags: [],
                highlights: [
                    '🏆 Performance Optimization Award: Recognized for delivering optimized implementations & speed.',
                    '🏆 Ownership Award: Recognized for independently leading complex feature implementation end-to-end.'
                ],
                impact: 'Demonstrated technical excellence and strong product ownership mindset.'
            }
        ]
    },
    {
        planet: 'Mars',
        section: 'Featured Project',
        title: 'Satellite Simulation Platform',
        subtitle: 'Antaris satellite design, mission planning & 3D orbital tracking',
        tags: [
            'Next.js App Router',
            'CesiumJS 3D',
            'Apache ECharts',
            'Payload Builder',
            'Bus Configurator',
            'Mission Planning'
        ],
        impact: 'Built 15-20 enterprise screens enabling complete satellite lifecycle simulation & telemetry monitoring.',
        callouts: [
            {
                category: 'UI Engineering',
                title: 'Satellite Design & Builder UI',
                subtitle: 'Payload, bus, and edge system configuration',
                tags: [],
                highlights: [
                    'Independently owned 15–20 application screens for satellite payload, bus, and component setup.',
                    'Created intuitive visual workflows for orbital mission planning and satellite parameters.'
                ],
                impact: 'Transforms complex aerospace parameter configuration into streamlined visual workflows.'
            },
            {
                category: 'Telemetry Systems',
                title: '50+ Live Telemetry Dashboards',
                subtitle: 'Custom Apache ECharts telemetry monitoring',
                tags: [],
                highlights: [
                    'Engineered custom ECharts dashboards monitoring live satellite telemetry metrics.',
                    'Displays real-time thermal, power, altitude, and payload simulation metrics.'
                ],
                impact: 'Provides satellite operators real-time visual insights during simulation runs.'
            },
            {
                category: '3D Orbiting',
                title: 'CesiumJS 3D Earth Globe',
                subtitle: 'Real-time 3D satellite propagation & orbit visualizer',
                tags: [],
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
        section: 'Featured Project',
        title: 'World Monitor & Satellite Orbit Tracker',
        subtitle: 'Interactive global monitoring platform combining satellite orbit tracking with real-time geospatial intelligence',
        tags: [
            'Next.js',
            'React.js',
            'CesiumJS',
            'Mapbox GL',
            'Satellite Propagation',
            'Geospatial UI',
            'Tailwind CSS'
        ],
        impact: 'Combines a World Monitor–inspired monitoring dashboard with a dedicated 3D satellite simulation module for tracking active satellites around Earth.',
        callouts: [
            {
                category: 'Sentinel Core',
                title: 'Sentinel Live Web Platform',
                subtitle: 'Real-time world monitoring & satellite orbit visualizer',
                tags: [],
                highlights: [
                    'Built Sentinel, a modern web platform integrating real-time geospatial monitoring with interactive 3D satellite orbit tracking.',
                    'Features dedicated simulation modules for tracking active satellites orbiting Earth in real-time.'
                ],
                impact: 'Delivers an interactive, high-precision visual monitoring experience accessible on web.',
                href: 'https://sentinel-beige-gamma.vercel.app/'
            },
            {
                category: 'Geospatial & 3D',
                title: 'Mapbox GL & CesiumJS Integration',
                subtitle: 'High-performance 3D orbit propagation & map visualization',
                tags: [],
                highlights: [
                    'Integrated Mapbox GL & CesiumJS for rendering dense map layers and 3D satellite orbital trajectories.',
                    'Engineered dynamic layer controls and spatial inspect panels for live intelligence feeds.'
                ],
                impact: 'Renders complex spatial datasets and satellite orbital passes seamlessly at 60 FPS.'
            },
            {
                category: 'Architecture',
                title: 'Component-Driven Dashboard UI',
                subtitle: 'Modular controls, satellite telemetry views, and responsive layouts',
                tags: [],
                highlights: [
                    'Architected modular React component workflows for satellite tracking, view switching, and data controls.',
                    'Applied memoization and efficient state synchronization for real-time telemetry updates.'
                ],
                impact: 'Ensures smooth live data updates without UI lag or memory degradation.'
            }
        ]
    },
    {
        planet: 'Saturn',
        section: 'Products & Portals',
        title: 'Enterprise Web Platforms',
        subtitle: 'Geminus Tech Corporate Website & API Securist Product Site',
        tags: [
            'Next.js',
            'React.js',
            'ShadCN UI',
            'SEO Optimization',
            'Azure DevOps',
            'GitHub Actions'
        ],
        impact: 'Delivered production corporate websites from scratch with responsive, high-performance UIs.',
        callouts: [
            {
                category: 'Geminus Tech',
                title: 'Corporate Website',
                subtitle: 'Full corporate web portal built from scratch',
                tags: [],
                highlights: [
                    'Built Geminus Tech corporate website in collaboration with the UX team.',
                    'Implemented responsive design, SEO optimization, and clean page layouts.'
                ],
                impact: 'Establishes strong web presence and product showcase for Geminus Tech.',
                href: 'https://www.geminustech.com/'
            },
            {
                category: 'API Securist',
                title: 'API Securist Product Site',
                subtitle: 'Modern security product web interface',
                tags: [],
                highlights: [
                    'Engineered the official product website for API Securist.',
                    'Implemented polished visual sections, product feature showcases, and lead flows.'
                ],
                impact: 'Communicates technical API security features with extreme visual clarity.',
                href: 'https://apisecurist.com/'
            },
            {
                category: 'Engineering Standards',
                title: 'Clean Architecture & CI/CD',
                subtitle: 'Azure DevOps & GitHub Actions workflows',
                tags: [],
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
        section: 'Toolkit',
        title: 'Technical Skills Matrix',
        subtitle: 'Comprehensive overview of frontend, visualization & DevOps capabilities',
        tags: [
            'React / Next.js',
            'TypeScript',
            'CesiumJS / Mapbox GL',
            'Apache ECharts',
            'Zustand / TanStack Query',
            'Azure DevOps / CI/CD'
        ],
        impact: 'Combines technical versatility with strong ownership and architecture standards.',
        callouts: [
            {
                category: 'Core Frontend',
                title: 'Frontend & Architecture',
                subtitle: 'React.js, Next.js App Router, TypeScript, Tailwind CSS, ShadCN UI',
                tags: [],
                highlights: [
                    'Expertise in App Router, SSR, Code Splitting, Lazy Loading & Clean Architecture.',
                    'Mastery over Tailwind CSS, ShadCN UI, and modern styling libraries.'
                ],
                impact: 'Builds maintainable frontend foundations that last.'
            },
            {
                category: 'Data & State',
                title: 'Visualization & State',
                subtitle: 'Apache ECharts, CesiumJS, Mapbox GL, TanStack Query, Zustand',
                tags: [],
                highlights: [
                    'Deep domain experience in geospatial visualizers & telemetry charts.',
                    'Mastery of asynchronous state management with TanStack Query.'
                ],
                impact: 'Delivers wowed visual experiences for complex data products.'
            },
            {
                category: 'DevOps & Delivery',
                title: 'Backend & CI/CD Pipelines',
                subtitle: 'REST, GraphQL, Node.js, Express.js, Azure DevOps, GitHub Actions, Git',
                tags: [],
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
        tags: [
            'Senior React Engineer',
            'Frontend Architect',
            'Open to Relocation',
            'koushikm718@gmail.com'
        ],
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
                tags: [],
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
                tags: [],
                highlights: [
                    'View detailed work history, endorsements, and project accomplishments.',
                    'Connect directly on LinkedIn for professional opportunities.'
                ],
                impact: 'Direct social proof and professional work background.',
                href: 'https://www.linkedin.com/in/koushik-mondal-0a299723b/'
            },
            {
                category: 'GitHub',
                title: 'Koushik Mondal on GitHub',
                subtitle: 'github.com/flyingheart1997',
                tags: [],
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

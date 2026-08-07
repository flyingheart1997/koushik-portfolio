import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
        default: "Koushik Mondal | Senior React Engineer & Frontend Architect",
        template: "%s | Koushik Mondal"
    },
    description: "Portfolio of Koushik Mondal, Senior React Engineer & Frontend Architect specializing in scalable web systems, reusable component architectures, performance optimization, React, Next.js, and TypeScript.",
    applicationName: "Koushik Mondal Portfolio",
    authors: [{ name: "Koushik Mondal" }],
    creator: "Koushik Mondal",
    keywords: [
        "Koushik Mondal",
        "Senior React Engineer",
        "Frontend Architect",
        "Software Engineer",
        "React.js",
        "Next.js App Router",
        "TypeScript",
        "Reusable Component Libraries",
        "Performance Optimization",
        "TanStack Query",
        "Satellite Simulation UI",
        "Geospatial Visualization",
        "Apache ECharts"
    ],
    icons: {
        icon: [{ url: "/koushik.png", type: "image/png" }],
        apple: [{ url: "/koushik.png", type: "image/png" }]
    },
    openGraph: {
        title: "Koushik Mondal | Senior React Engineer & Frontend Architect",
        description: "Portfolio of Koushik Mondal — Senior React Engineer & Frontend Architect with 3.5+ years of experience building scalable enterprise frontend systems.",
        type: "website",
        locale: "en_IN",
        siteName: "Koushik Mondal Portfolio",
        images: [
            {
                url: "/koushik.png",
                width: 1200,
                height: 1200,
                alt: "Koushik Mondal"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Koushik Mondal | Senior React Engineer & Frontend Architect",
        description: "Senior React Engineer & Frontend Architect building high-performance web applications, reusable UI systems, and interactive platforms.",
        images: ["/koushik.png"]
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}

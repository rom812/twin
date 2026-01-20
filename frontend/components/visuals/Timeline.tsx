import React from 'react';

interface TimelineItem {
    id: string; // matches the highlight ID
    date: string;
    title: string;
    company: string;
    description: string;
}

// Hardcoded data for now, ideally this comes from backend or props
const careerHistory: TimelineItem[] = [
    {
        id: "senior_ai_engineer_google",
        date: "2024 - Present",
        title: "Senior AI Engineer",
        company: "Google",
        description: "Leading multi-agent system architecture."
    },
    {
        id: "ai_researcher_deepmind",
        date: "2021 - 2024",
        title: "AI Researcher",
        company: "DeepMind",
        description: "Focused on LLM alignment and safety."
    },
    {
        id: "software_engineer_microsoft",
        date: "2019 - 2021",
        title: "Software Engineer",
        company: "Microsoft",
        description: "Built scalable cloud services on Azure."
    },
    {
        id: "education_bgu",
        date: "2015 - 2019",
        title: "B.Sc Software Engineering",
        company: "Ben Gurion University",
        description: "Specialized in Intelligent Systems."
    }
];

interface TimelineProps {
    highlightId?: string;
}

export default function Timeline({ highlightId }: TimelineProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm h-full overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-700 mb-6">Experience Journey</h3>
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                {careerHistory.map((item) => {
                    const isHighlighted = highlightId && item.id.includes(highlightId);
                    return (
                        <div key={item.id} className={`mb-8 ml-6 relative transition-all duration-500 ${isHighlighted ? 'scale-105' : 'opacity-70 grayscale'}`}>
                            <span className={`absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${isHighlighted ? 'bg-blue-500' : 'bg-slate-200'}`}>
                                {isHighlighted && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
                            </span>
                            <div className={`p-4 rounded-lg border ${isHighlighted ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-slate-50 border-slate-100'}`}>
                                <span className="block mb-1 text-xs font-normal leading-none text-slate-400">{item.date}</span>
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">
                                    {item.title}
                                </h3>
                                <p className="mb-2 text-sm font-medium text-slate-600">{item.company}</p>
                                <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

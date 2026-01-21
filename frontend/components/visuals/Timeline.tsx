import React from 'react';

interface TimelineItem {
    id: string; // matches the highlight ID
    date: string;
    title: string;
    company: string;
    description: string;
}

// Real career history for Rom Sheynis
const careerHistory: TimelineItem[] = [
    {
        id: "bim_automation_360",
        date: "Oct 2025 - Present",
        title: "BIM Automation Developer",
        company: "360 Program, BGU",
        description: "AI-driven assistants for Revit models. Designed C# semantic wrappers reducing LLM errors by 90%."
    },
    {
        id: "research_assistant_cbg",
        date: "Mar 2025 - Aug 2025",
        title: "Research Assistant (LLM & AI)",
        company: "CBG Labs",
        description: "Evaluated LLM robustness under adversarial conditions. Built multi-agent test harnesses."
    },
    {
        id: "education_bgu",
        date: "2022 - 2026",
        title: "B.Sc. Information Systems Engineering",
        company: "Ben Gurion University",
        description: "GPA 85. Focus on AI, ML, and Cybersecurity. Expected graduation 2026."
    },
    {
        id: "military_iaf",
        date: "2017 - 2019",
        title: "Avionics Technician",
        company: "Israeli Air Force",
        description: "Maintained mission-critical avionics. Completed Commanders' Course and led technician team."
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
                        <div key={item.id} className={`mb-8 ml-6 relative transition-all duration-500 ${isHighlighted ? 'scale-105' : 'opacity-100'}`}>
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

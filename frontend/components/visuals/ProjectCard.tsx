import React from 'react';

interface ProjectCardProps {
    data: {
        id: string;
        title: string;
        description: string;
        tech_stack: string[];
        image?: string;
    }
}

export default function ProjectCard({ data }: ProjectCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 animate-in zoom-in duration-300">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
                {/* Placeholder for project image */}
                <div className="text-white text-center">
                    <h4 className="text-2xl font-bold opacity-90">{data.title}</h4>
                    <p className="text-blue-100 text-sm mt-2">Project Showcase</p>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{data.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                    {data.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {data.tech_stack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

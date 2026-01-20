import React from 'react';
import Timeline from './visuals/Timeline';
import ProjectCard from './visuals/ProjectCard';
import SkillRadar from './visuals/SkillRadar';

interface VisualPanelProps {
    action: {
        type: string;
        payload: any;
    } | null;
}

export default function VisualPanel({ action }: VisualPanelProps) {
    // Default view
    if (!action) {
        return (
            <div className="h-full">
                <Timeline />
            </div>
        );
    }

    const { type, payload } = action;

    return (
        <div className="h-full animate-in fade-in slide-in-from-right-4 duration-500">
            {type === 'HIGHLIGHT_TIMELINE' && (
                <Timeline highlightId={payload.id} />
            )}

            {type === 'SHOW_PROJECT' && (
                <div className="flex items-center justify-center h-full p-4">
                    <ProjectCard data={payload} />
                </div>
            )}

            {type === 'SKILL_FOCUS' && (
                <div className="flex items-center justify-center h-full p-4">
                    <SkillRadar skills={payload.skills} scores={payload.scores} />
                </div>
            )}

            {/* Fallback for unknown types */}
            {!['HIGHLIGHT_TIMELINE', 'SHOW_PROJECT', 'SKILL_FOCUS'].includes(type) && (
                <div className="h-full p-8 flex items-center justify-center text-slate-400">
                    Waiting for visual context...
                </div>
            )}
        </div>
    );
}

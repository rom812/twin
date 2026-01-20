import React from 'react';

interface SkillRadarProps {
    skills: string[];
    scores: number[]; // 0-100
}

export default function SkillRadar({ skills, scores }: SkillRadarProps) {
    const size = 300;
    const center = size / 2;
    const radius = (size / 2) - 40;
    const sides = skills.length;
    const sliceAngle = (2 * Math.PI) / sides;

    // Helper to calculate coordinates
    const getCoordinates = (index: number, value: number) => {
        const angle = index * sliceAngle - Math.PI / 2; // Start from top
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    };

    // Generate polygon points for the data
    const dataPoints = scores.map((score, i) => {
        const coords = getCoordinates(i, score);
        return `${coords.x},${coords.y}`;
    }).join(' ');

    // Generate grid backgrounds
    const gridLevels = [25, 50, 75, 100];

    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Skill Proficiency</h3>
            <div className="relative">
                <svg width={size} height={size} className="overflow-visible">
                    {/* Grid Levels */}
                    {gridLevels.map((level) => (
                        <polygon
                            key={level}
                            points={skills.map((_, i) => {
                                const coords = getCoordinates(i, level);
                                return `${coords.x},${coords.y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axes */}
                    {skills.map((skill, i) => {
                        const endCoords = getCoordinates(i, 100);
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={endCoords.x}
                                y2={endCoords.y}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Data Polygon */}
                    <polygon
                        points={dataPoints}
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        className="animate-in fade-in duration-1000"
                    />

                    {/* Data Points */}
                    {scores.map((score, i) => {
                        const coords = getCoordinates(i, score);
                        return (
                            <circle
                                key={i}
                                cx={coords.x}
                                cy={coords.y}
                                r="4"
                                fill="#3b82f6"
                                className="animate-in zoom-in duration-500 delay-300"
                            />
                        );
                    })}

                    {/* Labels */}
                    {skills.map((skill, i) => {
                        // Push labels out a bit further than radius
                        const angle = i * sliceAngle - Math.PI / 2;
                        const labelRadius = radius + 25;
                        const x = center + labelRadius * Math.cos(angle);
                        const y = center + labelRadius * Math.sin(angle);

                        return (
                            <text
                                key={i}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs fill-slate-500 font-medium"
                            >
                                {skill}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

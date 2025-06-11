"use client";

import React from "react";

interface Skill {
  name: string;
  icon: string;
}

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge = ({ skill }: SkillBadgeProps) => (
  <div className="flex items-center gap-3 px-6 py-3 glass-pink rounded-full mx-3 whitespace-nowrap hover:glass-pink-hover transition-all duration-500 hover:scale-105 hover:shadow-pink-glow group">
    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
      {skill.icon}
    </span>
    <span className="text-gray-700 font-medium text-sm group-hover:text-gray-800 transition-colors duration-300">
      {skill.name}
    </span>
  </div>
);

interface ScrollingRowProps {
  skills: Skill[];
  direction: "left" | "right";
  speed: number;
}

const ScrollingRow = ({ skills, direction, speed }: ScrollingRowProps) => {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="flex overflow-hidden py-4 relative">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-teal-50 via-pink-50/20 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-teal-50 via-pink-50/20 to-transparent z-10 pointer-events-none"></div>

      <div
        className={`flex animate-scroll-${direction}-slow`}
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillBadge key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const skillsData: Skill[][] = [
  [
    { name: "GraphQL", icon: "🔗" },
    { name: "Firebase", icon: "🔥" },
    { name: "Supabase", icon: "⚡" },
    { name: "Docker", icon: "🐳" },
    { name: "Prisma ORM", icon: "🔺" },
    { name: "Git & Version Control", icon: "💎" },
    { name: "Redis", icon: "🗄️" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "AWS", icon: "☁️" },
  ],
  [
    { name: "Graphic Design", icon: "🎨" },
    { name: "Database Management", icon: "📊" },
    { name: "Web Development", icon: "🌐" },
    { name: "Mobile Development", icon: "📱" },
    { name: "Frontend Development", icon: "💻" },
    { name: "Backend Development", icon: "⚙️" },
    { name: "DevOps", icon: "🚀" },
    { name: "Cloud Architecture", icon: "☁️" },
  ],
  [
    { name: "Next.js", icon: "▲" },
    { name: "HTML5", icon: "📄" },
    { name: "CSS3", icon: "🎨" },
    { name: "Tailwind CSS", icon: "💨" },
    { name: "JavaScript", icon: "📜" },
    { name: "TypeScript", icon: "📘" },
    { name: "UI/UX Design (Figma)", icon: "🎯" },
    { name: "React", icon: "⚛️" },
    { name: "Vue.js", icon: "💚" },
    { name: "Angular", icon: "🅰️" },
  ],
];

export const SliderSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {/* Built with Modern Technologies */}
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          {/* Leveraging cutting-edge tools and frameworks to deliver exceptional
          performance */}
        </p>
      </div>

      <div className="space-y-8 overflow-hidden relative">
        <div className="relative">
          <ScrollingRow skills={skillsData[0]} direction="right" speed={60} />
        </div>
        <div className="relative">
          <ScrollingRow skills={skillsData[1]} direction="left" speed={55} />
        </div>
        <div className="relative">
          <ScrollingRow skills={skillsData[2]} direction="right" speed={65} />
        </div>
      </div>
    </div>
  );
};

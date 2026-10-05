import React, { useState } from "react";
import { EXPERIENCE_DATA } from "../../data/portfolioData";
import { ExperienceItem } from "./ExperienceItem";

export const ExperienceTimeline: React.FC = () => {
  // First/current experience is open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    // Clicking an open card collapses it; clicking another closes current and opens selected
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative">
      {EXPERIENCE_DATA.map((item, index) => (
        <ExperienceItem
          key={`${item.company}-${index}`}
          experience={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          isLast={index === EXPERIENCE_DATA.length - 1}
        />
      ))}
    </div>
  );
};

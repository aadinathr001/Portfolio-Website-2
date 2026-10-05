import React, { useState } from "react";
import { EDUCATION_DATA } from "../../data/portfolioData";
import { EducationItem } from "./EducationItem";

export const EducationTimeline: React.FC = () => {
  // First education item is open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative">
      {EDUCATION_DATA.map((item, index) => (
        <EducationItem
          key={`${item.institution}-${index}`}
          education={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          isLast={index === EDUCATION_DATA.length - 1}
        />
      ))}
    </div>
  );
};

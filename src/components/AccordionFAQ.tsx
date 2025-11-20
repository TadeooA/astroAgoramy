import { useState } from 'react';

interface FAQItem {
  title: string;
  description: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
}

export default function AccordionFAQ({ items }: AccordionFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-14 lg:w-3/4 lg:mx-auto 2xl:w-2/3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-300 rounded-lg mt-4">
          <button
            className="inline-flex p-5 items-center justify-between w-full font-semibold text-left transition"
            onClick={() => toggleAccordion(idx)}
          >
            {item.title}
            <span className={`material-symbols-rounded text-xl block transition-all ${activeIndex === idx ? 'rotate-180' : ''}`}>
              <i className="fa-solid fa-angle-down"></i>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === idx ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="text-gray-500 dark:text-gray-300 pt-3 p-5">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

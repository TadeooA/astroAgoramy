import { useState } from 'react';

interface FeatureItem {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
}

interface FeaturesAccordionProps {
  items: FeatureItem[];
}

export default function FeaturesAccordion({ items }: FeaturesAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>
          <button
            className="pt-2 inline-flex items-center gap-x-4 w-full font-medium text-left text-gray-800 transition-all hover:text-gray-500"
            onClick={() => toggleAccordion(idx)}
          >
            <div className={`${item.iconBgColor} rounded-lg flex items-center justify-center h-12 w-12`}>
              <div className={item.iconColor} dangerouslySetInnerHTML={{ __html: item.icon }} />
            </div>
            <h1 className="font-medium mb-4 mt-2">{item.title}</h1>
          </button>
          <div
            className={`w-full overflow-hidden transition-all duration-300 ps-16 ${
              activeIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
            <div className="mt-7 flex items-center mb-6">
              <a href="#" className="text-green-500">
                Conocer más <i className="fa-solid fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          {idx < items.length - 1 && <div className="border-b my-6"></div>}
        </div>
      ))}
    </div>
  );
}

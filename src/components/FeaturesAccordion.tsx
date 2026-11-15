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

// Lista de características siempre desplegada (antes era un acordeón).
export default function FeaturesAccordion({ items }: FeaturesAccordionProps) {
  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>
          <div className="pt-2 flex items-center gap-x-4 w-full font-medium text-left text-gray-800">
            <div className={`${item.iconBgColor} rounded-lg flex items-center justify-center h-12 w-12 shrink-0`}>
              <div className={item.iconColor} dangerouslySetInnerHTML={{ __html: item.icon }} />
            </div>
            <h3 className="font-medium mb-4 mt-2">{item.title}</h3>
          </div>
          <div className="w-full ps-16">
            <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
          </div>
          {idx < items.length - 1 && <div className="border-b border-gray-100 my-6"></div>}
        </div>
      ))}
    </div>
  );
}

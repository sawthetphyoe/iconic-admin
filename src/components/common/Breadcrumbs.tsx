import React from "react";
import Link from "next/link";

type BreadcrumbsProps = {
  items: {
    name: string;
    link?: string;
  }[];
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? <Link href={item.link}>{item.name}</Link> : item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

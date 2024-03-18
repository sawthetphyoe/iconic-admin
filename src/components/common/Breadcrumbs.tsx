import React from "react";
import Link from "next/link";
import mergeClassNames from "@/utils/mergeClassnames";

type BreadcrumbsProps = {
  items: {
    name: string;
    link?: string;
  }[];
};
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className={mergeClassNames("text-sm breadcrumbs")}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <Link href={item.link}>{item.name}</Link>
            ) : (
              <span className={"font-semibold"}>{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

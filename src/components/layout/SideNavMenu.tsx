"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem =
  | {
      parent: string;
      children: (string | MenuItem)[];
    }
  | string;

type SideNavMenuProps = {
  items: MenuItem[];
};

const generateHref = (link: string, parentLink?: string) => {
  return (
    (parentLink ? `${parentLink}/` : "") +
    link.replaceAll(" ", "-").toLowerCase()
  );
};

const SideNavMenuItem = ({
  item,
  parentLink,
}: {
  item: MenuItem;
  parentLink?: string;
}) => {
  const pathname = usePathname();

  if (typeof item === "string") {
    const active = pathname?.includes(generateHref(item, parentLink));
    return (
      <li className={"text-base"}>
        <Link
          className={active ? "active" : ""}
          href={"/" + generateHref(item, parentLink)}
        >
          {item}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <details open={pathname?.includes(generateHref(item.parent))}>
        <summary className={"text-base"}>{item.parent}</summary>
        <ul className="menu w-full flex flex-col gap-1">
          {item.children.map((child, index) => (
            <SideNavMenuItem
              key={index}
              item={child}
              parentLink={generateHref(item.parent, parentLink)}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

const SideNavMenu: React.FC<SideNavMenuProps> = ({ items }) => {
  return (
    <aside
      className={
        "min-h-screen border-r border-r-slate-500 border-opacity-10 pr-4 bg-base-100 w-80 sticky top-0 bottom-0 left-0"
      }
    >
      <Link href={"/"} className={"flex items-center justify-center h-24"}>
        <h1 className={"font-bold"}>LOGO</h1>
      </Link>
      <ul className="menu w-full flex flex-col gap-2">
        {items.map((item, index) => (
          <SideNavMenuItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  );
};

export default SideNavMenu;

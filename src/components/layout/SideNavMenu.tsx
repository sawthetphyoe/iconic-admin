"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaApple } from "react-icons/fa";

type MenuItem =
  | {
      parent: string;
      children: (string | MenuItem)[];
    }
  | { name: string; link: string }
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
      <li className={"text-sm"}>
        <Link
          className={active ? "active" : ""}
          href={"/" + generateHref(item, parentLink)}
        >
          {item}
        </Link>
      </li>
    );
  }

  if ("name" in item && "link" in item) {
    const active =
      item.link === "/" ? pathname === "/" : pathname?.includes(item.link);

    return (
      <li className={"text-sm"}>
        <Link className={active ? "active" : ""} href={item.link}>
          {item.name}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <details open={pathname?.includes(generateHref(item.parent))}>
        <summary className={"text-sm"}>{item.parent}</summary>
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
        "min-h-screen border-r border-r-slate-500 border-opacity-10 pr-4 bg-base-100 w-64 sticky top-0 bottom-0 left-0"
      }
    >
      <Link href={"/"} className={"flex items-center justify-center h-[76px]"}>
        <div className={"flex gap-2 items-center text-base-content p-4"}>
          <FaApple className={"mb-1"} size={24} />
          <h1
            className={
              "menu-title text-base-content font-semibold text-lg p-0 flex"
            }
          >
            <span className={"text-lg font-bold"}>i</span>
            <span>CONIC</span>
          </h1>
        </div>
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

import React from "react";
import { headers } from "next/headers";
import Link from "next/link";

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
  const pathname = headers().get("x-pathname")!;

  if (typeof item === "string") {
    const active = pathname.includes(generateHref(item, parentLink));
    return (
      <li>
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
      <details open={pathname.includes(generateHref(item.parent))}>
        <summary>{item.parent}</summary>
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
    <aside className={"min-h-screen bg-base-100 w-80"}>
      <div className={"flex items-center justify-center h-20"}>
        <h1>LOGO</h1>
      </div>
      <ul className="menu w-full flex flex-col gap-2">
        {items.map((item, index) => (
          <SideNavMenuItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  );
};

export default SideNavMenu;

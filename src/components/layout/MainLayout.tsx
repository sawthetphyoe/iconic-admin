import React from "react";
import SideNavMenu from "@/components/layout/SideNavMenu";
import NavBar from "@/components/layout/NavBar";
import mergeClassNames from "@/utils/mergeClassnames";

const MainLayout: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={mergeClassNames("w-full flex items-start", className)}>
      <SideNavMenu
        items={[
          { name: "Dashboard", link: "/" },
          {
            parent: "Users",
            children: ["Staff", "Customers"],
          },
          "Branches",
          "Products",
          "Inventory",
          "Orders",
          "Settings",
        ]}
      />
      <main className={"flex flex-col w-[calc(100%-16rem)]"}>
        <NavBar />
        <section className={"!px-8 !py-6 w-full"}>{children}</section>
      </main>
    </div>
  );
};

export default MainLayout;

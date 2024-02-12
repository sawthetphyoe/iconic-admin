import React from "react";
import SideNavMenu from "@/components/SideNavMenu";
import NavBar from "@/components/NavBar";
import mergeClassNames from "@/utils/mergeClassnames";

const MainLayout: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={mergeClassNames("flex items-start", className)}>
      <SideNavMenu
        items={[
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
      <main className={"flex flex-col w-full"}>
        <NavBar />
        <section className={"!px-4 !py-8"}>{children}</section>
      </main>
    </div>
  );
};

export default MainLayout;

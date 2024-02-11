import React from "react";
import SideNavMenu from "@/app/components/SideNavMenu";
import NavBar from "@/app/components/NavBar";

const MainLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className={"flex items-start"}>
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
          "General Settings",
        ]}
      />
      <main className={"flex flex-col w-full"}>
        <NavBar title={title} />
        <section className={"!p-4"}>{children}</section>
      </main>
    </div>
  );
};

export default MainLayout;

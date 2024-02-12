import React from "react";
import SideNavMenu from "@/components/SideNavMenu";
import NavBar from "@/components/NavBar";

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
          "Settings",
        ]}
      />
      <main className={"flex flex-col w-full"}>
        <NavBar title={title} />
        <section className={"!px-4 !py-8"}>{children}</section>
      </main>
    </div>
  );
};

export default MainLayout;

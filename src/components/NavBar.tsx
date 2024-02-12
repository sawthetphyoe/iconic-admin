import React from "react";
import ThemeController from "@/components/ThemeController";
import ProfileDropdown from "@/components/ProfileDropdown";
import mergeClassNames from "@/utils/mergeClassnames";

const NavBar: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={mergeClassNames(
        "navbar w-full border-b border-b-slate-500 shadow-sm border-opacity-10 py-0",
        className,
      )}
      {...props}
    >
      <div className="navbar-start">
        <h1 className={"menu-title text-primary font-semibold text-xl !py-4"}>
          <span className={"text-xl font-bold"}>i</span>
          <span>CONIC Admin Dashboard</span>
        </h1>
      </div>

      <div className="navbar-end flex items-center gap-3 px-4">
        <ProfileDropdown />
        <ThemeController />
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import ThemeController from "@/components/common/ThemeController";
import ProfileDropdown from "@/components/layout/ProfileDropdown";
import mergeClassNames from "@/utils/mergeClassnames";
import { FaApple } from "react-icons/fa";

const NavBar: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={mergeClassNames(
        "navbar h-[76px] w-full border-b border-b-slate-500 shadow-sm border-opacity-10 py-0 sticky z-10 top-0 right-0 bg-base-100",
        className
      )}
      {...props}
    >
      <div className="navbar-start">
        <div className={"flex gap-2 items-center text-primary p-4"}>
          <FaApple className={"mb-1"} size={24} />
          <h1
            className={"menu-title text-primary font-semibold text-lg p-0 flex"}
          >
            <span className={"text-lg font-bold"}>i</span>
            <span>CONIC Admin Dashboard</span>
          </h1>
        </div>
      </div>

      <div className="navbar-end flex items-center gap-3 px-4">
        <ProfileDropdown />
        <ThemeController />
      </div>
    </div>
  );
};

export default NavBar;

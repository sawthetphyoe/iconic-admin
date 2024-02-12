import React from "react";
import ThemeController from "@/components/ThemeController";
import ProfileDropdown from "@/components/ProfileDropdown";

const NavBar: React.FC<{ title?: React.ReactNode; className?: string }> = ({
  title,
  className,
}) => {
  return (
    <div
      className={`navbar w-full border-b border-b-slate-500 shadow-sm border-opacity-10 py-0 ${
        className || ""
      }`}
    >
      <div className="navbar-start">
        <h1 className={"menu-title text-secondary font-semibold text-xl !py-4"}>
          {title ? (
            title
          ) : (
            <>
              <span className={"text-2xl font-bold"}>i</span>
              <span>CONIC Admin Dashboard</span>{" "}
            </>
          )}
        </h1>
      </div>

      <div className="navbar-end">
        <div className={"flex items-center gap-3 px-4"}>
          <ProfileDropdown />
          <button className="btn btn-ghost btn-circle">
            <ThemeController />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

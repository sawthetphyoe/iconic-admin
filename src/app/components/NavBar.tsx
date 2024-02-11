import React from "react";
import ThemeController from "@/app/components/ThemeController";

const NavBar: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="navbar w-full">
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
        <button className="btn btn-ghost btn-circle">
          <ThemeController />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

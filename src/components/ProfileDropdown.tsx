import React from "react";
import Link from "next/link";

const ProfileDropdown: React.FC = () => {
  // return null;
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div className={"flex items-center gap-3 cursor-pointer h-full"}>
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            <span>A</span>
          </div>
        </div>
        <h1 className={"text-lg font-medium my-6"}>Admin</h1>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] flex flex-col gap-2 menu p-4 ring-[0.2px] shadow-sm bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href={"/auth/me"} className={"text-base font-medium"}>
            Profile
          </Link>
        </li>
        <hr className={"opacity-80 bg-secondary"} />
        <li>
          <Link href={"/auth/login"} className={"text-base font-medium"}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;

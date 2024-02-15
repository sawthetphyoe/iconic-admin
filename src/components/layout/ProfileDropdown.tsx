"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser, setUser } from "@/store";
import { getCookie } from "cookies-next";
import useGetCurrentUser from "@/hooks/auth/useGetCurrentUser";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const ProfileDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const accessToken = getCookie("iconic-access-token");
  const pathname = usePathname();

  const queryEnabled =
    !currentUser.id && !!accessToken && !pathname.includes("login");

  const GetCurrentUserQuery = useGetCurrentUser(queryEnabled);

  useEffect(() => {
    if (GetCurrentUserQuery.isSuccess && GetCurrentUserQuery.data) {
      dispatch(setUser(GetCurrentUserQuery.data.payload));
    } else if (GetCurrentUserQuery.isError) {
      dispatch(removeUser());
      toast.error("Cannot fetch user data");
    }
  }, [
    GetCurrentUserQuery.isSuccess,
    GetCurrentUserQuery.data,
    GetCurrentUserQuery.isError,
    dispatch,
  ]);

  return (
    accessToken &&
    currentUser.id && (
      <div className="dropdown dropdown-end dropdown-hover">
        <div className={"flex items-center gap-3 cursor-pointer h-full"}>
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-9">
              <span>{currentUser.fullName?.charAt(0)}</span>
            </div>
          </div>
          <h1 className={"text-md font-medium my-6"}>{currentUser.fullName}</h1>
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
          <hr className={"opacity-80 bg-primary"} />
          <li>
            <Link href={"/auth/login"} className={"text-base font-medium"}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    )
  );
};

export default ProfileDropdown;

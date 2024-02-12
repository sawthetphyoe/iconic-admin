"use client";

import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { getCookie, hasCookie } from "cookies-next";
import { DARK_THEME } from "@/lib/constants";

const ToastWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const theme =
    hasCookie("theme") && getCookie("theme") === DARK_THEME ? "dark" : "light";

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnFocusLoss
          pauseOnHover={false}
          theme={theme}
          transition={Bounce}
        />
      )}
      {children}
    </>
  );
};

export default ToastWrapper;

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className={"w-full flex items-center justify-center gap-5 mt-[8rem]"}>
      <span className="loading loading-ring loading-xs text-primary"></span>
      <span className="loading loading-ring loading-sm text-primary"></span>
      <span className="loading loading-ring loading-md text-primary"></span>
      <span className="loading loading-ring loading-lg text-primary"></span>
      <span className="loading loading-ring loading-md text-primary"></span>
      <span className="loading loading-ring loading-sm text-primary"></span>
      <span className="loading loading-ring loading-xs text-primary"></span>
    </div>
  );
};

export default Loading;

import React from "react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className={"font-semibold m-0 text-2xl leading-[48px]"}>{title}</h1>
  );
};

export default PageTitle;

import React from "react";
import mergeClassNames from "@/utils/mergeClassnames";

interface ListItemProps {
  label: React.ReactNode;
  content: React.ReactNode;
}

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

interface ListCompoundProps extends React.FC<ListProps> {
  Item: React.FC<ListItemProps>;
}

const ListItem: React.FC<ListItemProps> = ({ label, content }) => (
  <li className={"flex w-full items-start"}>
    <label className={"w-[200px] !leading-[48px]"}>{label} :</label>
    <div className={"m-0 flex-1"}>{content}</div>
  </li>
);

const List: ListCompoundProps = ({ children, className }) => {
  return <ul className={mergeClassNames(className)}>{children}</ul>;
};

List.Item = ListItem;

export default List;

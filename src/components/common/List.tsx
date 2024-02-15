import React from "react";
import mergeClassNames from "@/utils/mergeClassnames";

const ListItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <li className={"flex w-full"}>
    <label className={"w-[200px]"}>{label} :</label>
    <p className={"m-0 flex-1"}>{value}</p>
  </li>
);

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

interface ListCompoundProps extends React.FC<ListProps> {
  Item: React.FC<{ label: string; value: string }>;
}

const List: ListCompoundProps = ({ children, className }) => {
  return <ul className={mergeClassNames(className)}>{children}</ul>;
};

List.Item = ListItem;

export default List;

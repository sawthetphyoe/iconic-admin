"use client";

import React from "react";
import mergeClassNames from "@/utils/mergeClassnames";

export type TableColumn<T> = {
  title: React.ReactNode;
  width?: string;
  dataIndex: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
};

type TableProps<T> = {
  dataSource: T[];
  columns: TableColumn<T>[];
  titleClassname?: string;
  className?: string;
  containerClassname?: string;
  rowClassname?: string;
  onRowClick?: (record: T) => void;
};

function Table<T extends Record<string, any>>({
  dataSource,
  columns,
  containerClassname,
  className,
  titleClassname,
  rowClassname,
  onRowClick = () => {},
}: TableProps<T>): React.ReactNode {
  return (
    <div
      className={mergeClassNames(
        "!overflow-x-scroll !w-full",
        containerClassname
      )}
    >
      <table className={mergeClassNames("!w-full table", className)}>
        {/* head */}
        <thead className={"w-full"}>
          <tr
            className={mergeClassNames("border-b-slate-500 border-opacity-20")}
          >
            {columns.map((column, index) => (
              <th
                key={index}
                className={mergeClassNames("whitespace-nowrap", titleClassname)}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        {/* body */}
        <tbody className={"w-full"}>
          {dataSource.map((record, i) => (
            <tr
              key={i}
              className={mergeClassNames(
                "hover border-b-slate-500 border-opacity-20",
                rowClassname
              )}
              onClick={() => {
                onRowClick(record);
              }}
            >
              {columns.map((column, index) => (
                <td key={index} className={"whitespace-nowrap"}>
                  {typeof column.render === "function"
                    ? column.render(record[column.dataIndex], record, i)
                    : record[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

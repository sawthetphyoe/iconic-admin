"use client";

import React, { useEffect } from "react";
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
  loading?: boolean;
};

function Table<T extends Record<string, any>>({
  dataSource,
  columns,
  containerClassname,
  className,
  titleClassname,
  rowClassname,
  onRowClick = () => {},
  loading,
}: TableProps<T>): React.ReactNode {
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className={"w-full relative"}>
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
              className={mergeClassNames(
                "border-b-slate-500 border-opacity-20"
              )}
            >
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={mergeClassNames(
                    "whitespace-nowrap",
                    titleClassname
                  )}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          {/* body */}
          <tbody className={"w-full"}>
            {dataSource.length > 0 ? (
              dataSource.map((record, i) => (
                <tr
                  key={i}
                  className={mergeClassNames(
                    "hover border-b-slate-500 border-opacity-20",
                    rowClassname,
                    loading && "opacity-30"
                  )}
                  onClick={() => {
                    onRowClick(record);
                  }}
                >
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={"whitespace-nowrap"}
                      style={{ width: column.width }}
                    >
                      {typeof column.render === "function"
                        ? column.render(record[column.dataIndex], record, i)
                        : record[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className={"bg-base-200 bg-opacity-20"}>
                <td
                  colSpan={columns.length}
                  className={
                    "text-center py-8 font-semibold text-base text-base-content/50"
                  }
                >
                  {!loading && "No Data"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {loading && isClient && (
        <div className="absolute top-[44.5px] left-0 bg-base-200 bg-opacity-20 w-full h-[calc(100%-44.5px)] flex items-center justify-center">
          <span className="loading loading-dots loading-md text-neutral"></span>
        </div>
      )}
    </div>
  );
}

export default Table;

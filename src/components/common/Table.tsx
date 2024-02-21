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
        {/*{!loading && dataSource.length === 0 ? (*/}
        {/*  // no data*/}
        {/*  <tbody>*/}
        {/*    <tr className={"bg-base-200 bg-opacity-20"}>*/}
        {/*      <td*/}
        {/*        colSpan={columns.length}*/}
        {/*        className={*/}
        {/*          "text-center py-8 font-semibold text-base text-base-content/50"*/}
        {/*        }*/}
        {/*      >*/}
        {/*        No Data*/}
        {/*      </td>*/}
        {/*    </tr>*/}
        {/*  </tbody>*/}
        {/*) : (*/}
        <tbody className={"w-full relative"}>
          {/* loading */}
          {loading && (
            <tr
              className={
                "absolute top-0 left-0 w-full h-full z-10 bg-base-200 bg-opacity-20"
              }
            >
              <th className={"w-full h-full flex items-center justify-center"}>
                <span className="loading loading-dots loading-md text-neutral"></span>
              </th>
            </tr>
          )}
          {!loading &&
            (dataSource.length > 0 ? (
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
                    <td key={index} className={"whitespace-nowrap"}>
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
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

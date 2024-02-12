"use client";

import React from "react";

export type TableColumn<T> = {
  title: React.ReactNode;
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
  titleClassname,
  className,
  containerClassname,
  rowClassname,
  onRowClick = () => {},
}: TableProps<T>): React.ReactNode {
  return (
    <div className={`overflow-x-auto ${containerClassname}`}>
      <table className={`table ${className}`}>
        {/* head */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={titleClassname || ""}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {dataSource.map((record, i) => (
            <tr
              key={i}
              className={"hover" + " " + (rowClassname || "")}
              onClick={() => {
                onRowClick(record);
              }}
            >
              {columns.map((column, index) => (
                <td key={index}>
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

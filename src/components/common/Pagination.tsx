import React from "react";
import mergeClassNames from "@/utils/mergeClassnames";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

type PaginationProps = {
  hideOnSinglePage?: boolean;
  currentPage: number;
  totalPage: number;
  totalRecord: number;
  currentSize: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  hideOnSinglePage = true,
  totalPage,
  currentPage,
  currentSize,
  totalRecord,
  onChange,
}) => {
  if (hideOnSinglePage && totalPage === 1) return null;

  return (
    <div className={"flex items-center gap-2"}>
      <button
        disabled={currentPage === 1}
        className={"btn btn-ghost btn-sm h-[40px]"}
        onClick={() => {
          onChange(currentPage - 1);
        }}
      >
        <MdKeyboardDoubleArrowLeft size={20} />
      </button>
      <div className="join">
        {new Array(totalPage).fill(" ").map((_, index) => {
          return (
            <button
              key={index}
              className={mergeClassNames(
                "join-item btn btn-sm h-[40px]",
                currentPage === index + 1 && "btn-active"
              )}
              onClick={() => onChange(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button
        disabled={currentPage === totalPage}
        className={"btn btn-ghost btn-sm h-[40px]"}
        onClick={() => {
          onChange(currentPage + 1);
        }}
      >
        <MdKeyboardDoubleArrowRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;

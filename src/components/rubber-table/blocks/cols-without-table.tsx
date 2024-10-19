import React, { FC } from "react";

import { TableColumn } from "../table.types";

type PropsType = {
  columns: TableColumn[];
};

export const ColsWithoutTable: FC<PropsType> = (props) => {
  const { columns } = props;
  return (
    <div className="flex w-full items-center sticky z-50 top-0 min-w-[80px] truncate bg-basic_app_bg uppercase ">
      {columns.map((item) => {
        return (
          <div
            style={{ maxWidth: `${item?.maxWidth}px` }}
            className="w-full px-[20px] py-[12px] text-black text-[12px] font-[600] duration-150 ease-in-out select-none"
            key={item.index}
          >
            <span className={`${item.className} text-left`}>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};

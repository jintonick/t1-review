import React, { FC } from "react";

import cn from "classnames";

import { ArrowUpIcon, ArrowDownIcon } from "@app/imgs/icons/index";

import { tableTitleFilterWrapperClassName } from "../table.styles";
import { TableColumn } from "../table.types";
import { TableFilter } from "../table.type";
import TooltipWrapper from "@app/components/tooltip-wrapper/tooltip-wrapper";

type ColumnsAdditionalProps = {
  handleOnFilter: (titleIndex: string, isFilter: boolean | undefined) => void;
  filterData: TableFilter | undefined;
};

export const Columns: FC<TableColumn & ColumnsAdditionalProps> = (props) => {
  const { handleOnFilter, index, title, filterData, filter, truncate } = props;
  return (
    <th
      onClick={() => handleOnFilter(index, filter)}
      align="left"
      className={"text-black text-[12px] font-[600] w-full duration-150 ease-in-out select-none "}
    >
      <div
        className={`flex rounded-[10px] w-full px-[20px] py-[12px] ${tableTitleFilterWrapperClassName({
          filter,
        })}`}
      >
        {truncate ? (
          <TooltipWrapper truncate content={title} id={title as string}>
            <span>{title}</span>
          </TooltipWrapper>
        ) : (
          <span>{title}</span>
        )}
        {filter && (
          <div className="inline-flex w-full items-center ml-[5px] pr-[5px]">
            <ArrowUpIcon
              size={8}
              className={cn(filterData?.[index] === -1 ? "text-action" : "text-3color", "ml-[3px]")}
            />
            <ArrowDownIcon
              size={8}
              className={cn(filterData?.[index] === 1 ? "text-action" : "text-3color")}
            />
          </div>
        )}
      </div>
    </th>
  );
};

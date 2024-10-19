import React, { FC, useState } from "react";

import { TableFilter } from "../rubber-table/table.type";

import Empty from "@app/components/empty/empty";

import TableSkeleton from "@app/components/rubber-table/tabel-skeleton";

import {TableColumn, TableProps} from "./table.types";
import { Columns } from "./blocks/columns";
import { Rows } from "./blocks/rows";

const RubberTable: FC<TableProps> = (props) => {
  const {
    dataSource = [],
    columns,
    onFilter,
    isEmpty,
    isPending,
    skeletons = 6,
    truncate = true,
    withoutCols = false,
  } = props;
  const [filterData, setFilterData] = useState<TableFilter>();
  function handlerResetFilters() {
    setFilterData({});
    onFilter?.({});
  }
  function handleOnFilter(titleIndex: string, isFilter: boolean | undefined) {
    if (!isFilter) return;
    if (filterData && filterData[titleIndex] === 1) {
      handlerResetFilters();
      return;
    }
    const updatedFilter: TableFilter = {
      [titleIndex]: filterData?.[titleIndex] !== undefined ? 1 : -1,
    };
    setFilterData(updatedFilter);
    onFilter?.(updatedFilter);
  }

  if (isPending) return <TableSkeleton count={skeletons} />;

  const renderColumns = (
    <thead className="bg-basic_app_bg">
      <tr className="sticky z-50 top-0 min-w-[80px] truncate bg-basic_app_bg uppercase ">
        {columns?.map(({ title, filter, index, tag, truncate }) => {
          return (
            <Columns
              index={index}
              title={title}
              filterData={filterData}
              handleOnFilter={handleOnFilter}
              key={index}
              tag={tag}
              filter={filter}
              truncate={truncate}
            />
          );
        })}
      </tr>
    </thead>
  );

  const renderCells = (
    <tbody className="relative z-30">
      {dataSource.map((row, index) => {
        return (
          <Rows
            key={index}
            row={row}
            column={columns as TableColumn[]}
            truncate={truncate}
          />
        );
      })}
    </tbody>
  );

  return (
    <div className={"w-full h-full z-[1] relative"}>
      {dataSource.length !== 0 ? (
        <table
          style={{
            borderSpacing: "0px 8px",
            borderCollapse: "separate",
            tableLayout: "fixed",
            width: "100%",
          }}
          align="left"
        >
          <colgroup>
            {columns?.map((e) => {
              return <col key={e.index} width={e.maxWidth || "100%"} />;
            })}
          </colgroup>
          {!withoutCols && renderColumns}
          {renderCells}
        </table>
      ) : (
        <Empty title={isEmpty || "title"} />
      )}
    </div>
  );
};

export default RubberTable;


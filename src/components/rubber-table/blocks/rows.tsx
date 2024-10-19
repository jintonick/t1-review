import React, { FC } from "react";

import {useNavigate} from "react-router-dom";

import { TableColumn, TableItem } from "../table.types";
type rowsPropsType = {
  row: TableItem;
  truncate: boolean;
  column: TableColumn[];
};

export const Rows: FC<rowsPropsType> = (props) => {
  const { column, truncate, row } = props;
  const navigate = useNavigate();

  // Обработчик клика
  const handleClick = () => {
    navigate(`/editing/${row.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="hover:border-[2px] hover:border-[#598BF2] cursor-pointer rounded-[15px] bg-white transition-all duration-150 border-[1px]"
      style={{ borderRadius: "15px", border: "2px solid transparent" }}
    >
      {column.map((column) => (
        <td
          key={column.index}
          height={88}
          className={` last:rounded-r-[15px] first:rounded-l-[15px] bg-white ${truncate && "truncate"}`}
        >
          <div className="flex w-full">
            {column.divider === "left" && (
              <div>
                <div className="h-[28px] w-[1px] bg-b_light" />
              </div>
            )}
            <div
              className={`pl-[20px] w-full ${truncate && "truncate"}`}
              style={{ minWidth: `${column.minWidth}px` }}
            >
              {row?.[column.index]}
            </div>
            {column.divider === "right" && (
              <div>
                <div className="flex-1 h-[28px] w-[1px] bg-b_light" />
              </div>
            )}
          </div>
        </td>
      ))}
    </tr>
  );
};

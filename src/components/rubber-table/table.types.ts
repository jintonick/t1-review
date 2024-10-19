import { ReactNode } from "react";

import { TableFilter } from "./table.type";

export type TableColumn = {
  title: string | ReactNode;
  index: string;
  maxWidth?: number | string;
  minWidth?: number;
  filter?: boolean;
  className?: string;
  divider?: "left" | "right";
  tag?: string;
  truncate?: boolean;
};

export type TableItem = {
  id?: string | number;
  right?: boolean;
  content?: ReactNode;
  [x: string]: string | number | ReactNode;
};

export type TableProps = {
  withoutCols?: boolean;
  truncate?: boolean;
  isEmpty?: string;
  isPending?: boolean;
  skeletons?: number;
  onFilter?: (filters: TableFilter) => void;
  columns?: Array<TableColumn>;
  dataSource: Array<TableItem>;
  fractions?: string;
  ownClassNames?: string;
  title?: "true";
  block?: "true";
};

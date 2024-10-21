import { ReactNode } from "react";

export type ChartsLayoutType = {
  h: number;
  max_h?: number;
  max_w?: number;
  min_h?: number;
  min_w?: number;
  w: number;
  x: number;
  y: number;
  i: string;
};

export type TableTitle = {
  title: string | ReactNode;
  index: string;
  size?: number;
  divider?: "right" | "left";
  right?: boolean;
  filter?: boolean;
  disableDefaultHeight?: boolean;
  onFilter?: () => void;
  className?: string;
  overflow?: boolean;
  truncate?: boolean;
  cellHeight?: number;
  hintTitle?: string;
};

export type TableItem = {
  key?: string;
  right?: boolean;
  [x: string]: string | number | ReactNode;
};

export type TableFilter = {
  [x: string]: 1 | -1;
};

export type FilterTableData = { sortDesc: boolean; sortBy: string };

export type TableProps = {
  layout?: ChartsLayoutType[];
  onLayoutChange?(layout: ChartsLayoutType[]): void;
  columns: Array<TableTitle>;
  dataSource?: Array<TableItem> | undefined;
  fractions?: string;
  height?: string | number;
  truncate?: boolean;
  allRec?: boolean;
  hideDragMode?: boolean;
  isPending?: boolean;
  isEmpty?: string;
  onFilter?: (params: FilterTableData | undefined) => void;
  skeletons?: number;
};

import { ReactNode } from "react";
import { ChartsLayoutType } from "../../../../../ukt/user-interface-front/analytics/app-src/client/src/interfaces/dashboards.type";

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

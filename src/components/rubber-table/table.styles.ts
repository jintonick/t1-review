import cn from "classnames";

export const tableTitleFilterWrapperClassName = ({ filter }: { filter?: boolean }) =>
  cn(filter && "cursor-pointer hover:bg-bg_4");


export const skeletonRowClassName = cn(
  "animate-pulse",
  "bg-white/50",
  "h-[58px]",
  "shadow-medium",
  "rounded-[10px]",
  "mb-[4px]",
);

export const skeletonRowTitleClassName = cn(
  "animate-pulse",
  "bg-b_dark",
  "h-[58px]",
  "shadow-medium",
  "rounded-[10px]",
  "mb-[4px]",
);

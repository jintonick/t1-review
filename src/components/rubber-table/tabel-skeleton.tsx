import React, { FC } from "react";

import { skeletonRowClassName, skeletonRowTitleClassName } from "./table.styles";

const TableSkeleton: FC<{ count?: number }> = (props) => {
  const { count = 6 } = props;
  const renderCount = Array(count)
    .fill("0")
    .map((_, index) => <div key={index} className={skeletonRowClassName}></div>);

  return (
    <div className="relative pb-[20px] ">
      <div className="sticky bg-bg_default h-[80px] z-30 top-0 inline-flex w-full">
        <div className={skeletonRowTitleClassName}></div>
        <div className={skeletonRowTitleClassName}></div>
        <div className={skeletonRowTitleClassName}></div>
        <div className={skeletonRowTitleClassName}></div>
      </div>
      <div className="h-full w-full">
        <div className="w-full">
          <div className="w-full">{renderCount}</div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;

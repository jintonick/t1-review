import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const ArrowUpIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg xmlns="http://www.w3.org/2000/svg" width={size} fill="none" viewBox="0 0 7 11">
        <path
          fill="currentColor"
          d="M2.9.21L.193 2.975A.7.7 0 000 3.438c0 .37.258.623.623.623.177 0 .322-.06.44-.178L2.165 2.74l.606-.709-.032 1.08v6.574c0 .365.263.634.629.634a.611.611 0 00.628-.634V3.11l-.032-1.08.607.71 1.1 1.143a.595.595 0 00.441.178c.366 0 .623-.253.623-.623a.7.7 0 00-.193-.462L3.835.209a.63.63 0 00-.935 0z"
        ></path>
      </svg>
    </div>
  );
};

export default ArrowUpIcon;
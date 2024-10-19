import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const ArrowDownIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg xmlns="http://www.w3.org/2000/svg" width={size} fill="none" viewBox="0 0 7 11">
        <path
          fill="currentColor"
          d="M2.9 10.11L.193 7.344A.7.7 0 010 6.882c0-.37.258-.623.623-.623.177 0 .322.06.44.178L2.165 7.58l.606.709-.032-1.08V.636a.61.61 0 01.629-.634.61.61 0 01.628.634V7.21l-.032 1.08.607-.71 1.1-1.143a.595.595 0 01.441-.178c.366 0 .623.253.623.623a.7.7 0 01-.193.462L3.835 10.11a.63.63 0 01-.935 0z"
        ></path>
      </svg>
    </div>
  );
};

export default ArrowDownIcon;

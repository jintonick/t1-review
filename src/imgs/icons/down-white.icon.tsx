import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const DownWhiteIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0015 4.44592L12.8073 4.25178C12.6788 4.12327 12.471 4.12327 12.3425 4.25178L6.99951 9.59749L1.65381 4.25178C1.52529 4.12327 1.31748 4.12327 1.18896 4.25178L0.994824 4.44592C0.866309 4.57444 0.866309 4.78225 0.994824 4.91077L6.76436 10.683C6.89287 10.8116 7.10068 10.8116 7.2292 10.683L12.9987 4.91077C13.13 4.78225 13.13 4.57444 13.0015 4.44592Z" fill="white"/>
      </svg>
    </div>
  );
};

export default DownWhiteIcon;
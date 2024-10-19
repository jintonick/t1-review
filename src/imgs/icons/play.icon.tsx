import React, { FC } from "react";
import { IconType } from "@app/imgs/icon.type";
import classNames from "classnames";

const PlayIcon: FC<IconType> = (props) => {
  const { size, className } = props;
  return (
    <div className={classNames(className)}>
      <svg width={size} viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.95181 0.666288L11.5742 6.51625C12.4708 7.01923 12.4708 8.31497 11.5742 8.81249L1.95181 14.3344C1.08252 14.8155 0 14.1923 0 13.1863V1.81441C0 0.80297 1.08798 0.18517 1.95181 0.666288Z" fill="white"/>
      </svg>
    </div>
  );
};

export default PlayIcon;
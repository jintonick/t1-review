import React, { FC, ReactNode } from "react";
import { Tooltip } from "react-tooltip";

type TooltipProps = {
    content: string | ReactNode;
    id: string;
    delayShow?: number;
    children?: ReactNode;
    place?: "bottom" | "top" | "right" | "left";
    truncate?: boolean;
    className?: string;
    contentClassName?: string;
};

const TooltipWrapper: FC<TooltipProps> = (props) => {
  const {
    content,
    id,
    children,
    delayShow = 500,
    place = "bottom",
    truncate = false,
    className,
    contentClassName,
  } = props;
  return (
    <div className={`${truncate && "truncate"} ${className && className}`} data-tooltip-id={id}>
      {children}
      <Tooltip
        className={`!z-[50] !text-[12px] ${contentClassName && contentClassName}`}
        place={place}
        delayShow={delayShow}
        id={id}
      >
        {content}
      </Tooltip>
    </div>
  );
};
export default TooltipWrapper;
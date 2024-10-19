import React, { useState, useEffect, useRef } from "react";
import {UpIcon, DownIcon} from "@icons/";

interface TimeRangePickerProps {
  startTime: string; // время начала в формате "hh:mm:ss,ms"
  endTime: string; // время окончания в формате "hh:mm:ss,ms"
  onTimeChange?: (newStartTime: string, newEndTime: string) => void;
}

const formatTime = (time: number) => {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds},${milliseconds}`;
};

const parseTime = (timeString: string) => {
  const [timePart, msPart] = timeString.split(",");
  const [hours, minutes, seconds] = timePart.split(":").map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000 + Number(msPart);
};

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ startTime, endTime, onTimeChange }) => {
  const [start, setStart] = useState(parseTime(startTime));
  const [end, setEnd] = useState(parseTime(endTime));
  const [editingStart, setEditingStart] = useState(false);
  const [editingEnd, setEditingEnd] = useState(false);
  const [startInput, setStartInput] = useState(startTime);
  const [endInput, setEndInput] = useState(endTime);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setEditingStart(false);
        setEditingEnd(false);
        setStartInput(formatTime(start));
        setEndInput(formatTime(end));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [start, end]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartInput(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndInput(e.target.value);
  };

  const saveStart = () => {
    const newStart = parseTime(startInput);
    setStart(newStart);
    setEditingStart(false);
    if (onTimeChange) {
      onTimeChange(formatTime(newStart), formatTime(end));
    }
  };

  const saveEnd = () => {
    const newEnd = parseTime(endInput);
    setEnd(newEnd);
    setEditingEnd(false);
    if (onTimeChange) {
      onTimeChange(formatTime(start), formatTime(newEnd));
    }
  };

  const adjustStartTime = (adjustment: number) => {
    const newStart = start + adjustment;
    setStart(newStart);
    setStartInput(formatTime(newStart));
    if (onTimeChange) {
      onTimeChange(formatTime(newStart), formatTime(end));
    }
  };

  const adjustEndTime = (adjustment: number) => {
    const newEnd = end + adjustment;
    setEnd(newEnd);
    setEndInput(formatTime(newEnd));
    if (onTimeChange) {
      onTimeChange(formatTime(start), formatTime(newEnd));
    }
  };

  return (
    <div ref={ref} className="flex items-center gap-1 h-[32px] text-[14px]">
      <div className="flex items-center border-[1px] border-[#598BF2] h-[32px] rounded-[10px] px-[6px] py-[8px]">
        {editingStart ? (
          <input
            value={startInput}
            onChange={handleStartChange}
            onBlur={saveStart}
            className="w-[105px] h-[22px] border border-gray-300 rounded-md p-1 text-center font-mono border-none"
          />
        ) : (
          <span onClick={() => setEditingStart(true)} className="cursor-pointer w-[105px] text-center font-mono">
            {formatTime(start)}
          </span>
        )}
        <div className="flex flex-col w-[16px] h-[32px] items-center justify-center border-[#598BF2] pl-[4px] py-[4px]">
          {editingStart ? (
            <button onClick={saveStart} className="text-green-500">✔</button>
          ) : (
            <>
              <button onClick={() => adjustStartTime(200)} className="text-blue-500 h-[16px] flex items-center justify-center"><UpIcon size={8}/></button>
              <button onClick={() => adjustStartTime(-200)} className="text-blue-500 flex items-center justify-center h-[16px]"><DownIcon size={8}/></button>
            </>
          )}
        </div>
      </div>
      <div>-</div>
      <div className="flex items-center gap-1 border-[1px] border-[#598BF2] h-[32px] rounded-[10px] px-[6px] py-[8px]">
        {editingEnd ? (
          <input
            value={endInput}
            onChange={handleEndChange}
            onBlur={saveEnd}
            className="w-[105px] rounded-md p-1 text-center font-mono"
          />
        ) : (
          <span onClick={() => setEditingEnd(true)} className="cursor-pointer w-[105px] text-center font-mono">
            {formatTime(end)}
          </span>
        )}
        <div className="flex flex-col w-[16px] h-[32px] items-center justify-center border-[#598BF2] pl-[4px] py-[4px]">
          {editingEnd ? (
            <button onClick={saveEnd} className="text-green-500">✔</button>
          ) : (
            <>
              <button onClick={() => adjustEndTime(200)} className="text-blue-500 h-[16px] flex items-center justify-center"><UpIcon size={8}/></button>
              <button onClick={() => adjustEndTime(-200)} className="text-blue-500 h-[16px] flex items-center justify-center"><DownIcon size={8}/></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeRangePicker;


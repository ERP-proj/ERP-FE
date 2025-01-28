import React from "react";
import MiniCalendar from "./MiniCalendar";

interface MiniCalendarPopupProps {
  onDateClick: (date: string) => void;
}

const MiniCalendarPopup: React.FC<MiniCalendarPopupProps> = ({
  onDateClick,
}) => (
  <div className="absolute top-[55px] left-[39%] z-[100]">
    <MiniCalendar
      onDateClick={(date) => {
        onDateClick(date);
      }}
    />
  </div>
);

export default MiniCalendarPopup;

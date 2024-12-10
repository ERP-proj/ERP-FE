import React from "react";
import styled from "styled-components";
import MiniCalendar from "./MiniCalendar";

interface MiniCalendarPopupProps {
  onDateClick: (date: string) => void;
}

const MiniCalendarPopup: React.FC<MiniCalendarPopupProps> = ({
  onDateClick,
}) => (
  <PopupWrapper>
    <MiniCalendar
      onDateClick={(date) => {
        onDateClick(date);
      }}
    />
  </PopupWrapper>
);

export default MiniCalendarPopup;

const PopupWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

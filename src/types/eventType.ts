import { Dayjs } from "dayjs";
export interface SelectedEvent {
  // "YYYY-MM-DDTHH:MM:SS"
  startStr: string;
  endStr: string;

  mode: "add" | "edit";

  // "HH:MM"
  formattedStartTime?: string;
  formattedEndTime?: string;

  resourceId?: string;
  extendedProps?: {
    seatNumber?: string;
  };
  userName?: string;
  seatNumber?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  reservationId?: any;
}

export interface CalendarSetupProps {
  calendarRef: React.RefObject<HTMLDivElement>;
  clickedDate: Dayjs;
  setClickedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setShowMiniCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEvent: React.Dispatch<React.SetStateAction<SelectedEvent | null>>;
  now: Dayjs;
}

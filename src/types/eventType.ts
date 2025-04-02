export interface SelectedEvent {
  startStr: string;
  endStr: string;
  formattedStartTime: string;
  formattedEndTime: string;
  mode: "add" | "edit";
  resouceId: string;
  extendedProps: {
    seatNumber: string;
  };
}

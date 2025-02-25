import { loadReservation } from "@/api/reservation/loadReservation";
import SelectedEventModal from "@/app/main/SelectedEventModal";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ReservationModalProps {
  selectedEvent: any;
  onClose: () => void;
  calendarRef: any;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedEvent,
  onClose,
  calendarRef,
}) => {
  if (!selectedEvent) return null;

  const { position, startTime } = selectedEvent;

  const getEventDate = () => {
    if (!startTime) return null;
    return startTime.split("T")[0];
  };

  const refreshReservations = async () => {
    const eventDate = getEventDate();
    if (calendarRef.current && eventDate) {
      await loadReservation(eventDate, calendarRef);
    }
  };

  return (
    <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <DialogContent
        className="absolute z-50 bg-white p-6 rounded-xl shadow-lg border-0 flex max-w-auto"
        style={{
          top: position?.top || "50%",
          left: position?.left - 400 || "50%",
          transform: position ? "none" : "translate(-50%, -50%)",
        }}
      >
        <DialogTitle>
          <VisuallyHidden>숨겨진 제목</VisuallyHidden>
        </DialogTitle>
        <SelectedEventModal
          event={selectedEvent}
          onClose={() => {
            onClose();
            refreshReservations();
          }}
          refreshReservations={refreshReservations}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

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
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedEvent,
  onClose,
}) => {
  if (!selectedEvent) return null;

  const { position } = selectedEvent;

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
        <SelectedEventModal event={selectedEvent} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

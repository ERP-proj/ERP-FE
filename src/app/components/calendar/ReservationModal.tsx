import UserReservationInfo from "@/app/main/UserReservationInfo";
import { Dialog, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";

interface ResrvationModalProps {
  selectedEvent: any;
  onClose: () => void;
}

const ReservationModal: React.FC<ResrvationModalProps> = ({
  selectedEvent,
  onClose,
}) => {
  return (
    <Dialog open={!!selectedEvent} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30" />
      <DialogContent className="flex inset-0 m-auto max-w-lg p-4 bg-white rounded-lg shadow-lg">
        {selectedEvent ? (
          <UserReservationInfo event={selectedEvent} />
        ) : (
          "선택된 이벤트가 없습니다."
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

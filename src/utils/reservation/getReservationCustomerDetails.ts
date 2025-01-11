export default function getReservationCustomerDetails(
  reservationId: number
): Promise<number> {
  return fetch(
    `/api/reservation/getReservationCustomerDetails/${reservationId}`
  ).then((res) => res.json());
}

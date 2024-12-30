export default function getCustomerDetail(customerId: number): Promise<number> {
  return fetch(`/api/customer/getCustomerDetail/${customerId}`).then((res) =>
    res.json()
  );
}

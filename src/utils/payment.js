// UPI details used for the payment QR. Set VUE_APP_UPI_ID to the shop's real UPI ID.
export const UPI_ID = process.env.VUE_APP_UPI_ID || 'dhanalakshmicrackers@upi'
export const UPI_NAME = 'Dhanalakshmi Crackers'

export function buildUpiLink(amount) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_NAME,
    am: Number(amount).toFixed(2),
    cu: 'INR'
  })
  return `upi://pay?${params.toString()}`
}

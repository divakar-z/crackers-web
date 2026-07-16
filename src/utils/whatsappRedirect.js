/**
 * Generate WhatsApp redirect URL with order summary
 * @param {Object} order - Order details
 * @returns {string} WhatsApp URL
 */
export function generateWhatsAppURL(order) {
  const items = order.items.map(item => 
    `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
  ).join('\n')

  const message = `
🎆 *New Order - Dhanalakshmi Crackers*
━━━━━━━━━━━━━━━━━━━━━━

📦 *Order Items:*
${items}

━━━━━━━━━━━━━━━━━━━━━━

💰 Subtotal: ₹${order.subtotal.toLocaleString('en-IN')}
🎁 Discount: ${order.discount}%
${order.freeGift ? `✨ Free Gift: ${order.freeGift}` : ''}
${order.freeShipping ? '🚚 Free Shipping: Tamil Nadu' : ''}

💵 *Final Amount: ₹${order.finalAmount.toLocaleString('en-IN')}*

━━━━━━━━━━━━━━━━━━━━━━

📞 Customer Phone: ${order.customerPhone || 'Not provided'}
📅 Order Date: ${new Date().toLocaleDateString('en-IN')}

_Thank you for choosing Dhanalakshmi Crackers!_
  `.trim()

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/919942159948?text=${encodedMessage}`
}

/**
 * Open WhatsApp with order details
 * @param {Object} order - Order details
 */
export function redirectToWhatsApp(order) {
  const url = generateWhatsAppURL(order)
  window.open(url, '_blank')
}

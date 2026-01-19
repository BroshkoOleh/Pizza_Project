export function generatePayOrderEmail(params: {
  orderId: string;
  totalAmount: number;
  address: string;
  phone: string;
  firstName: string;
  paymentUrl: string;
}): string {
  const { orderId, totalAmount, address, phone, firstName, paymentUrl } = params;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FF6B00; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { 
            display: inline-block; 
            padding: 15px 30px; 
            background: #FF6B00; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px; 
            margin-top: 20px;
          }
          .order-details { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍕 Next Pizza</h1>
          </div>
          <div class="content">
            <h2>Order №${orderId}</h2>
            <p>Hello, ${firstName}!</p>
            <p>Thank you for your order. To complete your purchase, please proceed with the payment.</p>
            
            <div class="order-details">
              <h3>Order Details:</h3>
              <p><strong>Order Number:</strong> №${orderId}</p>
              <p><strong>Total Amount:</strong> ${totalAmount} $</p>
              <p><strong>Delivery Address:</strong> ${address}</p>
              <p><strong>Phone:</strong> ${phone}</p>
            </div>

            <center>
              <a href="${paymentUrl}" class="button">
                Pay for Order
              </a>
            </center>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              If the button doesn't work, copy this link:<br>
              <a href="${paymentUrl}">${paymentUrl}</a>
            </p>
          </div>
          <div class="footer">
            <p>© 2026 Next Pizza. Enjoy your meal! 🍕</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateSuccessfulPaymentEmail(params: {
  orderId: string;
  totalAmount: number;
  address: string;
  phone: string;
  firstName: string;
}): string {
  const { orderId, totalAmount, address, phone, firstName } = params;
  const homeUrl = process.env.NEXT_PUBLIC_APP_URL;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #f5f6fa;
            font-family: Arial, sans-serif;
            color: #1f2937;
          }
          .container {
            max-width: 620px;
            margin: 0 auto;
            padding: 24px 16px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);
          }
          .header {
            background: linear-gradient(135deg, #16a34a, #22c55e);
            color: #ffffff;
            padding: 26px 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            line-height: 1.3;
          }
          .content {
            padding: 28px 24px 18px;
          }
          .title {
            margin: 0 0 10px;
            font-size: 22px;
          }
          .text {
            margin: 0 0 14px;
            color: #4b5563;
            line-height: 1.6;
          }
          .order-details {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 16px;
            margin: 18px 0 22px;
          }
          .order-details h3 {
            margin: 0 0 10px;
            font-size: 16px;
          }
          .detail {
            margin: 0 0 8px;
            color: #374151;
            font-size: 14px;
          }
          .button-wrap {
            text-align: center;
            margin: 10px 0 18px;
          }
          .button {
            display: inline-block;
            padding: 13px 22px;
            border-radius: 10px;
            background: #ff6b00;
            color: #ffffff !important;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
          }
          .helper {
            margin: 0;
            color: #6b7280;
            font-size: 13px;
            text-align: center;
          }
          .helper a {
            color: #ff6b00;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding: 16px 24px 20px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <h1>Payment Successful</h1>
            </div>
            <div class="content">
              <h2 class="title">Order №${orderId}</h2>
              <p class="text">Hello, ${firstName}!</p>
              <p class="text">We received your payment successfully. Your order is now being prepared and will be delivered soon.</p>
              
              <div class="order-details">
                <h3>Order details</h3>
                <p class="detail"><strong>Order Number:</strong> №${orderId}</p>
                <p class="detail"><strong>Paid Amount:</strong> ${totalAmount} $</p>
                <p class="detail"><strong>Delivery Address:</strong> ${address}</p>
                <p class="detail"><strong>Phone:</strong> ${phone}</p>
              </div>

              <div class="button-wrap">
                <a href="${homeUrl}" class="button">Order Again</a>
              </div>

              <p class="helper">
                If the button does not work, use this link:
                <a href="${homeUrl}">${homeUrl}</a>
              </p>
            </div>
            <div class="footer">
              Thank you for choosing Next Pizza.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservation Confirmed - Bistro Bella</title>
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9fa;
        }
        .container {
            background-color: white;
            margin: 20px;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #ea580c;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ea580c;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
        }
        .reservation-details {
            background-color: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #ea580c;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
        }
        .detail-value {
            color: #6b7280;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .contact-info {
            background-color: #fef3c7;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .highlight {
            background-color: #ecfdf5;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #10b981;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Bistro Bella</div>
            <div class="subtitle">Reservation Confirmed</div>
        </div>

        <div class="highlight">
            <strong>Dear {{ $reservation->name }},</strong><br>
            Thank you for choosing Bistro Bella! Your reservation has been successfully confirmed.
        </div>

        <div class="reservation-details">
            <h3 style="margin-top: 0; color: #ea580c; font-size: 18px;">Reservation Details</h3>

            <div class="detail-row">
                <span class="detail-label">Reservation ID:</span>
                <span class="detail-value">#{{ $reservation->id }}</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">{{ $reservation->name }}</span>
            </div>

            @if($reservation->email)
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">{{ $reservation->email }}</span>
            </div>
            @endif

            @if($reservation->phone)
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">{{ $reservation->phone }}</span>
            </div>
            @endif

            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($reservation->reservation_date)->format('l, F j, Y') }}</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($reservation->reservation_time)->format('g:i A') }}</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span class="detail-value">{{ $reservation->guest_count }}</span>
            </div>

            @if($reservation->special_requests)
            <div class="detail-row">
                <span class="detail-label">Special Requests:</span>
                <span class="detail-value">{{ $reservation->special_requests }}</span>
            </div>
            @endif

            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: #10b981; font-weight: bold;">{{ ucfirst($reservation->status) }}</span>
            </div>
        </div>

        <div class="contact-info">
            <strong>Important Information:</strong><br>
            • Please arrive 10-15 minutes before your reservation time<br>
            • If you need to modify or cancel your reservation, please contact us at least 2 hours in advance<br>
            • For any questions, call us at (555) 123-4567 or email info@bistrobella.com
        </div>

        <div class="footer">
            <p>We look forward to serving you at Bistro Bella!</p>
            <p>123 Culinary Street, Food District, NY 10001</p>
            <p>© {{ date('Y') }} Bistro Bella. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
<?php

namespace App\Console\Commands;

use App\Mail\ReservationReminder;
use App\Models\Reservation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendReservationReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-reservation-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminder emails for upcoming confirmed reservations';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for confirmed reservations needing reminders...');

        // Get reservations that are exactly 30 minutes from now and confirmed
        $thirtyMinutesFromNow = Carbon::now()->addMinutes(30);

        $reservations = Reservation::where('status', 'confirmed')
            ->where('reminder_sent', false)
            ->whereNotNull('email')
            ->where('reservation_date', '>=', Carbon::today())
            ->get()
            ->filter(function ($reservation) use ($thirtyMinutesFromNow) {
                $reservationDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $reservation->reservation_date->format('Y-m-d') . ' ' . $reservation->reservation_time->format('H:i:s'));
                return $reservationDateTime->equalTo($thirtyMinutesFromNow->startOfMinute());
            });

        if ($reservations->isEmpty()) {
            $this->info('No reservations found that need reminders at this time.');
            return;
        }

        $this->info("Found {$reservations->count()} reservation(s) to remind.");

        $sentCount = 0;
        foreach ($reservations as $reservation) {
            try {
                Mail::to($reservation->email)->send(new ReservationReminder($reservation));
                $reservation->update(['reminder_sent' => true]);
                $this->line("✓ Sent reminder to {$reservation->email} for reservation #{$reservation->id}");
                $sentCount++;
            } catch (\Exception $e) {
                $this->error("✗ Failed to send reminder to {$reservation->email}: {$e->getMessage()}");
            }
        }

        $this->info("Successfully sent {$sentCount} reminder email(s).");
    }
}

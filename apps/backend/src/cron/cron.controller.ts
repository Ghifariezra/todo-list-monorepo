import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('cron')
export class CronController {
    constructor(private readonly appService: AppService) { }

    @Get('daily-reminder')
    async handleDailyReminder() {
        console.log("⏰ Menjalankan pengingat tugas...");
        return this.appService.sendAllReminders();
    }
}

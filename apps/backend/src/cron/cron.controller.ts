import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('cron')
export class CronController {
    constructor(private readonly appService: AppService) { }

    @Get('daily-reminder')
    dailyReminder(@Query('token') token: string) {
        if (token !== process.env.CRON_SECRET) {
            throw new UnauthorizedException('Invalid token');
        }
        return this.appService.handleDailyReminder();
    }
}

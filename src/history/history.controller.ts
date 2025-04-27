import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDTO } from './dto/historyCreateDTO';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('history')
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService, 
    ) {}


    @UseGuards(AuthGuard)
        @Post('create')
        async createLike(@Body() historydto: HistoryCreateDTO, @Req() req: any) {
            const userId = req.user_data.id;
            const data = await this.historyService.creatHistory(historydto, userId);
            return data;
        }
        
}
   

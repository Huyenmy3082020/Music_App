import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryCreateDTO } from './dto/historyCreateDTO';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createLike(@Body() historydto: HistoryCreateDTO, @Req() req: any) {
    const userId = req.user_data.id;
    const data = await this.historyService.createHistory(historydto, userId);
    return data;
  }
  @UseGuards(AuthGuard)
  @Get('getHistoryUser')
  getHistoryUser(@Req() req: any) {
    const userId = req.user_data.id;
    return this.historyService.getHistoryUser(userId);
  }
  // dem so luot nghe nhieu nhat cua bai nhac
  @UseGuards(AuthGuard)
  @Get('getHistoryTop')
  getHistoryTop(@Req() req: any) {
    const userId = req.user_data.id;
    return this.historyService.getHistoryTop(userId);
  }
}

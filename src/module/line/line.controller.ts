import { Controller, Post, Logger, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LineWebhookDto } from './line-webhook/webhook-dto/webhook.dto';
import { LineService } from './line.service';
import { WebhookGuard } from './webhook-guard/webhook.guard';

@Controller('line')
@UseGuards(WebhookGuard)
export class LineController {
  private readonly logger = new Logger();
  constructor(private readonly lineService: LineService) {}

  @Post('webhooks')
  async postLineWebhook(@Body() body: LineWebhookDto) {
    try {
      const response = await this.lineService.handleMessage(body);

      return response;
    } catch (err) {
      this.logger.log(err, LineController.name + ' postLineWebhook');

      return err;
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Get('create_link_token')
  async createLinkToken() {
    const link_token = await this.plaidService.createLinkToken();
    return { link_token };
  }
}

import { Controller, Get } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Get('create_link_token')
  async createLinkToken() {
    console.log('Creating link token...');
    const link_token = await this.plaidService.createLinkToken();
    return { link_token };
  }
}

import { Injectable } from '@nestjs/common';
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  CountryCode,
  Products,
} from 'plaid';

@Injectable()
export class PlaidService {
  private client: PlaidApi;

  constructor() {
    const config = new Configuration({
      basePath: PlaidEnvironments.sandbox, // or development / production
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
        },
      },
    });

    this.client = new PlaidApi(config);
  }

  async createLinkToken(): Promise<string> {
    const requestPayload = {
      user: {
        client_user_id: 'unique_user_id',
      },
      client_name: 'plaid-trail',
      products: [Products.Auth],
      language: 'en',
      webhook: 'https://www.plaid.com/webhook',

      country_codes: [CountryCode.Us],
    };

    try {
      const response = await this.client.linkTokenCreate(requestPayload);
      return response.data.link_token;
    } catch (error) {
      console.error('Error creating link token:', error);
      throw error;
    }
  }
}

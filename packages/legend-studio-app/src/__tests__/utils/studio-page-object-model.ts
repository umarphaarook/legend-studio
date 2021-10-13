/* eslint-disable no-process-env */
import type { BrowserContext, Page, Cookie } from '@playwright/test';
import { envs } from './consts';

type BaseURL = string | undefined;
interface BrowserCookie extends Cookie {
  name: string;
  value: string;
  url: string;
}

export class Studio {
  readonly context: BrowserContext;
  readonly page: Page;
  readonly baseURL: BaseURL;

  constructor(baseURL: BaseURL, context: BrowserContext, page: Page) {
    this.baseURL = baseURL;
    this.context = context;
    this.page = page;
    this.setCookies(context, baseURL);
  }

  async setCookies(context: BrowserContext, baseURL: BaseURL): Promise<void> {
    const cookies = Object.entries(envs).map(([key, val]) => ({
      name: val,
      value: process.env[key] || '',
      url: baseURL,
    })) as BrowserCookie[];
    await context.addCookies(cookies);
  }

  async goto(endpoint: string = '/'): Promise<void> {
    await this.page.goto(`${this.baseURL}${endpoint}`);
  }

  async pageRedirect(): Promise<string> {
    const url = `${this.baseURL}/studio/-/setup`;
    await this.page.waitForURL(url);
    return url;
  }
}

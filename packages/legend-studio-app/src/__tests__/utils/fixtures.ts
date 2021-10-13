import { test as base } from '@playwright/test';
import { Studio } from './studio-page-object-model';

// Extend basic test by providing a "Test" fixture.
export const test = base.extend<{ studio: Studio }>({
  studio: async ({ baseURL, context, page }, use) => {
    const studio = new Studio(baseURL, context, page);
    await use(studio);
  },
});

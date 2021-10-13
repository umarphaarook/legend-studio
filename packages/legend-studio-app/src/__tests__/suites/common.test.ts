import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';
import { envs } from '../utils/consts';

test.describe('Common', () => {
  test.beforeEach(async ({ studio }) => {
    await studio.goto();
  });

  test('Basic Checks', async ({ studio }) => {
    // Cookies
    const cookies = await studio.context.cookies();
    expect(cookies).toHaveLength(2);
    Object.values(envs).forEach((val, index) => {
      expect(cookies[index].name).toEqual(val);
    });

    // Redirect
    const redirectedUrl = await studio.pageRedirect();
    const currentPageUrl = studio.page.url();
    expect(redirectedUrl).toEqual(currentPageUrl);

    // Title
    await expect(studio.page).toHaveTitle('Legend Studio');

    // Header
    const appHeaderName = studio.page.locator('.app__header__app-name');
    await expect(appHeaderName).toHaveText('STUDIO');

    // Input Selectors
    const placeholders = studio.page.locator(
      '.selector-input--dark__placeholder',
    );
    await expect(placeholders.nth(0)).toHaveText('Choose an existing project');
    await expect(placeholders.nth(1)).toHaveText(
      'In order to select a workspace, a project must be selected',
    );

    // Buttons Initial State
    const projectsButton = await studio.page.isDisabled('text="View Project"');
    const workspaceButton = await studio.page.isDisabled('text="Next"');
    expect(projectsButton).toBeTruthy();
    expect(workspaceButton).toBeTruthy();
  });
});

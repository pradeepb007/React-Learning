import { test, expect, Page } from '@playwright/test';

const loginTestUsername = process.env.REACT_APP_LOGIN_TEST_USERNAME;
const loginTestPassword = process.env.REACT_APP_LOGIN_TEST_PASSWORD;
const BASE_URL = process.env.REACT_APP_PING_REDIRECT_URL || 'http://localhost:3000';

// Helper function to sign in
async function signIn(page: Page) {
  await page.goto(BASE_URL);

  // Click initial sign-in button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for redirect to Ping auth (fallback if already authenticated)
  let redirectedToAuth = true;
  try {
    await page.waitForURL(/\/fedauthtst\.pe\.com/, { timeout: 10000 });
  } catch (e) {
    redirectedToAuth = false;
    console.warn('No redirect to external auth, maybe session active?', e);
  }
  expect(redirectedToAuth).toBeTruthy();

  // Fill credentials and login if on auth page
  if (redirectedToAuth) {
    await page.getByLabel('Username').fill(loginTestUsername || '');
    await page.getByLabel('Password').fill(loginTestPassword || '');
    await page.locator('a', { hasText: 'Sign On' }).click();
  }

  // Wait for redirect back to app
  let returnedToApp = true;
  try {
    await page.waitForURL(BASE_URL + '**', { timeout: 30000 });
  } catch (e) {
    returnedToApp = false;
    console.error('Failed to return to app after login:', e);
  }
  expect(returnedToApp).toBeTruthy();

  // Wait for homepage to load completely
  // Suggest adding data-testid="home" in your Home component root
  await expect(page.getByTestId('home')).toBeVisible({ timeout: 20000 });

  // OR wait for dashboard heading
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible({ timeout: 20000 });

  // Optional: wait for loader to disappear
  await page.waitForSelector('.MuiCircularProgress-root', { state: 'detached', timeout: 20000 }).catch(() => {
    console.warn('Loader still visible after timeout — continuing...');
  });
}

// ------------------- TEST SUITE -------------------

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test('should display dashboard header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('should display Event Promo Plan card with link', async ({ page }) => {
    const card = page.getByTestId('event-promo-plan-card');
    await expect(card).toBeVisible();

    const heading = card.getByRole('heading', { name: /event promo plan/i });
    await expect(heading).toBeVisible();

    const showMoreLink = card.getByRole('link', { name: /show more/i });
    await expect(showMoreLink).toBeVisible();
  });
});

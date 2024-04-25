import { test, expect } from '@playwright/test';
const { describe } = require("node:test");


test('Verify log into app', async ({ page }) => {
  const BASE_URL = process.env.BASEURL
  console.log(BASE_URL+"rajesh");
  console.log("rajesh");
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('Verify place order', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installations' })).toBeVisible();
});

test('Verify place orders', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installations' })).toBeVisible();
});



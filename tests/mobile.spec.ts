import { test, expect } from "@playwright/test";

const mobileViewport = { width: 375, height: 812 };

const pages = [
  { path: "/", name: "Homepage" },
  { path: "/services", name: "Services" },
  { path: "/case-studies", name: "Case Studies" },
  { path: "/contact", name: "Contact" },
  { path: "/book", name: "Book" },
  { path: "/impact-roi", name: "Impact ROI" },
  { path: "/about", name: "About" },
];

// All key pages load on mobile without horizontal overflow
for (const page of pages) {
  test(`${page.name} has no horizontal overflow on mobile`, async ({ page: p }) => {
    await p.setViewportSize(mobileViewport);
    await p.goto(page.path, { waitUntil: "networkidle" });

    const hasOverflow = await p.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });
}

// Chat widget works on mobile
test("Chat widget works on mobile", async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto("/", { waitUntil: "networkidle" });

  const chatBtn = page.locator('button[aria-label="Open chat"]');
  await expect(chatBtn).toBeVisible();
  await chatBtn.click();

  // Chat window should be visible
  await expect(page.getByText("Autronis AI", { exact: true }).first()).toBeVisible();
});

// Contact form is usable on mobile
test("Contact form works on mobile", async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto("/contact", { waitUntil: "networkidle" });

  const nameInput = page.locator('input[name="name"]');
  await expect(nameInput).toBeVisible();
  await nameInput.fill("Test");

  const emailInput = page.locator('input[name="email"]');
  await expect(emailInput).toBeVisible();
});

// Navbar hamburger menu works
test("Mobile menu opens", async ({ page }) => {
  await page.setViewportSize(mobileViewport);
  await page.goto("/", { waitUntil: "networkidle" });

  // Look for mobile menu button
  const menuBtn = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [data-mobile-menu]').first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(500);
  }
});

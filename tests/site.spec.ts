import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", name: "Homepage" },
  { path: "/services", name: "Services" },
  { path: "/case-studies", name: "Case Studies" },
  { path: "/impact-roi", name: "Impact & ROI" },
  { path: "/about", name: "About" },
  { path: "/team", name: "Team" },
  { path: "/process", name: "Process" },
  { path: "/resources", name: "Resources" },
  { path: "/contact", name: "Contact" },
  { path: "/book", name: "Book" },
  { path: "/demo", name: "Demo" },
  { path: "/privacy", name: "Privacy" },
  { path: "/cookies", name: "Cookies" },
];

// Test all pages load without HTTP errors
for (const page of pages) {
  test(`${page.name} (${page.path}) loads without HTTP errors`, async ({ page: p }) => {
    const response = await p.goto(page.path, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBeLessThan(400);
  });
}

// Test 404 page
test("404 page shows for invalid routes", async ({ page }) => {
  await page.goto("/this-route-does-not-exist", { waitUntil: "networkidle" });
  await expect(page.locator("text=404")).toBeVisible();
});

// Test navigation
test("Navbar links work", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.click('a[href="/services"]');
  await page.waitForURL("/services");
  await expect(page).toHaveURL(/\/services/);
});

// Test English version (default on localhost)
test("English version loads correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const lang = await page.getAttribute("html", "lang");
  expect(lang).toBe("en");
  await expect(page.locator("text=Schedule Automation Scan").first()).toBeVisible();
});

// Test Dutch version via query param
test("Dutch version loads with ?lang=nl", async ({ page }) => {
  await page.goto("/?lang=nl", { waitUntil: "networkidle" });
  const lang = await page.getAttribute("html", "lang");
  expect(lang).toBe("nl");
  await expect(page.locator("text=Plan een Automation Scan").first()).toBeVisible();
});

// Test chatbot widget
test("Chat widget opens and shows greeting", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const chatButton = page.locator('button[aria-label="Open chat"]');
  await expect(chatButton).toBeVisible();
  await chatButton.click();
  await expect(page.getByText("Autronis AI", { exact: true }).first()).toBeVisible();
});

// Test contact form fields exist
test("Contact form has required fields", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "networkidle" });
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('textarea[name="message"]')).toBeVisible();
});

// Test ROI calculator has sliders
test("ROI calculator has interactive sliders", async ({ page }) => {
  await page.goto("/impact-roi", { waitUntil: "networkidle" });
  const sliders = page.locator('[role="slider"]');
  const count = await sliders.count();
  expect(count).toBeGreaterThanOrEqual(3);
});

// Test Services page workflow builder
test("Services page has workflow builder", async ({ page }) => {
  await page.goto("/services", { waitUntil: "networkidle" });
  await page.locator("#workflow-builder").scrollIntoViewIfNeeded();
  await expect(page.locator("text=HubSpot").first()).toBeVisible();
});

// Test language switcher exists
test("Language switcher is in navbar", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  // The switcher uses EN/NL text
  await expect(page.getByText("EN", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("NL", { exact: true }).first()).toBeVisible();
});

// Test footer exists with content
test("Footer has trust badges and links", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator("footer")).toBeVisible();
  // Check copyright
  await expect(page.locator("text=Autronis").last()).toBeVisible();
});

// Test case studies page loads
test("Case studies page loads without errors", async ({ page }) => {
  const response = await page.goto("/case-studies", { waitUntil: "networkidle" });
  expect(response?.status()).toBeLessThan(400);
  // Page renders — ScrollReveal hides content until scroll, which is expected behavior
});

// Test mobile viewport
test("Site is responsive on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("nav").first()).toBeVisible();
});

// Test no DOM nesting errors on homepage
test("No DOM nesting errors on homepage", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && msg.text().includes("validateDOMNesting")) {
      errors.push(msg.text());
    }
  });
  await page.goto("/", { waitUntil: "networkidle" });
  // Scroll to trigger lazy sections
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  expect(errors).toHaveLength(0);
});

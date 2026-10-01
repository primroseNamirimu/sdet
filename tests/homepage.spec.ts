// import { test, expect } from "@playwright/test";
// test("Example homepage has the correct title", async({ page }) => {
//     await page.goto("http://example.com/");
//     page.getByRole("heading");
//
//     await expect(page).toHaveTitle(/goooooooogle/);
// });
//
//

// import { test, expect } from "@playwright/test";
//
// test("user can login", async ({page }) => {
//     await page.goto("http://10.3.0.117:8000");
//    await page.getByLabel("username").fill("admin");
//    await page.getByLabel("password").fill("admin");
//    await page.getByRole("button",{ name: "LOGIN" }).click();
//    await expect(page).toHaveURL(/dashboard/)

//npx playwright test tests/homepage.spec.ts
// })


import { test, expect } from "@playwright/test"

test("Page has heading", async ( { page }) => {
   //Navigate to page
   await page.goto( "https://example.com/" );

   //Locate
   // let heading = await page.getByRole("heading"); --> wrong. getByRole doesn't need await, it doesn't perform an asynchronous browser function so..
    const heading = page.getByRole("heading");

    await expect(heading).toHaveText("Example Domain");
});

/*
* Given
* <h1>Test</h1>
* <h2> Contact </h2>
* <h3> Products </h3>
*
* writing const heading = page.getByRole("heading") will essentially create a locator matching all three.
* No overwriting, and it's not that the locator returns/should return a singular item.
*  the locator can match multiple elements.
*
* Issue comes when you try to select/do something that requires a single item ie
* await heading.click()
*
* Here Playwright will complain... as in "which one!! This is called Strictness violation
*
* Basically for operations which target a single element, Playwright expects the locator to resolve to exactly one matching element.
*
* <button>Save</button>
  <button>Cancel</button>
  <button>Save</button>
  *
  * to get the first save button
  * const saveButtons = page.getByRole("button", { name: "Save" });
  * saveButtons.first();
  * OR.....
  * page.getByRole("button", { name: "Save" }).first()
*
* A good locator should be coupled to the behavior or meaning you're testing, not irrelevant implementation details.
* "Which locator most clearly and reliably identifies the element I actually mean?"
* Stability depends on what we're coupling the test to
* Anchor your test to the most stable part of the application's intended behavior
* You want to choose a locator which when it breaks, it breaks for a meaningful reason
* */
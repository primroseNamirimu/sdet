import { test, expect } from "@playwright/test"
import {LoginPage} from "../pages/login";

// test("trial", async ({ page }) => {
//
//     await page.goto("https://www.saucedemo.com/");
//     console.log(await page.title());
// })
//
// test("control element", async ({ page }) => {
//     console.log(await page.title());
// })
//
// test("login with credentials", async({page}) => {
//     const username = process.env.STANDARD_USER;
//     const password = process.env.STANDARD_PASSWORD;
//
//     console.log(username, password);
// })

test.describe("Interview Questions",() =>{

    let username = "standard username"

    test("Test 1", async ({page}) => {
        username = "Primrose";
        console.log(username);
    });

    test("Test 2", async ({page}) => {
        console.log(username);
    })
})


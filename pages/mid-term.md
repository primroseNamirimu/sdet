/*
* SECTION A — TypeScript & JavaScript
* 1.
* let username:string = "Rose" is wha we call/refer to as explicit data type annotation. We are explicitly telling TS that this variable is string
* let username = "Rose"; is when we declare a variable and it's type is infered by TS {type inference)rather than us stating it. THis isn't necesarily loosely types, it's just inferred.
*
* 2. async means that "this function returns a promise"
* The function retruns Promise<"Rose">
*
* 3. getUser() means that we have called the async function and it will return a Promise to us. We can proceed with our function is the Promise is not
* yet available to us, and once it is, it'll be availed
* await on the hand will sstop execution of the function from which it has been called and wait for the promse to be retuned. Once we have the value, then execution of that
* func will resume
*
* 4.
* T is a generic type, we are basically saying, hey, this function takes an argument and its type we don't know explicitly but whatever will be supplied to you.
* (Okay, i might have forgotten this, I know it, but also don't know how to explain it... but let's not dwell on it )
*-----> "Whatever type you give me, I'll preserve that type through the function."
* 5.
* I don't know the difference but i do know them. They both can be used to declare variables and can be re-used in the codebase...
*
* Section B
* 6
* A right when the main() functions executes,B, After the second console.log, then d becasue the await result stops execution of main, then approximately after 2 seconds,
* C
*
* 7. await doesn't block Javascript. it pauses the function from within which it is called but JS keeps tunnng other parts of the
* the program.
* -----> "await pauses execution of the current async function until the Promise settles, but it doesn't block the JavaScript runtime from doing other work."
*
* section c
*
* 8. Page is the browser page whereas Locator is what helps us navigate to where an element on the page is located.
*
* ------> → represents a way to identify/interact with an element
*
* 9.
*  xxxxx const button = page.getByRole("button", { name: "Save" }); will look for elements with the role of a button, names "Save". Yes it will find the button immediately ( not a specific button, ut rather all elemts which fit that criteria, so, not a specific
* xxxxxxxx button per se but rather all elements with role button and name Save.
*
* ---> A Locator is essentially a description/query for an element.

When you do:

const button = page.getByRole("button", { name: "Save" });

Playwright doesn't need to immediately grab the DOM element and store it.

It creates a Locator object that represents:

"The button with accessible name Save."

Then when you do:

await button.click();

Playwright resolves that locator against the current page and performs the action.
*
*
* 10. we have 2 buttons so, to get the first button, we would do buttons.first().click();
*
* 11. C Because it is user-facing, B, it is also User-facing, A, then D. D is least preferable because a change in the code base can potentially break it.
* We should always choose locators based off the intended use case rather than developer implementations.
*
* 12
*
* 13. A username with 7 characters, 8 characters, 12 characters and 11 characters ( btw this came up in my bou practical test )
*
* 14.
* A negative test you are testing the scenario where the ideal outcome is not achieved. i.e a negative test for login functionality would be testing that the user can't succesfully log in.
* A validation test would be checking that the system is working as it should i.e a username of 8-12 characters, checking if 7 and 11 pass through would be a validation test. but checking that a wrong
* password fails an authentication test would be a negative test.
*
* ------> Validation testing asks: "Does the system enforce a specific input/business rule?" e.g Username must be 8–12 characters.
* ------> A validation test asks "does the system enforce a specific rule about the shape/format of input"
* —> e.g., email must contain @, password must be 8+ characters, phone number must be numeric.
* 
* ***
* ------> Negative testing asks: "What happens when we give the system something invalid/unexpected and does it handle it correctly?"
* ------> e.g Wrong password, Malformed input, Unexpected characters, Missing required fields
* ------> They can overlap. A boundary case can absolutely be a negative test.
* ------> a negative test asks "does the system correctly reject something it shouldn't accept" — e.g., wrong password, SQL injection string, empty field.
* --->>> the intent differs: negative testing is about resilience against wrong/malicious/unexpected input in general, 
* ---->>> validation testing is specifically about whether business rules on input format are enforced. 
* 
* ***** A good real-world tell: if your test is checking "the field rejects letters because it should only accept numbers" — that's validation. 
* ***** If your test is "wrong password, valid format, still rejected" — that's negative.
* 
* 15. the class is representing a LoginPage, which happens to have username,password,loginButton as properties. This class dictates that any object created from it, provies an argument of type Page
* In addittion, this class implements a func login which acts as an "act on the locators/elements" section of the class
*
* 16. new is creating an object of class LoginPage, called loginPage
* page is the argument as per the class constructor
* page is stored in the params as stated in the class i.e this.username = page.getByPlaceholder("username");
* this refers to the loginObject created
*
* 17. Archetectural separation
*
* 18.
* this assertion belongs in the spec
*
* 19. Playwright helps us automate the manual process, making it not just efficient,but also reliable across
* -----> "Playwright provides browser automation with reliable auto-waiting, strong locator strategies, cross-browser support, network interception, tracing, parallel execution 
* and integration with CI, allowing us to build maintainable end-to-end test suites."
*
* 20. The quality of the locators.
*
* 21.
* One that easily breaks
* i.e a test that relies on developer implemntation for it's locators
* -------> A test that produces inconsistent results when the underlying application hasn't changed.
*
* 22. Well, I isolate what failed, check logs to see why they failed.
*
* Bonus.
*
* the await expect() in this case is actually verifying the test so we can't/should not put it in the pageObject.
*
* -------> The Page Object should encapsulate how we interact with the page, while the spec expresses the scenario and verifies the expected outcome.
* --------> Putting the URL assertion inside login() would couple the login action to one particular expected outcome.
*
*
* */
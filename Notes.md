/*
*  Negative test
* What I would do:
* Enter a username for an account which is locked or doesn't exist
*
* What I expect
* Not be able to log in
*
* *  Validation test
* What I would do:
* Enter numbers in the field of username where usually it's text which is expected
*
* What I expect
* Not be able to log in with error message " Username should contain letters"
*
* *  Boundary test
* What I would do:
*
* What I expect
*
*
* *  security test
* What I would do:
* Log in and then immediately log out and repeat this a couple of times/multiple
* Log in with wrong credentials repeatedly
*
* What I expect
* To be locked out of the account with a notification of too many log in attempts i.e a triggered rate limit
* To be locked out of the account with a notification of too many failed log in attempts
*
* *  usability test
* What I would do:
*
* What I expect
*
*
* *  session test
* What I would do:
* Log in and then immiediately log out, then attempt pressing the browser back arrow
* Log in and leave the page un attended to / no activity
*
* What I expect
* The session to end once I logout
* The session to timeout with inactivity
*
*
* | Category      | Example                        |
  | ------------- | ------------------------------ |
  | Happy path    | Valid credentials → dashboard  |
  | Negative      | Invalid credentials            |
  | Validation    | Invalid input format           |
  | Boundary      | Minimum/maximum allowed length |
  | Security      | Brute-force protection         |
  | Security      | Account enumeration            |
  | Usability     | Clear error messages           |
  | Accessibility | Keyboard navigation            |
  | Session       | Logout invalidates session     |
  | Session       | Session timeout                |

* Negative test
* Scenario: Invalid credentials
* Precondition
* The browser is displaying the login page
*
* Action
* Enter a wrong password for that account
*
* Expected result
* Failed login attempt with generic error message not exposing sensitive inforamtion such as "Incorrect username or password"

* Boundary test
* Scenario Edge cases for the length requirement of username
*
* Precondition
* [ I confirmed the functional requirements for the username  ]
* The browser is displaying the login page
*
* Action
* -> The username should be between 8-12 characters with alphanumeric
* Enter a username of 7 characters
*
* Expected result
* The login attempt should fail with generic error message not exposing sensitive information such as "Incorrect username or password"
*
* Usability test
* Scenario Visibility of a password
*
* Precondition
* The browser is displaying the login page
*
* Action
* Toggle the password visibility icon to mask/unmask the password
*
* Expected result
*
* The password should be visible/masked depending on the toggle input
*
* Tests should be isolated from one another.
*
* Playwright can run tests in pararrel because each test gets it's own browser context
*
* "What makes a good automated test?"
* It should be deterministic, isolated, maintainable, and focused on one behavior.
*
* */

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
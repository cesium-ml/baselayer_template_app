from playwright.sync_api import expect


def test_front_page(page):
    page.goto("/")

    button = page.locator("button:has-text('Frontend-generated notification')")
    button.click()

    expect(page.get_by_text("Hello from Baselayer")).to_be_visible()


def test_push_notification(page):
    page.goto("/")

    button = page.locator("button:has-text('Backend-generated notification')")
    button.click()

    expect(
        page.get_by_text("Sample notification triggered by push_notification")
    ).to_be_visible()

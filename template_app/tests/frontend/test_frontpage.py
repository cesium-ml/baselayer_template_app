def test_front_page(page):
    page.goto("/")

    button = page.locator("button:has-text('Frontend-generated notification')")
    button.click()


def test_push_notification(page):
    page.goto("/")

    notification = page.locator("button:has-text('Backend-generated notification')")
    notification.wait_for()

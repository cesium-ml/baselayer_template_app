from playwright.sync_api import expect


def test_services_show_the_zygote_and_its_forks(page):
    page.goto("/")

    services = page.locator("table.services")
    expect(services.get_by_role("row", name="zygote")).to_be_visible()
    expect(services.locator("tr.forked", has_text="app:app_00")).to_be_visible()
    expect(services.get_by_text("running").first).to_be_visible()

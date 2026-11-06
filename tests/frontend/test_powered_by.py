from playwright.sync_api import expect


def test_powered_by_baselayer(page):
    page.goto("/")

    link = page.get_by_role("link", name="Powered by baselayer")
    expect(link).to_be_visible()
    expect(link).to_have_attribute("href", "https://github.com/cesium-ml/baselayer")

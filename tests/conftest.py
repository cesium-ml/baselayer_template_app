"""Test fixture configuration."""

import os
import pathlib
import time

import pytest
from playwright.sync_api import BrowserContext, Page, expect

from baselayer.app.config import load_config

print("Loading test configuration from test_config.yaml")
basedir = pathlib.Path(os.path.dirname(__file__)) / ".."
cfg = load_config([basedir / "test_config.yaml"])
base_url = f"http://localhost:{cfg['ports.app']}"


# Shared across tests in one module/file
# This is so that we keep login across tests in a single file
@pytest.fixture(scope="module")
def shared_context(browser):
    context = browser.new_context()
    page = context.new_page()

    retries = 5
    while retries > 0:
        try:
            page.goto(base_url)
        except Exception as e:
            print(f"Error: {e}")
            print(f"Could not connect to {base_url}... waiting 3s")
            time.sleep(2)
            retries -= 1
        else:
            if retries != 5:
                print(f"Connection to {base_url} established.")
            retries = -1

    if retries == 0:
        raise SystemExit(f"FATAL: could not connect to {base_url}")

    retries = 5
    while page.get_by_text("is being provisioned").count() > 0 and retries > 0:
        print("Server is provisioning... waiting 3s")
        time.sleep(3)
        retries -= 1

        # Hard refresh to avoid repeatedly seeing provisioning page
        context = browser.new_context()
        page = context.new_page()
        page.goto(base_url)

    login_link = page.wait_for_selector("a[href='/login/google-oauth2']")
    login_link.click()

    yield context

    context.close()


@pytest.fixture
def page(shared_context: BrowserContext) -> Page:
    """Customized playwright page fixture with shorter timeout and
    goto relative to server root.
    """
    page = shared_context.new_page()
    page.set_default_timeout(5000)

    page.old_goto = page.goto

    def goto(relative_url, **kwargs):
        page.old_goto(base_url + relative_url, **kwargs)

        websocket_status = page.locator("#websocketStatus")
        expect(websocket_status).to_have_attribute(
            "title", "WebSocket is connected & authenticated."
        )

    page.goto = goto

    return page


del load_config

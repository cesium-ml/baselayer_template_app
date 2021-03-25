'''Test fixture configuration.'''

import pytest
import os
import pathlib
from datetime import datetime
import distutils.spawn
import types
import shutil
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.common.exceptions import TimeoutException
from seleniumrequests.request import RequestMixin
from baselayer.app.config import load_config
from baselayer.app.test_util import (driver, MyCustomWebDriver, reset_state,
                                     set_server_url)


print('Loading test configuration from test_config.yaml')
basedir = pathlib.Path(os.path.dirname(__file__))/'../..'
cfg = load_config([basedir/'test_config.yaml'])
set_server_url(f'http://localhost:{cfg["ports.app"]}')

# set up a hook to be able to check if a test has failed
@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # execute all other hooks to obtain the report object

    outcome = yield
    rep = outcome.get_result()

    # set a report attribute for each phase of a call, which can
    # be "setup", "call", "teardown"

    setattr(item, "rep_" + rep.when, rep)

# check if a test has failed
@pytest.fixture(scope="function", autouse=True)
def test_failed_check(request):
    yield
    if request.node.rep_call.failed and 'driver' in request.node.funcargs:
        webdriver = request.node.funcargs['driver']
        take_screenshot_and_page_source(webdriver, request.node.nodeid)



# make a screenshot with a name of the test, date and time.
# also save the page HTML.
def take_screenshot_and_page_source(webdriver, nodeid):
    file_name = f'{nodeid}_{datetime.today().strftime("%Y-%m-%d_%H:%M")}.png'.replace(
        "/", "_"
    ).replace(":", "_")
    file_name = os.path.join(os.path.dirname(__file__), '../../test-results', file_name)
    pathlib.Path(file_name).parent.mkdir(parents=True, exist_ok=True)
    webdriver.save_screenshot(file_name)
    with open(file_name.replace('png', 'html'), 'w') as f:
        f.write(webdriver.page_source)

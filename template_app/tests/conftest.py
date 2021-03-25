'''Test fixture configuration.'''

import pytest
import os
import pathlib
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

# check if a test has failed
@pytest.fixture(scope="function", autouse=True)
def test_failed_check(request):

    gecko = Path('geckodriver.log')
    gecko.touch(exist_ok=True)

    # get the number of bytes in the file currently
    log_bytes = os.path.getsize(gecko)

    # add a separator to the geckodriver logs
    with open(gecko, 'a') as f:
        f.write(f'BEGIN {request.node.nodeid}\n')

    yield
    # request.node is an "item" because we use the default
    # "function" scope

    # add a separator to the geckodriver logs
    with open(gecko, 'a') as f:
        f.write(f'END {request.node.nodeid}\n')

    if request.node.rep_call.failed and 'driver' in request.node.funcargs:
        webdriver = request.node.funcargs['driver']
        take_screenshot_and_page_source(webdriver, request.node.nodeid)

    # delete the interstitial data from the geckodriver log by
    # truncating the file back to its original number of bytes
    with open(gecko, 'a') as f:
        f.truncate(log_bytes)


# make a screenshot with a name of the test, date and time.
# also save the page HTML.
def take_screenshot_and_page_source(webdriver, nodeid):
    file_name = f'{nodeid}_{datetime.today().strftime("%Y-%m-%d_%H:%M")}.png'.replace(
        "/", "_"
    ).replace(":", "_")
    file_name = os.path.join(os.path.dirname(__file__), '../../test-results', file_name)
    Path(file_name).parent.mkdir(parents=True, exist_ok=True)

    webdriver.save_screenshot(file_name)
    with open(file_name.replace('png', 'html'), 'w') as f:
        f.write(webdriver.page_source)

    file_name = (
        f'{nodeid}_{datetime.today().strftime("%Y-%m-%d_%H:%M")}.console.log'.replace(
            "/", "_"
        ).replace(":", "_")
    )
    file_name = os.path.join(
        os.path.dirname(__file__), '../../webdriver-console', file_name
    )
    Path(file_name).parent.mkdir(parents=True, exist_ok=True)

    with open(file_name, 'w') as f, open('geckodriver.log', 'r') as gl:
        lines = gl.readlines()
        revlines = list(reversed(lines))
        istart = revlines.index(f'BEGIN {nodeid}\n')
        iend = revlines.index(f'END {nodeid}\n')
        f.write('\n'.join(list(reversed(revlines[iend : (istart + 1)]))))  # noqa: E203

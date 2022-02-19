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
from seleniumrequests.request import RequestsSessionMixin
from baselayer.app.config import load_config
from baselayer.app.test_util import (driver, MyCustomWebDriver, reset_state,
                                     set_server_url)


print('Loading test configuration from test_config.yaml')
basedir = pathlib.Path(os.path.dirname(__file__))/'../..'
cfg = load_config([basedir/'test_config.yaml'])
set_server_url(f'http://localhost:{cfg["ports.app"]}')

"""Test fixture configuration."""

import os
import pathlib

from baselayer.app.config import load_config as _load_config

# Fixtures for other tests
from baselayer.app.test_util import MyCustomWebDriver, driver, reset_state  # noqa: F401
from baselayer.app.test_util import set_server_url as _set_server_url

# Server connection configuration
print("Loading test configuration from test_config.yaml")
basedir = pathlib.Path(os.path.dirname(__file__)) / "../.."
cfg = _load_config([basedir / "test_config.yaml"])
_set_server_url(f"http://localhost:{cfg['ports.app']}")

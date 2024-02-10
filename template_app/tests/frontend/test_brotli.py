import os
import pathlib
import requests

from baselayer.app.config import load_config as _load_config

basedir = pathlib.Path(os.path.dirname(__file__)) / "../../.."
cfg = _load_config([basedir / "test_config.yaml"])
server_url = f'http://localhost:{cfg["ports.app"]}'

def test_brotli():
    # Test that the server is using Brotli compression
    # when requested by the client
    r = requests.get(server_url, headers={"Accept-Encoding": "br"})
    assert r.status_code == 200
    assert r.headers.get("Content-Encoding") == "br"
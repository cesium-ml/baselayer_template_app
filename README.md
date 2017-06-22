# Baselayer Template App

This template application shows how to leverage Cesium's BaseLayer to
get a batteries-included web application.  It includes:

- A Tornado-based Python web application that can be customized to your liking
- WebSockets
- JavaScript 6 compilation via Babel, with a Redux & React frontend
- Process management via supervisord
- Proxy configuration via nginx
- Authentication (currently using Google) via Python Social Auth
- Distributed task computation, via `dask` and `distributed`

## Customization guide

1. Clone this repository:

   `git clone --recursive git://github.com/cesium-ml/baselayer_template_app`

To be completed.

## Upgrading baselayer

`make baselayer-update`

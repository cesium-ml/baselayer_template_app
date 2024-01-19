# Baselayer Template App

This template application shows how to leverage Cesium's BaseLayer to
get a batteries-included web application. It includes:

- A Tornado-based Python web application that can be customized to your liking
- WebSockets
- JavaScript 6 compilation via Babel, with a Redux & React frontend
- Process management via supervisord
- Proxy configuration via nginx
- Authentication (currently using Google) via Python Social Auth
- Distributed task computation, via `dask` and `distributed`

## Customization guide

Clone this repository:

`git clone --recursive git://github.com/cesium-ml/baselayer_template_app`

Initialize the database (see database permissions below):

`make db_init`

Start the application with:

`make run`

In another window, run `make log`.

You should now be able to navigate to `http://localhost:5000`.

Run `make help` for descriptions of other Make targets.

## Documentation

Please refer to http://cesium-ml.org/baselayer/ for more detailed instructions.

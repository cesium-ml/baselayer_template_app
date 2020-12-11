import tornado.web

from baselayer.app import models, model_util

from .handlers.example_computation import ExampleComputationHandler
from .handlers.push_notification import PushNotificationHandler


def make_app(
        cfg, baselayer_handlers, baselayer_settings, process=None, env=None
):
    """Create and return a `tornado.web.Application` object with specified
    handlers and settings.

    Parameters
    ----------
    cfg : Config
        Loaded configuration.  Can be specified with '--config'
        (multiple uses allowed).
    baselayer_handlers : list
        Tornado handlers needed for baselayer to function.
    baselayer_settings : cfg
        Settings needed for baselayer to function.
    process : int
        When launching multiple app servers, which number is this?
    env : dict
        Environment in which the app was launched.  Currently only has
        one key, 'debug'---true if launched with `--debug`.

    """
    if cfg['cookie_secret'] == 'abc01234':
        print('!' * 80)
        print('  Your server is insecure. Please update the secret string ')
        print('  in the configuration file!')
        print('!' * 80)

    handlers = baselayer_handlers + [
        #    (r'/some_url(/.*)?', MyTornadoHandler),
        (r'/example_compute', ExampleComputationHandler),
        (r'/push_notification', PushNotificationHandler)
    ]

    settings = baselayer_settings
    settings.update({})  # Specify any additional Tornado settings here

    app = tornado.web.Application(handlers, **settings)
    models.init_db(**cfg['database'])

    if process == 0:
        model_util.create_tables(add=env.debug)

    app.cfg = cfg

    return app

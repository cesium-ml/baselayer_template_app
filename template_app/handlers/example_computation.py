import tornado.web
import tornado.ioloop

from baselayer.app.handlers import BaseHandler

import time


class ExampleComputationHandler(BaseHandler):
    async def _await_calculation(self, squares):
        try:
            squares = await squares

            self.action('baselayer/SHOW_NOTIFICATION',
                        payload={'note': 'Calculation completed'})

            self.action('template_app/EXAMPLE_RESULT',
                        payload={'squares': squares})

        except Exception as e:
            self.action(
                'baselayer/SHOW_NOTIFICATION',
                payload={'note': 'Error executing calculation: ' + str(e),
                         'type': 'error'}
            )

    @tornado.web.authenticated
    async def post(self):
        data = self.get_json()

        n = data['n']

        # Get Dask client
        client = await self._get_client()

        def slow_square(x):
            time.sleep(2)
            return x

        futures = client.map(slow_square, range(int(n)))
        squares = client.gather(futures)

        loop = tornado.ioloop.IOLoop.current()
        loop.spawn_callback(self._await_calculation, squares)

        self.success(
            action='baselayer/SHOW_NOTIFICATION',
            payload={'note': 'Computation n={} submitted'.format(n)}
        )

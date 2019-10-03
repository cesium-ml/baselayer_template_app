import tornado.web
import tornado.ioloop

from baselayer.app.handlers import BaseHandler

import time


class ExampleComputationHandler(BaseHandler):
    async def _await_calculation(self, squares):
        try:
            squares = await squares

            self.push_notification(note='Calculation completed')

            self.action('template_app/EXAMPLE_RESULT',
                        payload={'squares': squares})
            return self.success()

        except Exception as e:
            self.push_notification('Error executing calculation: ' + str(e),
                                   'error')
            return self.error('Error executing calculation: ' + str(e))

    @tornado.web.authenticated
    async def post(self):
        data = self.get_json()

        n = data['n']

        # Get Dask client
        client = await self._get_client()

        def slow_square(x):
            time.sleep(2)
            return x ** 2

        futures = client.map(slow_square, range(int(n)))
        squares = client.gather(futures)

        loop = tornado.ioloop.IOLoop.current()
        loop.spawn_callback(self._await_calculation, squares)

        self.push_notification('Computation n={} submitted'.format(n))
        return self.success()

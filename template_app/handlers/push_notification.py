import tornado.web

from baselayer.app.handlers import BaseHandler

import time


class PushNotificationHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.push_notification('Sample notification triggered by push_notification')

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

from baselayer.app import models, model_util
from baselayer.app.models import User, ACL, DBSession
from baselayer.app.env import load_env

from .fixtures import (
    PublicModelFactory,
    RestrictedModelFactory,
    CompositeAndModelFactory,
    CompositeOrModelFactory,
    UserAccessibleModelFactory,
    RelatedModelFactory,
    UserFactory
)


print('Loading test configuration from test_config.yaml')
basedir = pathlib.Path(os.path.dirname(__file__))/'../..'
cfg = load_config([basedir/'test_config.yaml'])
set_server_url(f'http://localhost:{cfg["ports.app"]}')
models.init_db(**cfg['database'])

acl = ACL.create_or_get('System admin')
DBSession().add(acl)
DBSession().commit()

@pytest.fixture()
def super_admin_user():
    return UserFactory(acls=[acl])


@pytest.fixture()
def user():
    return UserFactory()


@pytest.fixture()
def public_model():
    return PublicModelFactory()


@pytest.fixture()
def restricted_model():
    return RestrictedModelFactory()


@pytest.fixture()
def related_model(user):
    return RelatedModelFactory(user=user)


@pytest.fixture()
def user_accessible_model(super_admin_user):
    return UserAccessibleModelFactory(user=super_admin_user)


@pytest.fixture()
def composite_and_model(super_admin_user, user):
    return CompositeAndModelFactory(last_modified_by=super_admin_user, user=user)


@pytest.fixture()
def composite_or_model(super_admin_user, user):
    return CompositeOrModelFactory(last_modified_by=super_admin_user, user=user)

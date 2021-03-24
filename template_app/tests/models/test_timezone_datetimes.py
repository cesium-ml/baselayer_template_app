from datetime import datetime, timedelta, timezone
import uuid

from baselayer.app.models import DBSession, User, init_db
from baselayer.app.env import load_config

cfg = load_config(config_files=["test_config.yaml"])
init_db(**cfg["database"])


def test_input_timezone_is_respected():
    # This is 2021-03-24 2PM (PDT) - Los Angeles time
    pdt_2pm = datetime.fromisoformat("2021-03-24T14:00:00-07:00")

    # Create a new User with a created_at at 2021-03-24 2PM (PDT)
    username = uuid.uuid4().hex
    user = User(username=username, created_at=pdt_2pm)
    DBSession.add(user)
    DBSession.commit()

    # Since the User was created at 2PM (PDT), which is 7 hours behind UTC,
    # the database should have stored 9PM that day as the created_at.
    # So if we filter by created_at < 7PM on that day, we should not see the
    # new user.
    #
    # If the created_at field were using default behavior instead
    # of the custom TZDateTime type, the timezone info inputed above would
    # just be ignored and 2PM put in as the time instead of being used to
    # convert to a correct UTC timestamp before being added to the database.
    # So, if this query returns the user, we know timezone info was ignored on
    # SQLAlchemy datetime inputs.
    utc_7pm = datetime.fromisoformat("2021-03-24T19:00:00")
    users = (
        DBSession.query(User)
        .filter(User.username == username, User.created_at < utc_7pm)
        .all()
    )

    assert len(users) == 0


def test_retrieved_datetimes_have_timezone_info():
    # Create a new User
    username = uuid.uuid4().hex
    user = User(username=username)
    DBSession.add(user)
    DBSession.commit()

    # Verify that datetimes retrieved from the database are tagged with timezone info
    user = DBSession.query(User).filter(User.username == username).first()
    assert user is not None
    assert user.created_at.tzinfo is not None
    assert user.created_at.tzinfo == timezone.utc

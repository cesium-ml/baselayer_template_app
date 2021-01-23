def test_user_can_read_public_model(user, public_model):
    assert public_model.is_accessible_by(user)


def test_super_user_can_read_public_model(super_admin_user, public_model):
    assert public_model.is_accessible_by(super_admin_user)


def test_user_can_read_restricted_model(user, restricted_model):
    assert not restricted_model.is_accessible_by(user)  # need System admin


def test_super_user_can_read_restricted_model(super_admin_user, restricted_model):
    assert restricted_model.is_accessible_by(super_admin_user)


def test_user_can_read_related_model(user, related_model):
    # user must be able to delete related record
    assert not related_model.is_accessible_by(user)  


def test_super_user_can_read_related_model(super_admin_user, related_model):
    assert related_model.is_accessible_by(super_admin_user)


def test_user_can_read_user_accessible_model(user, user_accessible_model):
    assert not user_accessible_model.is_accessible_by(user)


def test_super_admin_user_can_read_user_accessible_model(super_admin_user, user_accessible_model):
    assert user_accessible_model.is_accessible_by(super_admin_user)


def test_user_can_read_composite_and_model(user, composite_and_model):
    # last_modified_by must be the same as user, but is super_admin_user
    assert not composite_and_model.is_accessible_by(user)


def test_super_admin_user_can_read_composite_and_model(super_admin_user, composite_and_model):
    assert composite_and_model.is_accessible_by(super_admin_user)


def test_user_can_read_composite_or_model(user, composite_or_model):
    assert composite_or_model.is_accessible_by(user)


def test_super_admin_user_can_read_composite_or_model(super_admin_user, composite_or_model):
    assert composite_or_model.is_accessible_by(super_admin_user)

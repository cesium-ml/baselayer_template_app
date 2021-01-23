import sqlalchemy as sa
from sqlalchemy.orm import relationship

from baselayer.app.models import (
    AccessibleIfRelatedRowsAreAccessible, 
    AccessibleIfUserMatches, 
    public,
    restricted,
    Base,
    User,
    Token
)

class PublicModel(Base):
    update = delete = public


class RestrictedModel(Base):
    create = read = restricted


class UserAccessibleModel(Base):
    create = read = update = delete = AccessibleIfUserMatches('user')

    user_id = sa.Column(
        sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    ) 
    user = relationship('User')


class RelatedModel(Base):
    create = read = update = delete = AccessibleIfRelatedRowsAreAccessible(user="delete")

    user_id = sa.Column(
        sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    ) 
    user = relationship('User')


class CompositeAndModel(Base):
    create = read = update = delete = (
        AccessibleIfUserMatches('user') & 
        AccessibleIfUserMatches('last_modified_by')
    )

    user_id = sa.Column(
        sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    ) 
    user = relationship('User', foreign_keys=[user_id])

    last_modified_by_id = sa.Column(
        sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    last_modified_by = relationship('User', foreign_keys=[last_modified_by_id])


class CompositeOrModel(Base):
    create = read = update = delete = (
        AccessibleIfUserMatches('user') |
        AccessibleIfUserMatches('last_modified_by')
    )

    user_id = sa.Column(
        sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    ) 
    user = relationship('User', foreign_keys=[user_id])

    last_modified_by_id = sa.Column(
        sa.Integer, sa.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True
    )
    last_modified_by = relationship('User', foreign_keys=[last_modified_by_id])


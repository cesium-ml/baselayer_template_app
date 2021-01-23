from template_app.models import (
    PublicModel,
    RestrictedModel,
    CompositeAndModel,
    CompositeOrModel,
    UserAccessibleModel,
    RelatedModel,
    User
)

from baselayer.app.models import DBSession

import factory
import uuid


class BaseMeta:
    sqlalchemy_session = DBSession()
    sqlalchemy_session_persistence = 'commit'


class UserFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = User

    username = factory.LazyFunction(lambda: str(uuid.uuid4()))
    contact_email = factory.LazyFunction(lambda: f'{uuid.uuid4().hex[:10]}@gmail.com')
    first_name = factory.LazyFunction(lambda: f'{uuid.uuid4().hex[:4]}')
    last_name = factory.LazyFunction(lambda: f'{uuid.uuid4().hex[:4]}')

    @factory.post_generation
    def acls(obj, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for acl in extracted:
                obj.acls.append(acl)
                DBSession().add(obj)
                DBSession().commit()


class PublicModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = PublicModel
    

class RestrictedModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = RestrictedModel


class CompositeAndModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = CompositeAndModel
    
    user = factory.SubFactory(UserFactory)
    last_modified_by = factory.SubFactory(UserFactory)

    
class CompositeOrModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = CompositeOrModel
    
    user = factory.SubFactory(UserFactory)
    last_modified_by = factory.SubFactory(UserFactory)


class UserAccessibleModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = UserAccessibleModel

    user = factory.SubFactory(UserFactory)


class RelatedModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta(BaseMeta):
        model = RelatedModel
    
    user = factory.SubFactory(UserFactory) 

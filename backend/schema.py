import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from .models import Todo

class TodoObject(SQLAlchemyObjectType):
    class Meta:
        model = Todo
        interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    all_todos = SQLAlchemyConnectionField(TodoObject)

class CreateTodoMutation(relay.ClientIDMutation):
    class Input:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        time = graphene.String(required=True)

    todo = graphene.Field(lambda: TodoObject)

    def mutate_and_get_payload(root, info, **input):
        todo = Todo(
            title=input.get('title'),
            description=input.get('description'),
            time=input.get('time')
        )
        db.session.add(todo)
        db.session.commit()
        return CreateTodoMutation(todo=todo)

class Mutation(graphene.ObjectType):
    create_todo = CreateTodoMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

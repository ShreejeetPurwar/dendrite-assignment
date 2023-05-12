from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_graphql import GraphQLView
from .schema import schema
from keycloak import Keycloak
from keycloak.flask import keycloak_required

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)

keycloak = Keycloak(app)

# Keycloak protected GraphQL endpoint
app.add_url_rule(
    '/graphql',
    view_func=keycloak_required(GraphQLView.as_view('graphql', schema=schema, graphiql=True))
)

# Stripe payment processing
@app.route('/process-payment', methods=['POST'])
def process_payment():
    # Payment processing logic goes here
    pass

if __name__ == '__main__':
    app.run(debug=True)

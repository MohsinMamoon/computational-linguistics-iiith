# Import flask and template operators
from flask import Flask, jsonify
from flask_cors import CORS

# Import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

# Define the WSGI application object
app = Flask(__name__)
CORS(app)

# Configurations
app.config.from_object('config')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Import a module / component using its blueprint handler variable
from app.sentences.controllers import mod_sent
from app.quiz.controllers import mod_ques

# Register blueprint(s)
app.register_blueprint(mod_sent)
app.register_blueprint(mod_ques)

# Build the database:
db.create_all()

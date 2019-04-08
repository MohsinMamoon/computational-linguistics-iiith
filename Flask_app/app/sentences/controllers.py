from flask import Blueprint, request, session, jsonify
from app import db
from .models import Sentence
import random
import itertools
import json

mod_sent = Blueprint('sentence', __name__, url_prefix='/sentences')


@mod_sent.route('/add', methods=['POST'])
def add_sentence():
    '''
        Adds a new Sentence to the table
        Takes input from the form sent with the request
        Returns an object with status = true for succesful addition and object of sentence added
    '''
    words = ''
    for i in json.loads(request.form['Words']):
        words += i + ','
    words = words[:len(words)-1]

    variations = ''
    for (i,j) in zip(json.loads(request.form['Vars']), json.loads(request.form['Var_type'])):
        variations += i + ':' + j + ','
    variations = variations[:len(variations)-1]
    
    language = request.form['Lang']

    new_sentence = Sentence(words, variations, language)
    db.session.add(new_sentence)
    db.session.commit()

    return jsonify(success=True, sentence=new_sentence.to_dict())

@mod_sent.route('/', methods=['GET'])
def get_all_sentences():
    '''
        Fetches all sentences from the database
        Takes no input
        Returns an array containing objects of every sentence in the database
    '''
    sentences = Sentence.query.all()
    
    return jsonify(sentences=[sent.to_dict() for sent in sentences])

@mod_sent.route('/get', methods=['GET'])
def get_random():
    '''
        Fethces a random sentence for the experiment
        Takes language from the request
    '''
    lang = request.args.get('lang')
    sent = Sentence.query.filter_by(Language=lang).all()
    sent = random.choice(sent)

    return jsonify(status=True, sentence=sent.to_dict()) 

@mod_sent.route('/delete', methods=['GET'])
def del_id():
    '''
        Deletes a sentence of given ID
        Takes ID from the get request
    '''
    id_to_del = request.args.get('id')
    sent = Sentence.query.filter_by(ID=id_to_del).first()
    db.session.delete(sent)
    db.session.commit()

    return jsonify(status=True)
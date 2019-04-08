from flask import Blueprint, request, session, jsonify
from app import db
from .models import Questions

mod_ques = Blueprint('questions', __name__, url_prefix='/questions')

@mod_ques.route('/add', methods=['POST'])
def add_Question():
    '''
        Adds a new Question to the table
        Takes input from the form sent with the request
        Returns an object with status = true for succesful addition and object of question added
    '''
    ques = request.form['Question']
    answer = int(request.form['Answer'])
    lang = request.form['Language']
    options = [request.form['Option'+str(i)] for i in range(1, 5)]
    
    new_question = Questions(ques, options, answer, lang)
    db.session.add(new_question)
    db.session.commit()

    return jsonify(success=True, question=new_question.to_dict())

@mod_ques.route('/', methods=['GET'])
def show_all_questions():
    '''
        Fetches all question from the database
        Takes no input
        Returns an arary containing objects of every question in the database
    '''
    questions = Questions.query.all()

    return jsonify(status=True, questions=[ques.to_dict() for ques in questions])

@mod_ques.route('/get', methods=['GET'])
def get_lang():
    '''
        Fetches all questions of a particular language
        Takes input from request
        Returns an array containing objects of every question with given language
    '''
    lang = request.args.get('lang')
    questions = Questions.query.filter_by(Language=lang).all()

    return jsonify(questions=[ques.to_dict() for ques in questions])

@mod_ques.route('/delete', methods=['GET'])
def del_id():
    '''
        Deletes a Question of given ID
        Takes ID from the get request
    '''
    id_to_del = request.args.get('id')
    ques = Questions.query.filter_by(ID=id_to_del).first()
    db.session.delete(ques);
    db.session.commit();

    return jsonify(status=True)
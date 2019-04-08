from flask_sqlalchemy import SQLAlchemy
from app import db

class Questions(db.Model):
    '''
        Table which stores the Questions for quiz
    ''' 
    id = db.Column(db.Integer, primary_key=True)
    Question = db.Column(db.String, unique=True)
    Option1 = db.Column(db.String, unique=False)
    Option2 = db.Column(db.String, unique=False)
    Option3 = db.Column(db.String, unique=False)
    Option4 = db.Column(db.String, unique=False)
    Language = db.Column(db.String, unique=False)
    Answer = db.Column(db.Integer, unique=False)

    def __init__(self, ques, options, answer, lang):
        '''
            Intializes a record in the table questions
            ques: string
            options: list of 4 strings(4 options)
            answer: Integer (1-4)
            lang: String
        '''
        self.Question = ques
        self.Language = lang
        self.Answer = answer
        self.Option1 = options[0]
        self.Option2 = options[1]
        self.Option3 = options[2]
        self.Option4 = options[3]
    
    def to_dict(self):
        '''
            Returns a question parsed as an object of:
            1. Question
            2. Array of 4 options
            3. Answer to the question
            4. Language of the question
        '''
        return {
            'ID' : self.id,
            'Question' : self.Question,
            'Options' : [self.Option1, self.Option2, self.Option3, self.Option4],
            'Answer' : self.Answer,
            'Language' : self.Language
        }
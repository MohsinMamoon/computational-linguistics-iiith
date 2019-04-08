from flask_sqlalchemy import SQLAlchemy
from app import db

class Sentence(db.Model):
    '''
        Table which stores the sentences for simulation
    '''
    id = db.Column(db.Integer, primary_key=True)
    Words = db.Column(db.String, unique=False)
    Variations = db.Column(db.String, unique=False)
    Language = db.Column(db.String, unique=False)

    def __init__ (self, words, variations, language):
        '''
            Intializes a record in the table sentences
            words: String
            variations: String
            language: String
        '''
        self.Words = words.lower()
        self.Variations = variations.lower()
        self.Language = language

    def to_dict(self):
        '''
            Returns a sentence parsed as an object of:
            1. Array of words.
            2. Dictionary of sentence variations and their types.
            3. Language of the sentence
        '''
        sent = {}

        sent['Words'] = self.Words.split(',')
        for i,j in enumerate(sent['Words']):
            sent['Words'][i] = j.capitalize()

        sent_vars = {}
        for j in self.Variations.split(','):
            sent_pres = j.split(':')
            sent_vars[sent_pres[0]] = sent_pres[1]
        sent['Variations'] = sent_vars

        sent['Language'] = self.Language

        sent['ID'] = self.id
                
        return sent

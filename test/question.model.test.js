var chai = require('chai');
var should = chai.should();
var questionModel = require('./../model/question.model')();

const Results = {
    1: '1. 2\n',
    2: '2. Wes Jackson\n',
    3: '3. 2862\n',
    all: '1. 2\n2. Wes Jackson\n3. 2862\n'
}

describe('QuestionModel', () => {
    describe('getAnswer', () => {
        it('should add questions correctly formatted', done => {
            questionModel.getAnswer(1).should.be.eq(Results['1']);
            questionModel.getAnswer(2).should.be.eq(Results['2']);
            questionModel.getAnswer(3).should.be.eq(Results['3']);
            done();
        });
    });
    
    describe('getAnswers', () => {
        it('should show all answers correctly formatted', done => {
            questionModel.getAnswers().should.be.eq(Results.all);
            done();
        });
    });
})
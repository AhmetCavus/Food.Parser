'use strict';

// Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();

var server = require('./../index');

const RESULT = {
    1: '1. 2\n',
    2: '2. Wes Jackson\n',
    3: '3. 2862\n',
    ALL: '1. 2\n2. Wes Jackson\n3. 2862\n'
}

describe('App', () => {
    describe('/GET questions', () => {
            it('Should GET all the answers correctly formatted', done => {
                chai.request('localhost:8080')
                    .get('/questions')
                    .then(res => {
                        res.should.have.status(200);
                        res.text.should.be.eq(RESULT.ALL);
                        done();
                    })
                    .catch(err => {
                        done(err);
                    });
            });
    });

    for (var id in RESULT){
        testQuestionsWithParameter(id);
    }
        
});

function testQuestionsWithParameter(id) {
    if(isNaN(id)) return;
    describe('/GET questions/' + id, () => {
        it('Should GET the answer for ' + id, done => {
            chai.request('localhost:8080')
                .get('/questions/' + id)
                .then(res => {
                    res.should.have.status(200);
                    res.text.should.be.eq(RESULT[id]);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
}
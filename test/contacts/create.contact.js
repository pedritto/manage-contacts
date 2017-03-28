process.env.NODE_ENV = 'test';

const mongoose   = require('mongoose');
const chai       = require('chai');
const chaiHttp   = require('chai-http');
const httpStatus = require('http-status');
const should     = chai.should();

const Contact = require('../../src/models/contact.schema');
const app     = require('../../src/app');

const uri = '/api/v1/contacts';

chai.use(chaiHttp);

describe('Create Contact', () => {
    beforeEach((done) => {
        Contact.remove({}, (err) => {
           done();
        });
    });

  describe('/POST contact', () => {
      it('it should CREATE a new contact', (done) => {
        const testContact = {
          name:          'Test Contact',
          address:       'Test Address',
          contactNumber: '123123',
          email:         'test.contact@tst.com'
        };

        chai.request(app)
            .post(uri)
            .send(testContact)
            .end((error, response) => {
                response.should.have.status(httpStatus.CREATED);
                response.body.should.have.property('name')
                  .eql(testContact.name);
                response.body.should.have.property('address')
                  .eql(testContact.address);
                response.body.should.have.property('contactNumber')
                  .eql(testContact.contactNumber);
                response.body.should.have.property('email')
                  .eql(testContact.email);
                  response.body.should.have.property('_id');
              done();
            });
      });

      it('it should CREATE a new contact with friendlyName', (done) => {
        const testContact = {
          name:          'Test Contact',
          address:       'Test Address',
          contactNumber: '123123',
          email:         'test.contact@tst.com',
          friendlyName:  'testy'
        };

        chai.request(app)
            .post(uri)
            .send(testContact)
            .end((error, response) => {
                response.should.have.status(httpStatus.CREATED);
                response.body.should.have.property('friendlyName')
                  .eql(testContact.friendlyName);
              done();
            });
      });

      it('it should NOT CREATE a new contact without name', (done) => {
        const testContact = {
          address:       'Test Address',
          contactNumber: '123123',
          email:         'test.contact@tst.com'
        };

        chai.request(app)
            .post(uri)
            .send(testContact)
            .end((error, response) => {
                response.should.have.status(httpStatus.BAD_REQUEST);
              done();
            });
      });

  });

});

process.env.NODE_ENV = 'test';

const mongoose   = require('mongoose');
const chai       = require('chai');
const chaiHttp   = require('chai-http');
const httpStatus = require('http-status');
const should     = chai.should();
const Promise    = require('bluebird');

const Contact = require('../../src/models/contact.schema');
const app     = require('../../src/app');

const uri = '/api/v1/contacts';

const contactOne = new Contact ({
  name:          'A Test Contact 1',
  address:       'Test Address 1',
  company:       'Test Company 1',
  contactNumber: '123123',
  email:         'test1.contact@tst.com'
});

const contactTwo = new Contact ({
  name:          'B Test Contact 2',
  address:       'Test Address 2',
  company:       'Test Company 2',
  contactNumber: '123123',
  email:         'test2.contact@tst.com'
});

chai.use(chaiHttp);

describe('List Contacts', () => {
    before((done) => {
        Contact.remove({}, (error) => {});

        Promise.all([
            contactOne.save(),
            contactTwo.save()
          ])
          .then(() => done());
    });

  describe('list contacts', () => {
      it('it should LIST all contacts', (done) => {

        chai.request(app)
            .get(uri)
            .end((error, response) => {
              response.should.have.status(httpStatus.OK);
              response.body.should.have
                .property('count').eql(2);
              response.body.contacts.length
                .should.eql(2);
              done();
            });

      });

      it('it should LIST contacts on first page', (done) => {

        chai.request(app)
            .get(uri + '?limit=1')
            .end((error, response) => {
              response.should.have.status(httpStatus.OK);
              response.body.should.have
                .property('count').eql(2);
              response.body.contacts
                .length.should.eql(1);
              response.body.contacts[0].should.have
                .property('name').eql(contactOne.name);
              done();
            });

      });

      it('it should LIST contacts skipped to second page', (done) => {

        chai.request(app)
            .get(uri + '?limit=1&skip=1')
            .end((error, response) => {
              response.should.have.status(httpStatus.OK);
              response.body.should.have
                .property('count').eql(2);
              response.body.contacts
                .length.should.eql(1);
              response.body.contacts[0].should.have
                .property('name').eql(contactTwo.name);
              done();
            });

      });

  });

});

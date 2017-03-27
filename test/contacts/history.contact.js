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

let testContact;

describe('Contact History', () => {
    before((done) => {
      Contact.remove({}, (error) => {});

      const contact = new Contact ({
        name:          'Test Contact',
        address:       'Test Address',
        contactNumber: '123123',
        email:         'test.contact@tst.com'
      });

      done();

    });

  describe('/GET contact history', () => {
      it('it should GET contact history', (done) => {
        // TODO: test once implemented
        done();
      });

  });

});

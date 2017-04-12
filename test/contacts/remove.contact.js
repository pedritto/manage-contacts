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

let savedContact;

describe('Delete Contact', () => {
    before((done) => {
        Contact.remove({}, (error) => {});

        const contact = new Contact ({
          name:          'Test Contact',
          address:       'Test Address',
          company:       'Test Company',
          contactNumber: '123123',
          email:         'test.contact@tst.com'
        });

        contact.save()
          .then(saved => {
            savedContact = saved;
            done();
          });

    });

  describe('/DELETE/:id contact', () => {
      it('it should REMOVE a contact', (done) => {

        chai.request(app)
            .delete(uri + '/' + savedContact._id)
            .end((error, response) => {
              response.should.have.status(httpStatus.OK);
              response.body.should.have.property('name')
                .eql(savedContact.name);
              response.body.should.have.property('address')
                .eql(savedContact.address);
             response.body.should.have.property('company')
                .eql(savedContact.company);
              response.body.should.have.property('contactNumber')
                .eql(savedContact.contactNumber);
              response.body.should.have.property('email')
                .eql(savedContact.email);
              done();
            });

      });

  });

});

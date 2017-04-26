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

describe('Update Contact', () => {
    before((done) => {
        Contact.remove({}, (error) => {});

        const contact = new Contact ({
          name:          'Test Contact',
          address:       'Test Address',
          partnerId:     100,
          contactNumber: '123123',
          email:         'test.contact@tst.com'
        });

        contact.save()
          .then(saved => {
            savedContact = saved;
            done();
          });

    });

  describe('/PUT/:id contact', () => {
      it('it should UPDATE a contact', (done) => {
        const testContact = new Contact ({
          name:          'Updated Name',
          address:       'Updated Address',
          partnerId:     101,
          contactNumber: '9999999',
          email:         'updated.contact@tst.com'
        });

        chai.request(app)
            .put(uri + '/' + savedContact._id)
            .send(testContact)
            .end((error, response) => {
              response.should.have.status(httpStatus.OK);
              response.body.should.have.property('name')
                .eql(testContact.name);
              response.body.should.have.property('address')
                .eql(testContact.address);
             response.body.should.have.property('partnerId')
                .eql(testContact.partnerId);
              response.body.should.have.property('contactNumber')
                .eql(testContact.contactNumber);
              response.body.should.have.property('email')
                .eql(testContact.email);
                response.body.should.have.property('id');
              done();
            });

      });

      it('it should NOT UPDATE a contact without name', (done) => {
        const testContact = new Contact ({
          address:       'Updated Address',
          contactNumber: '9999999',
          email:         'updated.contact@tst.com'
        });

        chai.request(app)
            .put(uri + '/' + savedContact._id)
            .send(testContact)
            .end((error, response) => {
              response.should.have.status(httpStatus.BAD_REQUEST);
              done();
            });

      });

      it('it should be 404 without id', (done) => {
        const testContact = new Contact ({
          name:          'Test Contact',
          address:       'Updated Address',
          partnerId:     200,
          contactNumber: '9999999',
          email:         'updated.contact@tst.com',
        });

        chai.request(app)
            .put(uri)
            .send(testContact)
            .end((error, response) => {
              response.should.have.status(httpStatus.NOT_FOUND);
              done();
            });

      });

  });

});

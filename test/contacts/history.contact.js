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
      Contact.historyModel().remove({}, (error) => {});

      const contact = new Contact ({
        name:          'Test Contact',
        address:       'Test Address',
        company:       'Test Company',
        contactNumber: '123123',
        email:         'test.contact@tst.com'
      });

      contact.save()
        .then(saved => {
          testContact = saved;
          done();
        });

    });

  describe('/GET contact history', () => {
      it('it should GET contact history', (done) => {

        chai.request(app)
            .get(uri + '/' + testContact._id + '/history')
            .end((error, response) => {
              response.should.have.status(httpStatus.OK);
              response.body.length.should.eql(1);
              response.body[0].should.have.property('o').eql('i');
              done();
            });

      });
  });

});

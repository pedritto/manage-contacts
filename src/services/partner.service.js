const Client = require('node-rest-client-promise').Client;
const config = require('../../conf/app');

const uri = '/api/v1/partners';

const client = new Client(); 

function extractId(partner) {
  const selfUrl = partner._links.self.href;
  const index = selfUrl.lastIndexOf('/');
  partner.id = Number(selfUrl.substr(index + 1));
  return partner;
}

module.exports = function() {
  return client
    .getPromise(config.partners.server + uri)
    .catch(() => {
      return [];
    })
    .then((result) => {
      const data = JSON.parse(result.data.toString('utf8'));
      const partners = data._embedded.partners;
      return partners.map(extractId);
    });
};
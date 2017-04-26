function convert (model, partner) {

  const response = {
    id: model._id,  
    name: model.name,
    address: model.address,
    contactNumber: model.contactNumber,
    partnerId: model.partnerId,
    email: model.email,
    picture: model.picture
  };

  if (partner) {
    response.partner = partner;
  }

  return response;
}

function convertAll (modelList, partners) {
  return modelList.map(model => {
    const partner = partners.find(partner => partner.id === model.partnerId);
    return convert(model, partner);
  });
}

module.exports = { convert, convertAll };
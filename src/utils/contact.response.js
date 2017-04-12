function convert (model) {

  const response = {
    id: model._id,  
    name: model.name,
    address: model.address,
    contactNumber: model.contactNumber,
    email: model.email,
    company: model.company,
    picture: model.picture
  };

  return response;
}

function convertAll (modelList) {
  return modelList.map(model => {
    return convert(model);
  });
}

module.exports = { convert, convertAll };
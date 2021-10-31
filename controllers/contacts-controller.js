const Contacts = require('../models/contacts') 
const createPath = require('../helpers/create-path')

const handleError = (res, err) => {
  console.log('111111111111111111111111111111111 ___err', err);
  res.render(createPath('error'), {title: 'Error'})
}

const getContacts = (req, res) => {
  const title = 'contacts'
  Contacts.find()
    .then( contacts => res.render(createPath('contacts'), {contacts, title}))
    .catch(err=> handleError(res, err))
}

module.exports = {
  getContacts, 
}
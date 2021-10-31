const express = require("express");
const router = express.Router()

const { getContacts } = require('../controllers/contacts-controller')

router.get("/contacts", getContacts);

router.get("/about-us", (req, res) => {
res.redirect('/contacts')
});

module.exports = router
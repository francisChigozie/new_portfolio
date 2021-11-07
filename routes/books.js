const express = require('express')
const { createBook } = require('../controller/books')
const Book = require('../models/Book') 

const router = express.Router({mergeParams: true})

router
.route('/') 
.post(createBook)


module.exports = router;
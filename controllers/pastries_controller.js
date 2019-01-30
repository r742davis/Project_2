const express = require('express')
const router = express.Router()
const Pastry = require('../models/pastries.js')

//------//
//Routes//
//------//

//----------------//
//7 Restful Routes//
//----------------//
// Index  : GET    '/bakersdozen'          1/7
// Show   : GET    '/bakersdozen/:id'      2/7
// New    : GET    '/bakersdozen/new'      3/7
// Create : POST   '/bakersdozen'          4/7
// Edit   : GET    '/bakersdozen/:id/edit' 5/7
// Update : PUT    '/bakersdozen/:id'      6/7
// Delete : DELETE '/bakersdozen/:id'      7/7


//Delete : 7/7
router.delete('/:id', (req, res) => {
  Pastry.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/bakersdozen')
  })
})

//Edit
router.get('/:id/edit', (req, res) => {
  Pastry.findById(req.params.id, (error, foundPastry) => {
    res.render(
      'edit.ejs',
      {
        pastry:foundPastry,
        currentUser: req.session.currentUser
      }
    )
  })
})

//Update
router.put('/:id', (req, res) => {
  Pastry.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedPastry) => {
    res.redirect('/bakersdozen')
  })
})

//Seed
router.get('/seedTest', (req, res) => {
  Pastry.create([
    {
      name: 'Cinnamon Roll',
      type: 'roll',
      img: "https://www.onceuponachef.com/images/2012/04/cinnamon-rolls-finished.jpg",
      recipe: "",
      price: 2.50,
      qty: 2
    }
  ], (error, data) => {
    res.redirect('/bakersdozen')
  })
})

//Bakery Search/Maps
router.get('/bakeries', (req, res) => {
  res.render(
    'bakeries.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

//About
router.get('/about', (req, res) => {
  res.render(
    'about.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

//Index
router.get('/', (req, res) => {
  Pastry.find({}, (error, allPastries) => {
    res.render(
      'index.ejs',
      {
        pastries:allPastries,
        currentUser: req.session.currentUser
      }
  )
  })
})

//New
router.get('/new', (req, res) => {
  res.render(
    'new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

//Show
router.get('/:id', (req, res) => {
  Pastry.findById(req.params.id, (error, foundPastry) => {
    res.render(
      'show.ejs',
      {
        pastry:foundPastry,
        currentUser: req.session.currentUser
      }
    )
  })
})

//Create
router.post('/', (req, res) => {
  Pastry.create(req.body, (error, createdPastry) => {
    if(req.session.currentUser) {
        res.redirect('/bakersdozen')
    }
  })
})


module.exports = router;

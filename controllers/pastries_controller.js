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
      name: 'Pecan Pie',
      img: 'https://fisher-nuts.s3.amazonaws.com/Recipes/pecan%20pie_600x600.jpg',
      level: 'Easy',
      time: '1 hr, 5 min',
      yield: '8 servings',
      directions1: 'Preheat the oven to 325 degrees F',
      directions2: 'In a large mixing bowl, mix the brown sugar, granulated sugar and eggs until creamy. Add the chopped pecans, melted butter, milk, flour and vanilla extract and stir to combine. Pour the mixture into the pie shell. Arrange the pecan halves on top of the pie in a circular pattern. ',
      directions3: 'Bake the pie for 55 minutes. Check for doneness by shaking the pan slightly. The pie should be firm with only a slight jiggle in the center. It will set more as it cools. Serve topped with vanilla ice cream or with a dollop of whipped cream.'
    },
    {
      name: 'Cinnamon Bun',
      img: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2006/6/29/0/pa0711_cin_rolls1.jpg.rend.hgtvcom.616.462.suffix/1371584135730.jpeg',
      level: 'Intermediate',
      time: '1 hr, 45 min',
      yield: '12 to 15 servings',
      directions1: 'Heat oven to 350 degrees F.',
      directions2: 'In a small bowl, dissolve yeast in warm water and set aside. In a large bowl mix milk, sugar, melted butter, salt and egg. Add 2 cups of flour and mix until smooth. Add yeast mixture. Mix in remaining flour until dough is easy to handle. Knead dough on lightly floured surface for 5 to 10 minutes. Place in well-greased bowl, cover and let rise until doubled in size, usually 1 to 1 1/2 hours.',
      directions3: 'When doubled in size, punch down dough. Roll out on a floured surface into a 15 by 9-inch rectangle. Spread melted butter all over dough. Mix sugar and cinnamon and sprinkle over buttered dough. Sprinkle with walnuts, pecans, or raisins if desired. Beginning at the 15-inch side, role up dough and pinch edge together to seal. Cut into 12 to 15 slices.',
      directions4: 'Coat the bottom of baking pan with butter and sprinkle with sugar. Place cinnamon roll slices close together in the pan and let rise until dough is doubled, about 45 minutes. Bake for about 30 minutes or until nicely browned.',
      directions5: 'Meanwhile, mix butter, powdered sugar, and vanilla. Add hot water 1 tablespoon at a time until the glaze reaches desired consistency. Spread over slightly cooled rolls.'
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

const express = require('express');
const router = express.Router();
const winston = require('winston');
const auth = require('../middleware/auth');
const multerStorageCloudinary = require('../middleware/multer-storage-cloudinary');
// cloudinary
const cloudinary = require('../config/cloudinary');
// Load Validation
const {
  validatePortfolioInput,
  validatePortfolioCategoryInput
} = require('../validation/portfolio');
// Load Portfolio Model
const Portfolio = require('../models/portfolio');
const Category = require('../models/category');

// @route   GET api/portfolio/category
// @desc    Get current user portfolio category
// @access  Private
router.get('/category', auth, (req, res) => {
  const errors = {};
  Category.findOne({ user: req.user.id })
    .populate('user', ['name'])
    .then(categories => {
      if (!categories) {
        errors.noCategory = 'There is no portfolio category for this user';
        return res.status(404).json(errors);
      }
      res.json(categories);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/portfolio/user/category/:email
// @desc    Get portfolio category by user email
// @access  Public

router.get('/user/category/:email', (req, res) => {
  const errors = {};
  Category.findOne({ email: req.params.email })
    .populate('user', ['name'])
    .then(categories => {
      if (!categories) {
        errors.noCategories = 'There is no portfolio categories of this user';
        return res.status(404).json(errors);
      }

      res.json(categories);
    })
    .catch(err =>
      res
        .status(404)
        .json({ category: 'There is no portfolio category for this user' })
    );
});

// @route   DELETE api/portfolio/category
// @desc    Delete all portfolio category[Whole Data]
// @access  Private
router.delete('/category', auth, (req, res) => {
  Category.findOneAndRemove({ user: req.user.id }).then(() => {
    res.json({ success: true });
  });
});

// @route   POST api/portfolio/category
// @desc    Create category of user portfolio
// @access  Private
router.post('/category', auth, (req, res) => {
  const { errors, isValid } = validatePortfolioCategoryInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Category.findOne({ user: req.user.id })
    .then(CategoryData => {
      if (CategoryData) {
        // Update the array
        CategoryData.portfolio_categories.unshift(
          req.body.portfolio_categories
        );
        CategoryData.save().then(categories => res.json(categories));
      } else {
        // Create
        // then add to the array
        new Category({
          user: req.user.id,
          email: req.user.email,
          portfolio_categories: []
        })
          .save()
          .then(categoryAccount => {
            Category.findOne({ user: req.user.id }).then(categoryData => {
              // Add to category array
              categoryData.portfolio_categories.unshift(
                req.body.portfolio_categories
              );
              categoryData.save().then(category => res.json(category));
            });
          });
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/portfolio/category/:category_item
// @desc    Delete single portfolio category from profile
// @access  Private
function removeFromArray(arr, what) {
  // console.log('Array is -> ', arr);
  // console.log('Searching for -> ', what);
  var found = arr.indexOf(what);
  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}
router.delete('/category/:category_item', auth, (req, res) => {
  Category.findOne({ user: req.user.id })
    .then(categoryData => {
      // filter out the item from array
      removeFromArray(
        categoryData.portfolio_categories,
        decodeURI(req.params.category_item)
      );
      // Save
      categoryData.save().then(newCategory => res.json(newCategory));
    })
    .catch(err => res.status(404).json(err));
});

/*...................Below Portfolio.....................*/

// @route   GET api/portfolio/user/:email
// @desc    Get portfolio by user email
// @access  Public

router.get('/user/:email', (req, res) => {
  const errors = {};
  Portfolio.findOne({ email: req.params.email })
    .populate('user', ['name'])
    .then(portfolio => {
      if (!portfolio) {
        errors.noportfolio = 'There is no portfolio of this user';
        return res.status(404).json(errors);
      }

      res.json(portfolio);
    })
    .catch(err =>
      res.status(404).json({ portfolio: 'There is no portfolio for this user' })
    );
});

// @route   GET api/portfolio
// @desc    Get current users portfolio
// @access  Private
router.get('/', auth, (req, res) => {
  const errors = {};
  Portfolio.findOne({ user: req.user.id })
    .populate('user', ['name'])
    .then(portfolio => {
      if (!portfolio) {
        errors.noPortfolio = 'There is no portfolio for this user';
        return res.status(404).json(errors);
      }
      res.json(portfolio);
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/portfolio
// @desc    Delete portfolio [Whole Data]
// @access  Private
router.delete('/', auth, (req, res) => {
  Portfolio.findOneAndRemove({ user: req.user.id }).then(() => {
    res.json({ success: true });
  });
});

// @route   POST api/portfolio
// @desc    Create user portfolio
// @access  Private
router.post('/', auth, (req, res) => {
  const { errors, isValid } = validatePortfolioInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  // Get fields
  const newPortfolioItem = {
    name: req.body.name,
    github: req.body.github,
    url: req.body.url,
    details: req.body.details,
    date: req.body.date,
    tag: req.body.tag,
    img: req.body.img,
    public_id: req.body.public_id,
    category: req.body.category
  };
  Portfolio.findOne({ user: req.user.id }).then(mainPortfolio => {
    if (mainPortfolio) {
      // Update the array
      mainPortfolio.portfolio.unshift(newPortfolioItem);
      mainPortfolio.save().then(portfolio => res.json(portfolio));
    } else {
      // Create
      // then add to the array
      new Portfolio({ user: req.user.id, email: req.user.email, portfolio: [] })
        .save()
        .then(portfolioAccount => {
          Portfolio.findOne({ user: req.user.id }).then(portfolioData => {
            // Add to portfolio array
            portfolioData.portfolio.unshift(newPortfolioItem);
            portfolioData.save().then(portfolio => res.json(portfolio));
          });
        });
    }
  });
});

// @route   DELETE api/portfolio/:portfolio_id
// @desc    Delete portfolio from profile
// @access  Private
router.delete('/:portfolio_id', auth, (req, res) => {
  Portfolio.findOne({ user: req.user.id })
    .then(portfolioData => {
      // Get remove index
      const removeIndex = portfolioData.portfolio
        .map(item => {
          // console.log('Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.portfolio_id);
      // Grab the public_id
      let public_id = portfolioData.portfolio[removeIndex].public_id;
      // console.log('public_id to delete => ', public_id);
      // Splice out of array
      portfolioData.portfolio.splice(removeIndex, 1);
      // Secondly delete image
      cloudinary.v2.api.delete_resources(public_id, function(error, result) {
        if (error) {
          winston.error(
            `Failed to delete portfolio image from ${
              req.user.email
            }. portfolio_id: ${
              req.params.portfolio_id
            }and image_id: ${public_id}`
          );
        }
        winston.info('portfolio images deleted ! ' + JSON.stringify(result));
      });
      // Save
      portfolioData.save().then(newPortfolio => res.json(newPortfolio));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/portfolio/:portfolio_id
// @desc    Update single portfolio from profile
// @access  Private
router.post('/:portfolio_id', auth, (req, res) => {
  const { errors, isValid } = validatePortfolioInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  Portfolio.findOne({ user: req.user.id })
    .then(portfolioData => {
      // Get Update index
      const updateIndex = portfolioData.portfolio
        .map(item => {
          // console.log('Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.params.portfolio_id);

      // update value
      let currentPortfolio = portfolioData.portfolio[updateIndex];
      currentPortfolio.name = req.body.name;
      currentPortfolio.github = req.body.github;
      currentPortfolio.url = req.body.url;
      currentPortfolio.details = req.body.details;
      currentPortfolio.date = req.body.date;
      currentPortfolio.tag = req.body.tag;
      currentPortfolio.img = req.body.img;
      currentPortfolio.public_id = req.body.public_id;
      currentPortfolio.category = req.body.category;
      // Save
      portfolioData.save().then(newPortfolio => res.json(newPortfolio));
    })
    .catch(err => res.status(404).json(err));
});

/*
@route   POST api/portfolio/img/upload
@desc    Upload portfolio Image
@access  Private
*/
router.post(
  '/img/upload',
  auth,
  multerStorageCloudinary('portfolio').array('images', 10),
  // This middleware takes the folder_name and multiple file provided as a key
  (req, res) => {
    // console.log(req.files);
    return res.status(200).json({
      success: true,
      filesInfo: req.files
    });
  }
);

// @route   POST api/portfolio/img/del
// @desc    Delete Single portfolio Image from profile
// @access  Private
router.post('/img/del', auth, (req, res) => {
  Portfolio.findOne({ user: req.user.id })
    .then(portfolioData => {
      // Get remove index
      const Index = portfolioData.portfolio
        .map(item => {
          // console.log('Item ID => ', item.id);
          return item.id;
        })
        .indexOf(req.body.id);
      // Grab the public_id & img
      let imgArray = portfolioData.portfolio[Index].img;
      // Get index
      let delete_img_index = imgArray.indexOf(req.body.img_url);

      let public_id_of_the_image =
        portfolioData.portfolio[Index].public_id[delete_img_index];
      console.log('Got the index', public_id_of_the_image);
      // Splice out of array
      portfolioData.portfolio[Index].img.splice(delete_img_index, 1);
      portfolioData.portfolio[Index].public_id.splice(delete_img_index, 1);

      // Secondly delete image
      cloudinary.v2.api.delete_resources([public_id_of_the_image], function(
        error,
        result
      ) {
        if (error) {
          winston.error(
            `Failed to delete portfolio image from ${
              req.user.email
            }. portfolio_id: ${
              req.body.id
            }and image_id: ${public_id_of_the_image}`
          );
        }
        winston.info('portfolio images deleted ! ' + JSON.stringify(result));
      });
      // Save
      portfolioData.save().then(newPortfolio => res.json(newPortfolio));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;

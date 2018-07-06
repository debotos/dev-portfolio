const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const passport = require('passport');
const auth = require('../middleware/auth');

// Load Validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

// Load Profile Model
const Profile = require('../models/profile');
// Load User Model
const User = require('../models/user');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.get('/', auth, (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/', auth, (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.profile_name) profileFields.profile_name = req.body.profile_name;
  if (req.body.full_name) profileFields.full_name = req.body.full_name;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.email) profileFields.email = req.body.email;
  if (req.body.address) profileFields.address = req.body.address;
  if (req.body.map_address) profileFields.map_address = req.body.map_address;
  if (req.body.resume_link) profileFields.resume_link = req.body.resume_link;
  if (req.body.age) profileFields.age = req.body.age;
  if (req.body.residence) profileFields.residence = req.body.residence;
  // string seperate by comma - Spilt into array
  if (typeof req.body.skillsAt !== 'undefined') {
    profileFields.skillsAt = req.body.skillsAt.split(',');
  }
  if (typeof req.body.phone !== 'undefined') {
    profileFields.phone = req.body.phone.split(',');
  }
  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.github) profileFields.social.github = req.body.github;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create
      // Save Profile
      new Profile(profileFields).save().then(profile => res.json(profile));

      /*
      // Check if handle exists [handle means username]
      // This code is necessary if you want to something like 'username already exists!'
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
      */
    }
  });
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/experience', auth, (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
});

module.exports = router;

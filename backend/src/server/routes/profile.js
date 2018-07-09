const express = require('express');
const router = express.Router();
const multer = require('multer');
// const passport = require('passport');
const auth = require('../middleware/auth');
const fileUploadMiddleware = require('../middleware/file-upload-middleware');

// Load Validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');
const validateSkillsInput = require('../validation/skills');
const validateTestimonialsInput = require('../validation/testimonials');
const validateWhatIdoInput = require('../validation/what_i_do');
const validateCoursesInput = require('../validation/courses');

// Load Profile Model
const Profile = require('../models/profile');
// Load User Model
const User = require('../models/user');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/user/:email
// @desc    Get profile by user email
// @access  Public

router.get('/user/:email', (req, res) => {
  const errors = {};

  Profile.findOne({ email: req.params.email })
    .populate('user', ['name'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.get('/', auth, (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name'])
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

// @route   DELETE api/profile
// @desc    Delete Whole profile Data
// @access  Private
router.delete('/', auth, (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    res.json({ success: true });
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

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:experience_id', auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.experience_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/skills
// @desc    Add skills to profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/skills', auth, (req, res) => {
  const { errors, isValid } = validateSkillsInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newSkill = {
      title: req.body.title,
      percentage: req.body.percentage
    };

    // Add to exp array
    profile.skills.unshift(newSkill);

    profile.save().then(profile => res.json(profile));
  });
});

// @route   DELETE api/profile/skills/:skill_id
// @desc    Delete skill from profile
// @access  Private
router.delete('/skills/:skill_id', auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.skills
        .map(item => item.id)
        .indexOf(req.params.skill_id);

      // Splice out of array
      profile.skills.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/testimonials
// @desc    Add testimonials to profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/testimonials', auth, (req, res) => {
  const { errors, isValid } = validateTestimonialsInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newTestimonial = {
      name: req.body.name,
      job: req.body.job,
      img: req.body.img,
      testimonial: req.body.testimonial
    };

    // Add to exp array
    profile.testimonials.unshift(newTestimonial);

    profile.save().then(profile => res.json(profile));
  });
});

// @route   POST api/profile/testimonials/img/upload
// @desc    Upload testimonials Image
// @access  Private
router.post(
  '/testimonials/img/upload',
  auth,
  upload.single('file'),
  fileUploadMiddleware,
  (req, res) => {
    console.log('Testimonial image to add -> ' + req.files);
  }
);

// @route   DELETE api/profile/testimonials/:testimonial_id
// @desc    Delete testimonial from profile
// @access  Private
router.delete('/testimonials/:testimonial_id', auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.testimonials
        .map(item => item.id)
        .indexOf(req.params.testimonial_id);

      // Splice out of array
      profile.testimonials.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/what_i_do
// @desc    Add new what_i_do item to profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/what_i_do', auth, (req, res) => {
  const { errors, isValid } = validateWhatIdoInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newDoItem = {
      title: req.body.title,
      img: req.body.img,
      info: req.body.info
    };

    // Add to exp array
    profile.what_i_do.unshift(newDoItem);

    profile.save().then(profile => res.json(profile));
  });
});

// @route   DELETE api/profile/what_i_do/:what_i_do_id
// @desc    Delete what_i_do from profile
// @access  Private
router.delete('/what_i_do/:what_i_do_id', auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.what_i_do
        .map(item => item.id)
        .indexOf(req.params.what_i_do_id);

      // Splice out of array
      profile.what_i_do.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/education', auth, (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEducationItem = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    profile.education.unshift(newEducationItem);

    profile.save().then(profile => res.json(profile));
  });
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/courses
// @desc    Add courses to profile
// @access  Private
// For passport authentication use
// passport.authenticate('jwt', { session: false }) instead of auth middleware
router.post('/courses', auth, (req, res) => {
  const { errors, isValid } = validateCoursesInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newCourse = {
      title: req.body.title,
      who_give: req.body.who_give,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    profile.courses.unshift(newCourse);

    profile.save().then(profile => res.json(profile));
  });
});

// @route   DELETE api/profile/courses/:course_id
// @desc    Delete course from profile
// @access  Private
router.delete('/courses/:course_id', auth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.courses
        .map(item => item.id)
        .indexOf(req.params.course_id);

      // Splice out of array
      profile.courses.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;

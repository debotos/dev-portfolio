const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profile_name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  bio: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 500
  },
  phone: {
    type: [String],
    trim: true,
    minlength: 10,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  address: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  map_address: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  resume_link: {
    type: String
  },
  age: {
    type: Number,
    min: 10,
    max: 100
  },
  residence: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 30
  },
  skillsAt: {
    type: [String]
  },
  skills: [
    {
      title: {
        type: String,
        required: true
      },
      percentage: {
        type: Number,
        required: true,
        min: 10,
        max: 100
      }
    }
  ],
  testimonials: [
    {
      name: {
        type: String,
        required: true
      },
      job: {
        type: String,
        required: true
      },
      img: {
        type: String
        // required: true
      },
      public_id: {
        type: String
      },
      testimonial: {
        type: String,
        required: true
      }
    }
  ],
  experience: [
    // Experience or Job
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  what_i_do: [
    {
      title: {
        type: String,
        required: true
      },
      img: {
        type: String
        // required: true
      },
      public_id: {
        type: String
      },
      info: {
        type: String,
        required: true
      }
    }
  ],
  education: [
    // Education
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  courses: [
    // Courses
    {
      title: {
        type: String,
        required: true
      },
      who_give: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    github: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

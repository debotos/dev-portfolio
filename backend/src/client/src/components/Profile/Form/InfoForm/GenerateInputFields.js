export const GenerateSectionOneInputFields = (profile, errors) => {
  return [
    {
      className: 'pt-form-group',
      serial: 1,
      helperText: errors.profile_name ? errors.profile_name : '',
      label: 'Profile Name',
      labelFor: 'profile_name',
      requiredLabel: true,
      input: {
        type: 'text',
        value: profile.profile_name,
        id: 'profile_name',
        className: 'pt-input pt-fill',
        style: { width: '400px' },
        placeholder: 'eg. Dev Debotos'
      }
    },
    {
      className: 'pt-form-group',
      serial: 2,
      helperText: errors.full_name ? errors.full_name : '',
      label: 'Full Name',
      labelFor: 'full_name',
      requiredLabel: true,
      input: {
        type: 'text',
        value: profile.full_name,
        id: 'full_name',
        className: 'pt-input pt-fill',
        style: { width: '400px' },
        placeholder: 'eg. Debotos Das'
      }
    },
    {
      className: 'pt-form-group',
      serial: 3,
      helperText: errors.email ? errors.email : '',
      label: 'Email',
      labelFor: 'email',
      requiredLabel: true,
      input: {
        type: 'email',
        value: profile.email,
        id: 'email',
        className: 'pt-input pt-fill',
        style: { width: '400px' },
        placeholder: 'eg. debotosdas@gmail.com'
      }
    },
    {
      className: 'pt-form-group',
      serial: 4,
      helperText: errors.address ? errors.address : '',
      label: 'Address',
      labelFor: 'address',
      requiredLabel: true,
      input: {
        type: 'text',
        value: profile.address,
        id: 'address',
        className: 'pt-input pt-fill',
        style: { width: '400px' },
        placeholder: 'eg. Doba, Rupsa, Khulna'
      }
    },
    {
      className: 'pt-form-group',
      serial: 5,
      helperText: errors.map_address ? errors.map_address : '',
      label: 'Google Map Address',
      labelFor: 'map_address',
      requiredLabel: true,
      input: {
        type: 'text',
        value: profile.map_address,
        id: 'map_address',
        className: 'pt-input pt-fill',
        style: { width: '400px' },
        placeholder: 'eg. Khulna Division, Bangladesh'
      }
    },
    {
      className: 'pt-form-group',
      serial: 6,
      helperText: errors.resume_link ? errors.resume_link : '',
      label: 'Resume Link',
      labelFor: 'resume_link',
      requiredLabel: true,
      input: {
        type: 'text',
        value: profile.resume_link,
        id: 'resume_link',
        className: 'pt-input pt-fill',
        style: { width: '400px' },
        placeholder: 'URL of your online Resume/Bio'
      }
    }
  ];
};

export const GenerateSectionTwoInputFields = (profile, errors) => [
  {
    className: 'pt-form-group',
    serial: 7,
    helperText: errors.age ? errors.age : '',
    label: 'Age',
    labelFor: 'age',
    requiredLabel: true,
    input: {
      type: 'number',
      value: profile.age,
      id: 'age',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'eg. 21'
    }
  },
  {
    className: 'pt-form-group',
    serial: 8,
    helperText: errors.residence ? errors.residence : '',
    label: 'Residence',
    labelFor: 'residence',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.residence,
      id: 'residence',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'eg. BD'
    }
  },
  {
    className: 'pt-form-group',
    serial: 9,
    helperText: errors.skillsAt ? errors.skillsAt : '',
    label: 'Keywords to describe you',
    labelFor: 'skillsAt',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.skillsAt,
      id: 'skillsAt',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'eg. Web Developer,Android Developer'
    }
  },
  {
    className: 'pt-form-group',
    serial: 10,
    helperText: errors.phone ? errors.phone : '',
    label: 'Phone Number',
    labelFor: 'phone',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.phone,
      id: 'phone',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'eg. +8801790015380,+8801982134040'
    }
  },
  {
    className: 'pt-form-group',
    serial: 11,
    helperText: errors.youtube ? errors.youtube : '',
    label: 'Youtube',
    labelFor: 'youtube',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.youtube,
      id: 'youtube',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'Youtube Profile'
    }
  },
  {
    className: 'pt-form-group',
    serial: 12,
    helperText: errors.twitter ? errors.twitter : '',
    label: 'Twitter',
    labelFor: 'twitter',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.twitter,
      id: 'twitter',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'Twitter Profile'
    }
  }
];

export const GenerateSectionThreeInputFields = (profile, errors) => [
  {
    className: 'pt-form-group',
    serial: 13,
    helperText: errors.facebook ? errors.facebook : '',
    label: 'Facebook',
    labelFor: 'facebook',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.facebook,
      id: 'facebook',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'Facebook Profile'
    }
  },
  {
    className: 'pt-form-group',
    serial: 14,
    helperText: errors.linkedin ? errors.linkedin : '',
    label: 'Linkedin',
    labelFor: 'linkedin',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.linkedin,
      id: 'linkedin',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'Linkedin Profile'
    }
  },
  {
    className: 'pt-form-group',
    serial: 15,
    helperText: errors.instagram ? errors.instagram : '',
    label: 'Instagram',
    labelFor: 'instagram',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.instagram,
      id: 'instagram',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'Instagram Profile'
    }
  },
  {
    className: 'pt-form-group',
    serial: 16,
    helperText: errors.github ? errors.github : '',
    label: 'Github',
    labelFor: 'github',
    requiredLabel: true,
    input: {
      type: 'text',
      value: profile.github,
      id: 'github',
      className: 'pt-input pt-fill',
      style: { width: '400px' },
      placeholder: 'Github Profile'
    }
  }
];

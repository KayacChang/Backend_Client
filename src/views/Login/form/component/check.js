import validate from 'validate.js';

const common = {
  presence: {
    allowEmpty: false,
    message: 'is required'
  },
};

const emailRule = {
  email: {
    ...(common),

    email: true,
    length: { maximum: 64 }
  }
};

const passwordRule = {
  password: {
    ...(common),

    length: { maximum: 128 }
  }
};

export default {
  email: (email) => validate({email}, emailRule),
  password: (password) => validate({password}, passwordRule),
}

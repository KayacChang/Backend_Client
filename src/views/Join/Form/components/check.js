import validate from 'validate.js';

const common = {
  presence: { allowEmpty: false, message: 'is required' }
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

const userNameRule = {
  userName: {
    ...(common),

    length: { maximum: 32 }
  }
};

export default {
  email: (email) => validate({ email }, emailRule),
  password: (password) => validate({ password }, passwordRule),
  userName: (userName) => validate({ userName }, userNameRule),
};

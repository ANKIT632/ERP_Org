const jwt = require("jsonwebtoken");

const generateJwtResponse = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
      algorithm: process.env.JWT_ENCRYPT_ALGO,
    }
  );

  let {
    firstName,
    lastName,
    mobileNumber,
    role,
    email,
    profilePic,
    registrationCompleted,
  } = user;
  let profilePicAttached = true;
  if (profilePic) {
    profilePic = await getPublicUrl(profilePic);
  } else {
    profilePic = `${process.env.BACKEND_URL}user-default.png`;
    profilePicAttached = false;
  }
  return {
    token,
    firstName,
    lastName,
    mobileNumber,
    role,
    email,
    profilePic,
    profilePicAttached,
    registrationCompleted,
  };
};

module.exports = {
  generateJwtResponse,
};

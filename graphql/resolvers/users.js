const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { validateLoginInput, validateRegisterInput } = require("../../utils/validators");

const SECRET_KEY = require("../../config");

function generateToken(input) {
  return jwt.sign(
    {
      id: input.id,
      email: input.email,
      username: input.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, password, confirmPassword, email } }) {
      // check user data

      //? Ciekawa funkcja poniżej: pobieramy dane zanim jeszcze ją zainicjowaliśmy i przekazaliśmy dane
      const { valid, errors } = validators(username, password, cofirmPassword, email);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const findedUser = await User.findOne({ username });
      if (findedUser) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "Kuźwa, ten użytkonwnik jest wzięty",
          },
        });
      }

      // check if user already exist

      // encript password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        body,
        password,
        username,
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();

      const token = generateToken(user);
      //? raz id a raz _id

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async loginUser(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User nie został znaleziony";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Nieprawidłowe dane";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

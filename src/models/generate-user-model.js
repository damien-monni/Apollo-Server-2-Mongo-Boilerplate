import { UserInputError, ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import signJwt from '../auth/sign-jwt';

const generateUserModel = ({ db }) => {
  const col = db.collection('user');

  const signIn = async ({ email, password }) => {
    const user = await col.findOne(
      { email },
      { fields: { email: 1, password: 1, role: 1 } },
    );

    if (!user) {
      throw new UserInputError('Invalid credentials', {
        invalidArgs: ['email', 'password'],
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UserInputError('Invalid credentials', {
        invalidArgs: ['email', 'password'],
      });
    }

    const authToken = await signJwt({
      payload: { _id: user._id, role: user.role || 'UNKNOWN' },
    });

    return { authToken };
  };

  const signUp = async ({ email, password }) => {
    const user = await col.findOne({ email }, { fields: { email: 1 } });

    if (user) {
      throw new UserInputError('User with this email already exists', {
        invalidArgs: ['email'],
      });
    }

    const hash = await bcrypt.hash(password, 12);
    const result = await col.insertOne({
      email,
      password: hash,
    });

    if (result && result.result && result.result.ok) {
      return signIn({ email, password });
    }
  };

  return {
    signIn,
    signUp,
  };
};

export default generateUserModel;

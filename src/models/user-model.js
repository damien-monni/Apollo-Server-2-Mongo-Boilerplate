import { UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';

import MongoCollection from '../connectors/mongo/MongoCollection';
import signJwt from '../auth/sign-jwt';

const userCol = new MongoCollection('user');

const userModel = {
  async signIn({ email, password }) {
    const user = await userCol
      .getCol()
      .findOne({ email }, { fields: { email: 1, password: 1, role: 1 } });

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
  },
  async signUp({ email, password }) {
    const user = await userCol
      .getCol()
      .findOne({ email }, { fields: { email: 1 } });

    if (user) {
      throw new UserInputError('User with this email already exists', {
        invalidArgs: ['email'],
      });
    }

    const hash = await bcrypt.hash(password, 12);
    const result = await userCol.getCol().insertOne({
      email,
      password: hash,
    });

    if (result && result.result && result.result.ok) {
      return this.signIn({ email, password });
    }
  },
};

export default userModel;

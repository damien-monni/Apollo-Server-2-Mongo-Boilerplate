import jwt from 'jsonwebtoken';
import settings from '../settings';

const signJwt = ({ payload }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      settings.jwtSecret,
      { expiresIn: 60 * 5 },
      (err, token) => {
        resolve(token);
      },
    );
  });
};

export default signJwt;

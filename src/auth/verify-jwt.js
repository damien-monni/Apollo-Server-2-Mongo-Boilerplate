import jwt from 'jsonwebtoken';
import settings from '../settings';

const verifyJwt = ({ token }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, settings.jwtSecret, (err, payload) => {
      resolve(payload);
    });
  });
};

export default verifyJwt;

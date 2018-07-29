const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const splitHeader = authHeader.split(' ');
  if (!splitHeader.length || splitHeader.length < 2) {
    return null;
  }

  return splitHeader[1];
};

export default getTokenFromHeader;

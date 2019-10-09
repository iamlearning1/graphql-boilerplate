import jwt from 'jsonwebtoken';

export default userId =>
  jwt.sign({ userId }, 'alphabetaomega', {
    expiresIn: '7 days'
  });

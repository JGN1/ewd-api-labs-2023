import jwt from 'jsonwebtoken';

import TokenManager  from './TokenManager';

export default  class extends TokenManager {

  generate(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY );
  }

  decode(accessToken) {
    return jwt.verify(accessToken,  process.env.JWT_SECRET_KEY);
  }
}

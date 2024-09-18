import jwt from 'jsonwebtoken'
import { getTokenFromHeaders } from '../utils/getTokenFromHeaders'

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET
const ACCESSTOKEN_EXPIRATION = '10s'
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET
const REFRESHTOKEN_EXPIRATION = '1h'

export const Auth = {
  /** Generate access_token */
  async generateAccessToken(userId) {
    return await jwt.sign({ roles: ['user'] }, ACCESSTOKEN_SECRET, {
      subject: userId,
      expiresIn: ACCESSTOKEN_EXPIRATION,
    })
  },

  /** Validate access_token */
  async validateAccessToken(accessToken) {
    return await jwt.verify(accessToken, ACCESSTOKEN_SECRET)
  },

  /** Validate Token from Headers */
  async isAuthenticated(req) {
    const token = getTokenFromHeaders(req)

    try {
      await Auth.validateAccessToken(token)
      return true
    } catch (err) {
      return false
    }
  },

  /** Generate refresh_token */
  async generateRefreshToken(userId) {
    return await jwt.sign({}, REFRESHTOKEN_SECRET, {
      subject: userId,
      expiresIn: REFRESHTOKEN_EXPIRATION,
    })
  },

  /** Validate refresh_token */
  async validateRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, REFRESHTOKEN_SECRET)
  },

  /** Decode Token */
  async decodeToken(token) {
    return await jwt.decode(token)
  },
}

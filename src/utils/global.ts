/*
|-----------------------------------------
| setting up utility functions for global
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 2022
|-----------------------------------------
*/

import { NextApiRequest, NextApiResponse } from 'next'

const Jwt = require('jsonwebtoken')
const Atob = require('atob')
const Crypto = require('crypto')
 

type user = {
  id: number
  name: string
  email: string
  address?: string | null
  defaultAddress?: string | null
  role?: number | undefined
  mobile?: string | null
  activated?: boolean
  takeawayId?: number | undefined
  takeaway?: string | null
  stripePayRef?: string | null
  alias?: string | null
}

export const isValid = (value: string, regx: RegExp) => {
  if (regx.test(value)) {
    return true
  }
  return false
}

export const sendJSONResponse = (
  res: NextApiResponse,
  status: number,
  content: {}
) => {
  res.status(status)
  res.json(content)
}

/*
|----------------------------------------------
| function to validate given jwt token
|----------------------------------------------
*/
const verifyToken = async (token: string, key: string) => {
  let valid = false

  Jwt.verify(token, key, (err: boolean) => {
    if (err) {
      valid = false
    } else {
      valid = true
    }
  })

  return valid
}

export const verifyRequestSource = async (req: NextApiRequest) => {
  
  const bearerHeader = req.headers?.get('Authorization')

  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]

    const keys = {
      member: await verifyToken(bearerToken, process.env.TAKEAWAY_MANAGER),
      gate: await verifyToken(bearerToken, process.env.GATEKEY),
      session: await verifyToken(bearerToken, process.env.SESSION_KEY),
      default: await verifyToken(bearerToken, process.env.DEFAULT_KEY),
      public: await verifyToken(bearerToken, process.env.PUBLIC_JWT_TOKEN),
    }

    const verified =
      Object.keys(keys).filter((field: string) => keys[field]).length > 0

    return verified
  }
  return false
}

export const validatePassword = (
  hashedPassword: string,
  password: string,
  salt: string
) => {
  const hash = Crypto.pbkdf2Sync(password, salt, 1000, 128, 'sha512').toString(
    'hex'
  )
  return hashedPassword === hash
}

export const validatePayload = async (payload: any, validateWith: any) => {
  const isValid = {
    status: false,
    message: null,
  }

  try {
    const valid = await validateWith.validateAsync(payload)
    isValid.status = true
  } catch (err) {
    isValid.message = err.details[0].message
  }

  return isValid
}

export const currentUser = async (token: any) => {
  let user
  let payload = token.split('.')[1]
  payload = Atob(payload)
  payload = JSON.parse(payload)

  switch (payload.jwtPayload.roles) {
    case 1:
      user = {
        id: payload.jwtPayload.id,
        name: payload.jwtPayload.name,
        email: payload.jwtPayload.email,
        address: payload.jwtPayload.address,
        roles: payload.jwtPayload.roles,
        mobile: payload.jwtPayload.mobile,
        token,
      }
      break
    case 3:
      user = {
        email: payload.jwtPayload.email,
        name: payload.jwtPayload.name,
        roles: payload.jwtPayload.roles,
        token,
      }
      break
    case 5:
      user = {
        userId: payload.jwtPayload.userId,
        alias: payload.jwtPayload.alias,
        name: payload.jwtPayload.name,
        address: payload.jwtPayload.address,
        roles: payload.jwtPayload.roles,
        takeawayId: payload.jwtPayload.takeawayId,
        takeaway: payload.jwtPayload.takeaway,
        token,
      }
      break

    default:
      break
  }
  return user
}

/*
|----------------------------------------------
| helping function to generate jwt token
|----------------------------------------------
*/

export const generateJwt = (user: user, key: string | {}) => {
  const expiry = new Date()
  let jwtPayload = {}

  switch (user.role) {
    case 1:
      jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        mobile: user.mobile,
        role: user.role,
        stripePayRef: user.stripePayRef || null,
        activated: user.activated,
      }
      if (user.defaultAddress !== undefined) {
        jwtPayload.defaultAddress = user.defaultAddress
      }
      break

    case 3:
      jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      }
      break

    case 5:
      jwtPayload = {
        userId: user.mobile,
        alias: user.alias,
        name: user.name,
        address: user.address,
        takeawayId: user.takeawayId,
        role: user.role,
        takeaway: user.takeaway,
      }
      break
    default:
      jwtPayload = {
        email: user.email,
        name: user.name,
        role: user.role,
      }
      break
  }

  const jwtObj = {
    jwtPayload,
  }

  return Jwt.sign(jwtObj, key)
}

/*
|----------------------------------------------
| helping function to generate salt.
|----------------------------------------------
*/
export const generateSalt = () => {
  const salt = Crypto.randomBytes(32).toString('hex')
  return salt
}

/*
|----------------------------------------------
| setting up hashed password
|----------------------------------------------
*/

export const hashedPassword = (password: string, salt: string) => {
  return Crypto.pbkdf2Sync(password, salt, 1000, 128, 'sha512').toString('hex')
}

/*
|----------------------------------------------
| function to format time.
|----------------------------------------------
*/

export const formatTime = (time: Date) => {
  const formated = new Date(time).toISOString().slice(0, 19).replace('T', '__')
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const year = formated.split('__')[0].split('-')[0]
  const month = monthNames[formated.split('__')[0].split('-')[1] - 1]
  const day = formated.split('__')[0].split('-')[2]

  return `${day} ${month}, ${year}`
}

export const sortArray = (array: string, sortWith: string) => {
  return array.sort((a, b) => a[sortWith] - b[sortWith])
}

export const groupBy = (array: [], key: string) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    })
  }, {})
}

export const dayOfTheWeek = (day: number) => {
  let today
  switch (day) {
    case 0:
      today = 'Sunday'
      break
    case 1:
      today = 'Monday'
      break
    case 2:
      today = 'Tuesday'
      break
    case 3:
      today = 'Wednesday'
      break
    case 4:
      today = 'Thursday'
      break
    case 5:
      today = 'Friday'
      break

    default:
      today = 'Saturday'
  }
  return today
}

export const setEncryptedCookie = (data: string) => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    process.env.CHECKOUTSESSIONKEY,
    process.env.CHECKOUTENCRYPTIONIV
  )
  let encrpytedData
  encrpytedData = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  encrpytedData += cipher.final('hex')

  return encrpytedData
}

export const deEncryptedCookie = (checkoutCookie: string) => {
  let decipherData
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    process.env.CHECKOUTSESSIONKEY,
    process.env.CHECKOUTENCRYPTIONIV
  )
  decipherData = decipher.update(checkoutCookie, 'hex', 'utf8')
  decipherData += decipher.final('utf8')
  decipherData = decipherData.toString('utf8')
  decipherData = JSON.parse(decipherData)

  return decipherData
}

export const removeSpaceAndCharacter = (string: string) => {
  return string.replace(/\s+/g, '')
}

export const getAmPm = (
  businessStatus: boolean,
  openingTime: number,
  deliveryStartTime: number,
  deliveryChoice: string,
  currentTime: number
) => {
  let ampm = 'am'

  if (currentTime > 730) {
    ampm = 'pm'
  } else {
    switch (deliveryChoice) {
      case 'delivery':
        ampm = deliveryStartTime > 720 ? 'pm' : 'am'
        break

      default:
        ampm = openingTime > 720 ? 'pm' : 'am'
    }
  }

  return ampm
}

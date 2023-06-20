'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const config_1 = __importDefault(require('../../../config'))
const users_model_1 = require('./users.model')
const users_utils_1 = require('./users.utils')
const createUser = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (user.password) {
      user.password = config_1.default.default_user_pass
    }
    // auto generated incremental id
    const id = yield (0, users_utils_1.generateUserId)()
    user.id = id
    const createdUser = yield users_model_1.User.create(user)
    if (!createUser) {
      throw new Error('Failed to Create User')
    }
    return createdUser
  })
exports.default = {
  createUser,
}

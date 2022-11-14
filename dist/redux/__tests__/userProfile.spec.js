"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _userProfile = _interopRequireWildcard(require("../userProfile"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var currentUserMock = {
  id: 338816933,
  email: 'user@example.com',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  country: 'GB',
  companyName: null,
  phoneNumber: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  postalCode: null,
  regDate: '2020-02-12 15:18:56',
  lastLoginDate: '2020-02-21 07:13:49',
  transactions: '6',
  payment: 'mc',
  termsAccepted: 'no',
  marketingOptIn: 'no',
  lastUserIp: '213.156.120.102',
  externalId: '',
  externalData: null
};
describe('UserProfile reducer', function () {
  it('should correctly call setCurrentPlan action', function () {
    var action = {
      type: _userProfile.SET_CURRENT_USER,
      payload: currentUserMock
    };
    var expectedState = {
      user: currentUserMock
    };
    expect((0, _userProfile.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setConsents action', function () {
    var action = {
      type: _userProfile.SET_CONSENTS,
      payload: [{
        name: 'terms'
      }]
    };
    var expectedState = {
      consents: [{
        name: 'terms'
      }]
    };
    expect((0, _userProfile.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setConsentsError action', function () {
    var action = {
      type: _userProfile.SET_CONSENTS_ERROR,
      payload: 'Failed to fetch'
    };
    var expectedState = {
      consentsError: 'Failed to fetch'
    };
    expect((0, _userProfile.default)(undefined, action)).toMatchObject(expectedState);
  });
});
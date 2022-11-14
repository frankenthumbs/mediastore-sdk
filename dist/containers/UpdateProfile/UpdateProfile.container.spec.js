"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _userProfile = require("../../redux/userProfile");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _UpdateProfile = require("./UpdateProfile.container");
/* eslint-disable react/jsx-props-no-spreading */

var userProfileMock = {
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
jest.mock("../labeling", function () {
  return function () {
    return function (Component) {
      return function (props) {
        return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
          t: function t(k) {
            return k;
          }
        }, props));
      };
    };
  };
});
jest.mock('react-i18next', function () {
  return {
    withTranslation: function withTranslation() {
      return function (Component) {
        return function (props) {
          return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
            t: function t(k) {
              return k;
            }
          }, props));
        };
      };
    }
  };
});
describe('<UpdateProfile/>', function () {
  describe('@container', function () {
    it('should show previously added value', function () {
      var initialState = {
        userProfile: userProfileMock,
        userConsents: [],
        consentsError: [],
        innerPopup: {
          isOpen: false,
          type: '',
          data: {}
        }
      };
      expect((0, _UpdateProfile.mapStateToProps)(initialState).userProfile).toEqual(userProfileMock);
    });
    it('should dispatch SET_CURRENT_USER action', function () {
      var dispatch = jest.fn();
      (0, _UpdateProfile.mapDispatchToProps)(dispatch).setCurrentUser();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _userProfile.SET_CURRENT_USER
      });
    });
    it('should dispatch SET_CONSENTS action', function () {
      var dispatch = jest.fn();
      (0, _UpdateProfile.mapDispatchToProps)(dispatch).setConsents();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _userProfile.SET_CONSENTS
      });
    });
    it('should dispatch SHOW_INNER_POPUP action', function () {
      var dispatch = jest.fn();
      (0, _UpdateProfile.mapDispatchToProps)(dispatch).showInnerPopup();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _innerPopupReducer.SHOW_INNER_POPUP
      });
    });
    it('should dispatch HIDE_INNER_POPUP action', function () {
      var dispatch = jest.fn();
      (0, _UpdateProfile.mapDispatchToProps)(dispatch).hideInnerPopup();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _innerPopupReducer.HIDE_INNER_POPUP
      });
    });
  });
});
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
require("jest-styled-components");
var _PasswordResetSuccess = _interopRequireDefault(require("./PasswordResetSuccess"));
var _PasswordResetSuccessStyled = require("./PasswordResetSuccessStyled");
/* eslint-disable react/jsx-props-no-spreading */

jest.mock("../../containers/labeling", function () {
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
describe('PasswordResetSuccess', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var MOCK_EMAIL = 'gummybear@cleeng.com';
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordResetSuccess.default, {
        email: MOCK_EMAIL
      }));
      var messageComponent = wrapper.find(_PasswordResetSuccessStyled.StyledMessage);
      expect(messageComponent).toHaveLength(1);
      expect(messageComponent.text()).toBe("Please check your inbox at {{email}}");
    });
  });
});
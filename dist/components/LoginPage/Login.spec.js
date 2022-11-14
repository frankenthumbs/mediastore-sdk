"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _ErrorPage = _interopRequireDefault(require("../ErrorPage"));
var _LoginForm = _interopRequireDefault(require("./LoginForm"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _Login = require("./Login");
/* eslint-disable react/jsx-props-no-spreading */

jest.mock("../../services/auth");
var mockUrlProps = {
  location: {
    search: '?offer=123123&publisher=123456789'
  }
};
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
describe('Login', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    _auth.default.isLogged = jest.fn(function () {
      return true;
    });
    it('should render initail state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Login.PureLogin, {
        urlProps: mockUrlProps
      }));
      expect(wrapper.find(_ErrorPage.default).exists()).toBe(false);
      expect(wrapper.find(_LoginForm.default).exists()).toBe(true);
    });
  });
});
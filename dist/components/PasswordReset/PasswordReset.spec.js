"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _Input = _interopRequireDefault(require("../Input"));
var _resetPassword = _interopRequireDefault(require("../../api/Auth/resetPassword"));
var _Button = _interopRequireDefault(require("../Button"));
var _EmailInput = _interopRequireDefault(require("../EmailInput"));
var _PasswordReset = _interopRequireWildcard(require("./PasswordReset"));
var _PasswordResetStyled = require("./PasswordResetStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react/jsx-props-no-spreading */

jest.mock("../../api/Auth/resetPassword");
var mockUrlProps = {
  location: {
    search: '?offer=123123'
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
var MockEmailValue = 'mock@email.com';
var MockInvalidEmailValue = 'mock@.com';
var MockOfferId = '762736382';
var FuncMock = jest.fn();
describe('PasswordReset', function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordReset.default, {
        onSuccess: jest.fn(),
        urlProps: mockUrlProps
      }));
      var inputComponent = wrapper.find(_Input.default);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().error).toBe('');
      expect(inputComponent.props().value).toBe('');
      var buttons = wrapper.find(_Button.default);
      expect(buttons).toHaveLength(1);
    });
  });
  describe('@events', function () {
    it('should update state on email input change', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PasswordReset.PurePasswordReset, {
        onSuccess: jest.fn(),
        urlProps: mockUrlProps
      }));
      var inputComponent = wrapper.find(_EmailInput.default);
      inputComponent.simulate('change', MockEmailValue);
      expect(wrapper.state().value).toBe(MockEmailValue);
    });
  });
  describe('@onSubmit', function () {
    it('should call onSuccess cb when email valid', function (done) {
      _resetPassword.default.mockResolvedValue({
        errors: []
      });
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordReset.PurePasswordReset, {
        onSuccess: FuncMock,
        urlProps: mockUrlProps
      }));
      var formComponent = wrapper.find(_PasswordResetStyled.FormStyled);
      wrapper.setState({
        value: MockEmailValue,
        offerId: MockOfferId
      });
      formComponent.simulate('submit');
      setImmediate(function () {
        expect(wrapper.state().message).toBe('');
        expect(FuncMock).toHaveBeenCalled();
        done();
      });
    });
    it('should not call onSuccess cb when email is not correct', function (done) {
      _resetPassword.default.mockResolvedValue({
        errors: MockEmailValue
      });
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordReset.PurePasswordReset, {
        onSuccess: FuncMock,
        urlProps: mockUrlProps
      }));
      var formComponent = wrapper.find(_PasswordResetStyled.FormStyled);
      wrapper.setState({
        value: MockEmailValue,
        offerId: MockOfferId
      });
      formComponent.simulate('submit');
      setImmediate(function () {
        expect(wrapper.state().message).not.toBe('');
        expect(FuncMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should set error when email is not properly formatted', function (done) {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordReset.PurePasswordReset, {
        onSuccess: FuncMock,
        urlProps: mockUrlProps
      }));
      var formComponent = wrapper.find(_PasswordResetStyled.FormStyled);
      wrapper.setState({
        value: MockInvalidEmailValue,
        offerId: MockOfferId
      });
      formComponent.simulate('submit');
      setImmediate(function () {
        expect(wrapper.state().message).not.toBe('');
        expect(FuncMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
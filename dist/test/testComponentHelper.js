"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderComponentWithLabeling = exports.mountComponentHelper = exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _excluded = ["children"],
  _excluded2 = ["children"],
  _excluded3 = ["children"];
jest.mock("../containers/labeling", function () {
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
var renderComponentHelper = function renderComponentHelper(Component) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      t: function t(key) {
        return key;
      }
    }, props), children));
    var component = {
      wrapper: wrapper,
      instance: wrapper.instance()
    };
    return component;
  };
};
var mountComponentHelper = function mountComponentHelper(Component) {
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      children = _ref2.children,
      props = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      t: function t(key) {
        return key;
      }
    }, props), children));
    var component = {
      wrapper: wrapper,
      instance: wrapper.instance()
    };
    return component;
  };
};
exports.mountComponentHelper = mountComponentHelper;
var renderComponentWithLabeling = function renderComponentWithLabeling(Component) {
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      children = _ref3.children,
      props = (0, _objectWithoutProperties2.default)(_ref3, _excluded3);
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      t: function t(key) {
        return key;
      }
    }, props), children)).first().shallow();
    var component = {
      wrapper: wrapper,
      instance: wrapper.instance()
    };
    return component;
  };
};
exports.renderComponentWithLabeling = renderComponentWithLabeling;
var _default = renderComponentHelper;
exports.default = _default;
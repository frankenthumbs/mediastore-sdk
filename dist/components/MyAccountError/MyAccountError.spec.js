"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
require("jest-styled-components");
var _MyAccountError = _interopRequireDefault(require("./MyAccountError"));
var _MyAccountErrorStyled = require("./MyAccountErrorStyled");
/* eslint-disable react/jsx-props-no-spreading */

jest.mock('react-i18next', function () {
  return {
    useTranslation: function useTranslation() {
      return {
        t: function t(key) {
          return key;
        }
      };
    }
  };
});
describe('<MyAccountError/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccountError.default, null));
      expect(wrapper.find(_MyAccountErrorStyled.IconStyled).exists()).toBe(false);
    });
  });
});
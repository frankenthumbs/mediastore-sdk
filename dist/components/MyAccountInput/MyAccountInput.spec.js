"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _MyAccountInput = _interopRequireDefault(require("./MyAccountInput"));
var _MyAccountInputStyled = require("./MyAccountInputStyled");
describe('<MyAccountInput/>', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, null));
      expect(wrapper.find(_MyAccountInputStyled.WrapStyled)).toHaveLength(1);
    });
  });
});
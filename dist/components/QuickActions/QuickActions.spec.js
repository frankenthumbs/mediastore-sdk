"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _QuickActions = _interopRequireDefault(require("./QuickActions"));
var _QuickActionsStyled = require("./QuickActionsStyled");
describe('<QuickActions/>', function () {
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_QuickActions.default, null));
  describe('@renders', function () {
    it('should render initial state', function () {
      expect(wrapper.find(_QuickActionsStyled.HeaderStyled)).toHaveLength(1);
    });
  });
});
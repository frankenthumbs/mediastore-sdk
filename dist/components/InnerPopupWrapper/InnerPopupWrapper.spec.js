"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _InnerPopupWrapper = _interopRequireDefault(require("./InnerPopupWrapper"));
var _InnerPopupWrapperStyled = require("./InnerPopupWrapperStyled");
require("jest-styled-components");
/* eslint-disable react/jsx-props-no-spreading */

var defaultProps = {
  steps: 2,
  popupTitle: 'title',
  currentStep: 1,
  children: /*#__PURE__*/_react.default.createElement("p", null, "mock"),
  isError: false
};
describe('<InnerPopupWrapper/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, defaultProps));
      expect(wrapper.find(_InnerPopupWrapperStyled.DotStyled)).toHaveLength(2);
      expect(wrapper.find(_InnerPopupWrapperStyled.HeaderTitleStyled).text()).toBe('title');
    });
  });
});
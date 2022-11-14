"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
require("jest-styled-components");
var _InputStyled = require("../Input/InputStyled");
var _Input = _interopRequireDefault(require("../Input"));
var _EmailInput = _interopRequireDefault(require("./EmailInput"));
var ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';
describe('EmailInput', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_EmailInput.default, null));
      var inputComponent = wrapper.find(_Input.default);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().value).toBe('');
      var inputElement = wrapper.find(_InputStyled.InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('email');
      expect(inputElement.props().autoComplete).toBe('off');
    });
    it('should show error message', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_EmailInput.default, {
        error: ERROR_MESSAGE
      }));
      var errorWrapper = wrapper.find(_InputStyled.ErrorWrapper);
      expect(errorWrapper).toHaveLength(1);
      expect(errorWrapper.text()).toBe(ERROR_MESSAGE);
    });
  });
});
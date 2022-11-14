"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _enzyme = require("enzyme");
var _react = _interopRequireDefault(require("react"));
var _Loader = _interopRequireDefault(require("./Loader"));
var _LoaderStyled = require("./LoaderStyled");
describe('<Loader/>', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Loader.default, null));
      var loaderElement = wrapper.find(_LoaderStyled.LoaderStyled);
      expect(loaderElement).toHaveLength(1);
    });
  });
});
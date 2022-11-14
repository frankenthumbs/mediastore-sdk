"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmButtonStyled = exports.AdyenStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var AdyenStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment__adyen'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 320px;\n  margin: 12px auto 0 auto;\n  ", "\n\n  .adyen-checkout__label--focused \n    .adyen-checkout__label__text {\n    color: ", ";\n    opacity: 1;\n  }\n\n  .adyen-checkout__input--error,\n  .adyen-checkout__input--error:hover,\n  .adyen-checkout__input--invalid,\n  .adyen-checkout__input--invalid:hover {\n    border-color: ", ";\n  }\n\n  .adyen-checkout__error-text {\n    color: ", ";\n  }\n\n  .adyen-checkout__input--focus,\n  .adyen-checkout__input--focus:hover,\n  .adyen-checkout__input:active,\n  .adyen-checkout__input:active:hover,\n  .adyen-checkout__input:focus,\n  .adyen-checkout__input:focus:hover {\n    border: 1px solid rgb(81 83 100 / 80%);\n    box-shadow: 0 0 5px 2px #f3f3f3;\n  }\n  .adyen-checkout__spinner {\n    border: 3px solid ", ";\n    border-top-color: transparent;\n  }\n  .adyen-checkout__input--valid {\n    border-bottom-color: ", ";\n  }\n  .adyen-checkout__input {\n    background-color: ", ";\n    color: ", " !important;\n  }\n  .input-field {\n    color: ", " !important;\n  }\n"])), function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      .adyen-checkout__label__text {\n        color: ", ";\n        font-size: 12px;\n        opacity: 0.8;\n      }\n    "])), _variables.FontColor);
}, _variables.FontColor, _variables.ErrorColor, _variables.ErrorColor, _variables.FontColor, _variables.ConfirmColor, _variables.BackgroundColor, _variables.FontColor, _variables.FontColor);
exports.AdyenStyled = AdyenStyled;
var ConfirmButtonStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 32px;\n"])));
exports.ConfirmButtonStyled = ConfirmButtonStyled;
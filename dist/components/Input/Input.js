"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _visibleBase = _interopRequireDefault(require("./icons/visibleBase64"));
var _unvisibleBase = _interopRequireDefault(require("./icons/unvisibleBase64"));
var _InputStyled = require("./InputStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Input = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Input, _Component);
  var _super = _createSuper(Input);
  function Input(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Input);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }
  (0, _createClass2.default)(Input, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        type = _this$props.type,
        placeholder = _this$props.placeholder,
        value = _this$props.value,
        _onChange = _this$props.onChange,
        onBlur = _this$props.onBlur,
        error = _this$props.error,
        showVisibilityIcon = _this$props.showVisibilityIcon,
        handleClickShowPassword = _this$props.handleClickShowPassword,
        showPassword = _this$props.showPassword,
        passwordStrength = _this$props.passwordStrength,
        ariaRequired = _this$props.ariaRequired,
        ariaInvalid = _this$props.ariaInvalid,
        icon = _this$props.icon,
        required = _this$props.required,
        floatingLabels = _this$props.floatingLabels,
        reference = _this$props.reference;
      return /*#__PURE__*/_react.default.createElement(_InputStyled.InputComponentStyled, null, /*#__PURE__*/_react.default.createElement(_InputStyled.InputElementWrapperStyled, {
        error: error,
        passwordStrength: passwordStrength
      }, required && /*#__PURE__*/_react.default.createElement(_InputStyled.InputRequiredStyled, null, "*"), /*#__PURE__*/_react.default.createElement(_InputStyled.InputElementStyled, {
        id: placeholder,
        autoComplete: "off",
        value: value,
        onChange: function onChange(event) {
          return _onChange(event.target.value);
        },
        type: type,
        onBlur: onBlur,
        ref: reference,
        "aria-required": ariaRequired,
        "aria-invalid": ariaInvalid,
        "aria-describedby": "".concat(placeholder, "-desc"),
        withIcon: icon,
        floatingLabels: floatingLabels
      }), /*#__PURE__*/_react.default.createElement(_InputStyled.LabelStyled, {
        htmlFor: placeholder,
        hasValue: value,
        withIcon: icon
      }, placeholder), showVisibilityIcon && /*#__PURE__*/_react.default.createElement(_InputStyled.StyledButton, {
        onClick: handleClickShowPassword,
        tabIndex: "0",
        "aria-label": "toggle password visibility",
        type: "button"
      }, showPassword ? /*#__PURE__*/_react.default.createElement(_InputStyled.StyledPasswordVisibility, {
        src: _unvisibleBase.default,
        alt: ""
      }) : /*#__PURE__*/_react.default.createElement(_InputStyled.StyledPasswordVisibility, {
        src: _visibleBase.default,
        alt: ""
      }))), /*#__PURE__*/_react.default.createElement(_InputStyled.ErrorWrapper, {
        passwordStrength: passwordStrength,
        id: "".concat(placeholder, "-desc")
      }, error));
    }
  }]);
  return Input;
}(_react.Component);
Input.propTypes = {
  placeholder: _propTypes.default.string,
  type: _propTypes.default.string,
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  error: _propTypes.default.string,
  showVisibilityIcon: _propTypes.default.bool,
  handleClickShowPassword: _propTypes.default.func,
  showPassword: _propTypes.default.bool,
  passwordStrength: _propTypes.default.string,
  ariaRequired: _propTypes.default.bool,
  ariaInvalid: _propTypes.default.bool,
  icon: _propTypes.default.elementType,
  required: _propTypes.default.bool,
  floatingLabels: _propTypes.default.bool,
  reference: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape()])
};
Input.defaultProps = {
  placeholder: '',
  type: 'text',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  error: '',
  value: '',
  showVisibilityIcon: false,
  handleClickShowPassword: function handleClickShowPassword() {},
  showPassword: false,
  passwordStrength: '',
  ariaRequired: false,
  ariaInvalid: false,
  icon: null,
  required: false,
  floatingLabels: true,
  reference: function reference() {}
};
var _default = Input;
exports.default = _default;
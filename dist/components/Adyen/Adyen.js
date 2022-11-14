"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureAdyen = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Button = _interopRequireDefault(require("../Button"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _variables = require("../../styles/variables");
var _appConfigHelper = require("../../util/appConfigHelper");
var _AdyenStyled = require("./AdyenStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var COMPONENT_CONTAINER_ID = 'component-container';
var PAYMENT_METHOD_CARD = 'card';
var Adyen = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Adyen, _Component);
  var _super = _createSuper(Adyen);
  function Adyen(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Adyen);
    _this = _super.call(this, props);
    _this.onError = function (e) {
      var error = e.error,
        fieldType = e.fieldType;
      window.dispatchEvent(new CustomEvent('MSSDK:Adyen-error', {
        detail: {
          error: error,
          fieldType: fieldType
        }
      }));
    };
    _this.getAdyenEnv = function () {
      return (0, _appConfigHelper.getData)('CLEENG_ENVIRONMENT') === 'production' ? 'live' : 'test';
    };
    _this.loadAdyenStylesheet = function () {
      var ADYEN_STYLESHEET_HREF = "https://checkoutshopper-".concat(_this.getAdyenEnv(), ".adyen.com/checkoutshopper/sdk/3.11.4/adyen.css");
      return new Promise(function (resolve, reject) {
        var linkEl = document.createElement('link');
        linkEl.onload = resolve;
        linkEl.onerror = reject;
        linkEl.rel = 'stylesheet';
        linkEl.href = ADYEN_STYLESHEET_HREF;
        document.body.append(linkEl);
      });
    };
    _this.loadAdyenScript = function () {
      var ADYEN_SCRIPT_HREF = "https://checkoutshopper-".concat(_this.getAdyenEnv(), ".adyen.com/checkoutshopper/sdk/3.10.1/adyen.js");
      return new Promise(function (resolve, reject) {
        var scriptEl = document.createElement('script');
        scriptEl.onload = resolve;
        scriptEl.onerror = reject;
        scriptEl.src = ADYEN_SCRIPT_HREF;
        document.body.append(scriptEl);
      });
    };
    _this.renderCheckout = function () {
      var _this$props = _this.props,
        onSubmit = _this$props.onSubmit,
        onChange = _this$props.onChange;
      var configuration = {
        showPayButton: false,
        hasHolderName: true,
        holderNameRequired: true,
        environment: _this.getAdyenEnv(),
        clientKey: _this.getAdyenEnv() === 'live' ? 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL' : 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K',
        onSubmit: onSubmit,
        onChange: onChange,
        onError: _this.onError
      };
      var cardConfiguration = {
        styles: {
          base: {
            color: _variables.FontColor
          }
        }
      };
      _this.checkout = new window.AdyenCheckout(configuration).create(PAYMENT_METHOD_CARD, cardConfiguration).mount("#".concat(COMPONENT_CONTAINER_ID));
    };
    _this.state = {
      isLoaded: false
    };
    return _this;
  }
  (0, _createClass2.default)(Adyen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (window.AdyenCheckout === undefined) {
        this.loadAdyenStylesheet().then(this.loadAdyenScript).then(this.renderCheckout).then(function () {
          _this2.setState({
            isLoaded: true
          });
        });
      } else {
        this.renderCheckout();
        this.setState({
          isLoaded: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var isLoaded = this.state.isLoaded;
      var _this$props2 = this.props,
        t = _this$props2.t,
        isPaymentProcessing = _this$props2.isPaymentProcessing,
        isCheckout = _this$props2.isCheckout;
      var myAccountProps = {
        size: 'normal',
        width: '60%',
        margin: 'auto'
      };
      var confirmButtonText = isCheckout ? t('Complete purchase') : t('Update');
      return /*#__PURE__*/_react.default.createElement(_AdyenStyled.AdyenStyled, {
        isMyAccount: !isCheckout
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: COMPONENT_CONTAINER_ID
      }), isLoaded && /*#__PURE__*/_react.default.createElement(_AdyenStyled.ConfirmButtonStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({
        size: "big"
      }, isCheckout ? {} : myAccountProps, {
        theme: "confirm",
        onClickFn: function onClickFn() {
          return _this3.checkout.submit();
        },
        disabled: isPaymentProcessing
      }), isPaymentProcessing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : confirmButtonText)));
    }
  }]);
  return Adyen;
}(_react.Component);
exports.PureAdyen = Adyen;
Adyen.propTypes = {
  t: _propTypes.default.func,
  onSubmit: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func,
  isPaymentProcessing: _propTypes.default.bool,
  isCheckout: _propTypes.default.bool
};
Adyen.defaultProps = {
  t: function t(k) {
    return k;
  },
  onChange: function onChange() {},
  isPaymentProcessing: false,
  isCheckout: true
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Adyen));
exports.default = _default;
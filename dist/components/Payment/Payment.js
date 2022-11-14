"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePayment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _api = require("../../api");
var _Button = _interopRequireDefault(require("../Button"));
var _Adyen = _interopRequireDefault(require("../Adyen"));
var _SectionHeader = _interopRequireDefault(require("../SectionHeader"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _PaymentMethodButton = _interopRequireDefault(require("../PaymentMethodButton"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _planHelper = require("../../util/planHelper");
var _PaymentStyled = require("./PaymentStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Payment = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Payment, _Component);
  var _super = _createSuper(Payment);
  function Payment(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Payment);
    _this = _super.call(this, props);
    _this.validatePaymentMethods = function (paymentMethods) {
      var showError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!paymentMethods) return [];
      var supportedPaymentMethods = ['card', 'paypal'];
      var supportedPaymentGateways = ['adyen', 'paypal'];
      var validPaymentMethods = paymentMethods.filter(function (method) {
        if (supportedPaymentMethods.includes(method.methodName) && supportedPaymentGateways.includes(method.paymentGateway)) return true;
        if (showError)
          // eslint-disable-next-line no-console
          console.error("Payment method not supported (id: ".concat(method.id, ")"));
        return false;
      });
      return validPaymentMethods;
    };
    _this.onAdyenSubmit = function (_ref) {
      var card = _ref.data.paymentMethod;
      var _this$props = _this.props,
        onPaymentComplete = _this$props.onPaymentComplete,
        t = _this$props.t;
      _this.setState({
        generalError: '',
        isLoading: true
      });
      (0, _api.submitPayment)(card).then(function (paymentReponse) {
        if (paymentReponse.errors.length) {
          window.dispatchEvent(new CustomEvent('MSSDK:purchase-failed', {
            detail: {
              reason: paymentReponse.errors[0]
            }
          }));
          var notSupportedMethod = paymentReponse.errors[0].includes('Payment details are not supported');
          if (notSupportedMethod) {
            _this.setState({
              generalError: t('Payment method not supported. Try different payment method'),
              isLoading: false
            });
          } else {
            _this.setState({
              generalError: t('The payment failed. Please try again.'),
              isLoading: false
            });
          }
        } else {
          window.dispatchEvent(new CustomEvent('MSSDK:purchase-successful', {
            detail: {
              payment: paymentReponse.responseData
            }
          }));
          onPaymentComplete();
        }
      });
    };
    _this.clearError = function () {
      _this.setState({
        generalError: ''
      });
    };
    _this.choosePaymentMethod = function (methodId, methodName) {
      _this.clearError();
      var orderId = (0, _appConfigHelper.getData)('CLEENG_ORDER_ID');
      if (orderId) {
        (0, _api.updateOrder)(orderId, {
          paymentMethodId: methodId
        }).then(function (response) {
          var updatePriceBreakdown = _this.props.updatePriceBreakdown;
          if (response.errors.length && response.errors[0].includes('JWT')) {
            _auth.default.logout();
          }
          updatePriceBreakdown(response.responseData.order);
        });
      }
      if (methodName === 'paypal') {
        _this.setState({
          isPayPal: true
        });
      } else {
        _this.setState({
          isPayPal: false
        });
      }
    };
    _this.submitPayPal = function () {
      var t = _this.props.t;
      _this.setState({
        isLoading: true
      });
      (0, _api.submitPayPalPayment)().then(function (resp) {
        window.location.href = resp.responseData.redirectUrl;
      }).catch(function () {
        return _this.setState({
          generalError: t('The payment failed. Please try again.'),
          isLoading: false
        });
      });
    };
    _this.finishTransaction = function () {
      var _this$props2 = _this.props,
        onPaymentComplete = _this$props2.onPaymentComplete,
        t = _this$props2.t;
      _this.setState({
        isLoading: true,
        generalError: ''
      });
      (0, _api.submitPaymentWithoutDetails)().then(function (paymentReponse) {
        if (paymentReponse.errors.length) {
          _this.setState({
            generalError: t('The payment failed. Please try again.'),
            isLoading: false
          });
        } else {
          window.dispatchEvent(new CustomEvent('MSSDK:purchase-successful', {
            detail: {
              payment: paymentReponse.responseData
            }
          }));
          onPaymentComplete();
        }
      });
    };
    _this.gernerateLegalNote = function () {
      var _this$props3 = _this.props,
        order = _this$props3.order,
        period = _this$props3.period;
      var discountApplied = order.discount && order.discount.applied;
      var isInTrial = discountApplied && order.discount.type === 'trial';
      var readablePrice = "".concat(_planHelper.currencyFormat[order.currency]).concat(order.priceBreakdown.offerPrice).concat(period ? "/".concat(period) : '');
      return /*#__PURE__*/_react.default.createElement(_PaymentStyled.LegalNoteWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentStyled.LegalTextStyled, null, /*#__PURE__*/_react.default.createElement("strong", null, discountApplied ? 'After any free trial and/or promotional period' : "By clicking 'Complete purchase'", ", you will be charged ", readablePrice, " or the then-current price plus applicable taxes on a recurring basis.", ' '), isInTrial && 'If you do not cancel the service during its free trial period, you will be charged. ', "Your subscription will automatically continue until you cancel. To cancel, log into", ' ', /*#__PURE__*/_react.default.createElement("a", {
        href: (0, _appConfigHelper.getData)('CLEENG_MY_ACCOUNT_URL'),
        style: {
          textDecoration: (0, _appConfigHelper.getData)('CLEENG_MY_ACCOUNT_URL') ? 'underline' : 'none'
        }
      }, "your account"), ' ', "and click 'Manage Subscription'."), /*#__PURE__*/_react.default.createElement(_PaymentStyled.LegalTextStyled, null, "By clicking 'Complete Purchase' above, I expressly acknowledge and agree to the above terms as well as the full Terms of Service."));
    };
    _this.state = {
      isPaymentFormDisplayed: false,
      isPayPal: false,
      isLoading: false,
      paymentMethods: [],
      generalError: ''
    };
    return _this;
  }
  (0, _createClass2.default)(Payment, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this$props4, t, availablePaymentMethods, validPaymentMethods, defaultMethod, paymentMethod, response, paymentMethods, validMethodsFromResponse, _paymentMethod;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props4 = this.props, t = _this$props4.t, availablePaymentMethods = _this$props4.availablePaymentMethods;
                validPaymentMethods = this.validatePaymentMethods(availablePaymentMethods);
                if (!validPaymentMethods.length) {
                  _context.next = 9;
                  break;
                }
                this.setState({
                  paymentMethods: validPaymentMethods
                });
                defaultMethod = validPaymentMethods.find(function (method) {
                  return method.default;
                });
                if (defaultMethod) {
                  this.setState({
                    isPaymentFormDisplayed: true
                  });
                  this.choosePaymentMethod(defaultMethod.id, defaultMethod.methodName);
                }
                if (validPaymentMethods.length === 1) {
                  paymentMethod = validPaymentMethods[0];
                  this.setState({
                    isPaymentFormDisplayed: true
                  });
                  this.choosePaymentMethod(paymentMethod.id, paymentMethod.methodName);
                }
                _context.next = 21;
                break;
              case 9:
                _context.prev = 9;
                _context.next = 12;
                return (0, _api.getPaymentMethods)();
              case 12:
                response = _context.sent;
                paymentMethods = response.responseData.paymentMethods;
                validMethodsFromResponse = this.validatePaymentMethods(paymentMethods, false);
                if (validMethodsFromResponse) {
                  if (!validMethodsFromResponse.length) {
                    this.setState({
                      generalError: t('Payment methods are not defined')
                    });
                  } else {
                    this.setState({
                      paymentMethods: validMethodsFromResponse
                    });
                    if (validMethodsFromResponse.length === 1) {
                      _paymentMethod = validMethodsFromResponse[0];
                      this.setState({
                        isPaymentFormDisplayed: true
                      });
                      this.choosePaymentMethod(_paymentMethod.id, _paymentMethod.methodName);
                    }
                  }
                } else if (!response.errors.length) {
                  this.setState({
                    generalError: t('Cannot fetch payment methods')
                  });
                }
                _context.next = 21;
                break;
              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](9);
                this.setState({
                  generalError: t('Cannot fetch payment methods')
                });
              case 21:
                if (window.location.search && window.location.search.includes('message')) {
                  this.setState({
                    generalError: t('Your payment was not processed. Please, try again')
                  });
                }
              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 18]]);
      }));
      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props5 = this.props,
        isPaymentDetailsRequired = _this$props5.isPaymentDetailsRequired,
        order = _this$props5.order,
        t = _this$props5.t;
      var _this$state = this.state,
        isPaymentFormDisplayed = _this$state.isPaymentFormDisplayed,
        generalError = _this$state.generalError,
        paymentMethods = _this$state.paymentMethods,
        isPayPal = _this$state.isPayPal,
        isLoading = _this$state.isLoading;
      return /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentStyled, null, isPaymentDetailsRequired ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, paymentMethods.length !== 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, {
        marginTop: "25px",
        center: true
      }, t('Purchase using')), /*#__PURE__*/_react.default.createElement(_PaymentStyled.MethodsWrapperStyled, null, paymentMethods.map(function (method) {
        return /*#__PURE__*/_react.default.createElement(_PaymentMethodButton.default, {
          key: method.id,
          methodName: method.methodName,
          onClickFn: function onClickFn() {
            _this2.setState({
              isPaymentFormDisplayed: true
            });
            _this2.choosePaymentMethod(method.id, method.methodName);
          }
        });
      }))), generalError && /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentErrorStyled, null, generalError), isPayPal && /*#__PURE__*/_react.default.createElement(_PaymentStyled.PayPalWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentStyled.PayPalTextStyled, null, order.totalPrice === 0 && order.offerId.charAt(0) === 'S' ? t('Click ‘Continue with PayPal‘ to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments.') : t('Click ‘Continue with PayPal‘ to complete your purchase.')), /*#__PURE__*/_react.default.createElement(_Button.default, {
        type: "button",
        theme: "payment",
        onClickFn: this.submitPayPal
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Continue with PayPal'))), isPaymentFormDisplayed && !isPayPal && /*#__PURE__*/_react.default.createElement(_Adyen.default, {
        onSubmit: this.onAdyenSubmit,
        onChange: this.clearError,
        isPaymentProcessing: isLoading
      }), (isPayPal || isPaymentFormDisplayed) && order.offerId.charAt(0) === 'S' && this.gernerateLegalNote()) : /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClickFn: this.finishTransaction,
        theme: "confirm",
        width: "250px",
        size: "big",
        margin: "20px auto 0 auto"
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Complete purchase')));
    }
  }]);
  return Payment;
}(_react.Component);
exports.PurePayment = Payment;
Payment.propTypes = {
  onPaymentComplete: _propTypes.default.func.isRequired,
  isPaymentDetailsRequired: _propTypes.default.bool,
  updatePriceBreakdown: _propTypes.default.func,
  order: _propTypes.default.objectOf(_propTypes.default.any),
  period: _propTypes.default.string,
  availablePaymentMethods: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number.isRequired,
    methodName: _propTypes.default.string.isRequired,
    paymentGateway: _propTypes.default.string.isRequired,
    default: _propTypes.default.bool
  })),
  t: _propTypes.default.func
};
Payment.defaultProps = {
  isPaymentDetailsRequired: true,
  updatePriceBreakdown: function updatePriceBreakdown() {},
  order: {},
  period: null,
  availablePaymentMethods: null,
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Payment));
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _paymentInfo = _interopRequireWildcard(require("../paymentInfo"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var paypalPaymentMethod = {
  id: 457654757,
  customerId: 338816933,
  paymentGateway: 'paypal',
  paymentMethod: 'paypal',
  paymentMethodSpecificParams: {
    holderName: 'User'
  },
  active: true,
  bound: false
};
var iosPaymentMethod = {
  id: 457654757,
  customerId: 338816933,
  paymentGateway: 'paypal',
  paymentMethod: 'paypal',
  paymentMethodSpecificParams: {
    holderName: 'User'
  },
  active: true,
  bound: false
};
var paymentDetailsMock = [{
  id: 680860225,
  customerId: 338816933,
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'Sample card',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  active: false,
  bound: false
}, _objectSpread({}, iosPaymentMethod), _objectSpread({}, paypalPaymentMethod)];
var transactionListPayload = [{
  transactionId: 'T650862998',
  transactionDate: 1584361260,
  offerId: 'S568296139_ZW',
  offerType: 'subscription',
  offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
}];
describe('PaymentInfo reducer', function () {
  it('should correctly call setPaymentDetails action and select active and bound payment details', function () {
    var action = {
      type: _paymentInfo.SET_PAYMENT_DETAILS,
      payload: paymentDetailsMock
    };
    var expectedState = {
      paymentDetails: paymentDetailsMock,
      activeOrBoundPaymentDetails: [paypalPaymentMethod, iosPaymentMethod]
    };
    expect((0, _paymentInfo.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setTransactionList action', function () {
    var action = {
      type: _paymentInfo.SET_TRANSACTIONS_LIST,
      payload: transactionListPayload
    };
    var expectedState = {
      transactionsList: transactionListPayload
    };
    expect((0, _paymentInfo.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setTransactionsToShow action without payload', function () {
    var action = {
      type: _paymentInfo.SET_TRANSACTIONS_TO_SHOW
    };
    var expectedState = {
      transactionsToShow: []
    };
    expect((0, _paymentInfo.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setTransactionsToShow action with payload', function () {
    var action = {
      type: _paymentInfo.SET_TRANSACTIONS_TO_SHOW,
      payload: 1
    };
    var expectedStateToShow = {
      transactionsToShow: []
    };
    expect((0, _paymentInfo.default)(undefined, action)).toMatchObject(expectedStateToShow);
  });
  it('should correctly call setTransactionsListAsFetched action', function () {
    var action = {
      type: _paymentInfo.SET_TRANSACTIONS_LIST_AS_FETCHED
    };
    var expectedState = {
      isTransactionListFetched: true
    };
    expect((0, _paymentInfo.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hideShowMoreButton action', function () {
    var action = {
      type: _paymentInfo.HIDE_SHOW_MORE_BUTTON
    };
    var expectedState = {
      isShowMoreButtonHidden: true
    };
    expect((0, _paymentInfo.default)(undefined, action)).toMatchObject(expectedState);
  });
});
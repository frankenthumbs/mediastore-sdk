"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
require("jest-styled-components");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _SubscriptionManagement = require("./SubscriptionManagement");
var _SubscriptionManagementStyled = require("./SubscriptionManagementStyled");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
jest.mock("../../containers/labeling", function () {
  return function () {
    return function (Component) {
      return function (props) {
        return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
          t: function t(k) {
            return k;
          }
        }, props));
      };
    };
  };
});
jest.mock('react-i18next', function () {
  return {
    withTranslation: function withTranslation() {
      return function (Component) {
        return function (props) {
          return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
            t: function t(k) {
              return k;
            }
          }, props));
        };
      };
    }
  };
});
describe('<MessageBox/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  var subscriptionMock = {
    offerId: 'S937144802_UA',
    status: 'active',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  };
  var subscriptionCancelledMock = {
    offerId: 'S937144802_UA',
    status: 'cancelled',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  };
  var updateListMock = jest.fn();
  var showInnerPopupMock = jest.fn();
  var showMessageBoxMock = jest.fn();
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.PureSubscriptionManagement, null));
      expect(wrapper.find(_SubscriptionManagementStyled.ManageButtonWrapStyled)).toHaveLength(1);
      expect(wrapper.find(_SubscriptionManagementStyled.SubscriptionActionsStyled)).toHaveLength(1);
    });
  });
  describe('@actions', function () {
    it('should call showInnerPopup on click unsubscribe', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.PureSubscriptionManagement, {
        subscription: subscriptionMock,
        showInnerPopup: showInnerPopupMock,
        updateList: updateListMock,
        showMessageBox: showMessageBoxMock
      }));
      wrapper.find(_SubscriptionManagementStyled.SimpleButtonStyled).simulate('click');
      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
      expect(showInnerPopupMock).toHaveBeenCalledWith({
        type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
        data: {
          action: 'unsubscribe',
          offerData: _objectSpread({}, subscriptionMock)
        }
      });
    });
    it('should call showInnerPopup on click resubscribe', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.PureSubscriptionManagement, {
        subscription: subscriptionCancelledMock,
        showInnerPopup: showInnerPopupMock,
        updateList: updateListMock,
        showMessageBox: showMessageBoxMock
      }));
      wrapper.find(_SubscriptionManagementStyled.FullWidthButtonStyled).simulate('click');
      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
      expect(showInnerPopupMock).toHaveBeenCalledWith({
        type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
        data: {
          action: 'resubscribe',
          offerData: _objectSpread(_objectSpread({}, subscriptionCancelledMock), {}, {
            price: "14.4\u20AC"
          })
        }
      });
    });
  });
});
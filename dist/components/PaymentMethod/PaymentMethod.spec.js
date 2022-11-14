"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _PaymentCard = _interopRequireDefault(require("../PaymentCard"));
var _PaymentMethod = _interopRequireDefault(require("./PaymentMethod"));
var _PaymentMethodStyled = require("./PaymentMethodStyled");
/* eslint-disable react/jsx-props-no-spreading */

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
    },
    useTranslation: function useTranslation() {
      return {
        t: function t(key) {
          return key;
        }
      };
    }
  };
});
var mockPaymentDetailsNotSupported = {
  id: 193925084,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'notSupportedMethod',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'dsadsadsa',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null,
  active: true
};
var paymentDetails = {
  id: 193925084,
  customerId: 280372348,
  token: '8315816736477319',
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'dsadsadsa',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null,
  active: true
};
describe('<PaymentMethod/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    var showPopupMock = jest.fn();
    it('should show the message if type is not supported', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.default, {
        activeOrBoundPaymentDetails: [mockPaymentDetailsNotSupported]
      }));
      expect(wrapper.find(_PaymentMethodStyled.Message)).toHaveLength(1);
    });
    it('should render error when request failed', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.default, {
        error: ['errorMock'],
        activeOrBoundPaymentDetails: []
      }));
      expect(wrapper.find(_MyAccountError.default)).toHaveLength(1);
      expect(wrapper.find(_MyAccountError.default).prop('generalError')).toBe(true);
    });
    it('should open popup to add payment details', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.default, {
        activeOrBoundPaymentDetails: [],
        showInnerPopup: showPopupMock
      }));
      expect(wrapper.find(_MyAccountError.default)).toHaveLength(1);
      expect(wrapper.find(_MyAccountError.default).prop('withBorder')).toBe(true);
      wrapper.find(_MyAccountError.default).simulate('click');
      expect(showPopupMock).toHaveBeenCalledTimes(1);
    });
    it('should render PaymentCard with proper desctiption', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PaymentMethod.default, {
        activeOrBoundPaymentDetails: [paymentDetails],
        showInnerPopup: showPopupMock
      }));
      expect(wrapper.find(_PaymentCard.default)).toHaveLength(1);
    });
  });
});
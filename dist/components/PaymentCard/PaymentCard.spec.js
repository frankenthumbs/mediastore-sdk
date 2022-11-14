"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
require("jest-styled-components");
var _PaymentCard = _interopRequireDefault(require("./PaymentCard"));
var _PaymentCardStyled = require("./PaymentCardStyled");
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
describe('<PaymentCard/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  var showInnerPopupMock = jest.fn();
  var defaultProps = {
    isDataLoaded: true,
    details: {
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
      active: true,
      bound: false
    },
    showInnerPopup: showInnerPopupMock
  };
  var payPalPaymentMethod = {
    paymentGateway: 'adyen',
    paymentMethod: 'card',
    paymentMethodSpecificParams: {
      holderName: 'dsadsadsa'
    },
    paymentMethodId: null,
    active: true,
    bound: false
  };
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PaymentCard.default, defaultProps));
      expect(wrapper.find(_PaymentCardStyled.CardWrapStyled)).toHaveLength(1);
      expect(wrapper.find(_PaymentCardStyled.CardEditStyled)).toHaveLength(1);
    });
    it('should show lastCardFourDigits and cardExpirationDate', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PaymentCard.default, defaultProps));
      expect(wrapper.find(_PaymentCardStyled.CardNumberStyled)).toHaveLength(1);
      expect(wrapper.find(_PaymentCardStyled.CardExpirationStyled)).toHaveLength(1);
    });
    it('should show holder name when no cardExpirationDate', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_PaymentCard.default, (0, _extends2.default)({}, defaultProps, {
        details: payPalPaymentMethod
      })));
      expect(wrapper.find(_PaymentCardStyled.CardExpirationStyled)).toHaveLength(1);
      expect(wrapper.find(_PaymentCardStyled.CardExpirationLabel).text()).toBe('Holder name');
    });
  });
});
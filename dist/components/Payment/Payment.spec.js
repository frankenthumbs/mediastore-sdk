"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _PaymentMethodButton = _interopRequireDefault(require("../PaymentMethodButton"));
var _Adyen = require("../Adyen/Adyen");
var _api = require("../../api");
var _appConfigHelper = require("../../util/appConfigHelper");
var _Payment = require("./Payment");
var _PaymentStyled = require("./PaymentStyled");
/* eslint-disable react/jsx-props-no-spreading */

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
var mockPaymentMethods = {
  responseData: {
    paymentMethods: [{
      id: 234,
      methodName: 'card',
      paymentGateway: 'adyen',
      logoUrl: 'https://cleeng.com/assets/7d823b2183d46cd1fe79a9a32c566e07.png'
    }, {
      id: 123,
      methodName: 'paypal',
      paymentGateway: 'paypal',
      logoUrl: ''
    }]
  },
  errors: []
};
var orderMock = {
  discount: {
    applied: false,
    type: ''
  },
  priceBreakdown: {
    offerPrice: 12
  },
  offerId: 'S123456789_PL',
  currency: 'EUR'
};
jest.mock("../../api", function () {
  return {
    createOrder: jest.fn().mockResolvedValue({
      orderId: '123123'
    }).mockName('createOrder'),
    updateOrder: jest.fn().mockResolvedValue({
      errors: [],
      responseData: {
        order: {}
      }
    }).mockName('updateOrder'),
    getPaymentMethods: jest.fn().mockResolvedValue({
      responseData: {
        paymentMethods: [{
          id: 234,
          methodName: 'card',
          paymentGateway: 'adyen',
          logoUrl: 'https://cleeng.com/assets/7d823b2183d46cd1fe79a9a32c566e07.png'
        }, {
          id: 123,
          methodName: 'paypal',
          paymentGateway: 'paypal',
          logoUrl: ''
        }]
      },
      errors: []
    }).mockName('getPaymentMethods'),
    submitPayment: jest.fn().mockResolvedValue({
      errors: []
    }).mockName('submitPayment'),
    submitPayPalPayment: jest.fn().mockResolvedValue({
      responseData: {
        redirectUrl: 'mock.com'
      },
      errors: []
    }).mockName('submitPayPalPayment')
  };
});
describe('Payment', function () {
  beforeEach(function () {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  it('renders with buttons', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: jest.fn()
    }));
    wrapper.setState({
      paymentMethods: mockPaymentMethods.responseData.paymentMethods
    });
    expect(wrapper.find(_PaymentMethodButton.default)).toHaveLength(2);
    expect(wrapper.find(_Adyen.PureAdyen)).toHaveLength(0);
  });
  it('fetch payment methods on render', function (done) {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: jest.fn()
    }));
    setImmediate(function () {
      expect(wrapper.state().paymentMethods).toEqual(mockPaymentMethods.responseData.paymentMethods);
      done();
    });
  });
  it('shows error while cannot fetch payment methods', function (done) {
    _api.getPaymentMethods.mockResolvedValueOnce({
      errors: ['Some error']
    });
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: jest.fn()
    }));
    setImmediate(function () {
      expect(wrapper.find(_PaymentStyled.PaymentErrorStyled).exists()).toBe(true);
      done();
    });
  });
  it('expands on button click', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: jest.fn(),
      order: orderMock
    }));
    (0, _appConfigHelper.setData)('CLEENG_ORDER_ID', 123123123);
    wrapper.setState({
      paymentMethods: mockPaymentMethods.responseData.paymentMethods
    });
    wrapper.find(_PaymentMethodButton.default).first().simulate('click');
    expect(wrapper.find(_Adyen.PureAdyen)).toHaveLength(1);
    expect(_api.updateOrder).toHaveBeenCalled();
  });
  it('clears error', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: jest.fn()
    }));
    var instance = wrapper.instance();
    instance.setState({
      generalError: 'ERROR'
    });
    expect(instance.state.generalError).not.toBe('');
    instance.clearError();
    expect(instance.state.generalError).toBe('');
  });
});
describe('Adyen submit', function () {
  it('complete payment on successful submit via adyen', function (done) {
    var mockOnPaymentComplete = jest.fn();
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: mockOnPaymentComplete
    }));
    var instance = wrapper.instance();
    instance.onAdyenSubmit({
      data: {
        paymentMethod: {}
      }
    });
    expect(_api.submitPayment).toHaveBeenCalled();
    setImmediate(function () {
      expect(instance.props.onPaymentComplete).toHaveBeenCalled();
      done();
    });
  });
  it('shows error when payment submit failed', function (done) {
    _api.submitPayment.mockResolvedValueOnce({
      errors: ['Some error']
    });
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: jest.fn()
    }));
    var instance = wrapper.instance();
    instance.onAdyenSubmit({
      data: {
        paymentMethod: {}
      }
    });
    expect(_api.submitPayment).toHaveBeenCalled();
    setImmediate(function () {
      expect(instance.state.generalError).not.toBe('');
      done();
    });
  });
});
describe('Paypal submit', function () {
  it('should call submitPayPalPayment', function (done) {
    var mockOnPaymentComplete = jest.fn();
    delete window.location;
    window.location = {
      href: ''
    };
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: mockOnPaymentComplete
    }));
    var instance = wrapper.instance();
    instance.submitPayPal();
    expect(_api.submitPayPalPayment).toHaveBeenCalled();
    setImmediate(function () {
      expect(window.location.href).toBe('mock.com');
      done();
    });
  });
  it('should set state when error occures', function (done) {
    _api.submitPayPalPayment.mockRejectedValue(new Error('erro'));
    var mockOnPaymentComplete = jest.fn();
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Payment.PurePayment, {
      onPaymentComplete: mockOnPaymentComplete
    }));
    var instance = wrapper.instance();
    instance.submitPayPal();
    expect(_api.submitPayPalPayment).toHaveBeenCalled();
    setImmediate(function () {
      expect(instance.state.generalError).toBe('The payment failed. Please try again.');
      done();
    });
  });
});
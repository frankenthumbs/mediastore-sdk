"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _formatNumber = _interopRequireDefault(require("../../util/formatNumber"));
var _CheckoutPriceBox = require("./CheckoutPriceBox");
var _CheckoutPriceBoxStyled = require("./CheckoutPriceBoxStyled");
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
describe('CheckoutPriceBox', function () {
  var customerServiceFee = 2;
  var paymentFee = 1;
  var offerPrice = 10;
  var customerCurrencySymbol = '$';
  var discountAmount = 2;
  var taxValue = 0.23;
  var finalPriceWithCoupon = offerPrice + taxValue - discountAmount;
  var finalPriceWithFees = offerPrice + customerServiceFee + paymentFee;
  var country = 'US';
  var taxRate = 0.2;
  it('displays coupon discount', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_CheckoutPriceBox.PureCheckoutPriceBox, {
      isCouponApplied: true,
      finalPrice: finalPriceWithCoupon,
      discountAmount: discountAmount,
      taxValue: taxValue,
      customerServiceFee: 0,
      paymentMethodFee: 0,
      customerCurrencySymbol: customerCurrencySymbol,
      offerPrice: offerPrice,
      country: country,
      taxRate: taxRate
    }));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceBoxWrapper)).toHaveLength(1);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper)).toHaveLength(4);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(0).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(offerPrice), " excl. Tax"));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(1).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("- ".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(discountAmount)));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(2).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(taxValue)));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(3).find(_CheckoutPriceBoxStyled.StyledTotalOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(finalPriceWithCoupon)));
  });
  it('displays payment and service fee', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_CheckoutPriceBox.PureCheckoutPriceBox, {
      isCouponApplied: false,
      finalPrice: offerPrice + customerServiceFee + paymentFee,
      discountAmount: 0,
      taxValue: 0,
      customerServiceFee: customerServiceFee,
      paymentMethodFee: paymentFee,
      customerCurrencySymbol: customerCurrencySymbol,
      offerPrice: offerPrice,
      country: country,
      taxRate: 0
    }));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceBoxWrapper)).toHaveLength(1);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper)).toHaveLength(4);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(0).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(offerPrice), " excl. Tax"));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(1).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(customerServiceFee)));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(2).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(paymentFee)));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(3).find(_CheckoutPriceBoxStyled.StyledTotalOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(finalPriceWithFees)));
  });
});
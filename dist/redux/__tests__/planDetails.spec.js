"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _planDetails = _interopRequireWildcard(require("../planDetails"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var planDetailsMock = [{
  offerId: 'S937144802_UA',
  status: 'active',
  expiresAt: 1582706082,
  nextPaymentPrice: 14.4,
  nextPaymentCurrency: 'EUR',
  paymentGateway: 'adyen',
  paymentMethod: 'mc',
  offerTitle: 'Monthly subscription with 7 days trial',
  period: 'month'
}, {
  offerId: 'S249781156_UA',
  status: 'active',
  expiresAt: 1597917717,
  nextPaymentPrice: 45.04,
  nextPaymentCurrency: 'EUR',
  paymentGateway: 'adyen',
  paymentMethod: 'mc',
  offerTitle: '6-Month without trial',
  period: '6months'
}];
describe('PlanDetails reducer', function () {
  it('should correctly call setCurrentPlan action', function () {
    var action = {
      type: _planDetails.SET_CURRENT_PLAN,
      payload: planDetailsMock
    };
    var expectedState = {
      currentPlan: planDetailsMock
    };
    expect((0, _planDetails.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call updateList action', function () {
    var action = {
      type: _planDetails.UPDATE_LIST
    };
    var expectedState = {
      updateList: true
    };
    expect((0, _planDetails.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setOfferToSwitch action', function () {
    var action = {
      type: _planDetails.SET_OFFER_TO_SWITCH,
      payload: planDetailsMock[0]
    };
    var expectedState = {
      offerToSwitch: planDetailsMock[0]
    };
    expect((0, _planDetails.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call setSwitchSettings action', function () {
    var action = {
      type: _planDetails.SET_SWITCH_SETTINGS,
      payload: {
        offerId: 'S937144802_UA',
        settings: planDetailsMock[0]
      }
    };
    var expectedState = {
      switchSettings: {
        S937144802_UA: planDetailsMock[0]
      }
    };
    expect((0, _planDetails.default)(undefined, action)).toMatchObject(expectedState);
  });
});
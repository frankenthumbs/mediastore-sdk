"use strict";

var _planDetails = require("../../redux/planDetails");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _Subscriptions = require("./Subscriptions.container");
var currentPlanMock = [{
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
describe('<Subscriptions/>', function () {
  it('should show previously added value', function () {
    var initialState = {
      planDetails: currentPlanMock
    };
    expect((0, _Subscriptions.mapStateToProps)(initialState).planDetails).toEqual(currentPlanMock);
  });
  it('should dispatch SET_CURRENT_PLAN action', function () {
    var dispatch = jest.fn();
    (0, _Subscriptions.mapDispatchToProps)(dispatch).setCurrentPlan();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _planDetails.SET_CURRENT_PLAN
    });
  });
  it('should dispatch SHOW_INNER_POPUP action', function () {
    var dispatch = jest.fn();
    (0, _Subscriptions.mapDispatchToProps)(dispatch).showInnerPopup();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _innerPopupReducer.SHOW_INNER_POPUP
    });
  });
  it('should dispatch HIDE_INNER_POPUP action', function () {
    var dispatch = jest.fn();
    (0, _Subscriptions.mapDispatchToProps)(dispatch).hideInnerPopup();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _innerPopupReducer.HIDE_INNER_POPUP
    });
  });
  it('should dispatch UPDATE_LIST action', function () {
    var dispatch = jest.fn();
    (0, _Subscriptions.mapDispatchToProps)(dispatch).updateList();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _planDetails.UPDATE_LIST
    });
  });
  it('should dispatch SET_OFFER_TO_SWITCH action', function () {
    var dispatch = jest.fn();
    (0, _Subscriptions.mapDispatchToProps)(dispatch).setOfferToSwitch();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _planDetails.SET_OFFER_TO_SWITCH
    });
  });
  it('should dispatch SET_SWITCH_SETTINGS action', function () {
    var dispatch = jest.fn();
    (0, _Subscriptions.mapDispatchToProps)(dispatch).setSwitchSettings();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _planDetails.SET_SWITCH_SETTINGS
    });
  });
});
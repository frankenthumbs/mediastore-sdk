"use strict";

var _userProfile = require("../../redux/userProfile");
var _planDetails = require("../../redux/planDetails");
var _popup = require("../../redux/popup");
var _MyAccount = require("./MyAccount.container");
describe('<MyAccount/>', function () {
  describe('@container', function () {
    it('should show previously added value', function () {
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
      }];
      var initialState = {
        planDetails: currentPlanMock,
        userProfile: {}
      };
      expect((0, _MyAccount.mapStateToProps)(initialState).planDetails).toEqual(currentPlanMock);
      expect((0, _MyAccount.mapStateToProps)(initialState).userProfile).toEqual({});
    });
    it('should dispatch SET_CURRENT_USER action', function () {
      var dispatch = jest.fn();
      (0, _MyAccount.mapDispatchToProps)(dispatch).setCurrentUser();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _userProfile.SET_CURRENT_USER
      });
    });
    it('should dispatch SET_CURRENT_PLAN action', function () {
      var dispatch = jest.fn();
      (0, _MyAccount.mapDispatchToProps)(dispatch).setCurrentPlan();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _planDetails.SET_CURRENT_PLAN
      });
    });
    it('should dispatch SET_CONSENTS action', function () {
      var dispatch = jest.fn();
      (0, _MyAccount.mapDispatchToProps)(dispatch).setConsents();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _userProfile.SET_CONSENTS
      });
    });
    it('should dispatch SET_CONSENTS_ERROR action', function () {
      var dispatch = jest.fn();
      (0, _MyAccount.mapDispatchToProps)(dispatch).setConsentsError();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _userProfile.SET_CONSENTS_ERROR
      });
    });
    it('should dispatch HIDE_POPUP action', function () {
      var dispatch = jest.fn();
      (0, _MyAccount.mapDispatchToProps)(dispatch).hidePopup();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _popup.HIDE_POPUP
      });
    });
    it('should dispatch SHOW_POPUP action', function () {
      var dispatch = jest.fn();
      (0, _MyAccount.mapDispatchToProps)(dispatch).showPopup({
        type: 'typeMock',
        consents: []
      });
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: _popup.SHOW_POPUP,
        payload: {
          type: 'typeMock',
          consents: []
        }
      });
    });
  });
});
"use strict";

var _paymentInfo = require("../../redux/paymentInfo");
var _TransactionList = require("./TransactionList.container");
var planDetailsMock = {
  id: 193925086,
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
  paymentMethodId: null
};
describe('<TransactionList/>', function () {
  it('should show previously added value', function () {
    var initialState = {
      paymentInfo: {
        paymentMethod: [planDetailsMock],
        transactionsList: [],
        transactionsToShow: [],
        isTransactionListFetched: false,
        isShowMoreButtonHidden: false
      }
    };
    expect((0, _TransactionList.mapStateToProps)(initialState).paymentInfo).toEqual({
      paymentMethod: [planDetailsMock],
      transactionsList: [],
      transactionsToShow: [],
      isTransactionListFetched: false,
      isShowMoreButtonHidden: false
    });
  });
  it('should dispatch SET_TRANSACTIONS_LIST action', function () {
    var dispatch = jest.fn();
    (0, _TransactionList.mapDispatchToProps)(dispatch).setTransactionsList();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _paymentInfo.SET_TRANSACTIONS_LIST
    });
  });
  it('should dispatch SET_TRANSACTIONS_TO_SHOW action', function () {
    var dispatch = jest.fn();
    (0, _TransactionList.mapDispatchToProps)(dispatch).setTransactionsToShow();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _paymentInfo.SET_TRANSACTIONS_TO_SHOW
    });
  });
  it('should dispatch SET_TRANSACTIONS_LIST_AS_FETCHED action', function () {
    var dispatch = jest.fn();
    (0, _TransactionList.mapDispatchToProps)(dispatch).setTransactionsListAsFetched();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _paymentInfo.SET_TRANSACTIONS_LIST_AS_FETCHED
    });
  });
  it('should dispatch HIDE_SHOW_MORE_BUTTON action', function () {
    var dispatch = jest.fn();
    (0, _TransactionList.mapDispatchToProps)(dispatch).hideShowMoreButton();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: _paymentInfo.HIDE_SHOW_MORE_BUTTON
    });
  });
});
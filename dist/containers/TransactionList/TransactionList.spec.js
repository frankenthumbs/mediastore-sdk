"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _SectionHeader = _interopRequireDefault(require("../../components/SectionHeader/SectionHeader"));
var _listCustomerTransactions = _interopRequireDefault(require("../../api/Customer/listCustomerTransactions"));
var _getPaymentDetails = _interopRequireDefault(require("../../api/Customer/getPaymentDetails"));
var _TransactionList = require("./TransactionList.component");
/* eslint-disable react/jsx-props-no-spreading */

jest.mock("../../api/Customer/listCustomerTransactions");
jest.mock("../../api/Customer/getPaymentDetails");
jest.mock("../labeling", function () {
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
var setPaymentMethodMock = jest.fn();
var setTransactionsListMock = jest.fn();
var setTransactionsToShowMock = jest.fn();
var setTransactionsListAsFetchedMock = jest.fn();
var hideShowMoreButtonMock = jest.fn();
var paymentDetailsData = {
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
var mockError = ['mockError'];
var transactionsListObject = {
  transactionId: 'T650862998',
  transactionDate: 1584361260,
  offerId: 'S568296139_ZW',
  offerType: 'subscription',
  offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice'
};
var defaultProps = {
  setPaymentMethod: setPaymentMethodMock,
  setTransactionsList: setTransactionsListMock,
  setTransactionsToShow: setTransactionsToShowMock,
  setTransactionsListAsFetched: setTransactionsListAsFetchedMock,
  hideShowMoreButton: hideShowMoreButtonMock
};
describe('<TransactionList/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@render', function () {
    it('should fetch data on componentDidMount', function (done) {
      _listCustomerTransactions.default.mockResolvedValue({
        responseData: {
          items: [transactionsListObject]
        },
        errors: []
      });
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [],
          transactionsList: []
        }
      })));
      expect(wrapper.find(_SectionHeader.default)).toHaveLength(1);
      setImmediate(function () {
        expect(setTransactionsListMock).toHaveBeenCalled();
        expect(setTransactionsListMock).toHaveBeenCalledWith([transactionsListObject]);
        expect(setTransactionsToShowMock).toHaveBeenCalled();
        expect(setTransactionsListAsFetchedMock).toHaveBeenCalled();
        expect(hideShowMoreButtonMock).toHaveBeenCalled();
        done();
      });
    });
    it('should not fetch data when data was fetched', function () {
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [paymentDetailsData],
          transactionsList: [transactionsListObject]
        }
      })));
      expect(setTransactionsToShowMock).toHaveBeenCalled();
      expect(_getPaymentDetails.default).not.toHaveBeenCalled();
      expect(_listCustomerTransactions.default).not.toHaveBeenCalled();
    });
    it('should set errors when fetch faild', function (done) {
      _listCustomerTransactions.default.mockResolvedValue({
        responseData: {},
        errors: mockError
      });
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, defaultProps));
      setImmediate(function () {
        expect(setPaymentMethodMock).not.toHaveBeenCalled();
        expect(wrapper.state('transactionsError')).toBe(mockError);
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when fetchTransactionsList fail', function (done) {
      _listCustomerTransactions.default.mockRejectedValue(new Error('error'));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, defaultProps));
      setImmediate(function () {
        expect(wrapper.state('transactionsError')).toEqual(['Something went wrong..']);
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should not set transaction list as fetched when it is possible to fetch more items', function (done) {
      _getPaymentDetails.default.mockResolvedValue({
        responseData: {
          paymentDetails: [paymentDetailsData]
        },
        errors: []
      });
      _listCustomerTransactions.default.mockResolvedValue({
        responseData: {
          items: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject]
        },
        errors: []
      });
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, defaultProps));
      setImmediate(function () {
        expect(setTransactionsToShowMock).toHaveBeenCalled();
        expect(setTransactionsToShowMock).toHaveBeenCalledWith(3);
        expect(setTransactionsListAsFetchedMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
  describe('@action', function () {
    it('should hide transaction list on click show less button', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [paymentDetailsData],
          transactionsList: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject]
        }
      })));
      wrapper.setState({
        isTransactionListExpanded: true
      });
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionListExpanded')).toBe(false);
      expect(setTransactionsToShowMock).toHaveBeenCalled();
    });
    it('should exapand list and NOT fetch transactions list if data was fetched', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [paymentDetailsData],
          transactionsList: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject],
          isTransactionListFetched: true
        }
      })));
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionListExpanded')).toBe(true);
      expect(setTransactionsToShowMock).toHaveBeenCalled();
    });
    it('should fetch whole transactions list if it was NOT fetched', function (done) {
      _listCustomerTransactions.default.mockResolvedValue({
        responseData: {
          items: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject]
        },
        errors: []
      });
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [paymentDetailsData],
          transactionsList: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject],
          isTransactionListFetched: false
        }
      })));
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionsItemsLoading')).toBe(true);
      expect(_listCustomerTransactions.default).toHaveBeenCalled();
      setImmediate(function () {
        expect(wrapper.state('isTransactionListExpanded')).toBe(true);
        expect(wrapper.state('isTransactionsItemsLoading')).toBe(false);
        expect(setTransactionsListAsFetchedMock).toHaveBeenCalled();
        expect(setTransactionsListMock).toHaveBeenCalled();
        expect(setTransactionsListMock).toHaveBeenCalledWith([transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject]);
        expect(setTransactionsToShowMock).toHaveBeenCalled();
        done();
      });
    });
    it('should set error in state when listCustomerTransactions fail on click show more button', function (done) {
      _listCustomerTransactions.default.mockResolvedValue({
        responseData: {},
        errors: mockError
      });
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [paymentDetailsData],
          transactionsList: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject],
          isTransactionListFetched: false
        }
      })));
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionsItemsLoading')).toBe(true);
      expect(_listCustomerTransactions.default).toHaveBeenCalled();
      setImmediate(function () {
        expect(wrapper.state('transactionsError')).toBe(mockError);
        expect(wrapper.state('isTransactionsItemsLoading')).toBe(false);
        expect(setTransactionsListAsFetchedMock).not.toHaveBeenCalled();
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when listCustomerTransactions fail on click show more button', function (done) {
      _listCustomerTransactions.default.mockRejectedValue(new Error('error'));
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_TransactionList.PureTransactionList, (0, _extends2.default)({}, defaultProps, {
        paymentInfo: {
          paymentMethod: [paymentDetailsData],
          transactionsList: [transactionsListObject, transactionsListObject, transactionsListObject, transactionsListObject],
          isTransactionListFetched: false
        }
      })));
      wrapper.instance().toggleTransactionsList();
      expect(wrapper.state('isTransactionsItemsLoading')).toBe(true);
      expect(_listCustomerTransactions.default).toHaveBeenCalled();
      setImmediate(function () {
        expect(wrapper.state('transactionsError')).toEqual(['Something went wrong..']);
        expect(wrapper.state('isTransactionsItemsLoading')).toBe(false);
        expect(setTransactionsListAsFetchedMock).not.toHaveBeenCalled();
        expect(setTransactionsListMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
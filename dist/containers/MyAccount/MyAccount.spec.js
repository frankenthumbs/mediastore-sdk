"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _getCustomerOffers = _interopRequireDefault(require("../../api/Customer/getCustomerOffers"));
var _getCustomer = _interopRequireDefault(require("../../api/Customer/getCustomer"));
var _getCustomerConsents = _interopRequireDefault(require("../../api/Customer/getCustomerConsents"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _MyAccount = require("./MyAccount.component");
/* eslint-disable react/jsx-props-no-spreading */

jest.mock("../../api/Customer/getCustomerOffers");
jest.mock("../../api/Customer/getCustomer");
jest.mock("../../api/Customer/getCustomerConsents");

// jest.mock('services/auth', () => ({
//   isLogged: jest.fn().mockImplementation(
//     () =>
//       new Promise(resolve => {
//         resolve(true);
//       })
//   )
// }));

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
var customerData = {
  id: 338816933,
  email: 'user@example.com',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  country: 'GB',
  companyName: null,
  phoneNumber: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  postalCode: null,
  regDate: '2020-02-12 15:18:56',
  lastLoginDate: '2020-02-21 07:13:49',
  transactions: '6',
  payment: 'mc',
  termsAccepted: 'no',
  marketingOptIn: 'no',
  lastUserIp: '213.156.120.102',
  externalId: '',
  externalData: null
};
var offersData = {
  items: [{
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
    offerType: 'P',
    offerId: 'P770673843_PL',
    status: 'active',
    expiresAt: 1679669059,
    startedAt: 1648133059,
    offerTitle: 'Test pass',
    totalPrice: 25
  }]
};
var customerConsents = [{
  customerId: '338816933',
  name: 'broadcaster_marketing',
  required: false,
  state: 'declined',
  version: '2',
  needsUpdate: false,
  label: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
  value: 'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
  newestVersion: '2',
  date: 1588942073
}, {
  customerId: '338816933',
  name: 'terms',
  required: true,
  state: 'accepted',
  version: '1',
  needsUpdate: false,
  label: 'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
  value: 'https://cleeng.com/cleeng-user-agreement',
  newestVersion: '1',
  date: 1588942073
}];
var setCurrentPlanMock = jest.fn();
var setCurrentUserMock = jest.fn();
var setConsentsMock = jest.fn();
var setConsentsErrorMock = jest.fn();
var showPopupMock = jest.fn();
var hidePopupMock = jest.fn();
describe('<MyAccount/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  beforeEach(function () {
    _auth.default.isLogged = jest.fn(function () {
      return true;
    });
  });
  var defaultProps = {
    setCurrentPlan: setCurrentPlanMock,
    setCurrentUser: setCurrentUserMock,
    setConsents: setConsentsMock,
    setConsentsError: setConsentsErrorMock,
    showPopup: showPopupMock,
    hidePopup: hidePopupMock
  };
  describe('@renders', function () {
    it('should fetch currentPlan, customer and consents on componentDidMount', function (done) {
      _getCustomerOffers.default.mockResolvedValue({
        responseData: offersData,
        errors: []
      });
      _getCustomer.default.mockResolvedValue({
        responseData: customerData,
        errors: []
      });
      _getCustomerConsents.default.mockResolvedValue({
        responseData: {
          consents: customerConsents
        },
        errors: []
      });
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: []
        },
        userProfile: {
          user: null,
          consents: []
        }
      })));
      setImmediate(function () {
        expect(setCurrentUserMock).toHaveBeenCalled();
        expect(setCurrentUserMock).toHaveBeenCalledWith(customerData);
        expect(setCurrentPlanMock).toHaveBeenCalledWith(offersData.items);
        expect(setConsentsMock).toHaveBeenCalledWith(customerConsents);
        done();
      });
    });
    it('should store errors if cannot fetch getCustomerConsents', function (done) {
      var returnedErrors = ['Some error'];
      _getCustomerConsents.default.mockResolvedValue({
        responseData: {},
        errors: returnedErrors
      });
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: []
        }
      })));
      setImmediate(function () {
        expect(setConsentsMock).not.toHaveBeenCalled();
        expect(setConsentsErrorMock).toHaveBeenCalled();
        done();
      });
    });
    it('should setConsentsError if cannot fetch getCustomerConsents', function (done) {
      var returnedErrors = ['Some error'];
      _getCustomerConsents.default.mockRejectedValue([].concat(returnedErrors));
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: []
        }
      })));
      setImmediate(function () {
        expect(setConsentsMock).not.toHaveBeenCalled();
        expect(setConsentsErrorMock).toHaveBeenCalled();
        done();
      });
    });
  });
  describe('@update', function () {
    var CONSENTS = {
      termsUpdateRequired: [{
        customerId: '338816933',
        name: 'terms',
        required: true,
        state: 'declined',
        version: '1',
        needsUpdate: false,
        label: 'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        value: 'https://cleeng.com/cleeng-user-agreement',
        newestVersion: '2',
        date: 1588942073
      }],
      consentsUpdateRequired: [{
        customerId: '338816933',
        name: 'broadcaster_marketing',
        required: false,
        state: 'declined',
        version: '1',
        needsUpdate: true,
        label: 'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        value: 'https://cleeng.com/cleeng-user-agreement',
        newestVersion: '2',
        date: 1588942073
      }],
      notCheckedTerms: [{
        customerId: '338816933',
        name: 'terms',
        required: true,
        state: 'declined',
        version: '1',
        needsUpdate: false,
        label: 'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        value: 'https://cleeng.com/cleeng-user-agreement',
        newestVersion: '1',
        date: 1588942073
      }],
      defaultConsents: [{
        customerId: '338816933',
        name: 'terms',
        required: true,
        state: 'accepted',
        version: '1',
        needsUpdate: false,
        label: 'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        value: 'https://cleeng.com/cleeng-user-agreement',
        newestVersion: '1',
        date: 1588942073
      }],
      hidePopup: [{
        customerId: '338816933',
        name: 'terms',
        required: true,
        state: 'accepted',
        version: '1',
        needsUpdate: false,
        label: 'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        value: 'https://cleeng.com/cleeng-user-agreement',
        newestVersion: '1',
        date: 1588942073
      }]
    };
    it('should render notCheckedTerms popup', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: CONSENTS.defaultConsents
        }
      })));
      wrapper.setProps({
        userProfile: {
          consents: CONSENTS.notCheckedTerms
        }
      });
      expect(showPopupMock).toHaveBeenCalledWith({
        type: 'notCheckedTerms',
        consents: CONSENTS.notCheckedTerms
      });
    });
    it('should render complexUpdate popup', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: CONSENTS.defaultConsents
        }
      })));
      wrapper.setProps({
        userProfile: {
          consents: [].concat((0, _toConsumableArray2.default)(CONSENTS.consentsUpdateRequired), (0, _toConsumableArray2.default)(CONSENTS.termsUpdateRequired))
        }
      });
      expect(showPopupMock).toHaveBeenCalledWith({
        type: 'complexUpdate',
        consents: [].concat((0, _toConsumableArray2.default)(CONSENTS.termsUpdateRequired), (0, _toConsumableArray2.default)(CONSENTS.consentsUpdateRequired))
      });
    });
    it('should render termsUpdateRequired popup', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: CONSENTS.defaultConsents
        }
      })));
      wrapper.setProps({
        userProfile: {
          consents: CONSENTS.termsUpdateRequired
        }
      });
      expect(showPopupMock).toHaveBeenCalledWith({
        type: 'termsUpdateRequired',
        consents: CONSENTS.termsUpdateRequired
      });
    });
    it('should render consentsUpdateRequired layout', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: CONSENTS.defaultConsents
        }
      })));
      wrapper.setProps({
        userProfile: {
          consents: CONSENTS.consentsUpdateRequired
        }
      });
      expect(showPopupMock).toHaveBeenCalledWith({
        type: 'consentsUpdateRequired',
        consents: CONSENTS.consentsUpdateRequired
      });
    });
    it('should hidepopup if consents are valid', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccount.PureMyAccount, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: offersData.items
        },
        userProfile: {
          user: {
            email: 'example@user.com'
          },
          consents: CONSENTS.defaultConsents
        }
      })));
      wrapper.setProps({
        userProfile: {
          consents: CONSENTS.hidePopup
        }
      });
      expect(hidePopupMock).toHaveBeenCalled();
    });
  });
});
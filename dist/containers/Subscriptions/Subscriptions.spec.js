"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _getCustomerSubscriptions = _interopRequireDefault(require("../../api/Customer/getCustomerSubscriptions"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _UpdateSubscription = _interopRequireDefault(require("../../components/UpdateSubscription"));
var _Subscriptions = require("./Subscriptions.component");
/* eslint-disable react/jsx-props-no-spreading */

jest.mock("../../api/Customer/getCustomerSubscriptions");
jest.mock("../../api/Customer/getAvailableSwitches");
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
var setCurrentPlanMock = jest.fn();
var showInnerPopupMock = jest.fn();
var hideInnerPopupMock = jest.fn();
var setOfferToSwitchMock = jest.fn();
var setSwitchSettingsMock = jest.fn();
var updateListMock = jest.fn();
var defaultProps = {
  setCurrentPlan: setCurrentPlanMock,
  showInnerPopup: showInnerPopupMock,
  hideInnerPopup: hideInnerPopupMock,
  setOfferToSwitch: setOfferToSwitchMock,
  setSwitchSettings: setSwitchSettingsMock,
  updateList: updateListMock
};
describe('<Subscriptions/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@componentDidMount', function () {
    it('should set state when fetchSubscriptions return error', function (done) {
      _getCustomerSubscriptions.default.mockResolvedValue({
        responseData: {},
        errors: ['error']
      });
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Subscriptions.PureSubscriptions, defaultProps));
      setImmediate(function () {
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when fetchSubscriptions fail', function (done) {
      _getCustomerSubscriptions.default.mockRejectedValue(new Error('error'));
      (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Subscriptions.PureSubscriptions, defaultProps));
      setImmediate(function () {
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should hide survey on switch tabs', function () {
      (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Subscriptions.PureSubscriptions, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          isSurveyShown: true,
          currentPlan: ['mock']
        },
        innerPopup: {
          isOpen: true
        }
      })));
      expect(hideInnerPopupMock).toHaveBeenCalled();
      expect(updateListMock).toHaveBeenCalled();
    });
  });
  describe('@actions', function () {
    it('should render updateSubscription popup', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Subscriptions.PureSubscriptions, (0, _extends2.default)({}, defaultProps, {
        planDetails: {
          currentPlan: [1],
          switchSettings: {
            id: [{
              mock: 'mock'
            }]
          },
          offerToSwitch: {
            offerId: 'id'
          },
          updateList: false
        },
        innerPopup: {
          isOpen: true,
          type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
          data: {
            action: 'resubscribe',
            offerData: {
              mock: 'mock'
            }
          }
        }
      })));
      expect(wrapper.find(_UpdateSubscription.default).exists()).toBe(true);
    });
  });
});
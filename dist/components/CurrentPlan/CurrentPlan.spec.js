"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _SubscriptionManagement = _interopRequireDefault(require("../SubscriptionManagement"));
var redux = _interopRequireWildcard(require("react-redux"));
var _CurrentPlan = require("./CurrentPlan");
var _CurrentPlanStyled = require("./CurrentPlanStyled");
require("jest-styled-components");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    },
    useTranslation: function useTranslation() {
      return {
        t: function t(key) {
          return key;
        }
      };
    },
    Trans: function Trans(_ref) {
      var children = _ref.children;
      return children;
    }
  };
});
var planDetailsMock = [{
  offerId: 'S937144802_UA',
  status: 'active',
  expiresAt: 1582706082,
  nextPaymentPrice: 14.4,
  nextPaymentCurrency: 'EUR',
  paymentGateway: 'adyen',
  paymentMethod: 'mc',
  offerTitle: 'Monthly subscription with 7 days trial',
  period: 'month',
  offerType: 'S'
}, {
  offerType: 'P',
  offerId: 'P770673843_UA',
  status: 'active',
  expiresAt: 1679669059,
  startedAt: 1648133059,
  offerTitle: 'Test pass',
  totalPrice: 25
}];
var showInnerPopupMock = jest.fn();
var setOfferToSwitchMock = jest.fn();
var updateList = jest.fn();
var spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue({
  currentPlan: [],
  updateList: false,
  offerToSwitch: {},
  switchSettings: {},
  switchDetails: {}
});
describe('<CurrentPlan/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state without subscriptions', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      expect(wrapper.prop('subscriptions')).toStrictEqual([]);
    });
    it('should render initial state with subscriptions parameter', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock,
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      expect(wrapper.prop('subscriptions')).toStrictEqual(planDetailsMock);
      expect(wrapper.find(_CurrentPlanStyled.SubscriptionStyled)).toHaveLength(2);
      expect(wrapper.find(_SubscriptionManagement.default)).toHaveLength(1);
    });
  });
  describe('@actions', function () {
    it('should save data about offer to switch on click OfferCard if offerType is S', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock,
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      wrapper.find(_CurrentPlanStyled.SubscriptionStyled).first().simulate('click');
      expect(setOfferToSwitchMock).toHaveBeenCalledTimes(1);
      expect(setOfferToSwitchMock).toHaveBeenCalledWith(planDetailsMock[0]);
    });
    it('should not save data about offer to switch on click OfferCard if offerType is P', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock,
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      wrapper.find(_CurrentPlanStyled.SubscriptionStyled).last().simulate('click');
      expect(setOfferToSwitchMock).not.toHaveBeenCalled();
    });
  });
});
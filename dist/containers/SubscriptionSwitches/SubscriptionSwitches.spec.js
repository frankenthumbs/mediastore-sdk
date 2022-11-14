"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _SwitchPlanPopup = _interopRequireDefault(require("../../components/SwitchPlanPopup"));
var _SubscriptionSwitches = require("./SubscriptionSwitches.component");
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
describe('<SubscriptionSwitches/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@actions', function () {
    it('should render SwitchPlan popup', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionSwitches.PureSubscriptionSwitches, (0, _extends2.default)({}, defaultProps, {
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
          type: _innerPopupReducer.POPUP_TYPES.switchPlan,
          data: {
            offerData: {
              mock: 'mock'
            }
          }
        }
      })));
      expect(wrapper.find(_SwitchPlanPopup.default).exists()).toBe(true);
    });
  });
});
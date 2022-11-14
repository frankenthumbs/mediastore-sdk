"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _CurrentPlan = require("../CurrentPlan/CurrentPlan");
var _CurrentPlanStyled = require("../CurrentPlan/CurrentPlanStyled");
var redux = _interopRequireWildcard(require("react-redux"));
var _SubscriptionSwitchesList = require("./SubscriptionSwitchesList");
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
    }
  };
});
var spyStore = jest.spyOn(redux, 'useSelector');
spyStore.mockReturnValue({
  currentPlan: [],
  updateList: false,
  offerToSwitch: {},
  switchSettings: {},
  switchDetails: {}
});
describe('<SubscriptionSwitchesList/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should show loader if isLoading', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesList.PureSubscriptionSwitchesList, {
        isLoading: true,
        isOfferSelected: false
      }));
      expect(wrapper.find(_CurrentPlan.SkeletonCard)).toHaveLength(1);
    });
    it('should show error if offer is not selected', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesList.PureSubscriptionSwitchesList, {
        isOfferSelected: false
      }));
      expect(wrapper.find(_MyAccountError.default)).toHaveLength(1);
    });
    it('should show error if offer is selected and there are no switch settings', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesList.PureSubscriptionSwitchesList, {
        isOfferSelected: true
      }));
      expect(wrapper.find(_MyAccountError.default)).toHaveLength(1);
    });
    it('should show error if errors are passed', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesList.PureSubscriptionSwitchesList, {
        isOfferSelected: false,
        errors: ['error']
      }));
      expect(wrapper.find(_MyAccountError.default)).toHaveLength(1);
    });
    it('should render SubscriptionSwitchesList if offer is selected and there are switch settings', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SubscriptionSwitchesList.PureSubscriptionSwitchesList, {
        isOfferSelected: true,
        switchSettings: {
          available: [{
            toOfferId: 'mock',
            period: 'month',
            title: 'title',
            currency: 'EUR',
            price: 10
          }]
        }
      }));
      expect(wrapper.find(_CurrentPlanStyled.SubscriptionStyled)).toHaveLength(1);
    });
  });
});
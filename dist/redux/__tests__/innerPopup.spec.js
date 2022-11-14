"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _innerPopupReducer = _interopRequireWildcard(require("../innerPopupReducer"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe('InnerPopup reducer', function () {
  it('should correctly call showInnerPopup action', function () {
    var action = {
      type: _innerPopupReducer.SHOW_INNER_POPUP,
      payload: {
        type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
        data: {
          mock: 'mock'
        }
      }
    };
    var expectedState = {
      isOpen: true,
      type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
      data: {
        mock: 'mock'
      }
    };
    expect((0, _innerPopupReducer.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hideInnerPopup action', function () {
    var action = {
      type: _innerPopupReducer.HIDE_INNER_POPUP
    };
    var expectedState = {
      isOpen: false,
      type: '',
      data: {}
    };
    expect((0, _innerPopupReducer.default)(undefined, action)).toMatchObject(expectedState);
  });
});
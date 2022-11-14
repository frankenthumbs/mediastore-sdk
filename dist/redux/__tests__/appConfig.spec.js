"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _appConfig = _interopRequireWildcard(require("../appConfig"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe('appConfigReducer', function () {
  it('should correctly call setData action', function () {
    var action = {
      type: _appConfig.SET_DATA,
      payload: {
        name: 'CLEENG_OFFER_ID',
        value: 'mockOfferId'
      }
    };
    var expectedState = {
      CLEENG_OFFER_ID: 'mockOfferId'
    };
    expect((0, _appConfig.default)(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call removeData action', function () {
    var action = {
      type: _appConfig.REMOVE_DATA,
      payload: {
        name: 'CLEENG_OFFER_ID'
      }
    };
    var expectedState = {
      CLEENG_OFFER_ID: ''
    };
    expect((0, _appConfig.default)(undefined, action)).toMatchObject(expectedState);
  });
});
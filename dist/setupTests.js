"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
require("regenerator-runtime/runtime");
var _enzyme = _interopRequireDefault(require("enzyme"));
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));
/* eslint-disable import/no-extraneous-dependencies */

_enzyme.default.configure({
  adapter: new _enzymeAdapterReact.default()
});
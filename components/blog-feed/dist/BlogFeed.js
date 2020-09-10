"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ContentTop = _interopRequireDefault(require("./components/ContentTop"));

var _EditorialRow = _interopRequireDefault(require("./components/EditorialRow"));

var _FeaturedRow = _interopRequireDefault(require("./components/FeaturedRow"));

var _InfoRow = _interopRequireDefault(require("./components/InfoRow"));

var _LatestRow = _interopRequireDefault(require("./components/LatestRow"));

var _PopularRow = _interopRequireDefault(require("./components/PopularRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogFeed = function BlogFeed(_ref) {
  var host = _ref.host;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "page-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "feed-container"
  }, /*#__PURE__*/_react.default.createElement(_ContentTop.default, {
    domain: host
  }), /*#__PURE__*/_react.default.createElement(_FeaturedRow.default, null), /*#__PURE__*/_react.default.createElement(_InfoRow.default, null), /*#__PURE__*/_react.default.createElement(_EditorialRow.default, null), /*#__PURE__*/_react.default.createElement(_LatestRow.default, null), /*#__PURE__*/_react.default.createElement(_PopularRow.default, null)));
};

var _default = BlogFeed;
exports.default = _default;

//# sourceMappingURL=BlogFeed.jsx.map
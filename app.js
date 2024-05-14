"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/message/message.js";
  "./pages/recommend/recommend.js";
  "./pages/mine/mine.js";
  "./pages/chat/chat.js";
  "pages/friend_zone/friend_zone.js";
  "pages/new_post/new_post.js";
}
const _sfc_main = {
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来开发者调用的云开发接口是往哪个云环境发请求
        //   可以是环境ID字符串，也可以是一个对象，指定各服务的环境
        //   默认是默认环境（第一个创建的环境）
        env: 'cloud1-5gdn5vic8035a51d',
        traceUser: true,
      });
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/82034/Documents/web/web_project/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

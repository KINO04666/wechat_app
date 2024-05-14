"use strict";
const common_vendor = require("../../common/vendor.js");

const _sfc_main = {
  __name: "login",
  setup(__props) {
    const studentId = common_vendor.ref("");
    const password = common_vendor.ref("");
    const avatarUrl = common_vendor.ref("https://636c-cloud1-5gdn5vic8035a51d-1326436168.tcb.qcloud.la/%E7%94%A8%E6%88%B7.png?sign=b183cf330d4062ea45b8f5dbce1aa1e1&t=1715135822");  // 默认头像URL
    common_vendor.useRouter();
    
    function fetchAvatar() {
      if (!studentId.value) {
        avatarUrl.value = "https://636c-cloud1-5gdn5vic8035a51d-1326436168.tcb.qcloud.la/%E7%94%A8%E6%88%B7.png?sign=b183cf330d4062ea45b8f5dbce1aa1e1&t=1715135822";
        return;
      }
      const db = wx.cloud.database();
      const accounts = db.collection('account');
      accounts.where({
        username: studentId.value
      }).get().then(res => {
        wx.setStorageSync('userId', studentId.value)
        if (res.data.length > 0 && res.data[0].avatar_url) {
          console.log("找到头像 URL:", res.data[0].avatar_url);
          avatarUrl.value = res.data[0].avatar_url;
          wx.setStorageSync('avatar_url', avatarUrl.value)
        } else {
          console.log("未找到用户，使用默认头像");
          avatarUrl.value = "https://636c-cloud1-5gdn5vic8035a51d-1326436168.tcb.qcloud.la/%E7%94%A8%E6%88%B7.png?sign=b183cf330d4062ea45b8f5dbce1aa1e1&t=1715135822";
        }
      }).catch(err => {
        console.error('获取头像失败', err);
        avatarUrl.value = "https://636c-cloud1-5gdn5vic8035a51d-1326436168.tcb.qcloud.la/%E7%94%A8%E6%88%B7.png?sign=b183cf330d4062ea45b8f5dbce1aa1e1&t=1715135822";
      });
    }

    function login() {
      if (!studentId.value || !password.value) {
        common_vendor.index.showToast({
          title: '请输入学号和密码',
          icon: 'none'
        });
        return;
      }
      const db = wx.cloud.database();
      const accounts = db.collection('account');
      accounts.where({
        username: studentId.value,
        password: password.value
      }).get({
        success: function(res) {
        
          if (res.data.length > 0) {
            common_vendor.index.switchTab({
              url: '/pages/message/message'
            });
          } else {
            common_vendor.index.showToast({
              title: '学号或密码错误',
              icon: 'none'
            });
          }
        },
        fail: function() {
          common_vendor.index.showToast({
            title: '登录异常，请重试',
            icon: 'none'
          });
        }
      });
    }

    return (_ctx, _cache) => {
      return {
        
        a: studentId.value,
        b: common_vendor.o(($event) => { studentId.value = $event.detail.value; fetchAvatar(); }),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: common_vendor.o(login),
        avatar: avatarUrl,
      };
    };
  }
};

const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/82034/Documents/web/web_project/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);

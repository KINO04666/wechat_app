"use strict";
const common_vendor = require("../../common/vendor.js");

const _sfc_main = {
  data() {
    return {
      avatarUrl: wx.getStorageSync('avatar_url') || '/static/cherry_pic.png', // 使用默认头像作为备选
      profile: {
        name: wx.getStorageSync('name'),
        studentId: wx.getStorageSync('userId'),
        password: ""
      },
      // 图文内容数据未更改
    };
  },
  methods: {
    saveProfile() {
      const db = wx.cloud.database();
      const accountCollection = db.collection('account');
      let updateData = {
        name: this.profile.name
      };

      if (this.profile.password) {
        updateData.password = this.profile.password;
      }

      accountCollection.where({
        username: this.profile.studentId
      }).update({
        data: updateData,
        success: res => {
          wx.showToast({
            title: '更新成功',
            icon: 'success'
          });
          // 更新成功后，可以选择清空输入的密码
          this.profile.password = '';
        },
        fail: err => {
          wx.showToast({
            title: '更新失败',
            icon: 'error'
          });
          console.error('更新失败', err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.profile.name,
    b: common_vendor.o(($event) => $data.profile.name = $event.detail.value),
    c: $data.profile.username,
    d: common_vendor.o(($event) => $data.profile.username = $event.detail.value),
    e: common_vendor.t($data.profile.studentId),
    f: common_vendor.o((...args) => $options.saveProfile && $options.saveProfile(...args)),
    g: common_vendor.f($data.posts, (post, index, i0)=> {
      return {
        a: post.image,
        b: common_vendor.t(post.text),
        c: common_vendor.t(post.date),
        d: index,
      };
    }),
    avatar: $data.avatarUrl,
    password:$data.password,
    setp:common_vendor.o(($event) => $data.profile.password = $event.detail.value),
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/82034/Documents/web/web_project/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);

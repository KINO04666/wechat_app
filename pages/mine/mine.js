"use strict";
const common_vendor = require("../../common/vendor.js");

const _sfc_main = {
  data() {
    return {
      avatarUrl: wx.getStorageSync('avatar_url') || '/static/cherry_pic.png', // 使用默认头像作为备选
      profile: {
        name: "张三",
        username: "zhangsan123",
        studentId: wx.getStorageSync('userId')
      },
      posts: [
        { image: "/static/mh.jpg", text: "今天的花真美！", date: "2023-05-07" },
        { image: "/static/bg2.jpg", text: "刚刚看到的风景！", date: "2023-05-06" }
      ]
      // 图文内容数据未更改
    };
  },
  methods: {
    saveProfile() {
      console.log("保存个人信息", this.profile);
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
    avatar: $data.avatarUrl
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/82034/Documents/web/web_project/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);

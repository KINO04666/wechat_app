"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      posts: [
        { id: 1, content: "这是我的第一条朋友圈", author: "小明", avatar: "/static/cherry_pic.png", image: "/static/bg2.jpg", timestamp: "2022-01-01 10:00" },
        { id: 2, content: "今天天气不错哦", author: "小红", avatar: "/static/grape_pic.png", image: "/static/bg2.jpg", timestamp: "2022-01-02 11:00" },
        { id: 3, content: "大家新年快乐！", author: "小刚", avatar: "/static/cherry_pic.png", image: "/static/logo.png", timestamp: "2022-01-03 12:00" },
        { id: 4, content: "春天来了", author: "小李", avatar: "/static/grape_pic.png", image: "/static/mh.jpg", timestamp: "2022-01-04 13:00" }
      ]
    };
  },
  methods: {
    goToNewPost() {
      common_vendor.index.navigateTo({
        url: "/pages/new_post/new_post"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.posts, (post, index, i0) => {
      return {
        a: post.avatar,
        b: common_vendor.t(post.author),
        c: post.image,
        d: common_vendor.t(post.content),
        e: common_vendor.t(post.timestamp),
        f: post.id,
        g: index % 2 !== 0 ? 1 : ""
      };
    }),
    b: common_vendor.o((...args) => $options.goToNewPost && $options.goToNewPost(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/82034/Documents/web/web_project/pages/friend_zone/friend_zone.vue"]]);
wx.createPage(MiniProgramPage);

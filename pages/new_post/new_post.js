"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      postData: {
        text: ""
      },
      imageURL: ""
      // 图片URL
    };
  },
  watch: {
    imageURL(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadImage(newVal);
      }
    }
  },
  methods: {
    loadImage(url) {
      const timeStampedUrl = url;
      this.imageURL = timeStampedUrl;
    },
    sendPost() {
      console.log("Post data:", this.postData.text, "Image URL:", this.imageURL);
    },
    handleImageError() {
      console.log("Error loading the image");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.postData.text,
    b: common_vendor.o(($event) => $data.postData.text = $event.detail.value),
    c: $data.imageURL,
    d: common_vendor.o(($event) => $data.imageURL = $event.detail.value),
    e: $data.imageURL
  }, $data.imageURL ? {
    f: $data.imageURL,
    g: common_vendor.o((...args) => $options.handleImageError && $options.handleImageError(...args))
  } : {}, {
    h: common_vendor.o((...args) => $options.sendPost && $options.sendPost(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/82034/Documents/web/web_project/pages/new_post/new_post.vue"]]);
wx.createPage(MiniProgramPage);

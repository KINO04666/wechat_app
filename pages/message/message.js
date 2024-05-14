"use strict";
const db = wx.cloud.database();
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  
  data() {
    return {
      chats: []
    };
  },
  onShow() {
    this.loadChats();
  },
  methods: {
    
    loadChats() {
      const watcher = db.collection('chats')
        .where({ 'participants.userId': wx.getStorageSync('userId') })
        .watch({
          onChange: (snapshot) => {
            // 这里处理数据变化
            const chats = snapshot.docs;
            const userPromises = [];
            chats.forEach(chat => {
              const otherUserId = chat.participants.find(p => p.userId !== wx.getStorageSync('userId')).userId;
              userPromises.push(db.collection('account').where({ username: otherUserId }).get());
            });
            Promise.all(userPromises).then(userResults => {
              const finalChats = chats.map((chat, index) => {
                const otherUser = userResults[index].data[0];
                return {
                  name: chat.participants.find(p => p.userId !== wx.getStorageSync('userId')).name,
                  chatId: chat._id,
                  avatar: otherUser ? otherUser.avatar_url : "https://636c-cloud1-5gdn5vic8035a51d-1326436168.tcb.qcloud.la/%E7%94%A8%E6%88%B7.png?sign=b183cf330d4062ea45b8f5dbce1aa1e1&t=1715135822",
                  lastMessage: chat.lastMessage.text,
                  time: chat.lastUpdateTime
                };
              });
              this.chats = finalChats;
            });
          },
          onError: (err) => {
            console.error('Listen failed:', err);
          }
        });
      
      // 在适当的时候关闭监听，例如页面卸载时
      this.$once('hook:beforeDestroy', () => {
        watcher.close();
      });
    },
    
    openChat(chat) {
      console.log(`Opening chat with ${chat.name}`);
      common_vendor.index.navigateTo({
        url: `/pages/chat/chat?chatId=${encodeURIComponent(chat.chatId)}&name=${encodeURIComponent(chat.name)}`
      });
    }
    
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.chats, (chat, index, i0) => {
      return {
        a: chat.avatar,
        b: common_vendor.t(chat.name),
        c: common_vendor.t(chat.lastMessage),
        d: common_vendor.t(chat.time),
        e: index,
        f: common_vendor.o(($event) => $options.openChat(chat), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/82034/Documents/web/web_project/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);

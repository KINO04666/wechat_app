"use strict";
const db = wx.cloud.database();
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  
  data() {
    return {
      chats: [],
      newFriend: "",  // 用户名
      friendRemark: "",  //备注
      currentUserName: ""  // 当前用户的名称
    };
  },
  onShow() {
    this.loadChats();
    this.loadCurrentUser();
  },
  methods: {
    loadCurrentUser() {
      const userId = wx.getStorageSync('userId');
      db.collection('account').where({ username: userId }).get().then(res => {
        if (res.data.length > 0) {
          this.currentUserName = res.data[0].name;
          wx.setStorageSync('name', this.currentUserName)
        } else {
          wx.showToast({
            title: '用户信息获取失败',
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error(err);
        wx.showToast({
          title: '查询用户信息失败',
          icon: 'none'
        });
      });
    },
    addFriend() {
      if (this.newFriend.trim() === "") {
        wx.showToast({
          title: '请输入好友名称',
          icon: 'none'
        });
        return;
      }
      
      db.collection('account').where({ username: this.newFriend }).get().then(res => {
        if (res.data.length > 0) {
          const otherUserId = res.data[0].username;
          const otherUserName = res.data[0].name;
          const friendRemark = this.friendRemark.trim() !== "" ? this.friendRemark : otherUserName;
          db.collection('chats').add({
            data: {
              participants: [
                { userId: wx.getStorageSync('userId'), name: wx.getStorageSync("name") },
                { userId: otherUserId, name: friendRemark }
              ],
              lastMessage: {
                text: "",
                timestamp: "",
              },
              lastUpdateTime: ""
            }
          }).then(() => {
            this.loadChats();
            this.newFriend = "";
            this.friendRemark = "";
            wx.showToast({
              title: '好友添加成功',
              icon: 'success'
            });
          }).catch(err => {
            console.error(err);
            wx.showToast({
              title: '添加好友失败',
              icon: 'none'
            });
          });
        } else {
          wx.showToast({
            title: '用户不存在',
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error(err);
        wx.showToast({
          title: '查询用户失败',
          icon: 'none'
        });
      });
    },
    
    onInputNewFriend(event) {
      this.newFriend = event.detail.value;
    },
    
    onInputFriendRemark(event) {
      this.friendRemark = event.detail.value;
    },
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
    },
    openChat(chat) {
      console.log(`Opening chat with ${chat.name}`);
      common_vendor.index.navigateTo({
        url: `/pages/chat/chat?chatId=${encodeURIComponent(chat.chatId)}&name=${encodeURIComponent(chat.name)}`
      });
    },
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
    }),
    b: $data.newFriend,
    c: common_vendor.o(($event) => $data.newFriend = $event.detail.value),
    d: $data.friendRemark,
    e: common_vendor.o(($event) => $data.friendRemark = $event.detail.value),
    f: common_vendor.o($options.addFriend)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/82034/Documents/web/web_project/pages/message/message.vue"]]);
wx.createPage(MiniProgramPage);

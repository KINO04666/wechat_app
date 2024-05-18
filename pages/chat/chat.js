"use strict";
const common_vendor = require("../../common/vendor.js");
const db = wx.cloud.database();
const _sfc_main = {
  data() {
    return {
      chatId: "",
      chatName: "",
      newMessage: "",
      messages: [],
      watcher: null // 添加 watcher 属性
    };
  },
  methods: {
    loadMessages() {
      this.watcher = db.collection('chats')
        .doc(this.chatId)
        .watch({
          onChange: (snapshot) => {
            const message = snapshot.docChanges[0]?.doc;
            if (message && message.messages) {
              const messages = message.messages
            this.messages = messages.map(msg => ({
              text: msg.text,
              isMine: msg.sentBy === wx.getStorageSync('userId')
            }));
          }
          },
          onError: (err) => {
            console.error('Failed to listen to chat messages:', err);
          }
        });
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const newMsg = {
          text: this.newMessage,
          sentBy: wx.getStorageSync('userId'), // 这里的"user_002"应替换为当前用户的ID
          timestamp: formatDateTime(new Date()) // 使用 JavaScript 的 Date 对象记录时间戳
        };
    
        // 本地更新消息列表
        this.messages.push({
          ...newMsg,
          isMine: true,
        });
    
        // 清空输入框
        this.newMessage = "";
    
        // 更新数据库
        db.collection('chats').doc(this.chatId).update({
          data: {
            messages: db.command.push(newMsg),
            lastMessage: newMsg, // 这里应该直接使用 newMsg 作为 lastMessage
            lastUpdateTime: formatDateTime(new Date()) // 更新最后的更新时间
          }
        }).then(() => {
          console.log("Message and last message updated successfully.");
        }).catch(err => {
          console.error('Failed to send message:', err);
        });
      }
    },
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
  },
  onLoad(options) {
    console.log('Received options:', options);  // 输出接收到的所有选项
    if (options.chatId) {
      this.chatId = options.chatId;
      this.chatName = decodeURIComponent(options.name || "未知联系人");
      this.loadMessages();  // 确保调用加载消息的方法
    } else {
      console.error('No chatId provided');
      // 这里可以添加处理逻辑，如返回上一页或显示错误消息
    }
  },
  onUnload() {
    // 页面卸载时关闭监听器
    if (this.watcher) {
      this.watcher.close();
    }
  }
};
function formatDateTime(date) {
  let month = date.getMonth() + 1;  // 月份从0开始，所以加1
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  
  month = month < 10 ? '0' + month : month;  // 确保月份有两位数字
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  return `${month}/${day} ${hour}:${minute}`;
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.chatName),
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: common_vendor.f($data.messages, (message, index, i0) => {
      return {
        b: common_vendor.t(message.text),
        c: index,
        d: message.isMine ? 1 : "",
        e: !message.isMine ? 1 : ""
      };
    }),
    d: $data.newMessage,
    e: common_vendor.o(($event) => $data.newMessage = $event.detail.value),
    f: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0a633310"], ["__file", "C:/Users/82034/Documents/web/web_project/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);

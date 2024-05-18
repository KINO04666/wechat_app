// pages/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    word: "浙江工商大学",
    start: 0
  },
  
  getword: function(e) {
    console.log(e.detail.value)
    const word = e.detail.value

    if (!word) {
      console.log("空")
      return
    }
    this.setData({
      word: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      // title: '热门',
    })
    const start = this.data.start
    this.getdata(start)
  },

  search : function () {
    this.setData({
      datalist: [],
      start: 0
    })
    const start=this.data.start
    this.getdata()
  },

  getdata: function (start=0) {
    const datalist = this.data.datalist
    const that = this
    const word = this.data.word

    wx.request({
      url: 'https://www.duitang.com/napi/blogv2/list/by_search/?kw='+word+'&after_id='+start+'&type=feed&include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Clike_id%2Csender%2Calbum%2Creply_count%2Cfavorite_blog_id&_type=&_=1714837348358',
      success: (result) => {
        console.log(result.data.data.object_list)
        that.setData({
          datalist: datalist.concat(result.data.data.object_list),
        })
      },
    })
  },

  onReachBottom() {
    console.log("下拉")
    let start = this.data.start
    start+=24

    wx.showLoading({
      title: '加载中',
    })

    this.getdata(start)
    this.setData({
      start: start
    })

    setTimeout(function(){
      wx.hideLoading()
    },2000)
  },
})
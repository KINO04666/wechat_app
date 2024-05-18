// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    navlist: ["教学楼","体育馆","文体中心","外国语学院","计算机学院","经济学院","法学院","综合楼","校门","小动物","花花草草","帅哥美女","讲座","餐厅","宿舍","运动会","典礼","超市","街道","体育场"],
    word: "教学楼",
  },

  getdata: function (start=0) {
    const that = this
    const word = this.data.word

    wx.request({
      url: 'https://www.duitang.com/napi/blogv2/list/by_search/?kw='+word+'&after_id=0&type=feed&include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Clike_id%2Csender%2Calbum%2Creply_count%2Cfavorite_blog_id&_type=&_=1714837348358',
      success: (result) => {
        console.log(result.data.data.object_list)
        that.setData({
          datalist: result.data.data.object_list,
        })
      }
    })
  },

  navclick: function(e) {
    console.log(e.currentTarget.dataset.name)
    this.setData({
      word: e.currentTarget.dataset.name,
      index: e.currentTarget.dataset.index
    })
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
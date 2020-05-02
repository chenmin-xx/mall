import { request } from '../../request/index.js'
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地数据
    const Cates = wx.getStorageSync('cates');
    // 判断本地是否有数据，且数据没有过期
    if (!Cates) {
      // 本地没有数据，发送请求
      this.getCates()
    } else {
      // 数据过期，重新发送请求
      if (Date.now() - Cates.tiem > 10000) {
        this.getCates()
      } else {
        // 使用本地数据
        this.Cates = Cates.data

        let leftList = this.Cates.map(item => item.cat_name)
        let rightList = this.Cates[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }
  },
  // 请求分类数据
  async getCates() {
    // request({
    //   url: '/categories'
    // }).then(res => {
    //   this.Cates = res
    //   // 将数据保存到本地
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

    //   let leftList = this.Cates.map(item => item.cat_name)
    //   let rightList = this.Cates[0].children
    //   this.setData({
    //     leftList,
    //     rightList
    //   })
    // })
    const res = await request({
      url: '/categories'
    })
    this.Cates = res
    // 将数据保存到本地
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

    let leftList = this.Cates.map(item => item.cat_name)
    let rightList = this.Cates[0].children
    this.setData({
      leftList,
      rightList
    })
  },
  // 点击菜单
  menuClick(e) {

    let index = e.currentTarget.dataset.index
    let rightList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightList,
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
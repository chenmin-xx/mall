import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getSwiterList()
    this.getCatesList()
    this.getFloorList()
  },
  // 获取轮播图
  getSwiterList(){
    request({
      url:'/home/swiperdata'
    }).then(res =>{
      this.setData({
        swiperList: res
      })
    })
  },
  // 获取分类导航
  getCatesList(){
    request({
      url:'/home/catitems'
    }).then(res =>{
      this.setData({
        catesList: res
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({
      url:'/home/floordata'
    }).then(res =>{
      this.setData({
        floorList: res
      })
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
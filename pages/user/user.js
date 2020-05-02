// pages/user/user.js
Page({
  data:{
    userInfo:{}
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userInfo
    })
  },
  // 获取用户信息
  handleGetUserInfo(e) {
    const {userInfo} = e.detail
    this.setData({
      userInfo
    })
    wx.setStorageSync('userInfo', userInfo);
  }
})
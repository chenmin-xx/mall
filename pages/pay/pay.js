import { showToast } from '../../utils/asyncWX.js'
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    order: []
  },
  onShow() {
    // 旧订单数据
    let oldOrder = wx.getStorageSync('order') || [];

    // 当页面显示时获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart')
    // 过滤后的购物车数据
    cart = cart.filter(item => item.check)
    // console.log(filterCart)

    // 总价格、总数量
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      totalPrice += item.num * item.goods_price
      totalNum++
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
      order: oldOrder
    })


  },

  // 支付
  async handlePay(e) {

    // 支付成功后将已支付的商品添加到订单数据中
    let NewOrder = wx.getStorageSync('cart').filter(item => item.check)
    NewOrder.map(item => {
      item.status = '已支付'
      // 支付时间
      item.timer = Date.now()
    })
    this.setData({
      order: [...this.data.order, ...NewOrder]
    })
    wx.setStorageSync('order', this.data.order);


    // 删除购物车中已经支付完成的商品
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(item => !item.check)
    wx.setStorageSync('cart', newCart);


    // console.log(e)
    await showToast({ title: '支付中', icon: 'loading' })
    await setTimeout(() => {
      showToast({ title: '支付成功', icon: 'success' })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/order/order'
        });
      }, 2000)
    }, 2000)


  }
})
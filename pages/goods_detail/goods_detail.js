import { request } from '../../request/index'
// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: { goods_id }
    })
    this.goodsInfo = res
    this.setData({
      goodsDetail: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // 为兼容iphone手机，替换.webp格式图片为.jpg
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      }
    })
  },
  // 点击图片预览大图
  previewImage(e) {
    // 构造要预览图片的数组
    const urls = this.goodsInfo.pics.map(i => i.pics_mid)
    // 接收传递过来的图片url
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击添加到购物车
  addCart() {
    // 从本地缓存中获取数据
    let cart = wx.getStorageSync('cart') || [];
    // 判断购物车中是否已存在该商品
    let index = cart.findIndex(item => item.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      // 购物车中没有该商品，添加商品并设置数量为1
      this.goodsInfo.num = 1
      this.goodsInfo.check = true
      cart.push(this.goodsInfo)
    } else {
      // 购物车中已有该商品，商品数量+1
      cart[index].num++
    }
    // 将数据存到本地缓存
    wx.setStorageSync('cart', cart);
    // 开启提示框
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
    });

  }
})
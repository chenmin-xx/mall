import { getSetting, chooseAddress, openSetting, showToast } from '../../utils/asyncWX.js'
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 当页面显示时获取缓存中的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || []
    // 计算全选
    // const allChecked = cart.length?cart.every(i=>i.check):false
    // 计算总价格、总数量

    this.setData({ address })
    this.setCart(cart)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选中状态改变
  itemChange(e) {
    // 获取被改变的商品id
    const goods_id = e.currentTarget.dataset.goods_id
    // 获取购物车数据
    let { cart } = this.data
    // 找到被修改的商品对象
    let index = cart.findIndex(item => item.goods_id === goods_id)
    // 选中状态取反
    cart[index].check = !cart[index].check
    // 将新数据存回
    this.setCart(cart)

  },
  // 点击+、-按钮
  itemNumEdit(e) {
    // 接收参数
    const { goods_id, operation } = e.currentTarget.dataset
    const { cart } = this.data
    // 找到需要修改的商品
    const index = cart.findIndex(item => item.goods_id === goods_id)
    // 判断数量是否小于1，如果小于1就删除
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '警告',
        content: '是否删除该商品',
        confirmText: '确认删除',
        confirmColor: '#E64340',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          } else if (res.cancel) {
            // console.log('用户点击取消')
            cart[index].num = 1
            this.setCart(cart)
          }
        }
      })
    } else {
      // 修改数量
      cart[index].num += operation
      this.setCart(cart)
    }

  },
  // 点击全选按钮
  checkedAll() {
    // 获取data中的数据
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach(item => item.check = allChecked)
    this.setCart(cart)
  },
  // 计算总价格、总数量与存储数据
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      if (item.check) {
        totalPrice += item.num * item.goods_price
        totalNum++
      } else {
        // 将全选改为false
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  // 支付
  async handlePay() {
    const {address,totalNum} = this.data
    // 判断是否有收货地址
    if(!address.userName){
      await showToast({title:'请选择收货地址'})
      return
    }
    // 判断是否有选择商品
    if(totalNum === 0){
      await showToast({title:'亲，还没有选择商品哦'})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
      
  },
  // 点击获取地址
  async handleChooseAddress() {
    try {
      // 获取权限
      const authority = await getSetting()
      const scopeAddress = authority.authSetting['scope.address']
      // 判断权限状态
      if (scopeAddress === false) {
        // 让用户重新手动授权
        await openSetting()
      }
      // 调用获取用户地址的api
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // console.log(address)
      // 将收货地址信息保存到本地缓存
      wx.setStorageSync('address', address);

    }
    catch (err) {
      // console.log(err)
      wx.showToast({
        title: '获取地址失败',
        icon: 'none'
      });
    }





    //   // 判断用户是否允许授权
    //   wx.getSetting({
    //     success: (result) => {
    //       const scopeAddress = result.authSetting['scope.address']
    //       if (scopeAddress === true || scopeAddress === undefined) {
    //         wx.chooseAddress({
    //           success: (address) => {
    //             console.log(address)
    //           },
    //           fail: () => {
    //             wx.showToast({
    //               title: '已取消获取地址',
    //               icon: 'none'
    //             });
    //           }
    //         });

    //       } else {
    //         // 用户取消了或曾经取消了授权，让用户重新手动授权
    //         wx.openSetting({
    //           success: (result2) => {
    //             // console.log(address2)
    //             // 重新授权成功，重新获取收货地址
    //             wx.chooseAddress({
    //               success: (address2) => {
    //                 console.log(address2)
    //               }
    //             });

    //           }
    //         });

    //       }
    //     }
    //   });


  }
})
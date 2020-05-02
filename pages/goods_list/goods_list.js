import {request} from '../../request/index.js'
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        title:'综合',
        isActive: true
      },
      {
        id: 1,
        title:'新品',
        isActive: false
      },
      {
        id: 2,
        title:'价格',
        isActive: false
      }
    ],
    goodsList: [],

  },
  // 请求所需的参数
  QueryParams:{
    query:'',
    cid: '',
    pagenum: 1,
    pagesize: 20
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 更改选中
  changeActive(e){
    // 获取子组件传来的参数
    let index = e.detail
    // 修改tabs中的数据
    let {tabs} = this.data
    tabs.forEach((e,i) => {
      i === index ? e.isActive = true : e.isActive = false
    });
    this.setData({
      tabs
    })
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({
      url:'/goods/search',
      data: this.QueryParams
    })
    // 获取总条数
    const total = res.total

    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)

    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })

    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否有下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      });
        
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 监听下拉刷新
  onPullDownRefresh(){
    // 清空数据
    this.setData({
      goodsList:[]
    })
    // 初始化页码
    this.QueryParams.pagenum = 1
    // 重新请求数据
    this.getGoodsList()
  }
})
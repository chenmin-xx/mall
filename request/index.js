// 同时请求次数
let ajaxNum = 0
export const request = (params) => {
    ajaxNum++
    // 开始网络请求之前，先开启加载图标
    wx.showLoading({
        title: '拼命加载中',
        mask: true
    })

    // 定义公共url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: result => {
                resolve(result.data.message);
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                ajaxNum--
                if(ajaxNum === 0){
                    // 所有请求结束，关闭加载图标
                    wx.hideLoading();
                }
            }

        });
    })
}
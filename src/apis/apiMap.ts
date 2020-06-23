export default {
  /* ---------------------用户管理---------------------- */
  getPossigin: {//商户户端-登录接口
      method: 'get',
      url: `/API/POSSigin`
  },

  getPOSFirstPage: {//商户端-首页接口：
    method: 'get',
    url: `/API/POSFirstPage`
  },
  getPOSProManagePage: {//商户端-商品管理(默认商品类型为推荐)：
    method: 'get',
    url: `/API/POSProManagePage`
  },
  getPOSShopVipPage: {//商户端-会员明细
    method: 'get',
    url: `/API/POSShopVipPage`
  },
  
}

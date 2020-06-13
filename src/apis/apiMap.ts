export default {
  /* ---------------------用户管理---------------------- */
  logout: {//用户端-登录接口
      method: 'get',
      url: `/API/Sigin`
  },
  getUserIdByOpenId: {//用户端-用户进入店铺根据openid返回userid：
    method: 'get',
    url: `/API/GetUserIdByOpenId`
  },
  getFirstPag: {//用户端-首页接口：
    method: 'get',
    url: `/API/FirstPag`
  },
  getShopProduct: {//用户端-门店菜品(默认商品类型为推荐)
    method: 'get',
    url: `/API/ShopProduct`
  },
  getShopTask: {//用户端-店铺活动
    method: 'get',
    url: `/API/ShopTask`
  },
  getMinePage: {//用户端-我的-VIP
    method: 'get',
    url: `/API/MinePage`
  },
  getMineUserCardPage: {//用户端-店铺活动
    method: 'get',
    url: `/API/MineUserCardPage`
  },
  getMineUserCardLosePage: {//用户端-我的-优惠券-失效优惠券
    method: 'get',
    url: `/API/MineUserCardLosePage`
  },
  getShopVIPConfigPag: {//用户端-我的-会员权益
    method: 'get',
    url: `/API/ShopVIPConfigPag`
  }


}

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
  getPOSShopInfoPage: {//商户端-门店信息
    method: 'get',
    url: `/API/POSShopInfoPage`
  },
  savePOSShopInfo: {//商户端-门店信息（保存数据）POST：
    method: 'post',
    url: `/API/POSShopInfoSave`
  },
  getPOSShopManagePage: {//商户端-门店装修：
    method: 'post',
    url: `/API/POSShopManagePage`
  },
  savePOSShopManage: { // 商户端-门店装修（保存数据）POST：
    method: 'post',
    url: `/API/POSShopManageSave`
  },
  getPOSProManagePage: { // 商户端-商品管理(默认商品类型为推荐)：
    method: 'post',
    url: `/API/POSProManagePage`
  },
}

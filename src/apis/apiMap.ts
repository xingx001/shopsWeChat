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
    method: 'get',
    url: `/API/POSShopManagePage`
  },
  savePOSShopManage: { // 商户端-门店装修（保存数据）POST：
    method: 'post',
    url: `/API/POSShopManageSave`
  },
  getPOSProManagePage: { // 商户端-商品管理(默认商品类型为推荐)：
    method: 'get',
    url: `/API/POSProManagePage`
  },
  deletePOSDelProduct: { // 商户端-删除商品：
    method: 'get',
    url: `/API/POSDelProduct`
  },
  getPOSProAddPType: { // 商户端-商品管理-新增/修改商品加载商品类型列表：
    method: 'get',
    url: `/API/POSProAddPType`
  },
  savePOSProductMange: {//商户端-新增商品/修改商品（保存数据）POST：
    method: 'post',
    url: `/API/POSProductMange`
  },
  getPOSShopCardPage: {//商户端-优惠券数据加载
    method: 'get',
    url: `/API/POSShopCardPage`
  },
  POSShopCardState: {//商户端-优惠券-上下架优惠券POST：
    method: 'post',
    url: `/API/POSShopCardState`
  },
  getPOSShopCardGet:{ //商户端-优惠券-根据优惠券ID获取优惠券信息：
    method: 'get',
    url: `/API/POSShopCardGet`
  },
  savePOSShopCardManage:{ //新增修改优惠券
    method: 'post',
    url: `/API/POSShopCardManage`
  },
  getPOSShopTaskManagePage: {//商户端-活动管理
    method: 'get',
    url: `/API/POSShopTaskManagePage`
  },
  deletePOSDelShopTask: {//商户端-活动管理-删除活动
    method: 'get',
    url: `/API/POSDelShopTask`
  },
  savePOSShopTaskManage: {//商户端-活动管理新增/修改商品（保存数据）POST：
    method: 'get',
    url: `/API/POSShopTaskManage`
  },
  getPOSShopVipPage: {//商户端-会员明细
    method: 'get',
    url: `/API/POSShopVipPage`
  },
}

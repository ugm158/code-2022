
/*=====================================
  Post
=====================================*/
function doPost(e) {
  //-------------------------------------取得全域變數
  global = get_global();
  //-------------------------------------menu子樣板
  menu = Sheet.render('menu', { global: global });
  let content = '';

  //--------------------------------------------------------管理員路由
  if (global['isAdmin'] === true) {

  }
  //--------------------------------------------------------管理員路由 end

  Route.path("payment", payment);//嵌入網址

  if (Route[e.parameter.op]) {
    return Route[e.parameter.op](e);
  } else {
    return index(e);
  }
}

/*=====================================
 安裝程式
=====================================*/
function setup() {
  //-------------------------------------------- 把變數存入指令碼屬性
  SCRIPT_PROP.setProperty("ssId", Sheet.getSs().getId());
  SCRIPT_PROP.setProperty("adminEmail", Session.getActiveUser().getEmail());//管理員email

  // 建立 全域變數
  create_global();

  // 商品類別
  // create_prod_kind();

  // 繳費通知單
  create_payment();



}
/*=====================================
 開發模板_v1.3_線上學員
=====================================*/

//------------------------------------- 1. GAS全域變數的方法
var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
//------------------------------------- 2. 路由
var Route = {};
Route.path = function (route, callback) {
  Route[route] = callback;
}
//------------------------------------- 3. 宣告
var global, menu;

/*=====================================
  Get
=====================================*/
function doGet(e) {
  //-------------------------------------取得全域變數
  global = get_global();
  //-------------------------------------menu子樣板
  menu = Sheet.render('menu', { global: global });
  //--------------------------------------------------------管理員路由
  if (global['isAdmin'] === true) {
    //路由 全域變數
    Route.path("form_global", form_global);

    //路由 商品類別 管理員
    Route.path("prod_kind", prod_kind);//查詢
    Route.path("form_prod_kind", form_prod_kind);//新增 編輯

  }

  Route.path("iframe", index);//嵌入網址
  Route.path("iframe_1", iframe_1);//嵌入網站

  Route.path("api_stru_payment", api_stru_payment);//
  //--------------------------------------------------------管理員路由 end

  if (Route[e.parameter.op]) {
    return Route[e.parameter.op](e);
  } else {
    return index(e);
  }
}

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

  Route.path("payment", payment);//繳費通知單

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
  create_prod_kind();

  // 繳費通知單
  create_payment();



}

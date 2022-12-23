
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
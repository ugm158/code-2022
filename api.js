function api_stru_payment(e) {
  //------------------------------------------ 回傳JSON資料
  let api = get_stru_payment();
  let json = JSON.stringify(api);//將資料轉json格式
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);//先將JSON資料轉成「純文字」，再透過setMimeType()將文字改成JSON

}
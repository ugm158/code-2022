

/*=====================================
  20221222
=====================================*/
function test() {
  //取得試算表
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  //取得工作表
  let ws = ss.getSheetByName('工作表7');

  //取得範圍
  let range = ws.getRange(1,1);
  //寫資料
  range.setValue('單位');

  //寫資料
  range = ws.getRange(1, 2);
  range.setValue('日期');

  //寫資料
  range = ws.getRange(1, 3);
  range.setValue('金額');

  //寫資料
  range = ws.getRange(1, 4);
  range.setValue('其他');


  console.log(ws);
}
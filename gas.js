
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

  console.log(ws);
}
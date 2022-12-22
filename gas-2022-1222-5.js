/*=====================================
  20221222
=====================================*/
function test() {
  //取得試算表
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  //取得工作表
  let ws = ss.getSheetByName('工作表7');
  //取得範圍
  let range;

  //整理資料 stru
  //跑迴圈
  let data = ['單位', '日期', '金額', '其他'];
  let rowIndex = 1;
  let colIndex;
  for (let i = 0; i < data.length; i++) {
    //寫資料
    range = ws.getRange(1, 1);
    range.setValue('單位');
  }



}

  //寫資料
  range = ws.getRange(1, 4);
  range.setValue('其他');


  console.log(ws);
}
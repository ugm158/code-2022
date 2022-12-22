
/*=====================================
  20221222-5
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
  let data = ['單位1', '日期1', '金額1', '其他1','備註'];
  let rowIndex = 1;
  let colIndex;
  for (let i = 0; i < data.length; i++) {
    //寫資料
    colIndex = i+1;
    range = ws.getRange(rowIndex, colIndex);
    range.setValue(data[i]);
  }

}
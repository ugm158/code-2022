
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
  let data = ['單位2', '日期2', '金額2', '其他2','備註2'];
  let rowIndex = 1;
  let colIndex;
  /**
   * 字串 轉 數字 parseInt() Number()
   */
  for(let i in data){
    //寫資料
    colIndex = parseInt(i)+1;//
    range = ws.getRange(rowIndex, colIndex);
    range.setValue(data[i]);
  }


  // for (let i = 0; i < data.length; i++) {
  //   //寫資料
  //   colIndex = i+1;
  //   range = ws.getRange(rowIndex, colIndex);
  //   range.setValue(data[i]);
  // }


}
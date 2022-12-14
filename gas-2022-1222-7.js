
/*=====================================
  20221222-7 內容
=====================================*/
function test1(e){
  //取得試算表
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  //取得工作表
  let ws = ss.getSheetByName('工作表7');
  //取得範圍
  let range;

  e = {
    "parameter":
      {"date":"2022-12-23",
       "money":"1000",
       "ps":"1600",
       "unit":"台新",
       "callback_url":
       "http://127.0.0.1:5500/form_20221222.html",
       "op":"payment"}
  }

  // console.log(e.parameter.unit);
  console.log(e['parameter']['unit']);

  let stru = [{
    label: '繳費單位',
    type: 'select',
    name: 'unit',
    value: '',
    valid: '', //required
    option: '玉山|國泰|台新|電費|水費',
    width: '3'
  },
  {
    label: '繳費日期',
    type: 'date',
    name: 'date',
    value: '',
    valid: 'required', //required
    option: '',
    width: '3'
  },
  {
    label: '繳費金額',
    type: 'text',
    name: 'money',
    value: '',
    valid: 'required', //required
    option: '',
    width: '3'
  },
  {
    label: '其他',
    type: 'text',
    name: 'ps',
    value: '',
    valid: '', //required
    option: '',
    width: '3'
  }
  ];


  let rowIndex = ws.getLastRow()+1;
  let colIndex;
  /**
   * 字串 轉 數字 parseInt() Number()
   */
  for (let i in stru) {
    //寫資料
    colIndex = parseInt(i) + 1;//
    range = ws.getRange(rowIndex, colIndex);
    range.setValue(e['parameter'][stru[i]['name']]);
  }


}

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
  let stru = [{
    label: '繳費單位',
    type: 'select',
    name: 'unit',
    value: '',
    valid: '', //required
    option: '玉山|國泰|台新|電費|水費',
    width: '3'
  },
  {
    label: '繳費日期',
    type: 'date',
    name: 'date',
    value: '',
    valid: 'required', //required
    option: '',
    width: '3'
  },
  {
    label: '繳費金額',
    type: 'text',
    name: 'money',
    value: '',
    valid: 'required', //required
    option: '',
    width: '3'
  },
  {
    label: '其他',
    type: 'text',
    name: 'ps',
    value: '',
    valid: '', //required
    option: '',
    width: '3'
  }
  ];


  let rowIndex = 1;
  let colIndex;
  /**
   * 字串 轉 數字 parseInt() Number()
   */
  for (let i in stru) {
    //寫資料
    colIndex = parseInt(i) + 1;//
    range = ws.getRange(rowIndex, colIndex);
    range.setValue(stru[i]['label']);
  }


  // for (let i = 0; i < data.length; i++) {
  //   //寫資料
  //   colIndex = i+1;
  //   range = ws.getRange(rowIndex, colIndex);
  //   range.setValue(data[i]);
  // }


}
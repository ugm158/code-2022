/*=====================================
  取得 payment 結構
=====================================*/
function get_stru_payment() {
  let stru = [{
    label: '繳費單位',
    type: 'select',
    name: 'unit',
    value: '',
    valid: '', //required
    option: '玉山|國泰|台新|聯邦|電費|水費',
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
  },
  {
    label: '備註',
    type: 'text',
    name: 'note',
    value: '',
    valid: '', //required
    option: '',
    width: '12'
  }
  ];

  return stru;
}

/*=====================================
  繳費通知單 工作表
=====================================*/
function create_payment(sheet='繳費通知單') {
  //取得試算表
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  //取得工作表
  let ws = ss.getSheetByName(sheet);
  if(ws === null){//目前沒有工作表
    ws = ss.insertSheet();
    ws.setName(sheet);
  }
  //取得範圍
  let range;

  let stru_payment = get_stru_payment();

  let rowIndex = 1;
  let colIndex;

  for (let i in stru_payment) {
    //寫資料
    colIndex = parseInt(i) + 1;//
    range = ws.getRange(rowIndex, colIndex);
    range.setValue(stru_payment[i]['label']);
  }
}

/*=====================================
  繳費通知 主程式
=====================================*/
function payment(e) {
  //取得試算表
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  //取得工作表
  let sheet = '繳費通知單';
  let ws = ss.getSheetByName(sheet);
  //取得範圍
  let range;

  // console.log(e.parameter.unit);
  // console.log(e['parameter']['unit']);

  let stru_payment = get_stru_payment();


  let rowIndex = ws.getLastRow() + 1;
  let colIndex;

  /**
   * 字串 轉 數字 parseInt() Number()
   * 寫入儲存格
   */
  let message = '繳費通知單\n\n';
  for (let i in stru_payment) {
    //寫資料
    colIndex = parseInt(i) + 1;//
    range = ws.getRange(rowIndex, colIndex);
    range.setValue(e['parameter'][stru_payment[i]['name']]);

    //line 通知訊息
    message += stru_payment[i]['label'] + "： " + e['parameter'][stru_payment[i]['name']] + '\n';
  }

  // 通知 line
  let token = 'gUtvT7W1MjTOMDY1QGZnhN6ekrfTtkdvRcTYouWWcAK';//個人通知
  sendLineNotify(token,message);

  // 第7節課
  let content = '';
  content += Sheet.render('payment', {e:e, stru_payment: stru_payment}, '');
  // 渲染網頁
  return Sheet.render('index', {content: content, menu: ''}, '繳費通知單');

}

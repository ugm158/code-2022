function ttt() {
  //-------------------------------------------------------- 取得全域變數
  global = get_global();//取得全域變數
  // ------------------------------------------ 表單(Object)
  let main = get_ws_mainObj(1);

  //----------------------------------取得表單結構 obj JSON.stringify(main)
  let ws_stru = get_ws_stru(1);

  //------------------------------------------ 單筆資料
  let row = Sheet.getDataBySn(36, main['ws']);

  let pdfData = {};

  // console.log(global['adminEmail']);
  // console.log(main['admin_email']);
  // return;

  for(let i in ws_stru){
    pdfData[ws_stru[i]['title']] = row[i];
  }

  //寄信給管理員
  let email_admin_content_arr = main['email_admin_content'].split(',');//管理員郵件-欄位
  if (main['admin_email'] && Object.keys(email_admin_content_arr).length) {
    // 有 管理員收信、管理員郵件-欄位(有勾選) global['adminEmail']

    //-------------------------------------------------------- 寄信 start
    let htmlBody = Sheet.render("email_index", { email_admin_content_arr: email_admin_content_arr, global: global, pdfData: pdfData });

    GmailApp.sendEmail(global['adminEmail'], global['網站標題'] + " - " + main['title'], '', { htmlBody: htmlBody });


  }
}
//-----------------------------------
// write_record('error', 'api.gs\napi_post_row()\nmessage:e.parameter', JSON.stringify(e))

/**======================================
  取得表單結構
  ?op=get_stru&ofsn=2

  "start":"",
  "end":"",
  "amount":"",

    //----------------------------------判斷開始時間
    start = mainObj['start'] ? Utilities.formatDate(new Date(mainObj['start']),"GMT+08:00","yyyy/MM/dd HH:mm:ss") : '';
    end = mainObj['end'] ? Utilities.formatDate(new Date(mainObj['end']),"GMT+08:00","yyyy/MM/dd HH:mm:ss") : '';
    nowTime = Utilities.formatDate(new Date(),"GMT+08:00","yyyy/MM/dd HH:mm:ss");//2020/06/13/ 23:06
    amount = mainObj['amount'] ? Number(mainObj['amount']) : 0;
    regAmount = 10;//已報名數量
=======================================*/
function api_get_stru(e) {
  //------------------------------------------ 回傳JSON資料
  let ws_stru = [];
  if (e.parameter.ofsn) {
    //----------------------------------取得表單結構 obj
    ws_stru = get_ws_stru(e.parameter.ofsn);
  }
  let respond = {};
  if (ws_stru.length != 0) {
    // ------------------------------------------ 表單主檔(Object)
    let main = get_ws_mainObj(e.parameter.ofsn);
    // ------------------------------------------ 現在時間
    let nowTime = Utilities.formatDate(new Date(), "GMT+08:00", "yyyy/MM/dd HH:mm:ss");//2020/06/13/ 23:06

    //開始日期
    let start = main['start'] ? Utilities.formatDate(new Date(main['start']), "GMT+08:00", "yyyy/MM/dd HH:mm:ss") : '';
    //結束日期
    let end = main['end'] ? Utilities.formatDate(new Date(main['end']), "GMT+08:00", "yyyy/MM/dd HH:mm:ss") : '';
    //報名數量
    let amount = main['amount'] ? Number(main['amount']) : 0;
    let regAmount = Number(main['regAmount']);//已報名數量

    if (start && start > nowTime) {//尚未開始報名
      respond = {
        result: false,
        message: '表單尚未開放',
        stru: []
      }
    } else if (end && nowTime > end) {//報名截止
      respond = {
        result: false,
        message: '表單已經結束',
        stru: []
      }
    } else if (main['amount'] && regAmount >= amount) {//報名額滿
      respond = {
        result: false,
        message: '表單名額已滿',
        stru: []
      }
    } else {//條件符合
      respond = {
        result: true,//結果
        message: main['form_readme'],//表單說明
        stru: ws_stru
      }
    }
  } else {//取得結構失敗
    respond = {
      result: false,
      message: `取得結構失敗(ofsn=${e.parameter.ofsn})`,
      stru: []
    }
  }
  let json = JSON.stringify(respond);//將資料轉json格式
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);//先將JSON資料轉成「純文字」，再透過setMimeType()將文字改成JSON

}

/**======================================
  寫入一筆記錄
  ?op=api_post_row&ofsn=2

  let formData = {
    'sn': '',
    'date': new Date(),//
    'userId': '',
    'kind': 'error',
    'message': 'api.gs\napi_post_row()\nmessage:e.parameter',
    'record': JSON.stringify(main)
  };
  insert_record(formData);
  {"formData[timestamp]":"","formData[a5]":"333","formData[sn]":"","formData[a4]":"郭俊良","op":"api_post_row","formData[update]":"","ofsn":"3"}
=======================================*/
function api_post_row(e) {
  //-------------------------------------------------------- 取得全域變數
  global = get_global();//取得全域變數
  // let formData = {
  //     'sn': '',
  //     'date': new Date(),
  //     'userId': '',
  //     'kind': 'error',
  //     'message': 'api.gs\napi_post_row()\nmessage: global',
  //     'record': global['adminEmail']
  //   };
  // insert_record(formData);

  // console.log(global);
  // write_record('error', 'api.gs\napi_post_row()\nmessage: global', JSON.parse(global))
  // return;

  /**
   write_record('error', 'api.gs\napi_post_row()\nmessage:e.parameter', JSON.parse(e.parameter.formData))
   */

  // e = {
  //   parameter: {
  //     ofsn: 3,
  //     op: 'api_post_row',
  //     formData: {
  //       sn: '',
  //       a4: '郭俊良',
  //       a5: '123',
  //       timestamp: '',
  //       update: ''
  //     }
  //   }
  // }
  let ofsn = Number(e.parameter.ofsn);
  // ------------------------------------------ 表單(Object)
  let main = get_ws_mainObj(ofsn);

  let respond;

  if (main['struLength']) {//有結構
    //----------------------------------取得表單結構 obj JSON.stringify(main)
    let ws_stru = get_ws_stru(ofsn);

    // ------------------------------------------ 現在時間
    let nowTime = Utilities.formatDate(new Date(), "GMT+08:00", "yyyy/MM/dd HH:mm:ss");//2020/06/13/ 23:06

    //開始日期
    let start = main['start'] ? Utilities.formatDate(new Date(main['start']), "GMT+08:00", "yyyy/MM/dd HH:mm:ss") : '';
    //結束日期
    let end = main['end'] ? Utilities.formatDate(new Date(main['end']), "GMT+08:00", "yyyy/MM/dd HH:mm:ss") : '';
    //報名數量
    let amount = main['amount'] ? Number(main['amount']) : 0;
    let regAmount = Number(main['regAmount']);//已報名數量

    if (start && start > nowTime) {//尚未開始報名
      respond = {
        result: false,
        message: '表單尚未開放',
        other: []
      }
    } else if (end && nowTime > end) {//報名截止
      respond = {
        result: false,
        message: '表單已經結束',
        other: []
      }
    } else if (main['amount'] && regAmount >= amount) {//報名額滿
      respond = {
        result: false,
        message: '表單名額已滿',
        other: []
      }
    } else {//條件符合
      let formData = JSON.parse(e.parameter.formData);
      let rowIndex;
      let colIndex;
      let update = {};
      let qrcode = {};
      let sendEmail = '';
      let htmlBody;

      let verify = '';
      let other = [];
      //----------------------------------pdf var
      let pdf = {
        colName: '',      //欄位名稱
        titleName: '',    //標題名稱
        pdfCol: '',       //試算表欄索引
        tempFileId: '',   //PDF樣版ID
        pdfFolderId: '',  //PDF資料夾ID(須開共用，知道連結的任何人-檢視者)
        fileName: ''      //PDF檔名
      }

      //----------------------------------接收工作表
      let sheet = main['ws'];//工作表 名

      for (let i in ws_stru) {
        //---------------------------------流水號處理
        if (ws_stru[i]['fun'] === "maxSn") {
          formData[ws_stru[i]['name']] = Sheet.maxSn(sheet, 1);//將值指定給sn
          rowIndex = Sheet.getWs(sheet).getLastRow() + 1;
        }

        if (!rowIndex) {//第1欄 結構 name:'sn', fun='maxSn'
          respond = {
            result: false,//結果
            message: '請通知管理員，第1欄位 name: "sn"',//表單說明
            other: []
          }
          let json = JSON.stringify(respond);//將資料轉json格式
          return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);//先將JSON資料轉成「純文字」，再透過setMimeType()將文字改成JSON
        }

        //---------------------------------時間戳記
        if (ws_stru[i]['fun'] === "時間戳記") {//判斷功能是否為 時間戳記
          formData[ws_stru[i]['name']] = Utilities.formatDate(new Date(), "GMT+08:00", "yyyy/MM/dd HH:mm:ss");//2020/06/13/ 23:06
          ws_stru[i]['type'] = "文字";
        }

        // -------------------------------- 回填欄位
        if (ws_stru[i]['fun'] === "回填欄位") {//設定密碼驗證
          update[ws_stru[i]['title']] = '&col_name=' + ws_stru[i]['name'];
        }

        //---------------------------------sendEmail
        if (ws_stru[i]['fun'] === "email") {// 取得訪客寄信信箱
          sendEmail = formData[ws_stru[i]['name']];
        }

        //---------------------------------日期時間、日期、時間
        if (ws_stru[i]['kind'] === "日期時間" || ws_stru[i]['kind'] === "日期" || ws_stru[i]['kind'] === "時間") {
          ws_stru[i]['type'] = "文字";
        }

        //----------------------------------PDF
        if (ws_stru[i]['kind'] === "PDF") {
          pdf = {
            colName: ws_stru[i]['name'],         //欄位名稱
            titleName: ws_stru[i]['title'],      //標題名稱
            pdfCol: Number(i) + 1,               //試算表欄索引
            tempFileId: main['pdf_tmp_id'],      //PDF樣版ID
            pdfFolderId: main['pdf_folder_id'],  //PDF資料夾ID(須開共用，知道連結的任何人-檢視者)
            fileName: global['網站標題'] + '-' + main['title'] + '-' + formData['sn']//PDF檔名
          }
        }

        //verify
        if (i == 1) {
          verify = '&verify=' + encodeURIComponent(formData[ws_stru[i]['name']]);
        }

        //-------------------------------寫入儲存格
        colIndex = Number(i) + 1;
        Sheet.setCellData(sheet, rowIndex, colIndex, formData[ws_stru[i]['name']], ws_stru[i]['type']);
      }
      //------------------------------------------------------開始整筆處理

      let email_content_arr = main['email_content'].split(',');//填報者郵件-欄位

      //-------------------------------------將資料轉成 中文索引(pdf、日曆、LineNotify)
      let pdfData = {};
      for (let i in ws_stru) {
        pdfData[ws_stru[i]['title']] = formData[ws_stru[i]['name']];
      }

      // -----------------------------------------PDF
      if (pdf['pdfCol'] && pdf['tempFileId'] && pdf['pdfFolderId']) {
        pdf['pdfUrl'] = createDocumentPdf(pdf, pdfData);
        //-------------------------------寫入儲存格
        colIndex = pdf['pdfCol'];
        Sheet.setCellData(sheet, rowIndex, colIndex, pdf['pdfUrl'], '文字');
        //-------------------------------寫入物件
        formData[pdf['colName']] = pdfData[pdf['titleName']] = pdf['pdfUrl'];
        // 回傳(根據 email_content)
        if (email_content_arr.length && email_content_arr.indexOf(pdf['titleName']) != -1) {
          other.push({ kind: 'PDF', title: pdf['titleName'], value: pdf['pdfUrl'] });
        }
      }

      //----------------------------------------回填欄位
      if (Object.keys(update).length) {
        let password = (main['update_password'] && main['update_type'] === '隱藏(自動帶密碼)') ? '&pass=' + main['update_password'] : '&pass=';
        let update_url = global['url'] + '?ofsn=' + ofsn + '&sn=' + formData['sn'] + '&op=update' + password + verify;
        for (let i in update) {
          // 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' +
          // encodeURIComponent
          qrcode[i] = update_url + update[i];

          // 回傳 (根據 email_content)
          if (email_content_arr.length && email_content_arr.indexOf(i) != -1) {
            other.push({ kind: 'update', title: i, value: qrcode[i] });
          }
        }

      }

      //-------------------------------------------------------- 日曆通知
      if (main['calendar_id'] && pdfData[main['calendar_date']] && (main['calendar_pre_title'] || main['calendar_title'])) {// 有 日曆id、日期欄位、日曆標題
        //日曆id
        let id = main['calendar_id'];
        //----------------------------------------------日曆標題
        let title = main['calendar_pre_title'];
        let calendar_title_arr = main['calendar_title'].split(',');
        for (let i in calendar_title_arr) {
          title += title ? '-' + pdfData[calendar_title_arr[i]] : pdfData[calendar_title_arr[i]];
        }
        //------------------------------------------------日期欄位
        let startDate = pdfData[main['calendar_date']];
        //------------------------------------------------日曆內容
        let description_arr = main['calendar_content'].split(',');//欄位
        let description = '';
        for (let i in description_arr) {
          if (Object.keys(qrcode).length && Object.keys(qrcode).indexOf(description_arr[i]) != -1) {//-----------------------------------------------有回填欄位
            description += '\n' + description_arr[i] + '： ' + qrcode[description_arr[i]] + '\n';
          } else {
            description += description_arr[i] + '： ' + pdfData[description_arr[i]] + '\n';
          }
        }
        //------------------------------------------------日曆地點
        let location = main['calendar_location'] ? pdfData[main['calendar_location']] : '';
        //日曆顏色
        let color = main['calendar_color'];

        //新增日曆事件
        setCalendar(id, title, startDate, description, location, color);
      }

      //寄信給訪客
      // let email_content_arr = main['email_content'].split(',');//管理員郵件-欄位
      if (sendEmail && Object.keys(email_content_arr).length) {
        // 訪客信箱 填報者郵件-欄位(有勾選)

        //-------------------------------------------------------- 寄信 start
        htmlBody = Sheet.render("email_index", { main: main, email_col: email_content_arr, stru: ws_stru, formData: formData, qrcode: qrcode });

        try{
          GmailApp.sendEmail(sendEmail, global['網站標題'] + " - " + main['title'], '', { htmlBody: htmlBody });

        }catch(e){
          rite_record('error', 'api.gs\napi_post_row()\nmessage:GmailApp.sendEmail', JSON.parse(e))
        }
      }

      //寄信給管理員
      let email_admin_content_arr = main['email_admin_content'].split(',');//管理員郵件-欄位
      if (global['adminEmail'] && main['admin_email']==='是' && Object.keys(email_admin_content_arr).length) {
        // 管理員信箱 管理員收信=='是'、管理員郵件-欄位(有勾選) global['adminEmail']

        //-------------------------------------------------------- 寄信 start
        htmlBody = Sheet.render("email_index", { main: main, email_col: email_admin_content_arr, stru: ws_stru, formData: formData, qrcode: qrcode });

        try{
          GmailApp.sendEmail(global['adminEmail'], global['網站標題'] + " - " + main['title'], '', { htmlBody: htmlBody });

        }catch(e){
          rite_record('error', 'api.gs\napi_post_row()\nmessage:GmailApp.sendEmail', JSON.parse(e))
        }


      }


      //-------------------------------------------------------- Line通知 start
      let line_content_arr = main['line_content'].split(',');//Line內容-欄位
      if (main['line'] && Object.keys(line_content_arr).length) {// 有 line_tokn、Line內容-欄位(有勾選)
        let line_message = main['line_title'] ? main['line_title'] + '\n' : '';
        for (let i in line_content_arr) {
          if (Object.keys(qrcode).length && Object.keys(qrcode).indexOf(line_content_arr[i]) != -1) {
            //-----------------------------------------------有回填欄位
            line_message += '\n' + line_content_arr[i] + '： ' + qrcode[line_content_arr[i]] + '\n';
          } else {
            line_message += line_content_arr[i] + '： ' + pdfData[line_content_arr[i]] + '\n';
          }
        }
        try {
          sendLineNotify(main['line'], line_message);
        } catch (e) {
          write_record('error', 'api_post_row(e)\nsendLineNotify()', JSON.stringify(e));
        }
      }

      // ---------------------------------------工作表排序
      sort_make_ws_stru(sheet);

      respond = {
        result: true,                  //結果
        message: main['finish_readme'],//填報完成說明
        other: other                  //pdf、回填欄位
      }
    }

  } else {
    respond = {
      result: false,
      message: `表單資料取得失敗「api_post_row(e)」(ofsn=${e.parameter.ofsn})`,
      other: []
    }

  }

  let json = JSON.stringify(respond);//將資料轉json格式
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);//先將JSON資料轉成「純文字」，再透過setMimeType()將文字改成JSON

}

function api_payment(e) {

  //------------------------------------------ 回傳JSON資料
  // let OBJ = {};
  let json = JSON.stringify(e);//將資料轉json格式
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);//先將JSON資料轉成「純文字」，再透過setMimeType()將文字改成JSON

}

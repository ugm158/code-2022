
/*=====================================
  ex
=====================================*/
function test(){
  let item = {
    width: '3',
    label: '姓名',
    type: "text",
    name: "name",
    value: "",
    valid: "required",
    option: "單選1|單選2|單選3"
  };

  item['width']
  item.width

  for(let i in item){
    console.log(i + ': ', item[i]);
  }

  // let form_item = [
  //   { width: '3',
  //     label: '姓名',
  //     type: "text",
  //     name: "name",
  //     value: "",
  //     valid: "required",
  //     option: ""
  //   },
  //   { width: '3',
  //     label: '網址',
  //     type: "url",
  //     name: "url",
  //     value: "",
  //     valid: "required",
  //     option: ""
  //   },
  //   { width: '3',
  //     label: 'EMAIL',
  //     type: "email",
  //     name: "email",
  //     value: "",
  //     valid: "",
  //     option: ""
  //   }]



  // console.log(form_item[0].label);

  // console.log(form_item[0]['label']);

}
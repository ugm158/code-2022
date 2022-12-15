
function test1() {
  let item = {
    width: '3',
    label: '姓名',
    type: "text",
    name: "name",
    value: "",
    valid: "required",
    option: "單選1|單選2|單選3"
  };

  let form_item = '';
  for(let i in item){
    form_item +=  i + ': ' + item[i] + '\n';
    console.log(form_item);
  }

}



/*=====================================
  ex
=====================================*/
function test() {
  // let item = {
  //   width: '3',
  //   label: '姓名',
  //   type: "text",
  //   name: "name",
  //   value: "",
  //   valid: "required",
  //   option: "單選1|單選2|單選3"
  // };

  // item['width']
  // item.width

  // for (let i in item) {
  //   console.log(i + ': ', item[i]);
  // }

  let form_item = [
    { width: '3',
      label: '姓名',
      type: "text",
      name: "name",
      value: "",
      valid: "required",
      option: ""
    },
    { width: '3',
      label: '網址',
      type: "url",
      name: "url",
      value: "",
      valid: "required",
      option: ""
    },
    { width: '3',
      label: 'EMAIL',
      type: "email",
      name: "email",
      value: "",
      valid: "",
      option: ""
    }];

  for(let i in form_item){
    for(let j in form_item[i]){
      console.log(j + ": " + form_item[i][j]);
    }
  }


  // console.log(form_item[0].label);

  // console.log(form_item[0]['label']);

}
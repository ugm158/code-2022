function test(){
  console.log(Route);

  Route.path("payment", payment);//
  Route.path("payment1", payment1);//

  console.log(Route);

}


function payment1(e){
  console.log("payment1");

}
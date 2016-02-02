'use strict';

angular.module('nibble.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtrl'
  });
}])
.controller('loginCtrl', ["$rootScope","$http","$location","$scope","api.config","User",function(root,http,location,scope,api,User) {
  

  
//  $("#rfid-input").focus();
  /*$("#rfid-input").focus(function(e){
    console.log("Test");
  });
  $("#rfid-input").blur(function(e){
    console.log("Test");
  });*/
  scope.rfid = "";
  
  scope.submit_reg = function(){
    console.log(root.validation_fail);
    console.log(root.rfid);
    console.log(root);
  
    http({
      url: api.apiRoot + "rfid/",
      method: "POST",
      data: {
        username: $("#user-username").val(),
        password: $("#user-password").val(),
        rfid: root.rfid
      }
    }).then(function(ret){
      /*Success*/
      if(ret.data){
        root.user = ret.data;
      }else{
        
      }
    },function(error){
      /*Fail*/
      
    });
  }
  scope.submit_login = function(){
      /*Validation and 'login' code:*/
      
    root.rfid = $("#rfid-input").val();
    console.log(root.rfid,root);
    root.validation_fail = false;
    //Check if a user is assosiated with the rfid
    //$http request:

    User.get({format:"json",rfid:$("#rfid-input").val},function(ret){
      console.log(ret);
      if(ret.count > 0){
          root.user = ret.results[0]; //<-- if data is json??
          root.user.balance = root.user.saldo;
          root.user.name = root.user.first_name + " " + root.user.last_name;
            location.url("/shop");
        }else{
          $("#rfid-input").val("");
          root.validation_fail = true;
          $('#regModal').openModal();
          Materialize.toast("Validation failed!", 2000);
          Materialize.toast("Fill inn username and password", 2000);
      }
    },function(error){
      Materialize.toast("[Error] Server returned error code: " + error.status, 4000);
    });
  }

  /*
  Item list should be loaded in app to be used by both shop and login (?)
  */
  //root.items
  if(root.items){
    root.itemCols = [root.items.slice(0, Math.ceil(root.items.length/2)), root.items.slice(Math.ceil(root.items.length/2))]
  }
}]);
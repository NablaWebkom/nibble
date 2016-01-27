angular.module('nibble', [
  'ngRoute',
  'api.config',
  'ui.materialize',
  'nibble.login',
  'nibble.shop',
  'nibble.kvitering'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]).
controller('MainCtrl', ["$scope", function ($scope) {
  /*Not used
  $scope.select = {
        value1: "Option1",
        value2: "I'm an option",
        choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
    };

    $scope.dummyInputs = {};

    */

}]).run(["$rootScope", "$location", "$http", function(root, location, http){
  /*Definitions of root functions:*/
  root.ceil = Math.ceil;
  root.development = false;
  root.cash_amounts = [50, 100, 200];
  root.add_money_amount = 0;
  root.custom_amount_disabled = false;
  root.withdraw_money_amount = 0;
  root.logoutTimer = 0;
  
  
  root.logout = function(){
    root.rfid = null;
    root.user = null;
    root.showBalModule = false;
    location.url("/");
  }

  root.selectAddAmount = function(amount){
    root.add_money_amount = amount;
    root.custom_amount_disabled = true;
  }

  root.selectWithdrawAmount = function(amount){
    root.withdraw_money_amount = amount;
    root.custom_amount_disabled = true;
  }

  root.enableCustomAmount = function(){
    root.custom_amount_disabled = false;
  }

  root.invalidAmount = function(amount){
    return !(amount && parseFloat(amount) &&  parseFloat(amount) > 0);
  }

  root.invalidWithdrawAmount = function(amount){
    if(amount<=root.user.balance && !root.invalidAmount(amount)){
        return false;
    }
    return true;
  }

  root.addMoney = function(amount){
    /*
      Update backend
    */
    root.user.balance += parseInt(amount);
    root.logoutTimer = 60;
    Materialize.toast(amount + "kr er blitt lagt inn på kontoen din", 5000, "nibble-color success"); 
  }

  root.withdrawMoney = function(amount){
    /*
      Update backend
    */
    root.user.balance -= parseInt(amount);
    root.logoutTimer = 60;
  }
  
}]);

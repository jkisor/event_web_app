var eventApp = angular.module('eventApp',[])
eventApp.factory('Data', function() {
	return {message: "This is data from a factory"}
})

eventApp.filter('reverse', function(Data){
	return function(text) {
		return text.split("").reverse().join("") + (Data.message+"");
	}
})

function FirstController($scope, Data)
{
	$scope.data = Data;
	// $scope.data = {message: "Hi!"}
}
function SecondController($scope, Data){
	$scope.data = Data;
	// $scope.reversedMessage = function(message) {
	// 	return message.split("").reverse().join("");
	// }
	// $scope.data = {message: "Hi!"}
}
/*template module*/
angular.module('templateStore.templates',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/templates', {
			templateUrl: 'templates/templates.html',
			controller: 'TemplatesCtrl'
		}).
		when('/templates/:templateId', {
			templateUrl: 'templates/template-details.html',
			controller: 'TemplateDetailsCtrl'
		})
	;
}])

//template controller
.controller('TemplatesCtrl', ['$scope', 'templateSvc', function($scope, templateSvc){
	console.log('TemplatesCtrl ', templateSvc);

	getTemplates();

	//handler function
	function getTemplates(){
		console.log('in getTemplates');
		//load templates
		templateSvc.getTemplates()
			.then(
				function(response){
					console.log('response ', response);
					//model data -> details under object list array
					$scope.templates = response;
				},
				function(error){
					console.log('error loading ', error);
				}
			);
	}
}])

//template details controller
.controller('TemplateDetailsCtrl', ['$scope','$routeParams','templateSvc', function($scope, $routeParams, templateSvc) {
	console.log('TemplateDetailsCtrl ', $routeParams);

	$scope.template = null;

	//check id first
    if($routeParams.templateId != undefined){
		getCurrent($routeParams.templateId);
	}

	//handler function
	function getCurrent(id){
		console.log('in getCurrent ', id);
		//call service
		templateSvc.getDetails(id)
			.then(
				function(response){
					console.log('response ', response);
					//model data -> details under object list array
					$scope.template = response;
					console.log('$scope.template ', $scope.template);
				},
				function(error){
					console.log('error loading current weather ', error);
				}
			);
	}

	//set image
	$scope.setImage = function(image){
		$scope.template.mainImage = image.name;
	}
}]);
/*template service*/
(function () {
    angular.module("templateStore.data")
        .factory("templateSvc", function ($http, $q, $filter) {
            return {
                //get templates
                getTemplates: getTemplates,
                //get template details
                getDetails: getDetails
            }

            //get templates
            function getTemplates() {
                console.log('svc getTemplates ');
                var url = 'json/templates.json';

                //async function to know when the data has arrived
                var defer = $q.defer();

                $http.get(url)
                    .success(function (response) {
                        console.log('response ', response)
                        defer.resolve(response);
                    })
                    .error(function (err) {
                        console.log('err ', err);
                        defer.reject(err);
                    })
                return defer.promise;
            }

            //get template details
            function getDetails(templateId) {
                console.log('getDetails ', templateId);
                var url = 'json/templates.json';
               
                //async function to know when the data has arrived
                var defer = $q.defer();

                $http.get(url)
                    .success(function (response) {
                        console.log('response ', response)
                        response.template = $filter('filter')(response, function(d){
                            console.log('d.id ', d.id);
                            return d.id == templateId;
                        })[0];
                        console.log('response.template ', response.template);
                        //if there are more images, set main
                        response.template.mainImage = response.template.images[0].name;
                        console.log('response.template.mainImage ', response.template.mainImage);
  
                        defer.resolve(response.template);
                    })
                    .error(function (err) {
                        console.log('err ', err);
                        defer.reject(err);
                    })
                return defer.promise;
            }

        });
}());
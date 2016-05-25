App.factory('Inbox', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource(
    		'http://localhost:1337/getMails/:label', 
    		{label: '@label'},
    		{
    			update: {
    			      method: 'PUT' // To send the HTTP Put request when calling this custom update method.
    			}
    		}
    );
}]);
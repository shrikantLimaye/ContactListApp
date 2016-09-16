var app = angular.module("app",[]);

app.controller('AppCtrl',function($scope,$http){ //common controller for all the methods to be performed
    
var refresh = function(){
    $http.get('/contactlist').success(function(response){ //to get the data from the database on to the browser
        
        console.log("I got data I asked for");
        
        $scope.contactlist = response; //the data is fetched to the list created.
        $scope.contact = "";
    });
};
    refresh();
    
$scope.addContact = function(){ // A click function to add the contacts to the database via server
    console.log($scope.contact);
    $http.post('/contactlist',$scope.contact).success(function(response){
            
        console.log(response);
        refresh();
    });
};

$scope.remove = function(id){ //A delete function used to delete the contact who's ID will be specified on the time of click.
    console.log(id);
    $http.delete('/contactlist/' + id).success(function(response){
        
        refresh();
        
    });
}

$scope.edit = function(id){ // A click function to get to the edit method for updating a contact in the list.
  console.log(id);
    $http.get("/contactlist/" + id).success(function(response){
       
        $scope.contact = response;
    });
};
    
$scope.update = function(){ // A update function which updates the contact clicked to its specific id.
    
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id,$scope.contact).success(function(Data){ //Using http.put we can then update the contact to the database and then view it on the Browser.
        refresh();
    });
};
    
    console.log("Hello World from the controller");
    
});

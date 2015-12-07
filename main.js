var app = angular.module('myApp', []);
app.controller('MyCtrl', function ($scope, $timeout,$document,$window) {
    //configurations of the game
    $scope.tablesize = 5;
    $scope.id = 1;
    $scope.coloredCells = [];
    $scope.timeover = false;
    $scope.attempts = 3;
    $scope.count = 0;
    $scope.time = 5;
    $scope.tobeColored = 5;
    $scope.error="";
    
    /*jQuery Code to maintain the grid*/
    /*$("#start").click(function () {
        $(window).resize(function () {
            var size = $scope.tablesize;
            var htGrid = $('#gridSection').height();
            var wdGrid = $('#gridSection').width();
            console.log(htGrid+" "+wdGrid);
            var calculatedHgt = (htGrid/size) ;
            var calculatedWth = (wdGrid/size) ;
            calculatedHgt= 100*calculatedHgt/htGrid;
            calculatedWth=100*calculatedWth/wdGrid;

            //console.log("height: "+ calculatedHgt +"width : "+ calculatedWth +" Size : "+ size);
            if (calculatedHgt > calculatedWth) {
                $(".m10").css({
                    "width": calculatedWth +"%",
                    "height": calculatedWth +"%",
                    "display": "inline-block"
                });
            } else {
                $(".m10").css({
                    "width": calculatedHgt +"%",
                    "height": calculatedHgt+"%" ,
                    "display": "inline-block"
                });
            }


        });
        $(window).resize();
    });
    /*jQuery Code to maintain the grid*/

    $scope.resizeGrids=function(){
        /*var htGrid=$document[0].body.clientHeight;
        var wdGrid=$document[0].body.clientWidth;*/
        var elem=document.getElementById('gridSection');
        var htGrid=elem.clientHeight;
        var wdGrid=elem.clientWidth;
        //console.log(htGrid+" "+wdGrid);
        var size = $scope.tablesize;
        var calculatedHgt = (htGrid/size) ;
        var calculatedWth = (wdGrid/size) ;
            calculatedHgt= 100*calculatedHgt/htGrid;
            calculatedWth=100*calculatedWth/wdGrid;
        if (calculatedHgt > calculatedWth) {
            $scope.cellwidth=calculatedWth;
            $scope.cellheight=calculatedHgt;
        }
        else{
            $scope.cellwidth=calculatedHgt;
            $scope.cellheight=calculatedWth;
        }
        
        
    }
    
    /*This function randomely colorizes the cells and set the time intercal*/
    $scope.startGame = function () {
            $scope.attempts--;
            $scope.start_clicked = true;
            console.log($scope.coloredCells);
            $scope.count = $scope.coloredCells.length;
            var max = $scope.tablesize * $scope.tablesize - 1;
            var min = 0;
            while ($scope.count < $scope.tobeColored) {
                var number = Math.floor(Math.random() * (max - min + 1)) + min;
                //check whether the number is already generated or not
                if (!($scope.coloredCells.indexOf(number) > -1)) {
                    //push the ids into the array    
                    $scope.coloredCells.push(number);
                    $scope.count++;
                }
            }
            //traverse through the array and make the cells 'Colorful!'
            for (i = 0; i < $scope.coloredCells.length; i++) {
                document.getElementById($scope.coloredCells[i]).style.backgroundColor = 'Green';
            }
            //set the time to 5 seconds and provide the call back function
            $timeout($scope.afterTimeout, $scope.time * 1000);
        }
        //This function is just to trick the ng-repeat directive
    $scope.getSize = function (num) {
        return new Array(num);
    }
    $scope.uncolor = function (id) {
        if ($scope.timeover == false) {
            var index = $scope.coloredCells.indexOf(id);
            if (index > -1) {
                $scope.coloredCells.splice(index, 1);
                $scope.count = $scope.coloredCells.length;
                document.getElementById(id).style.backgroundColor = 'White';
            }
            //if the number of elements in coloredCells array is zero, i.e player has clicked all the colored cells     
            if (!$scope.count) {
                alert("You won");
            }
        }

    };
    $scope.afterTimeout = function () {
        //if coloredCells is empty that means this afterTimeout function
        //has been called after the user has won the game. So just return 
        if (!$scope.count) return;

        $scope.timeover = true;

        $scope.count = $scope.coloredCells.length;
        if ( $scope.attempts > 0) {
            $scope.timeover = false;
            $scope.start_clicked = false;
            $scope.startGame();
            return;
        } else {
            alert("Finally you lost it man !");
        }
    };

});
function TooltipController($scope){

}

function Tooltip($compile,$document)
{
  //var temp = '<div style="border: 1px solid black;"><div style="background-color: gray">yoooo</div><ng-transclude></ng-transclude></div>';
  return {
    restrict: 'A',
    scope: {
      data: '@'
    },
    //transclude: true,
    link: function(scope, element, attrs){
      //$window.alert("yoo");
      var tip = $compile('<div>data</div>')(scope);
      //tipClassName = 'tooltip',
///      tipActiveClassName = 'tooltip-show';


      element.bind('mouseover', function (e) 
      {
        console.log(e.target.getBoundingClientRect());
        var pos = e.target.getBoundingClientRect().height;
        element.addClass('bossy-tooltip');
        var changes = {
          //color : "#ffffff",
          left: pos.left,
          content: 'yooooo',
        };
        element.css(changes);
        //element.style.backgroundColor = "#ffffff";
 //       element.addClass(tipActiveClassName);

      });

      element.bind('mouseout', function(){
        element.removeClass('bossy-tooltip');
      });
    },

   // template: temp,
    controller: TooltipController
  };
}

Tooltip.$inject = ['$compile','$document'];

TooltipController.$inject = ['$scope','$compile'];

angular.module('bossy.tooltip', [])
.controller('bossyTooltipController', TooltipController)
.directive('bossyTooltip', Tooltip);

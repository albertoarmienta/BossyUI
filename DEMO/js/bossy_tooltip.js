
function TooltipController($scope){

  $scope.setAlignment = function(alignment){
    // Anchor Alignment
    var alignmentClass = '';

    if (alignment){
      if (alignment.toLowerCase() === 'left'){
        alignmentClass = 'tooltip-left';
      }
      else if (alignment.toLowerCase() === 'right'){
        alignmentClass ='tooltip-right';
      }
    }

    return alignmentClass;
  };

  $scope.setActive = function(persist){
    // Force tooltip to persist without hovering

    var activeClass = '';

    if (persist){
      activeClass = 'active';
    }

    return activeClass;
  };

  $scope.setPositioning = function(position){
    // tooltipPosition handles the position of the whole tooltip,
    // above, below, right, or left of the element requiring a tooltip
    var positionClass = '';

    if(position){
      if(position.toLowerCase() === 'left'){
        positionClass = 'tooltip-pos-left';
      }
      else if(position.toLowerCase() === 'right'){
        positionClass = 'tooltip-pos-right';
      }
      else if(position.toLowerCase() === 'bottom'){
        positionClass = 'tooltip-pos-bottom';
      }
    }

    return positionClass;
  };

  $scope.setContentType = function(type){
    // Content type
    var contentType = '';
    if ($scope.options.type){
      if ($scope.options.type.toLowerCase() === 'html'){
        contentType = 'content-html';
      }
      else if ($scope.options.type.toLowerCase() === 'download'){
        contentType = 'download';
      }
    }

    return contentType;
  };

  function initialize(){

    // Throw an error if text is not given
    if (!$scope.data.text && $scope.options.transclude !== true){
      console.error('You must include content for tool tip.');
    }

    // Fail safe in case options are not given
    if (!$scope.options){
      $scope.options = {
        align: 'center',
        color: 'black',
        type: 'default',
        transclude: false,
        persist: false,
        progress: '0',
        icon: '',
      };
    }

  }

  initialize();

}

function Tooltip()
{
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
    },
    controller: TooltipController,
    transclude: true,
    link: function(scope, elem, attr){

      // If the user decides to pass html content through the markup
      if (scope.options.transclude === true){
        var tooltipHtml = elem.find('div');
        var index = 0;

        while (tooltipHtml.length && !tooltipHtml.hasClass('tooltip-content')){
          tooltipHtml = tooltipHtml.find('div');
          index++;
        }

        if (tooltipHtml.length){
          scope.data.text = tooltipHtml.html();
          tooltipHtml[index].remove();
        }

        // Throw error if tool tip content is empty
        if (!scope.data.text){
          console.error('You must include content for tool tip.');
        }
      }

    },
    template: '<span class="bossy-tooltip default-style">' +
      '<span class="link">' +
      '<span style="white-space: nowrap;">' +
      '<ng-transclude></ng-transclude>' +
      '</span>' +
      '<div class="tooltip-active {{options.color.toLowerCase()}} {{setActive(options.persist)}} ' +
      '{{setAlignment(options.align)}} {{setContentType(options.type)}} {{setPositioning(options.position)}}">' +
      '<span ng-bind-html="data.text | bossyUnsafeHtml"></span>' +
      '<i ng-show="options.icon" class="icon ionicon {{options.icon.toLowerCase()}}"></i>' +
      '<div ng-show="options.type.toLowerCase() === \'download\'" class="progress-bar" style="width: {{options.progress}}%"></div>' +
      '</div>' +
      '</span>' +
      '</span>',
  };
}
var app = angular.module('myApp', ["bossy.filters"]);
app.controller('appCtrl', function($scope) {
  $scope.directiveData = {text: "This is default text in the tooltip"};
  $scope.directiveOptions = {
  };  
  $scope.directiveData1 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions1 = {
    align: "left"
  };  
  $scope.directiveData2 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions2 = {
    align:"right"
  };
  $scope.directiveData3 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions3 = {
    color:"green",
  };
  $scope.directiveData4 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions4 = {
    color:"orange",
  };
  $scope.directiveData5 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions5 = {
    color:"red",
  };
  $scope.directiveData6 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions6 = {
    color:"blue",
  };
});
app.directive('bossyTooltip', Tooltip);


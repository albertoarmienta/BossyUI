function TooltipController($scope){

  $scope.setAlignment = function(alignment){
    // Anchor Alignment
    var alignmentClass = '';

    if (alignment){
      if (alignment.toLowerCase() === 'left'){
        alignmentClass = 'bossy-tooltip-align-left';
      }
      else if (alignment.toLowerCase() === 'right'){
        alignmentClass ='bossy-tooltip-align-right';
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
        positionClass = 'bossy-tooltip-pos-left';
      }
      else if(position.toLowerCase() === 'right'){
        positionClass = 'bossy-tooltip-pos-right';
      }
      else if(position.toLowerCase() === 'bottom'){
        positionClass = 'bossy-tooltip-pos-bottom';
      }
    }

    return positionClass;
  };

  $scope.setContentType = function(type){
    // Content type
    var contentType = '';

    if (type){
      if (type.toLowerCase() === 'html'){
        contentType = 'content-html';
      }
      else if (type.toLowerCase() === 'download'){
        contentType = 'download';
      }
    }

    return contentType;
  };

  $scope.setIconFloat = function(direction){
    // Float icon to left or right
    var iconDirection = '';

    if (direction){
      if (direction.toLowerCase() === 'left'){
        iconDirection = 'icon-left';
      }
      else if (direction.toLowerCase() === 'right'){
        iconDirection = 'icon-right';
      }
    }

    return iconDirection;
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
      position: 'top',
      color: 'black',
      type: 'default',
      transclude: false,
      persist: false,
      progress: '0',
      icon: '',
      iconFloat:'left',
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
    template: '<span class="bossy-tooltip">' +
                '<span class="link">' +
                  '<ng-transclude></ng-transclude>' +
                  '<div class="bossy-tooltip-active {{options.color.toLowerCase()}} {{setActive(options.persist)}} ' +
                    '{{setAlignment(options.align)}} {{setContentType(options.type)}} {{setPositioning(options.position)}}">' +
                    '<span ng-bind-html="data.text | bossyUnsafeHtml"></span>' +
                    '<i ng-show="options.icon" class="icon ionicon {{options.icon.toLowerCase()}} {{setIconFloat(options.iconFloat)}}"></i>' +
                    '<div ng-show="options.type.toLowerCase() === \'download\'" class="progress-bar" style="width: {{options.progress}}%"></div>' +
                  '</div>' +
                '</span>' +
              '</span>',
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', ['bossy.filters'])
.controller('bossyTooltipController', TooltipController)
.directive('bossyTooltip', Tooltip);

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
    color:"green"
  };
  $scope.directiveData4 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions4 = {
    color:"orange"
  };
  $scope.directiveData5 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions5 = {
    color:"red"
  };
  $scope.directiveData6 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions6 = {
    color:"blue"
  };
  $scope.directiveData7 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions7 = {
    position:"left"
  };
  $scope.directiveData8 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions8 = {
    position:"right"
  };
  $scope.directiveData9 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions9 = {
    position:"bottom"
  };
  $scope.directiveData10 = {
    text: "<img src=\"http://i.imgur.com/2yY7WNF.jpg\"><b>This is bold text within the tooltip</b><span>that is normal text in the tooltip</span>"
  };
  $scope.directiveOptions10 = {
    type: "html"
  };
  $scope.directiveData11 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions11 = {
    type: "download",
    persist: true
  };
  $scope.directiveData12 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions12 = {
    persist: true
  };
  $scope.directiveData13 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions13 = {
    icon: "ion-scissors",
    iconFloat: "left"
  };
  $scope.directiveData14 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions14 = {
    transclude: true
  };
  $scope.directiveData15 = {text: "This is default text in the tooltip"};
  $scope.directiveOptions15 = {
    icon: "ion-scissors",
    iconFloat: "right"
  };
  $scope.progressBar = function(){
    for (i = 0; i < 100; i++){
      this.directiveOptions11.progress = i;
    }
  };
  $scope.progressReset = function(){
    this.directiveOptions11.progress = 0;
  }
  $scope.togglePersist = function(){
    if (this.directiveOptions12.persist) {
      this.directiveOptions12.persist = false;
    }
    else {
      this.directiveOptions12.persist = true;
    }
  }
});
app.directive('bossyTooltip', Tooltip);


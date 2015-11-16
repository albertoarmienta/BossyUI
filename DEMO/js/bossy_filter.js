angular.module('bossy.filters', [])
.filter('bossyUnsafeHtml', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };});

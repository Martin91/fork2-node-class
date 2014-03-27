module.exports = Class;

function Class(options){
  var __TargetClass__ = options.initialize ? options.initialize : function(){};
  for(key in options) {
    if(key != 'initialize') {
      __TargetClass__.prototype[key] = options[key];
    }
  }
  return __TargetClass__;
}

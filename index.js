module.exports = Class;

function Class(options, parentClass){
  var __TargetClass__ = options.initialize ? options.initialize : function(){};

  for(key in options) {
    if(key != 'initialize') {
      __TargetClass__.prototype[key] = options[key];
    }
  }

  if(parentClass) {
    __TargetClass__.prototype = new parentClass(arguments);
    __TargetClass__.prototype.constructor = __TargetClass__;
  }

  return __TargetClass__;
}

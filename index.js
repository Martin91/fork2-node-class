module.exports = Class;

function Class(options, parentClass){
  var __TargetClass__ = options.initialize ? options.initialize : function(){};

  if(parentClass) {
    __TargetClass__.prototype = new parentClass(arguments);
    __TargetClass__.prototype.constructor = __TargetClass__;
    __TargetClass__.__super__ = parentClass;

    __TargetClass__.prototype.super = function(){};
  } else {
    __TargetClass__.__super__ = Object;
  }

  for(key in options) {
    if(key != 'initialize') {
      __TargetClass__.prototype[key] = options[key];
    }
  }

  return __TargetClass__;
}

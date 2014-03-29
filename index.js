module.exports = Class;

function Class(options, parentClass){
  var __TargetClass__ = options.initialize ? options.initialize : function(){};

  if(parentClass) {
    __TargetClass__.prototype = new parentClass(arguments);
    __TargetClass__.prototype.constructor = __TargetClass__;
    __TargetClass__.__super__ = parentClass;

    var currentClass = __TargetClass__;
    __TargetClass__.prototype.super = function(_method){
      currentClass = currentClass.__super__;
      var res = currentClass.prototype[_method].apply(this, [].slice.call(arguments, 1));
      currentClass = __TargetClass__;
      return res;
    };
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

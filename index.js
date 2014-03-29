module.exports = Class;

function Class(options, parentClass){
  var klass = options.initialize ? options.initialize : function(){};

  if(parentClass) {
    klass.prototype = new parentClass(arguments);
    klass.prototype.constructor = klass;
    klass.__super__ = parentClass;

    var currentClass = klass;
    klass.prototype.super = function(_method){
      currentClass = currentClass.__super__;
      var res = currentClass.prototype[_method].apply(this, [].slice.call(arguments, 1));
      currentClass = klass;
      return res;
    };
  } else {
    klass.__super__ = Object;
  }

  for(key in options) {
    if(key != 'initialize') {
      klass.prototype[key] = options[key];
    }
  }

  return klass;
}

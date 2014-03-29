module.exports = Class;

function Class(prop, parentClass){
  var klass = prop.initialize ? prop.initialize : function(){};

  if(parentClass) {
    klass.prototype = new parentClass();
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

  if(parentClass) {
    var _super = klass.__super__.prototype;
  }
  for(method in prop) {
    if(method != 'initialize') {
      // Determine if the current method is existed in the super class
      klass.prototype[method] =
        (parentClass && (typeof prop[method]) == 'function' && _super.hasOwnProperty(method) && (typeof _super[method]) == 'function') ?
          (function(method, func) {
            return function(){
              var tmp = this._super;
              this._super = _super[method];
              var res = func.apply(this, arguments);

              this._super = tmp;
              return res;
            };
          })(method, prop[method]) : prop[method];
    }
  }

  return klass;
}

module.exports = Class;

function Class(options){
  return (options.initialize ? options.initialize : function(){});
}

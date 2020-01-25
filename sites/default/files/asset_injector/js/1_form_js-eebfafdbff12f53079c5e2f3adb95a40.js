  document.addEventListener("DOMContentLoaded", function() {
   const FORM_TIME_START = Math.floor((new Date).getTime() / 1000);
   let formElement = document.getElementById("tfa_0");
   if (null === formElement) {
    formElement = document.getElementById("0");
   }
   let appendJsTimerElement = function() {
    let formTimeDiff = Math.floor((new Date).getTime() / 1000) - FORM_TIME_START;
    let cumulatedTimeElement = document.getElementById("tfa_dbCumulatedTime");
    if (null !== cumulatedTimeElement) {
     let cumulatedTime = parseInt(cumulatedTimeElement.value);
     if (null !== cumulatedTime && cumulatedTime > 0) {
      formTimeDiff += cumulatedTime;
     }
    }
    let jsTimeInput = document.createElement("input");
    jsTimeInput.setAttribute("type", "hidden");
    jsTimeInput.setAttribute("value", formTimeDiff.toString());
    jsTimeInput.setAttribute("name", "tfa_dbElapsedJsTime");
    jsTimeInput.setAttribute("id", "tfa_dbElapsedJsTime");
    jsTimeInput.setAttribute("autocomplete", "off");
    if (null !== formElement) {
     formElement.appendChild(jsTimeInput);
    }
   };
   if (null !== formElement) {
    if (formElement.addEventListener) {
     formElement.addEventListener('submit', appendJsTimerElement, false);
    } else if (formElement.attachEvent) {
     formElement.attachEvent('onsubmit', appendJsTimerElement);
    }
   }
  });
  var base2 = {
   name: "base2",
   version: "1.0",
   exports: "Base,Package,Abstract,Module,Enumerable,Map,Collection,RegGrp,Undefined,Null,This,True,False,assignID,detect,global",
   namespace: ""
  };
  new function(_no_shrink_) {
   var Undefined = K(),
    Null = K(null),
    True = K(true),
    False = K(false),
    This = function() {
     return this
    };
   var global = This();
   var base2 = global.base2;
   var _FORMAT = /%([1-9])/g;
   var _LTRIM = /^\s\s*/;
   var _RTRIM = /\s\s*$/;
   var _RESCAPE = /([\/()[\]{}|*+-.,^$?\\])/g;
   var _BASE = /try/.test(detect) ? /\bbase\b/ : /.*/;
   var _HIDDEN = ["constructor", "toString", "valueOf"];
   var _MSIE_NATIVE_FUNCTION = detect("(jscript)") ? new RegExp("^" + rescape(isNaN).replace(/isNaN/, "\\w+") + "$") : {
    test: False
   };
   var _counter = 1;
   var _slice = Array.prototype.slice;
   _Function_forEach();

   function assignID(object) {
    if (!object.base2ID) {
     object.base2ID = "b2_" + _counter++
    }
    return object.base2ID
   }
   var _subclass = function(_instance, _static) {
    base2.__prototyping = this.prototype;
    var _prototype = new this;
    if (_instance) {
     extend(_prototype, _instance)
    }
    delete base2.__prototyping;
    var _constructor = _prototype.constructor;

    function _class() {
     if (!base2.__prototyping) {
      if (this.constructor == arguments.callee || this.__constructing) {
       this.__constructing = true;
       _constructor.apply(this, arguments);
       delete this.__constructing
      } else {
       return extend(arguments[0], _prototype)
      }
     }
     return this
    }
    _prototype.constructor = _class;
    for (var i in Base) {
     _class[i] = this[i]
    }
    _class.ancestor = this;
    _class.base = Undefined;
    if (_static) {
     extend(_class, _static)
    }
    _class.prototype = _prototype;
    if (_class.init) {
     _class.init()
    }
    _class["#implements"] = [];
    _class["#implemented_by"] = [];
    return _class
   };
   var Base = _subclass.call(Object, {
    constructor: function() {
     if (arguments.length > 0) {
      this.extend(arguments[0])
     }
    },
    base: function() {},
    extend: delegate(extend)
   }, Base = {
    ancestorOf: function(klass) {
     return _ancestorOf(this, klass)
    },
    extend: _subclass,
    forEach: function(object, block, context) {
     _Function_forEach(this, object, block, context)
    },
    implement: function(source) {
     if (typeof source == "function") {
      if (_ancestorOf(Base, source)) {
       this["#implements"].push(source);
       source["#implemented_by"].push(this)
      }
      source = source.prototype
     }
     extend(this.prototype, source);
     return this
    }
   });
   var Package = Base.extend({
    constructor: function(_private, _public) {
     this.extend(_public);
     if (this.init) {
      this.init()
     }
     if (this.name && this.name != "base2") {
      if (!this.parent) {
       this.parent = base2
      }
      this.parent.addName(this.name, this);
      this.namespace = format("var %1=%2;", this.name, String2.slice(this, 1, -1))
     }
     if (_private) {
      var JSNamespace = base2.JavaScript ? base2.JavaScript.namespace : "";
      _private.imports = Array2.reduce(csv(this.imports), function(namespace, name) {
       var ns = lookup(name) || lookup("JavaScript." + name);
       assert(ns, format("Object not found: '%1'.", name), ReferenceError);
       return namespace += ns.namespace
      }, "var base2=(function(){return this.base2})();" + base2.namespace + JSNamespace) + lang.namespace;
      _private.exports = Array2.reduce(csv(this.exports), function(namespace, name) {
       var fullName = this.name + "." + name;
       this.namespace += "var " + name + "=" + fullName + ";";
       return namespace += "if(!" + fullName + ")" + fullName + "=" + name + ";"
      }, "", this) + "this._label_" + this.name + "();";
      var pkg = this;
      var packageName = String2.slice(this, 1, -1);
      _private["_label_" + this.name] = function() {
       Package.forEach(pkg, function(object, name) {
        if (object && object.ancestorOf == Base.ancestorOf) {
         object.toString = K(format("[%1.%2]", packageName, name));
         if (object.prototype.toString == Base.prototype.toString) {
          object.prototype.toString = K(format("[object %1.%2]", packageName, name))
         }
        }
       })
      }
     }

     function lookup(names) {
      names = names.split(".");
      var value = base2,
       i = 0;
      while (value && names[i] != null) {
       value = value[names[i++]]
      }
      return value
     }
    },
    exports: "",
    imports: "",
    name: "",
    namespace: "",
    parent: null,
    addName: function(name, value) {
     if (!this[name]) {
      this[name] = value;
      this.exports += "," + name;
      this.namespace += format("var %1=%2.%1;", name, this.name)
     }
    },
    addPackage: function(name) {
     this.addName(name, new Package(null, {
      name: name,
      parent: this
     }))
    },
    toString: function() {
     return format("[%1]", this.parent ? String2.slice(this.parent, 1, -1) + "." + this.name : this.name)
    }
   });
   var Abstract = Base.extend({
    constructor: function() {
     throw new TypeError("Abstract class cannot be instantiated.")
    }
   });
   var _moduleCount = 0;
   var Module = Abstract.extend(null, {
    namespace: "",
    extend: function(_interface, _static) {
     var module = this.base();
     var index = _moduleCount++;
     module.namespace = "";
     module.partial = this.partial;
     module.toString = K("[base2.Module[" + index + "]]");
     Module[index] = module;
     module.implement(this);
     if (_interface) {
      module.implement(_interface)
     }
     if (_static) {
      extend(module, _static);
      if (module.init) {
       module.init()
      }
     }
     return module
    },
    forEach: function(block, context) {
     _Function_forEach(Module, this.prototype, function(method, name) {
      if (typeOf(method) == "function") {
       block.call(context, this[name], name, this)
      }
     }, this)
    },
    implement: function(_interface) {
     var module = this;
     var id = module.toString().slice(1, -1);
     if (typeof _interface == "function") {
      if (!_ancestorOf(_interface, module)) {
       this.base(_interface)
      }
      if (_ancestorOf(Module, _interface)) {
       for (var name in _interface) {
        if (module[name] === undefined) {
         var property = _interface[name];
         if (typeof property == "function" && property.call && _interface.prototype[name]) {
          property = _staticModuleMethod(_interface, name)
         }
         module[name] = property
        }
       }
       module.namespace += _interface.namespace.replace(/base2\.Module\[\d+\]/g, id)
      }
     } else {
      extend(module, _interface);
      _extendModule(module, _interface)
     }
     return module
    },
    partial: function() {
     var module = Module.extend();
     var id = module.toString().slice(1, -1);
     module.namespace = this.namespace.replace(/(\w+)=b[^\)]+\)/g, "$1=" + id + ".$1");
     this.forEach(function(method, name) {
      module[name] = partial(bind(method, module))
     });
     return module
    }
   });

   function _extendModule(module, _interface) {
    var proto = module.prototype;
    var id = module.toString().slice(1, -1);
    for (var name in _interface) {
     var property = _interface[name],
      namespace = "";
     if (name.charAt(0) == "@") {
      if (detect(name.slice(1))) {
       _extendModule(module, property)
      }
     } else {
      if (!proto[name]) {
       if (name == name.toUpperCase()) {
        namespace = "var " + name + "=" + id + "." + name + ";"
       } else {
        if (typeof property == "function" && property.call) {
         namespace = "var " + name + "=base2.lang.bind('" + name + "'," + id + ");";
         proto[name] = _moduleMethod(module, name);
         proto[name]._module = module
        }
       }
       if (module.namespace.indexOf(namespace) == -1) {
        module.namespace += namespace
       }
      }
     }
    }
   }

   function _staticModuleMethod(module, name) {
    return function() {
     return module[name].apply(module, arguments)
    }
   }

   function _moduleMethod(module, name) {
    return function() {
     var args = _slice.call(arguments);
     args.unshift(this);
     return module[name].apply(module, args)
    }
   }
   var Enumerable = Module.extend({
    every: function(object, test, context) {
     var result = true;
     try {
      forEach(object, function(value, key) {
       result = test.call(context, value, key, object);
       if (!result) {
        throw StopIteration
       }
      })
     } catch (error) {
      if (error != StopIteration) {
       throw error
      }
     }
     return !!result
    },
    filter: function(object, test, context) {
     var i = 0;
     return this.reduce(object, function(result, value, key) {
      if (test.call(context, value, key, object)) {
       result[i++] = value
      }
      return result
     }, [])
    },
    invoke: function(object, method) {
     var args = _slice.call(arguments, 2);
     return this.map(object, (typeof method == "function") ? function(item) {
      return item == null ? undefined : method.apply(item, args)
     } : function(item) {
      return item == null ? undefined : item[method].apply(item, args)
     })
    },
    map: function(object, block, context) {
     var result = [],
      i = 0;
     forEach(object, function(value, key) {
      result[i++] = block.call(context, value, key, object)
     });
     return result
    },
    pluck: function(object, key) {
     return this.map(object, function(item) {
      return item == null ? undefined : item[key]
     })
    },
    reduce: function(object, block, result, context) {
     var initialised = arguments.length > 2;
     forEach(object, function(value, key) {
      if (initialised) {
       result = block.call(context, result, value, key, object)
      } else {
       result = value;
       initialised = true
      }
     });
     return result
    },
    some: function(object, test, context) {
     return !this.every(object, not(test), context)
    }
   });
   var _HASH = "#";
   var Map = Base.extend({
    constructor: function(values) {
     if (values) {
      this.merge(values)
     }
    },
    clear: function() {
     for (var key in this) {
      if (key.indexOf(_HASH) == 0) {
       delete this[key]
      }
     }
    },
    copy: function() {
     base2.__prototyping = true;
     var copy = new this.constructor;
     delete base2.__prototyping;
     for (var i in this) {
      if (this[i] !== copy[i]) {
       copy[i] = this[i]
      }
     }
     return copy
    },
    forEach: function(block, context) {
     for (var key in this) {
      if (key.indexOf(_HASH) == 0) {
       block.call(context, this[key], key.slice(1), this)
      }
     }
    },
    get: function(key) {
     return this[_HASH + key]
    },
    getKeys: function() {
     return this.map(II)
    },
    getValues: function() {
     return this.map(I)
    },
    has: function(key) { /*@cc_on @*/
     /*@if (@_jscript_version < 5.5)
         return $Legacy.has(this, _HASH + key);
       @else @*/
     return _HASH + key in this; /*@end @*/
    },
    merge: function(values) {
     var put = flip(this.put);
     forEach(arguments, function(values) {
      forEach(values, put, this)
     }, this);
     return this
    },
    put: function(key, value) {
     this[_HASH + key] = value
    },
    remove: function(key) {
     delete this[_HASH + key]
    },
    size: function() {
     var size = 0;
     for (var key in this) {
      if (key.indexOf(_HASH) == 0) {
       size++
      }
     }
     return size
    },
    union: function(values) {
     return this.merge.apply(this.copy(), arguments)
    }
   });
   Map.implement(Enumerable);
   Map.prototype.filter = function(test, context) {
    return this.reduce(function(result, value, key) {
     if (!test.call(context, value, key, this)) {
      result.remove(key)
     }
     return result
    }, this.copy(), this)
   };
   var _KEYS = "~";
   var Collection = Map.extend({
    constructor: function(values) {
     this[_KEYS] = new Array2;
     this.base(values)
    },
    add: function(key, item) {
     assert(!this.has(key), "Duplicate key '" + key + "'.");
     this.put.apply(this, arguments)
    },
    clear: function() {
     this.base();
     this[_KEYS].length = 0
    },
    copy: function() {
     var copy = this.base();
     copy[_KEYS] = this[_KEYS].copy();
     return copy
    },
    forEach: function(block, context) {
     var keys = this[_KEYS];
     var length = keys.length;
     for (var i = 0; i < length; i++) {
      block.call(context, this[_HASH + keys[i]], keys[i], this)
     }
    },
    getAt: function(index) {
     var key = this[_KEYS].item(index);
     return (key === undefined) ? undefined : this[_HASH + key]
    },
    getKeys: function() {
     return this[_KEYS].copy()
    },
    indexOf: function(key) {
     return this[_KEYS].indexOf(String(key))
    },
    insertAt: function(index, key, item) {
     assert(this[_KEYS].item(index) !== undefined, "Index out of bounds.");
     assert(!this.has(key), "Duplicate key '" + key + "'.");
     this[_KEYS].insertAt(index, String(key));
     this[_HASH + key] = null;
     this.put.apply(this, _slice.call(arguments, 1))
    },
    item: function(keyOrIndex) {
     return this[typeof keyOrIndex == "number" ? "getAt" : "get"](keyOrIndex)
    },
    put: function(key, item) {
     if (!this.has(key)) {
      this[_KEYS].push(String(key))
     }
     var klass = this.constructor;
     if (klass.Item && !instanceOf(item, klass.Item)) {
      item = klass.create.apply(klass, arguments)
     }
     this[_HASH + key] = item
    },
    putAt: function(index, item) {
     arguments[0] = this[_KEYS].item(index);
     assert(arguments[0] !== undefined, "Index out of bounds.");
     this.put.apply(this, arguments)
    },
    remove: function(key) {
     if (this.has(key)) {
      this[_KEYS].remove(String(key));
      delete this[_HASH + key]
     }
    },
    removeAt: function(index) {
     var key = this[_KEYS].item(index);
     if (key !== undefined) {
      this[_KEYS].removeAt(index);
      delete this[_HASH + key]
     }
    },
    reverse: function() {
     this[_KEYS].reverse();
     return this
    },
    size: function() {
     return this[_KEYS].length
    },
    slice: function(start, end) {
     var sliced = this.copy();
     if (arguments.length > 0) {
      var keys = this[_KEYS],
       removed = keys;
      sliced[_KEYS] = Array2(_slice.apply(keys, arguments));
      if (sliced[_KEYS].length) {
       removed = removed.slice(0, start);
       if (arguments.length > 1) {
        removed = removed.concat(keys.slice(end))
       }
      }
      for (var i = 0; i < removed.length; i++) {
       delete sliced[_HASH + removed[i]]
      }
     }
     return sliced
    },
    sort: function(compare) {
     if (compare) {
      this[_KEYS].sort(bind(function(key1, key2) {
       return compare(this[_HASH + key1], this[_HASH + key2], key1, key2)
      }, this))
     } else {
      this[_KEYS].sort()
     }
     return this
    },
    toString: function() {
     return "(" + (this[_KEYS] || "") + ")"
    }
   }, {
    Item: null,
    create: function(key, item) {
     return this.Item ? new this.Item(key, item) : item
    },
    extend: function(_instance, _static) {
     var klass = this.base(_instance);
     klass.create = this.create;
     if (_static) {
      extend(klass, _static)
     }
     if (!klass.Item) {
      klass.Item = this.Item
     } else {
      if (typeof klass.Item != "function") {
       klass.Item = (this.Item || Base).extend(klass.Item)
      }
     }
     if (klass.init) {
      klass.init()
     }
     return klass
    }
   });
   var _RG_BACK_REF = /\\(\d+)/g,
    _RG_ESCAPE_CHARS = /\\./g,
    _RG_ESCAPE_BRACKETS = /\(\?[:=!]|\[[^\]]+\]/g,
    _RG_BRACKETS = /\(/g,
    _RG_LOOKUP = /\$(\d+)/,
    _RG_LOOKUP_SIMPLE = /^\$\d+$/;
   var RegGrp = Collection.extend({
    constructor: function(values, ignoreCase) {
     this.base(values);
     this.ignoreCase = !!ignoreCase
    },
    ignoreCase: false,
    exec: function(string, override) {
     string += "";
     var items = this,
      keys = this[_KEYS];
     if (!keys.length) {
      return string
     }
     if (override == RegGrp.IGNORE) {
      override = 0
     }
     return string.replace(new RegExp(this, this.ignoreCase ? "gi" : "g"), function(match) {
      var item, offset = 1,
       i = 0;
      while ((item = items[_HASH + keys[i++]])) {
       var next = offset + item.length + 1;
       if (arguments[offset]) {
        var replacement = override == null ? item.replacement : override;
        switch (typeof replacement) {
         case "function":
          return replacement.apply(items, _slice.call(arguments, offset, next));
         case "number":
          return arguments[offset + replacement];
         default:
          return replacement
        }
       }
       offset = next
      }
      return match
     })
    },
    insertAt: function(index, expression, replacement) {
     if (instanceOf(expression, RegExp)) {
      arguments[1] = expression.source
     }
     return base(this, arguments)
    },
    test: function(string) {
     return this.exec(string) != string
    },
    toString: function() {
     var offset = 1;
     return "(" + this.map(function(item) {
      var expression = (item + "").replace(_RG_BACK_REF, function(match, index) {
       return "\\" + (offset + Number(index))
      });
      offset += item.length + 1;
      return expression
     }).join(")|(") + ")"
    }
   }, {
    IGNORE: "$0",
    init: function() {
     forEach("add,get,has,put,remove".split(","), function(name) {
      _override(this, name, function(expression) {
       if (instanceOf(expression, RegExp)) {
        arguments[0] = expression.source
       }
       return base(this, arguments)
      })
     }, this.prototype)
    },
    Item: {
     constructor: function(expression, replacement) {
      if (replacement == null) {
       replacement = RegGrp.IGNORE
      } else {
       if (replacement.replacement != null) {
        replacement = replacement.replacement
       } else {
        if (typeof replacement != "function") {
         replacement = String(replacement)
        }
       }
      }
      if (typeof replacement == "string" && _RG_LOOKUP.test(replacement)) {
       if (_RG_LOOKUP_SIMPLE.test(replacement)) {
        replacement = parseInt(replacement.slice(1))
       } else {
        var Q = '"';
        replacement = replacement.replace(/\\/g, "\\\\").replace(/"/g, "\\x22").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\$(\d+)/g, Q + "+(arguments[$1]||" + Q + Q + ")+" + Q).replace(/(['"])\1\+(.*)\+\1\1$/, "$1");
        replacement = new Function("return " + Q + replacement + Q)
       }
      }
      this.length = RegGrp.count(expression);
      this.replacement = replacement;
      this.toString = K(expression + "")
     },
     length: 0,
     replacement: ""
    },
    count: function(expression) {
     expression = (expression + "").replace(_RG_ESCAPE_CHARS, "").replace(_RG_ESCAPE_BRACKETS, "");
     return match(expression, _RG_BRACKETS).length
    }
   });
   var lang = {
    name: "lang",
    version: base2.version,
    exports: "assert,assertArity,assertType,base,bind,copy,extend,forEach,format,instanceOf,match,pcopy,rescape,trim,typeOf",
    namespace: ""
   };

   function assert(condition, message, ErrorClass) {
    if (!condition) {
     throw new(ErrorClass || Error)(message || "Assertion failed.")
    }
   }

   function assertArity(args, arity, message) {
    if (arity == null) {
     arity = args.callee.length
    }
    if (args.length < arity) {
     throw new SyntaxError(message || "Not enough arguments.")
    }
   }

   function assertType(object, type, message) {
    if (type && (typeof type == "function" ? !instanceOf(object, type) : typeOf(object) != type)) {
     throw new TypeError(message || "Invalid type.")
    }
   }

   function copy(object) {
    var copy = {};
    for (var i in object) {
     copy[i] = object[i]
    }
    return copy
   }

   function pcopy(object) {
    _dummy.prototype = object;
    return new _dummy
   }

   function _dummy() {}

   function base(object, args) {
    return object.base.apply(object, args)
   }

   function extend(object, source) {
    if (object && source) {
     if (arguments.length > 2) {
      var key = source;
      source = {};
      source[key] = arguments[2]
     }
     var proto = global[(typeof source == "function" ? "Function" : "Object")].prototype;
     if (base2.__prototyping) {
      var i = _HIDDEN.length,
       key;
      while ((key = _HIDDEN[--i])) {
       var value = source[key];
       if (value != proto[key]) {
        if (_BASE.test(value)) {
         _override(object, key, value)
        } else {
         object[key] = value
        }
       }
      }
     }
     for (key in source) {
      if (proto[key] === undefined) {
       var value = source[key];
       if (key.charAt(0) == "@") {
        if (detect(key.slice(1))) {
         extend(object, value)
        }
       } else {
        var ancestor = object[key];
        if (ancestor && typeof value == "function") {
         if (value != ancestor) {
          if (_BASE.test(value)) {
           _override(object, key, value)
          } else {
           value.ancestor = ancestor;
           object[key] = value
          }
         }
        } else {
         object[key] = value
        }
       }
      }
     }
    }
    return object
   }

   function _ancestorOf(ancestor, fn) {
    while (fn) {
     if (!fn.ancestor) {
      return false
     }
     fn = fn.ancestor;
     if (fn == ancestor) {
      return true
     }
    }
    return false
   }

   function _override(object, name, method) {
    var ancestor = object[name];
    var superObject = base2.__prototyping;
    if (superObject && ancestor != superObject[name]) {
     superObject = null
    }

    function _base() {
     var previous = this.base;
     this.base = superObject ? superObject[name] : ancestor;
     var returnValue = method.apply(this, arguments);
     this.base = previous;
     return returnValue
    }
    _base.method = method;
    _base.ancestor = ancestor;
    object[name] = _base;
    _base.toString = K(method + "")
   }
   if (typeof StopIteration == "undefined") {
    StopIteration = new Error("StopIteration")
   }

   function forEach(object, block, context, fn) {
    if (object == null) {
     return
    }
    if (!fn) {
     if (typeof object == "function" && object.call) {
      fn = Function
     } else {
      if (typeof object.forEach == "function" && object.forEach != arguments.callee) {
       object.forEach(block, context);
       return
      } else {
       if (typeof object.length == "number") {
        _Array_forEach(object, block, context);
        return
       }
      }
     }
    }
    _Function_forEach(fn || Object, object, block, context)
   }
   forEach.csv = function(string, block, context) {
    forEach(csv(string), block, context)
   };
   forEach.detect = function(object, block, context) {
    forEach(object, function(value, key) {
     if (key.charAt(0) == "@") {
      if (detect(key.slice(1))) {
       forEach(value, arguments.callee)
      }
     } else {
      block.call(context, value, key, object)
     }
    })
   };

   function _Array_forEach(array, block, context) {
    if (array == null) {
     array = global
    }
    var length = array.length || 0,
     i;
    if (typeof array == "string") {
     for (i = 0; i < length; i++) {
      block.call(context, array.charAt(i), i, array)
     }
    } else {
     for (i = 0; i < length; i++) { /*@cc_on @*/
      /*@if (@_jscript_version < 5.2)
            if ($Legacy.has(array, i))
          @else @*/
      if (i in array) { /*@end @*/
       block.call(context, array[i], i, array)
      }
     }
    }
   }

   function _Function_forEach(fn, object, block, context) {
    var Temp = function() {
     this.i = 1
    };
    Temp.prototype = {
     i: 1
    };
    var count = 0;
    for (var i in new Temp) {
     count++
    }
    _Function_forEach = (count > 1) ? function(fn, object, block, context) {
     var processed = {};
     for (var key in object) {
      if (!processed[key] && fn.prototype[key] === undefined) {
       processed[key] = true;
       block.call(context, object[key], key, object)
      }
     }
    } : function(fn, object, block, context) {
     for (var key in object) {
      if (fn.prototype[key] === undefined) {
       block.call(context, object[key], key, object)
      }
     }
    };
    _Function_forEach(fn, object, block, context)
   }

   function instanceOf(object, klass) {
    if (typeof klass != "function") {
     throw new TypeError("Invalid 'instanceOf' operand.")
    }
    if (object == null) {
     return false;
     /*@cc_on  
       // COM objects don't have a constructor
       if (typeof object.constructor != "function") {
         return typeOf(object) == typeof klass.prototype.valueOf();
       }
       @*/
    }
    if (object.constructor == klass) {
     return true
    }
    if (klass.ancestorOf) {
     return klass.ancestorOf(object.constructor);
     /*@if (@_jscript_version < 5.1)
         // do nothing
       @else @*/
    }
    if (object instanceof klass) {
     return true; /*@end @*/
    }
    if (Base.ancestorOf == klass.ancestorOf) {
     return false
    }
    if (Base.ancestorOf == object.constructor.ancestorOf) {
     return klass == Object
    }
    switch (klass) {
     case Array:
      return !!(typeof object == "object" && object.join && object.splice);
     case Function:
      return typeOf(object) == "function";
     case RegExp:
      return typeof object.constructor.$1 == "string";
     case Date:
      return !!object.getTimezoneOffset;
     case String:
     case Number:
     case Boolean:
      return typeOf(object) == typeof klass.prototype.valueOf();
     case Object:
      return true
    }
    return false
   }

   function typeOf(object) {
    var type = typeof object;
    switch (type) {
     case "object":
      return object == null ? "null" : typeof object.constructor == "undefined" ? _MSIE_NATIVE_FUNCTION.test(object) ? "function" : type : typeof object.constructor.prototype.valueOf();
     case "function":
      return typeof object.call == "function" ? type : "object";
     default:
      return type
    }
   }
   var JavaScript = {
    name: "JavaScript",
    version: base2.version,
    exports: "Array2,Date2,Function2,String2",
    namespace: "",
    bind: function(host) {
     var top = global;
     global = host;
     forEach.csv(this.exports, function(name2) {
      var name = name2.slice(0, -1);
      extend(host[name], this[name2]);
      this[name2](host[name].prototype)
     }, this);
     global = top;
     return host
    }
   };

   function _createObject2(Native, constructor, generics, extensions) {
    var INative = Module.extend();
    var id = INative.toString().slice(1, -1);
    forEach.csv(generics, function(name) {
     INative[name] = unbind(Native.prototype[name]);
     INative.namespace += format("var %1=%2.%1;", name, id)
    });
    forEach(_slice.call(arguments, 3), INative.implement, INative);
    var Native2 = function() {
     return INative(this.constructor == INative ? constructor.apply(null, arguments) : arguments[0])
    };
    Native2.prototype = INative.prototype;
    for (var name in INative) {
     if (name != "prototype" && Native[name]) {
      INative[name] = Native[name];
      delete INative.prototype[name]
     }
     Native2[name] = INative[name]
    }
    Native2.ancestor = Object;
    delete Native2.extend;
    Native2.namespace = Native2.namespace.replace(/(var (\w+)=)[^,;]+,([^\)]+)\)/g, "$1$3.$2");
    return Native2
   }
   if ((new Date).getYear() > 1900) {
    Date.prototype.getYear = function() {
     return this.getFullYear() - 1900
    };
    Date.prototype.setYear = function(year) {
     return this.setFullYear(year + 1900)
    }
   }
   var _testDate = new Date(Date.UTC(2006, 1, 20));
   _testDate.setUTCDate(15);
   if (_testDate.getUTCHours() != 0) {
    forEach.csv("FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds", function(type) {
     extend(Date.prototype, "setUTC" + type, function() {
      var value = base(this, arguments);
      if (value >= 57722401000) {
       value -= 3600000;
       this.setTime(value)
      }
      return value
     })
    })
   }
   Function.prototype.prototype = {};
   if ("".replace(/^/, K("$$")) == "$") {
    extend(String.prototype, "replace", function(expression, replacement) {
     if (typeof replacement == "function") {
      var fn = replacement;
      replacement = function() {
       return String(fn.apply(null, arguments)).split("$").join("$$")
      }
     }
     return this.base(expression, replacement)
    })
   }
   var Array2 = _createObject2(Array, Array, "concat,join,pop,push,reverse,shift,slice,sort,splice,unshift", Enumerable, {
    combine: function(keys, values) {
     if (!values) {
      values = keys
     }
     return Array2.reduce(keys, function(hash, key, index) {
      hash[key] = values[index];
      return hash
     }, {})
    },
    contains: function(array, item) {
     return Array2.indexOf(array, item) != -1
    },
    copy: function(array) {
     var copy = _slice.call(array);
     if (!copy.swap) {
      Array2(copy)
     }
     return copy
    },
    flatten: function(array) {
     var i = 0;
     return Array2.reduce(array, function(result, item) {
      if (Array2.like(item)) {
       Array2.reduce(item, arguments.callee, result)
      } else {
       result[i++] = item
      }
      return result
     }, [])
    },
    forEach: _Array_forEach,
    indexOf: function(array, item, fromIndex) {
     var length = array.length;
     if (fromIndex == null) {
      fromIndex = 0
     } else {
      if (fromIndex < 0) {
       fromIndex = Math.max(0, length + fromIndex)
      }
     }
     for (var i = fromIndex; i < length; i++) {
      if (array[i] === item) {
       return i
      }
     }
     return -1
    },
    insertAt: function(array, index, item) {
     Array2.splice(array, index, 0, item);
     return item
    },
    item: function(array, index) {
     if (index < 0) {
      index += array.length
     }
     return array[index]
    },
    lastIndexOf: function(array, item, fromIndex) {
     var length = array.length;
     if (fromIndex == null) {
      fromIndex = length - 1
     } else {
      if (fromIndex < 0) {
       fromIndex = Math.max(0, length + fromIndex)
      }
     }
     for (var i = fromIndex; i >= 0; i--) {
      if (array[i] === item) {
       return i
      }
     }
     return -1
    },
    map: function(array, block, context) {
     var result = [];
     Array2.forEach(array, function(item, index) {
      result[index] = block.call(context, item, index, array)
     });
     return result
    },
    remove: function(array, item) {
     var index = Array2.indexOf(array, item);
     if (index != -1) {
      Array2.removeAt(array, index)
     }
    },
    removeAt: function(array, index) {
     Array2.splice(array, index, 1)
    },
    swap: function(array, index1, index2) {
     if (index1 < 0) {
      index1 += array.length
     }
     if (index2 < 0) {
      index2 += array.length
     }
     var temp = array[index1];
     array[index1] = array[index2];
     array[index2] = temp;
     return array
    }
   });
   Array2.reduce = Enumerable.reduce;
   Array2.like = function(object) {
    return typeOf(object) == "object" && typeof object.length == "number"
   };
   Enumerable["#implemented_by"].pop();
   Enumerable["#implemented_by"].push(Array2);
   var _DATE_PATTERN = /^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;
   var _DATE_PARTS = {
    FullYear: 2,
    Month: 4,
    Date: 6,
    Hours: 8,
    Minutes: 10,
    Seconds: 12,
    Milliseconds: 14
   };
   var _TIMEZONE_PARTS = {
    Hectomicroseconds: 15,
    UTC: 16,
    Sign: 17,
    Hours: 18,
    Minutes: 20
   };
   var _TRIM_ZEROES = /(((00)?:0+)?:0+)?\.0+$/;
   var _TRIM_TIMEZONE = /(T[0-9:.]+)$/;
   var Date2 = _createObject2(Date, function(yy, mm, dd, h, m, s, ms) {
    switch (arguments.length) {
     case 0:
      return new Date;
     case 1:
      return typeof yy == "number" ? new Date(yy) : Date2.parse(yy);
     default:
      return new Date(yy, mm, arguments.length == 2 ? 1 : dd, h || 0, m || 0, s || 0, ms || 0)
    }
   }, "", {
    toISOString: function(date) {
     var string = "####-##-##T##:##:##.###";
     for (var part in _DATE_PARTS) {
      string = string.replace(/#+/, function(digits) {
       var value = date["getUTC" + part]();
       if (part == "Month") {
        value++
       }
       return ("000" + value).slice(-digits.length)
      })
     }
     return string.replace(_TRIM_ZEROES, "").replace(_TRIM_TIMEZONE, "$1Z")
    }
   });
   delete Date2.forEach;
   Date2.now = function() {
    return (new Date).valueOf()
   };
   Date2.parse = function(string, defaultDate) {
    if (arguments.length > 1) {
     assertType(defaultDate, "number", "default date should be of type 'number'.")
    }
    var parts = match(string, _DATE_PATTERN);
    if (parts.length) {
     if (parts[_DATE_PARTS.Month]) {
      parts[_DATE_PARTS.Month]--
     }
     if (parts[_TIMEZONE_PARTS.Hectomicroseconds] >= 5) {
      parts[_DATE_PARTS.Milliseconds]++
     }
     var date = new Date(defaultDate || 0);
     var prefix = parts[_TIMEZONE_PARTS.UTC] || parts[_TIMEZONE_PARTS.Hours] ? "UTC" : "";
     for (var part in _DATE_PARTS) {
      var value = parts[_DATE_PARTS[part]];
      if (!value) {
       continue
      }
      date["set" + prefix + part](value);
      if (date["get" + prefix + part]() != parts[_DATE_PARTS[part]]) {
       return NaN
      }
     }
     if (parts[_TIMEZONE_PARTS.Hours]) {
      var hours = Number(parts[_TIMEZONE_PARTS.Sign] + parts[_TIMEZONE_PARTS.Hours]);
      var minutes = Number(parts[_TIMEZONE_PARTS.Sign] + (parts[_TIMEZONE_PARTS.Minutes] || 0));
      date.setUTCMinutes(date.getUTCMinutes() + (hours * 60) + minutes)
     }
     return date.valueOf()
    } else {
     return Date.parse(string)
    }
   };
   var String2 = _createObject2(String, function(string) {
    return new String(arguments.length == 0 ? "" : string)
   }, "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase", {
    csv: csv,
    format: format,
    rescape: rescape,
    trim: trim
   });
   delete String2.forEach;

   function trim(string) {
    return String(string).replace(_LTRIM, "").replace(_RTRIM, "")
   }

   function csv(string) {
    return string ? (string + "").split(/\s*,\s*/) : []
   }

   function format(string) {
    var args = arguments;
    var pattern = new RegExp("%([1-" + (arguments.length - 1) + "])", "g");
    return (string + "").replace(pattern, function(match, index) {
     return args[index]
    })
   }

   function match(string, expression) {
    return (string + "").match(expression) || []
   }

   function rescape(string) {
    return (string + "").replace(_RESCAPE, "\\$1")
   }
   var Function2 = _createObject2(Function, Function, "", {
    I: I,
    II: II,
    K: K,
    bind: bind,
    compose: compose,
    delegate: delegate,
    flip: flip,
    not: not,
    partial: partial,
    unbind: unbind
   });

   function I(i) {
    return i
   }

   function II(i, ii) {
    return ii
   }

   function K(k) {
    return function() {
     return k
    }
   }

   function bind(fn, context) {
    var lateBound = typeof fn != "function";
    if (arguments.length > 2) {
     var args = _slice.call(arguments, 2);
     return function() {
      return (lateBound ? context[fn] : fn).apply(context, args.concat.apply(args, arguments))
     }
    } else {
     return function() {
      return (lateBound ? context[fn] : fn).apply(context, arguments)
     }
    }
   }

   function compose() {
    var fns = _slice.call(arguments);
    return function() {
     var i = fns.length,
      result = fns[--i].apply(this, arguments);
     while (i--) {
      result = fns[i].call(this, result)
     }
     return result
    }
   }

   function delegate(fn, context) {
    return function() {
     var args = _slice.call(arguments);
     args.unshift(this);
     return fn.apply(context, args)
    }
   }

   function flip(fn) {
    return function() {
     return fn.apply(this, Array2.swap(arguments, 0, 1))
    }
   }

   function not(fn) {
    return function() {
     return !fn.apply(this, arguments)
    }
   }

   function partial(fn) {
    var args = _slice.call(arguments, 1);
    return function() {
     var specialised = args.concat(),
      i = 0,
      j = 0;
     while (i < args.length && j < arguments.length) {
      if (specialised[i] === undefined) {
       specialised[i] = arguments[j++]
      }
      i++
     }
     while (j < arguments.length) {
      specialised[i++] = arguments[j++]
     }
     if (Array2.contains(specialised, undefined)) {
      specialised.unshift(fn);
      return partial.apply(null, specialised)
     }
     return fn.apply(this, specialised)
    }
   }

   function unbind(fn) {
    return function(context) {
     return fn.apply(context, _slice.call(arguments, 1))
    }
   }

   function detect() {
    var jscript = NaN /*@cc_on||@_jscript_version@*/ ;
    var javaEnabled = global.java ? true : false;
    if (global.navigator) {
     var MSIE = /MSIE[\d.]+/g;
     var element = document.createElement("span");
     var userAgent = navigator.userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
     if (!jscript) {
      userAgent = userAgent.replace(MSIE, "")
     }
     if (MSIE.test(userAgent)) {
      userAgent = userAgent.match(MSIE)[0] + " " + userAgent.replace(MSIE, "")
     }
     base2.userAgent = navigator.platform + " " + userAgent.replace(/like \w+/gi, "");
     javaEnabled &= navigator.javaEnabled()
    }
    var _cache = {};
    detect = function(expression) {
     if (_cache[expression] == null) {
      var returnValue = false,
       test = expression;
      var not = test.charAt(0) == "!";
      if (not) {
       test = test.slice(1)
      }
      if (test.charAt(0) == "(") {
       try {
        returnValue = new Function("element,jscript,java,global", "return !!" + test)(element, jscript, javaEnabled, global)
       } catch (ex) {}
      } else {
       returnValue = new RegExp("(" + test + ")", "i").test(base2.userAgent)
      }
      _cache[expression] = !!(not ^ returnValue)
     }
     return _cache[expression]
    };
    return detect(arguments[0])
   }
   base2 = global.base2 = new Package(this, base2);
   var exports = this.exports;
   lang = new Package(this, lang);
   exports += this.exports;
   JavaScript = new Package(this, JavaScript);
   eval(exports + this.exports);
   lang.base = base;
   lang.extend = extend
  };
  new function(_no_shrink_) {
   var DOM = new base2.Package(this, {
    name: "DOM",
    version: "1.0.1",
    imports: "Function2",
    exports: "Interface,Binding,Node,Document,Element,AbstractView,HTMLDocument,HTMLElement,Selector,Traversal,CSSParser,XPathParser,NodeSelector,DocumentSelector,ElementSelector,StaticNodeList,Event,EventTarget,DocumentEvent,ViewCSS,CSSStyleDeclaration,ClassList",
    bind: function(node) {
     if (node && node.nodeType) {
      var base2ID = assignID(node);
      if (!DOM.bind[base2ID]) {
       switch (node.nodeType) {
        case 1:
         if (typeof node.className == "string") {
          (HTMLElement.bindings[node.tagName] || HTMLElement).bind(node)
         } else {
          Element.bind(node)
         }
         break;
        case 9:
         if (node.writeln) {
          HTMLDocument.bind(node)
         } else {
          Document.bind(node)
         }
         break;
        default:
         Node.bind(node)
       }
       DOM.bind[base2ID] = true
      }
     }
     return node
    },
    "@MSIE5.+win": {
     bind: function(node) {
      if (node && node.writeln) {
       node.nodeType = 9
      }
      return this.base(node)
     }
    }
   });
   eval(this.imports);
   var _MSIE = detect("MSIE");
   var _MSIE5 = detect("MSIE5");
   var Interface = Module.extend(null, {
    forEach: function(block, context) {
     forEach(this, function(method, name) {
      if (typeOf(method) == "function" && (this.prototype[name] || method._delegate)) {
       block.call(context, method, name, this)
      }
     }, this, Module)
    },
    implement: function(_interface) {
     if (typeof _interface == "object") {
      _createDelegates(this, _interface)
     } else {
      if (Interface.ancestorOf(_interface)) {
       for (var name in _interface) {
        if (_interface[name] && _interface[name]._delegate) {
         this[name] = bind(name, _interface);
         this[name]._delegate = name
        }
       }
      }
     }
     return this.base(_interface)
    }
   });

   function _createDelegates(module, _interface) {
    var id = module.toString().slice(1, -1);
    for (var name in _interface) {
     var property = _interface[name];
     if (name.charAt(0) == "@") {
      _createDelegates(module, property)
     } else {
      if (!module[name] && typeof property == "function" && property.call) {
       var args = "abcdefghij".slice(0, property.length).split("");
       var fn = new Function(args.join(","), format("%2.base=%2.%1.ancestor;var m=%2.base?'base':'%1';return %2[m](%3)", name, args[0], args.slice(1)));
       fn._delegate = name;
       module[name] = fn;
       module.namespace += "var " + name + "=base2.lang.bind('" + name + "'," + id + ");"
      }
     }
    }
   }
   var Binding = Interface.extend(null, {
    extend: function(_interface, _static) {
     if (_static && _static.bind != Function.bind) {
      var bind = _static.bind;
      delete _static.bind
     }
     var binding = this.base(_interface, _static);
     binding.bind = this.bind;
     if (bind) {
      extend(binding, "bind", bind)
     }
     return binding
    },
    bind: function(object) {
     return extend(object, this.prototype)
    }
   });
   var Node = Binding.extend({
    "@!(element.compareDocumentPosition)": {
     compareDocumentPosition: function(node, other) {
      if (Traversal.contains(node, other)) {
       return 4 | 16
      } else {
       if (Traversal.contains(other, node)) {
        return 2 | 8
       }
      }
      var nodeIndex = _getSourceIndex(node);
      var otherIndex = _getSourceIndex(other);
      if (nodeIndex < otherIndex) {
       return 4
      } else {
       if (nodeIndex > otherIndex) {
        return 2
       }
      }
      return 0
     }
    }
   }, {
    "@Gecko": {
     bind: function(node) {
      return extend(this.base(node), "removeEventListener", function() {
       var args = Array2.slice(arguments);
       args.unshift(this);
       EventTarget.removeEventListener.apply(EventTarget, args)
      })
     }
    }
   });
   var _getSourceIndex = document.documentElement.sourceIndex ? function(node) {
    return node.sourceIndex
   } : function(node) {
    var key = 0;
    while (node) {
     key = Traversal.getNodeIndex(node) + "." + key;
     node = node.parentNode
    }
    return key
   };
   var Document = Node.extend(null, {
    bind: function(document) {
     extend(document, "createElement", function(tagName) {
      return DOM.bind(this.base(tagName))
     });
     AbstractView.bind(document.defaultView);
     if (document != window.document) {
      new DOMContentLoadedEvent(document)
     }
     return this.base(document)
    },
    "@!(document.defaultView)": {
     bind: function(document) {
      document.defaultView = Traversal.getDefaultView(document);
      return this.base(document)
     }
    }
   });
   var _ATTRIBUTES = {
    "class": "className",
    "for": "htmlFor"
   };
   var Element = Node.extend({
    "@MSIE.+win": {
     getAttribute: function(element, name) {
      if (element.className === undefined) {
       return this.base(element, name)
      }
      var attribute = _getAttributeNode(element, name);
      if (attribute && (attribute.specified || name == "value")) {
       if (name == "href" || name == "src") {
        element.base = element.getAttribute.ancestor;
        return element[element.base ? "base" : "getAttribute"](name, 2)
       } else {
        if (name == "style") {
         return element.style.cssText.toLowerCase()
        } else {
         return attribute.nodeValue
        }
       }
      } else {
       if (name == "type" && element.nodeName == "INPUT") {
        var outerHTML = element.outerHTML;
        with(outerHTML) {
         outerHTML = slice(0, indexOf(">") + 1)
        }
        return match(outerHTML, /type="?([^\s">]*)"?/i)[1] || null
       }
      }
      return null
     },
     removeAttribute: function(element, name) {
      if (element.className !== undefined) {
       name = _ATTRIBUTES[name.toLowerCase()] || name
      }
      this.base(element, name)
     },
     setAttribute: function(element, name, value) {
      if (element.className === undefined) {
       this.base(element, name, value)
      } else {
       if (name == "style") {
        element.style.cssText = value
       } else {
        value = String(value);
        var attribute = _getAttributeNode(element, name);
        if (attribute) {
         attribute.nodeValue = value
        } else {
         this.base(element, _ATTRIBUTES[name.toLowerCase()] || name, value)
        }
       }
      }
     }
    },
    "@!(element.hasAttribute)": {
     hasAttribute: function(element, name) {
      if (element.className === undefined) {
       return this.base(element, name)
      }
      return this.getAttribute(element, name) != null
     }
    }
   });
   if (detect("MSIE.+win")) {
    extend(Element.prototype, "cloneNode", function(deep) {
     var clone = this.base(deep || false);
     clone.base2ID = undefined;
     return clone
    })
   }
   var _HTML_ATTRIBUTES = "colSpan,rowSpan,vAlign,dateTime,accessKey,tabIndex,encType,maxLength,readOnly,longDesc";
   extend(_ATTRIBUTES, Array2.combine(_HTML_ATTRIBUTES.toLowerCase().split(","), _HTML_ATTRIBUTES.split(",")));
   var _getAttributeNode = document.documentElement.getAttributeNode ? function(element, name) {
    return element.getAttributeNode(name)
   } : function(element, name) {
    return element.attributes[name] || element.attributes[_ATTRIBUTES[name.toLowerCase()]]
   };
   var TEXT = detect("(element.textContent===undefined)") ? "innerText" : "textContent";
   var Traversal = Module.extend({
    getDefaultView: function(node) {
     return this.getDocument(node).defaultView
    },
    getNextElementSibling: function(node) {
     while (node && (node = node.nextSibling) && !this.isElement(node)) {
      continue
     }
     return node
    },
    getNodeIndex: function(node) {
     var index = 0;
     while (node && (node = node.previousSibling)) {
      index++
     }
     return index
    },
    getOwnerDocument: function(node) {
     return node.ownerDocument
    },
    getPreviousElementSibling: function(node) {
     while (node && (node = node.previousSibling) && !this.isElement(node)) {
      continue
     }
     return node
    },
    getTextContent: function(node, isHTML) {
     return node[isHTML ? "innerHTML" : TEXT]
    },
    isEmpty: function(node) {
     node = node.firstChild;
     while (node) {
      if (node.nodeType == 3 || this.isElement(node)) {
       return false
      }
      node = node.nextSibling
     }
     return true
    },
    setTextContent: function(node, text, isHTML) {
     return node[isHTML ? "innerHTML" : TEXT] = text
    },
    "@!MSIE": {
     setTextContent: function(node, text, isHTML) {
      with(node) {
       while (lastChild) {
        parentNode.removeChild(lastChild)
       }
      }
      return this.base(node, text, isHTML)
     }
    },
    "@MSIE": {
     getDefaultView: function(node) {
      return (node.document || node).parentWindow
     },
     "@MSIE5": {
      getOwnerDocument: function(node) {
       return node.ownerDocument || node.document
      }
     }
    }
   }, {
    contains: function(node, target) {
     node.nodeType;
     while (target && (target = target.parentNode) && node != target) {
      continue
     }
     return !!target
    },
    getDocument: function(node) {
     return this.isDocument(node) ? node : node.ownerDocument || node.document
    },
    isDocument: function(node) {
     return !!(node && node.documentElement)
    },
    isElement: function(node) {
     return !!(node && node.nodeType == 1)
    },
    "@(element.contains)": {
     contains: function(node, target) {
      return node != target && (this.isDocument(node) ? node == this.getOwnerDocument(target) : node.contains(target))
     }
    },
    "@MSIE5": {
     isElement: function(node) {
      return !!(node && node.nodeType == 1 && node.nodeName != "!")
     }
    }
   });
   var AbstractView = Binding.extend();
   var _CAPTURE_TYPE = {},
    _TYPE_MAP = {
     "2": 2,
     "4": 1
    };
   var _CAPTURING_PHASE = 1,
    _AT_TARGET = 2,
    _BUBBLING_PHASE = 3;
   var _MOUSE_BUTTON = /^mouse(up|down)|click$/,
    _MOUSE_CLICK = /click$/,
    _BUBBLES = "abort|error|select|change|resize|scroll|",
    _CANCELABLE = "(dbl)?click|mouse(down|up|over|move|out|wheel)|key(down|up)|submit|reset";
   _BUBBLES = new RegExp("^(" + _BUBBLES + _CANCELABLE + ")$");
   _CANCELABLE = new RegExp("^(" + _CANCELABLE + ")$");
   if (_MSIE) {
    var _W3C_EVENT_TYPE = {
     focusin: "focus",
     focusout: "blur"
    };
    _CAPTURE_TYPE = {
     focus: "focusin",
     blur: "focusout"
    }
   }
   var _CAN_DELEGATE = /^(blur|submit|reset|change|select)$|^(mouse|key|focus)|click$/;
   var Event = Binding.extend({
    "@!(document.createEvent)": {
     initEvent: function(event, type, bubbles, cancelable) {
      event.type = String(type);
      event.bubbles = !!bubbles;
      event.cancelable = !!cancelable
     },
     preventDefault: function(event) {
      if (event.cancelable !== false) {
       event.returnValue = false
      }
     },
     stopPropagation: function(event) {
      event.cancelBubble = true
     },
     "@MSIE": {
      preventDefault: function(event) {
       this.base(event);
       if (event.type == "mousedown") {
        var type = "onbeforedeactivate";
        var document = Traversal.getDocument(event.target);
        document.attachEvent(type, function(event) {
         event.returnValue = false;
         document.detachEvent(type, arguments.callee)
        })
       }
      }
     }
    }
   }, {
    CAPTURING_PHASE: _CAPTURING_PHASE,
    AT_TARGET: _AT_TARGET,
    BUBBLING_PHASE: _BUBBLING_PHASE,
    "@!(document.createEvent)": {
     "@MSIE": {
      bind: function(event) {
       var type = event.type;
       if (!event.timeStamp) {
        event.bubbles = _BUBBLES.test(type);
        event.cancelable = _CANCELABLE.test(type);
        event.timeStamp = new Date().valueOf()
       }
       event.relatedTarget = event[(event.target == event.fromElement ? "to" : "from") + "Element"];
       return this.base(event)
      }
     }
    },
    cloneEvent: function(event) {
     var clone = copy(event);
     clone.stopPropagation = function() {
      event.stopPropagation()
     };
     clone.preventDefault = function() {
      event.preventDefault()
     };
     return clone
    },
    "@MSIE": {
     cloneEvent: copy
    }
   });
   var EventDispatcher = Base.extend({
    constructor: function(state) {
     this.state = state;
     this.events = state.events
    },
    dispatch: function(nodes, event, phase) {
     event.eventPhase = phase;
     var map = this.events[event.type][phase];
     if (map) {
      var i = nodes.length;
      while (i-- && !event.cancelBubble) {
       var currentTarget = nodes[i];
       var listeners = map[currentTarget.base2ID];
       if (listeners) {
        listeners = copy(listeners);
        event.currentTarget = currentTarget;
        event.eventPhase = currentTarget == event.target ? _AT_TARGET : phase;
        for (var listenerID in listeners) {
         var listener = listeners[listenerID];
         if (typeof listener == "function") {
          listener.call(currentTarget, event)
         } else {
          listener.handleEvent(event)
         }
        }
       }
      }
     }
    },
    handleEvent: function(event, fixed) {
     Event.bind(event);
     var type = event.type;
     var w3cType = _W3C_EVENT_TYPE[type];
     if (w3cType) {
      event = copy(event);
      type = event.type = w3cType
     }
     if (this.events[type]) {
      if (_MOUSE_BUTTON.test(type)) {
       var button = _MOUSE_CLICK.test(type) ? this.state._button : event.button;
       button = _TYPE_MAP[button] || 0;
       if (event.button != button) {
        event = copy(event);
        event.button = button
       }
      }
      var currentTarget = event.target;
      var nodes = [],
       i = 0;
      while (currentTarget) {
       nodes[i++] = currentTarget;
       currentTarget = currentTarget.parentNode
      }
      this.dispatch(nodes, event, _CAPTURING_PHASE);
      if (!event.cancelBubble) {
       if (!event.bubbles) {
        nodes.length = 1
       }
       nodes.reverse();
       this.dispatch(nodes, event, _BUBBLING_PHASE)
      }
     }
     return event.returnValue !== false
    },
    "@MSIE.+win": {
     handleEvent: function(event) {
      if (event.type == "scroll") {
       setTimeout(bind(this.base, this, copy(event), true), 0);
       return true
      } else {
       return this.base(event)
      }
     },
     "@MSIE5": {
      dispatch: function(nodes, event, phase) {
       if (phase == _CAPTURING_PHASE && !Array2.item(nodes, -1).documentElement) {
        nodes.push(nodes[0].document)
       }
       this.base(nodes, event, phase)
      }
     }
    }
   });
   var _wrappedListeners = {};
   var EventTarget = Interface.extend({
    "@!(element.addEventListener)": {
     addEventListener: function(target, type, listener, useCapture) {
      var documentState = DocumentState.getInstance(target);
      var targetID = assignID(target);
      var listenerID = assignID(listener);
      var phase = useCapture ? _CAPTURING_PHASE : _BUBBLING_PHASE;
      var typeMap = documentState.registerEvent(type, target);
      var phaseMap = typeMap[phase];
      if (!phaseMap) {
       phaseMap = typeMap[phase] = {}
      }
      if (useCapture) {
       type = _CAPTURE_TYPE[type] || type
      }
      var listeners = phaseMap[targetID];
      if (!listeners) {
       listeners = phaseMap[targetID] = {}
      }
      listeners[listenerID] = listener
     },
     dispatchEvent: function(target, event) {
      event.target = target;
      return DocumentState.getInstance(target).handleEvent(event)
     },
     removeEventListener: function(target, type, listener, useCapture) {
      var events = DocumentState.getInstance(target).events;
      var typeMap = events[type];
      if (typeMap) {
       var phaseMap = typeMap[useCapture ? _CAPTURING_PHASE : _BUBBLING_PHASE];
       if (phaseMap) {
        var listeners = phaseMap[target.base2ID];
        if (listeners) {
         delete listeners[listener.base2ID]
        }
       }
      }
     }
    },
    "@(element.addEventListener)": {
     "@Gecko": {
      addEventListener: function(target, type, listener, useCapture) {
       if (type == "mousewheel") {
        type = "DOMMouseScroll";
        var originalListener = listener;
        listener = _wrappedListeners[assignID(listener)] = function(event) {
         event = Event.cloneEvent(event);
         event.type = "mousewheel";
         event.wheelDelta = (-event.detail * 40) || 0;
         _handleEvent(target, originalListener, event)
        }
       }
       this.base(target, type, listener, useCapture)
      }
     },
     "@webkit[1-4]|KHTML[34]": {
      addEventListener: function(target, type, listener, useCapture) {
       if (_MOUSE_BUTTON.test(type)) {
        var originalListener = listener;
        listener = _wrappedListeners[assignID(listener)] = function(event) {
         var button = _TYPE_MAP[event.button] || 0;
         if (event.button != button) {
          event = Event.cloneEvent(event);
          event.button = button
         }
         _handleEvent(target, originalListener, event)
        }
       } else {
        if (typeof listener == "object") {
         listener = _wrappedListeners[assignID(listener)] = bind("handleEvent", listener)
        }
       }
       this.base(target, type, listener, useCapture)
      }
     },
     "@Linux|Mac|opera": {
      addEventListener: function(target, type, listener, useCapture) {
       if (type == "keydown") {
        var originalListener = listener;
        listener = _wrappedListeners[assignID(listener)] = function(keydownEvent) {
         var firedCount = 0,
          cancelled = false;
         extend(keydownEvent, "preventDefault", function() {
          this.base();
          cancelled = true
         });

         function handleEvent(event) {
          if (cancelled) {
           event.preventDefault()
          }
          if (event == keydownEvent || firedCount > 1) {
           _handleEvent(target, originalListener, keydownEvent)
          }
          firedCount++
         }
         handleEvent(keydownEvent);
         target.addEventListener("keyup", function() {
          target.removeEventListener("keypress", handleEvent, true);
          target.removeEventListener("keyup", arguments.callee, true)
         }, true);
         target.addEventListener("keypress", handleEvent, true)
        }
       }
       this.base(target, type, listener, useCapture)
      }
     },
     removeEventListener: function(target, type, listener, useCapture) {
      this.base(target, type, _wrappedListeners[listener.base2ID] || listener, useCapture)
     }
    }
   });
   if (detect("Gecko")) {
    EventTarget.removeEventListener._delegate = "removeEventListener";
    delete EventTarget.prototype.removeEventListener
   }

   function _handleEvent(target, listener, event) {
    if (typeof listener == "function") {
     listener.call(target, event)
    } else {
     listener.handleEvent(event)
    }
   }
   var DocumentEvent = Interface.extend({
    "@!(document.createEvent)": {
     createEvent: function(document, type) {
      var event = document.createEventObject ? document.createEventObject() : {};
      event.bubbles = false;
      event.cancelable = false;
      event.eventPhase = 0;
      event.target = document;
      event.currentTarget = null;
      event.relatedTarget = null;
      event.timeStamp = new Date().valueOf();
      return Event(event)
     }
    },
    "@(document.createEvent)": {
     "@!(document.createEvent('Events'))": {
      createEvent: function(document, type) {
       return this.base(document, type == "Events" ? "UIEvents" : type)
      }
     }
    }
   });
   var DOMContentLoadedEvent = Base.extend({
    constructor: function(document) {
     var fired = false;
     this.fire = function() {
      if (!fired) {
       fired = true;
       setTimeout(function() {
        var event = DocumentEvent.createEvent(document, "Events");
        Event.initEvent(event, "DOMContentLoaded", true, false);
        EventTarget.dispatchEvent(document, event)
       }, 1)
      }
     };
     EventTarget.addEventListener(document, "DOMContentLoaded", function() {
      fired = true
     }, false);
     this.listen(document)
    },
    listen: Undefined,
    "@!Gecko20([^0]|0[3-9])|Webkit52[5-9]|Webkit5[3-9]|Webkit[6-9]|Opera[19]|MSIE.+mac": {
     listen: function(document) {
      EventTarget.addEventListener(Traversal.getDefaultView(document), "load", this.fire, false)
     },
     "@MSIE.+win": {
      listen: function(document) {
       try {
        document.body.doScroll("left");
        if (!this.__constructing) {
         this.fire()
        }
       } catch (e) {
        setTimeout(bind(this.listen, this, document), 10)
       }
      }
     },
     "@KHTML": {
      listen: function(document) {
       if (/loaded|complete/.test(document.readyState)) {
        if (!this.__constructing) {
         this.fire()
        }
       } else {
        setTimeout(bind(this.listen, this, document), 10)
       }
      }
     }
    }
   });
   Document.implement(DocumentEvent);
   Document.implement(EventTarget);
   Element.implement(EventTarget);
   var _PIXEL = /^\d+(px)?$/i,
    _METRICS = /(width|height|top|bottom|left|right|fontSize)$/,
    _COLOR = /^(color|backgroundColor)$/,
    _RGB_BLACK = "rgb(0, 0, 0)",
    _BLACK = {
     black: 1,
     "#000": 1,
     "#000000": 1
    };
   var ViewCSS = Interface.extend({
    "@!(document.defaultView.getComputedStyle)": {
     "@MSIE": {
      getComputedStyle: function(view, element, pseudoElement) {
       var currentStyle = element.currentStyle;
       var computedStyle = {};
       for (var propertyName in currentStyle) {
        if (_METRICS.test(propertyName) || _COLOR.test(propertyName)) {
         computedStyle[propertyName] = this.getComputedPropertyValue(view, element, propertyName)
        } else {
         if (propertyName.indexOf("ruby") != 0) {
          computedStyle[propertyName] = currentStyle[propertyName]
         }
        }
       }
       return computedStyle
      }
     }
    },
    getComputedStyle: function(view, element, pseudoElement) {
     return _CSSStyleDeclaration_ReadOnly.bind(this.base(view, element, pseudoElement))
    }
   }, {
    getComputedPropertyValue: function(view, element, propertyName) {
     return CSSStyleDeclaration.getPropertyValue(this.getComputedStyle(view, element, null), propertyName)
    },
    "@MSIE": {
     getComputedPropertyValue: function(view, element, propertyName) {
      propertyName = this.toCamelCase(propertyName);
      var value = element.currentStyle[propertyName];
      if (_METRICS.test(propertyName)) {
       return _MSIE_getPixelValue(element, value) + "px"
      }
      if (!_MSIE5 && _COLOR.test(propertyName)) {
       var rgb = _MSIE_getColorValue(element, propertyName == "color" ? "ForeColor" : "BackColor");
       return (rgb == _RGB_BLACK && !_BLACK[value]) ? value : rgb
      }
      return value
     }
    },
    toCamelCase: function(string) {
     return string.replace(/\-([a-z])/g, flip(String2.toUpperCase))
    }
   });

   function _MSIE_getPixelValue(element, value) {
    if (_PIXEL.test(value)) {
     return parseInt(value)
    }
    var styleLeft = element.style.left;
    var runtimeStyleLeft = element.runtimeStyle.left;
    element.runtimeStyle.left = element.currentStyle.left;
    element.style.left = value || 0;
    value = element.style.pixelLeft;
    element.style.left = styleLeft;
    element.runtimeStyle.left = runtimeStyleLeft;
    return value
   }

   function _MSIE_getColorValue(element, type) {
    if (element.createTextRange) {
     var range = element.createTextRange()
    } else {
     range = element.document.body.createTextRange();
     range.moveToElementText(element)
    }
    try {
     var color = range.queryCommandValue("type")
    } catch (e) {
     color = 0
    }
    return format("rgb(%1, %2, %3)", color & 255, (color & 65280) >> 8, (color & 16711680) >> 16)
   }
   var _CSSStyleDeclaration_ReadOnly = Binding.extend({
    getPropertyValue: function(style, propertyName) {
     return this.base(style, _CSSPropertyNameMap[propertyName] || propertyName)
    },
    "@MSIE.+win": {
     getPropertyValue: function(style, propertyName) {
      return propertyName == "float" ? style.styleFloat : style[ViewCSS.toCamelCase(propertyName)]
     }
    }
   });
   var CSSStyleDeclaration = _CSSStyleDeclaration_ReadOnly.extend({
    setProperty: function(style, propertyName, value, priority) {
     return this.base(style, _CSSPropertyNameMap[propertyName] || propertyName, value, priority)
    },
    "@MSIE.+win": {
     setProperty: function(style, propertyName, value, priority) {
      if (propertyName == "opacity") {
       value *= 100;
       style.opacity = value;
       style.zoom = 1;
       style.filter = "Alpha(opacity=" + value + ")"
      } else {
       if (priority == "important") {
        style.cssText += format(";%1:%2!important;", propertyName, value)
       } else {
        style.setAttribute(ViewCSS.toCamelCase(propertyName), value)
       }
      }
     }
    }
   }, {
    "@MSIE": {
     bind: function(style) {
      style.getPropertyValue = this.prototype.getPropertyValue;
      style.setProperty = this.prototype.setProperty;
      return style
     }
    }
   });
   var _CSSPropertyNameMap = new Base({
    "@Gecko": {
     opacity: "-moz-opacity"
    },
    "@KHTML": {
     opacity: "-khtml-opacity"
    }
   });
   with(CSSStyleDeclaration.prototype) {
    getPropertyValue.toString = setProperty.toString = K("[base2]")
   }
   AbstractView.implement(ViewCSS);
   var NodeSelector = Interface.extend({
    "@(element.querySelector)": {
     querySelector: function(node, selector) {
      try {
       var element = this.base(node, trim(selector));
       if (element) {
        return element
       }
      } catch (x) {}
      return new Selector(selector).exec(node, 1)
     },
     querySelectorAll: function(node, selector) {
      try {
       var nodeList = this.base(node, trim(selector));
       if (nodeList) {
        return new StaticNodeList(nodeList)
       }
      } catch (x) {}
      return new Selector(selector).exec(node)
     }
    },
    "@!(element.querySelector)": {
     querySelector: function(node, selector) {
      return new Selector(selector).exec(node, 1)
     },
     querySelectorAll: function(node, selector) {
      return new Selector(selector).exec(node)
     }
    }
   });
   extend(NodeSelector.prototype, {
    querySelector: function(selector) {
     return DOM.bind(this.base(selector))
    },
    querySelectorAll: function(selector) {
     return extend(this.base(selector), "item", function(index) {
      return DOM.bind(this.base(index))
     })
    }
   });
   var DocumentSelector = NodeSelector.extend();
   var ElementSelector = NodeSelector.extend({
    "@!(element.matchesSelector)": {
     matchesSelector: function(element, selector) {
      return new Selector(selector).test(element)
     }
    }
   });
   var _CSS_ESCAPE = /'(\\.|[^'\\])*'|"(\\.|[^"\\])*"/g,
    _CSS_IMPLIED_ASTERISK = /([\s>+~,]|[^(]\+|^)([#.:\[])/g,
    _CSS_IMPLIED_SPACE = /(^|,)([^\s>+~])/g,
    _CSS_WHITESPACE = /\s*([\s>+~,]|^|$)\s*/g,
    _CSS_WILD_CARD = /\s\*\s/g,
    _CSS_UNESCAPE = /\x01(\d+)/g,
    _QUOTE = /'/g;
   var CSSParser = RegGrp.extend({
    constructor: function(items) {
     this.base(items);
     this.cache = {};
     this.sorter = new RegGrp;
     this.sorter.add(/:not\([^)]*\)/, RegGrp.IGNORE);
     this.sorter.add(/([ >](\*|[\w-]+))([^: >+~]*)(:\w+-child(\([^)]+\))?)([^: >+~]*)/, "$1$3$6$4")
    },
    cache: null,
    ignoreCase: true,
    escape: function(selector, simple) {
     var strings = this._strings = [];
     selector = this.optimise(this.format(String(selector).replace(_CSS_ESCAPE, function(string) {
      return "\x01" + strings.push(string.slice(1, -1).replace(_QUOTE, "\\'"))
     })));
     if (simple) {
      selector = selector.replace(/^ \*?/, "")
     }
     return selector
    },
    format: function(selector) {
     return selector.replace(_CSS_WHITESPACE, "$1").replace(_CSS_IMPLIED_SPACE, "$1 $2").replace(_CSS_IMPLIED_ASTERISK, "$1*$2")
    },
    optimise: function(selector) {
     return this.sorter.exec(selector.replace(_CSS_WILD_CARD, ">* "))
    },
    parse: function(selector, simple) {
     return this.cache[selector] || (this.cache[selector] = this.unescape(this.exec(this.escape(selector, simple))))
    },
    unescape: function(selector) {
     var strings = this._strings;
     return selector.replace(_CSS_UNESCAPE, function(match, index) {
      return strings[index - 1]
     })
    }
   });

   function _nthChild(match, args, position, last, not, and, mod, equals) {
    last = /last/i.test(match) ? last + "+1-" : "";
    if (!isNaN(args)) {
     args = "0n+" + args
    } else {
     if (args == "even") {
      args = "2n"
     } else {
      if (args == "odd") {
       args = "2n+1"
      }
     }
    }
    args = args.split("n");
    var a = args[0] ? (args[0] == "-") ? -1 : parseInt(args[0]) : 1;
    var b = parseInt(args[1]) || 0;
    var negate = a < 0;
    if (negate) {
     a = -a;
     if (a == 1) {
      b++
     }
    }
    var query = format(a == 0 ? "%3%7" + (last + b) : "(%4%3-%2)%6%1%70%5%4%3>=%2", a, b, position, last, and, mod, equals);
    if (negate) {
     query = not + "(" + query + ")"
    }
    return query
   }
   var XPathParser = CSSParser.extend({
    constructor: function() {
     this.base(XPathParser.build());
     this.sorter.putAt(1, "$1$4$3$6")
    },
    escape: function(selector, simple) {
     return this.base(selector, simple).replace(/,/g, "\x02")
    },
    unescape: function(selector) {
     return this.base(selector.replace(/\[self::\*\]/g, "").replace(/(^|\x02)\//g, "$1./").replace(/\x02/g, " | ")).replace(/'[^'\\]*\\'(\\.|[^'\\])*'/g, function(match) {
      return "concat(" + match.split("\\'").join("',\"'\",'") + ")"
     })
    },
    "@opera(7|8|9\\.[1-4])": {
     unescape: function(selector) {
      return this.base(selector.replace(/last\(\)/g, "count(preceding-sibling::*)+count(following-sibling::*)+1"))
     }
    }
   }, {
    build: function() {
     this.values.attributes[""] = "[@$1]";
     forEach(this.types, function(add, type) {
      forEach(this.values[type], add, this.rules)
     }, this);
     this.build = K(this.rules);
     return this.rules
    },
    optimised: {
     pseudoClasses: {
      "first-child": "[1]",
      "last-child": "[last()]",
      "only-child": "[last()=1]"
     }
    },
    rules: extend({}, {
     "@!KHTML|opera": {
      "(^|\\x02) (\\*|[\\w-]+)#([\\w-]+)": "$1id('$3')[self::$2]"
     },
     "@!KHTML": {
      "([ >])(\\*|[\\w-]+):([\\w-]+-child(\\(([^)]+)\\))?)": function(match, token, tagName, pseudoClass, $4, args) {
       var replacement = (token == " ") ? "//*" : "/*";
       if (/^nth/i.test(pseudoClass)) {
        replacement += _xpath_nthChild(pseudoClass, args, "position()")
       } else {
        replacement += XPathParser.optimised.pseudoClasses[pseudoClass]
       }
       return replacement + "[self::" + tagName + "]"
      }
     }
    }),
    types: {
     identifiers: function(replacement, token) {
      this[rescape(token) + "([\\w-]+)"] = replacement
     },
     combinators: function(replacement, combinator) {
      this[rescape(combinator) + "(\\*|[\\w-]+)"] = replacement
     },
     attributes: function(replacement, operator) {
      this["\\[\\s*([\\w-]+)\\s*" + rescape(operator) + "\\s*([^\\]\\s]*)\\s*\\]"] = replacement
     },
     pseudoClasses: function(replacement, pseudoClass) {
      this[":" + pseudoClass.replace(/\(\)$/, "\\(([^)]+)\\)")] = replacement
     }
    },
    values: {
     identifiers: {
      "#": "[@id='$1'][1]",
      ".": "[contains(concat(' ',@class,' '),' $1 ')]"
     },
     combinators: {
      " ": "/descendant::$1",
      ">": "/child::$1",
      "+": "/following-sibling::*[1][self::$1]",
      "~": "/following-sibling::$1"
     },
     attributes: {
      "*=": "[contains(@$1,'$2')]",
      "^=": "[starts-with(@$1,'$2')]",
      "$=": "[substring(@$1,string-length(@$1)-string-length('$2')+1)='$2']",
      "~=": "[contains(concat(' ',@$1,' '),' $2 ')]",
      "|=": "[contains(concat('-',@$1,'-'),'-$2-')]",
      "!=": "[not(@$1='$2')]",
      "=": "[@$1='$2']"
     },
     pseudoClasses: {
      "link": "[false]",
      "visited": "[false]",
      "empty": "[not(child::*) and not(text())]",
      "first-child": "[not(preceding-sibling::*)]",
      "last-child": "[not(following-sibling::*)]",
      "not()": _xpath_not,
      "nth-child()": _xpath_nthChild,
      "nth-last-child()": _xpath_nthChild,
      "only-child": "[not(preceding-sibling::*) and not(following-sibling::*)]",
      "root": "[not(parent::*)]"
     }
    },
    "@opera(7|8|9\\.[1-4])": {
     build: function() {
      this.optimised.pseudoClasses["last-child"] = this.values.pseudoClasses["last-child"];
      this.optimised.pseudoClasses["only-child"] = this.values.pseudoClasses["only-child"];
      return this.base()
     }
    }
   });
   var _notParser;

   function _xpath_not(match, args) {
    if (!_notParser) {
     _notParser = new XPathParser
    }
    return "[not(" + _notParser.exec(trim(args)).replace(/\[1\]/g, "").replace(/^(\*|[\w-]+)/, "[self::$1]").replace(/\]\[/g, " and ").slice(1, -1) + ")]"
   }

   function _xpath_nthChild(match, args, position) {
    return "[" + _nthChild(match, args, position || "count(preceding-sibling::*)+1", "last()", "not", " and ", " mod ", "=") + "]"
   }
   var Selector = Base.extend({
    constructor: function(selector) {
     this.toString = K(trim(selector))
    },
    exec: function(context, count, simple) {
     return Selector.parse(this, simple)(context, count)
    },
    isSimple: function() {
     if (!_parser.exec) {
      _parser = new CSSParser(_parser)
     }
     return !_COMBINATOR.test(trim(_parser.escape(this)))
    },
    test: function(element) {
     if (this.isSimple()) {
      return !!Selector.parse(this, true)(element, 1)
     } else {
      element.setAttribute("b2-test", true);
      var result = new Selector(this + "[b2-test]").exec(Traversal.getOwnerDocument(element), 1);
      element.removeAttribute("b2-test");
      return result == element
     }
    },
    toXPath: function(simple) {
     return Selector.toXPath(this, simple)
    },
    "@(XPathResult)": {
     exec: function(context, count, simple) {
      if (_NOT_XPATH.test(this)) {
       return this.base(context, count, simple)
      }
      var document = Traversal.getDocument(context);
      var type = count == 1 ? 9 : 7;
      var result = document.evaluate(this.toXPath(simple), context, null, type, null);
      return count == 1 ? result.singleNodeValue : result
     }
    },
    "@MSIE": {
     exec: function(context, count, simple) {
      if (typeof context.selectNodes != "undefined" && !_NOT_XPATH.test(this)) {
       var method = single ? "selectSingleNode" : "selectNodes";
       return context[method](this.toXPath(simple))
      }
      return this.base(context, count, simple)
     }
    },
    "@(true)": {
     exec: function(context, count, simple) {
      try {
       var result = this.base(context || document, count, simple)
      } catch (error) {
       throw new SyntaxError(format("'%1' is not a valid CSS selector.", this))
      }
      return count == 1 ? result : new StaticNodeList(result)
     }
    }
   }, {
    toXPath: function(selector, simple) {
     if (!_xpathParser) {
      _xpathParser = new XPathParser
     }
     return _xpathParser.parse(selector, simple)
    }
   });
   var _COMBINATOR = /[^,]\s|[+>~]/;
   var _NOT_XPATH = ":(checked|disabled|enabled|contains|hover|active|focus)|^(#[\\w-]+\\s*)?\\w+$";
   if (detect("KHTML")) {
    if (detect("WebKit5")) {
     _NOT_XPATH += "|nth\\-|,"
    } else {
     _NOT_XPATH = "."
    }
   }
   _NOT_XPATH = new RegExp(_NOT_XPATH);
   Selector.operators = {
    "=": "%1=='%2'",
    "~=": /(^| )%1( |$)/,
    "|=": /^%1(-|$)/,
    "^=": /^%1/,
    "$=": /%1$/,
    "*=": /%1/
   };
   Selector.operators[""] = "%1!=null";
   Selector.pseudoClasses = {
    "checked": "e%1.checked",
    "contains": "e%1[TEXT].indexOf('%2')!=-1",
    "disabled": "e%1.disabled",
    "empty": "Traversal.isEmpty(e%1)",
    "enabled": "e%1.disabled===false",
    "first-child": "!Traversal.getPreviousElementSibling(e%1)",
    "last-child": "!Traversal.getNextElementSibling(e%1)",
    "only-child": "!Traversal.getPreviousElementSibling(e%1)&&!Traversal.getNextElementSibling(e%1)",
    "root": "e%1==Traversal.getDocument(e%1).documentElement",
    "target": "e%1.id&&e%1.id==location.hash.slice(1)",
    "hover": "DocumentState.getInstance(d).isHover(e%1)",
    "active": "DocumentState.getInstance(d).isActive(e%1)",
    "focus": "DocumentState.getInstance(d).hasFocus(e%1)",
    "link": "false",
    "visited": "false"
   };
   var _INDEXED = document.documentElement.sourceIndex !== undefined,
    _VAR = "var p%2=0,i%2,e%3,n%2=e%1.",
    _ID = _INDEXED ? "e%1.sourceIndex" : "assignID(e%1)",
    _TEST = "var g=" + _ID + ";if(!p[g]){p[g]=1;",
    _STORE = "r[k++]=e%1;if(s==1)return e%1;if(k===s){_query.state=[%2];_query.complete=%3;return r;",
    _FN = "var _query=function(e0,s%1){_indexed++;var r=[],p={},p0=0,reg=[%4],d=Traversal.getDocument(e0),c=d.writeln?'toUpperCase':'toString',k=0;";
   var _xpathParser;
   var _reg, _index, _wild, _list, _group, _listAll, _duplicate, _cache = {},
    _simple = {};

   function sum(list) {
    var total = 0;
    for (var i = 0; i < list.length; i++) {
     total += list[i]
    }
    return total
   }
   var _parser = {
    "^(\\*|[\\w-]+)": function(match, tagName) {
     return tagName == "*" ? "" : format("if(e0.nodeName=='%1'[c]()){", tagName)
    },
    "^ \\*:root": function(match) {
     _wild = false;
     var replacement = "e%2=d.documentElement;if(Traversal.contains(e%1,e%2)){";
     return format(replacement, _index++, _index)
    },
    " (\\*|[\\w-]+)#([\\w-]+)": function(match, tagName, id) {
     _wild = false;
     var replacement = "var e%2=_byId(d,'%4');if(e%2&&";
     if (tagName != "*") {
      replacement += "e%2.nodeName=='%3'[c]()&&"
     }
     replacement += "Traversal.contains(e%1,e%2)){";
     if (_list[_group]) {
      replacement += format("i%1=n%1.length;", sum(_list))
     }
     return format(replacement, _index++, _index, tagName, id)
    },
    " (\\*|[\\w-]+)": function(match, tagName) {
     _duplicate++;
     _wild = tagName == "*";
     var replacement = format(_VAR, _index++, "%2", _index);
     replacement += (_wild && _MSIE5) ? "all" : "getElementsByTagName('%3')";
     replacement += ";for(i%2=a%2||0;(e%1=n%2[i%2]);i%2++){";
     _list[_group]++;
     return format(replacement, _index, sum(_list), tagName)
    },
    ">(\\*|[\\w-]+)": function(match, tagName) {
     var children = _MSIE && _index;
     _wild = tagName == "*";
     var replacement = _VAR + (children ? "children" : "childNodes");
     replacement = format(replacement, _index++, "%2", _index);
     if (!_wild && _MSIE && children) {
      replacement += ".tags('%3')"
     }
     replacement += ";for(i%2=a%2||0;(e%1=n%2[i%2]);i%2++){";
     if (_wild) {
      replacement += "if(e%1.nodeType==1){";
      _wild = _MSIE5
     } else {
      if (!_MSIE || !children) {
       replacement += "if(e%1.nodeName=='%3'[c]()){"
      }
     }
     _list[_group]++;
     return format(replacement, _index, sum(_list), tagName)
    },
    "\\+(\\*|[\\w-]+)": function(match, tagName) {
     var replacement = "";
     if (_wild && _MSIE) {
      replacement += "if(e%1.nodeName!='!'){"
     }
     _wild = false;
     replacement += "e%1=Traversal.getNextElementSibling(e%1);if(e%1";
     if (tagName != "*") {
      replacement += "&&e%1.nodeName=='%2'[c]()"
     }
     replacement += "){";
     return format(replacement, _index, tagName)
    },
    "~(\\*|[\\w-]+)": function(match, tagName) {
     var replacement = "";
     if (_wild && _MSIE) {
      replacement += "if(e%1.nodeName!='!'){"
     }
     _wild = false;
     _duplicate = 2;
     replacement += "while(e%1=e%1.nextSibling){if(e%1.b2_adjacent==_indexed)break;if(";
     if (tagName == "*") {
      replacement += "e%1.nodeType==1";
      if (_MSIE5) {
       replacement += "&&e%1.nodeName!='!'"
      }
     } else {
      replacement += "e%1.nodeName=='%2'[c]()"
     }
     replacement += "){e%1.b2_adjacent=_indexed;";
     return format(replacement, _index, tagName)
    },
    "#([\\w-]+)": function(match, id) {
     _wild = false;
     var replacement = "if(e%1.id=='%2'){";
     if (_list[_group]) {
      replacement += format("i%1=n%1.length;", sum(_list))
     }
     return format(replacement, _index, id)
    },
    "\\.([\\w-]+)": function(match, className) {
     _wild = false;
     _reg.push(new RegExp("(^|\\s)" + rescape(className) + "(\\s|$)"));
     return format("if(e%1.className&&reg[%2].test(e%1.className)){", _index, _reg.length - 1)
    },
    ":not\\((\\*|[\\w-]+)?([^)]*)\\)": function(match, tagName, filters) {
     var replacement = (tagName && tagName != "*") ? format("if(e%1.nodeName=='%2'[c]()){", _index, tagName) : "";
     replacement += _parser.exec(filters);
     return "if(!" + replacement.slice(2, -1).replace(/\)\{if\(/g, "&&") + "){"
    },
    ":nth(-last)?-child\\(([^)]+)\\)": function(match, last, args) {
     _wild = false;
     last = format("e%1.parentNode.b2_length", _index);
     var replacement = "if(p%1!==e%1.parentNode)p%1=_register(e%1.parentNode);";
     replacement += "var i=e%1[p%1.b2_lookup];if(p%1.b2_lookup!='b2_index')i++;if(";
     return format(replacement, _index) + _nthChild(match, args, "i", last, "!", "&&", "% ", "==") + "){"
    },
    ":([\\w-]+)(\\(([^)]+)\\))?": function(match, pseudoClass, $2, args) {
     return "if(" + format(Selector.pseudoClasses[pseudoClass] || "throw", _index, args || "") + "){"
    },
    "\\[\\s*([\\w-]+)\\s*([^=]?=)?\\s*([^\\]\\s]*)\\s*\\]": function(match, attr, operator, value) {
     value = trim(value);
     if (_MSIE) {
      var getAttribute = "Element.getAttribute(e%1,'%2')"
     } else {
      getAttribute = "e%1.getAttribute('%2')"
     }
     getAttribute = format(getAttribute, _index, attr);
     var replacement = Selector.operators[operator || ""];
     if (instanceOf(replacement, RegExp)) {
      _reg.push(new RegExp(format(replacement.source, rescape(_parser.unescape(value)))));
      replacement = "reg[%2].test(%1)";
      value = _reg.length - 1
     }
     return "if(" + format(replacement, getAttribute, value) + "){"
    }
   };
   (function(_no_shrink_) {
    var _byId = detect("MSIE[5-7]") ? function(document, id) {
     var result = document.all[id] || null;
     if (!result || result.id == id) {
      return result
     }
     for (var i = 0; i < result.length; i++) {
      if (result[i].id == id) {
       return result[i]
      }
     }
     return null
    } : function(document, id) {
     return document.getElementById(id)
    };
    var _indexed = 1;

    function _register(element) {
     if (element.rows) {
      element.b2_length = element.rows.length;
      element.b2_lookup = "rowIndex"
     } else {
      if (element.cells) {
       element.b2_length = element.cells.length;
       element.b2_lookup = "cellIndex"
      } else {
       if (element.b2_indexed != _indexed) {
        var index = 0;
        var child = element.firstChild;
        while (child) {
         if (child.nodeType == 1 && child.nodeName != "!") {
          child.b2_index = ++index
         }
         child = child.nextSibling
        }
        element.b2_length = index;
        element.b2_lookup = "b2_index"
       }
      }
     }
     element.b2_indexed = _indexed;
     return element
    }
    Selector.parse = function(selector, simple) {
     var cache = simple ? _simple : _cache;
     if (!cache[selector]) {
      if (!_parser.exec) {
       _parser = new CSSParser(_parser)
      }
      _reg = [];
      _list = [];
      var fn = "";
      var selectors = _parser.escape(selector, simple).split(",");
      for (_group = 0; _group < selectors.length; _group++) {
       _wild = _index = _list[_group] = 0;
       _duplicate = selectors.length > 1 ? 2 : 0;
       var block = _parser.exec(selectors[_group]) || "throw;";
       if (_wild && _MSIE) {
        block += format("if(e%1.tagName!='!'){", _index)
       }
       var store = (_duplicate > 1) ? _TEST : "";
       block += format(store + _STORE, _index, "%2");
       block += Array(match(block, /\{/g).length + 1).join("}");
       fn += block
      }
      fn = _parser.unescape(fn);
      if (selectors.length > 1) {
       fn += "r.unsorted=1;"
      }
      var args = "";
      var state = [];
      var total = sum(_list);
      for (var i = 1; i <= total; i++) {
       args += ",a" + i;
       state.push("i" + i + "?(i" + i + "-1):0")
      }
      if (total) {
       var complete = [],
        k = 0;
       for (var i = 0; i < _group; i++) {
        k += _list[i];
        if (_list[i]) {
         complete.push(format("n%1&&i%1==n%1.length", k))
        }
       }
      }
      fn += "_query.state=[%2];_query.complete=%3;return s==1?null:r}";
      eval(format(_FN + fn, args, state.join(","), total ? complete.join("&&") : true, _reg));
      cache[selector] = _query
     }
     return cache[selector]
    }
   })();
   var StaticNodeList = Base.extend({
    constructor: function(nodes) {
     nodes = nodes || [];
     this.length = nodes.length;
     this.item = function(index) {
      if (index < 0) {
       index += this.length
      }
      return nodes[index]
     };
     if (nodes.unsorted) {
      nodes.sort(_SORTER)
     }
    },
    length: 0,
    forEach: function(block, context) {
     for (var i = 0; i < this.length; i++) {
      block.call(context, this.item(i), i, this)
     }
    },
    item: Undefined,
    not: function(test, context) {
     return this.filter(not(test), context)
    },
    slice: function(start, end) {
     return new StaticNodeList(this.map(I).slice(start, end))
    },
    "@(XPathResult)": {
     constructor: function(nodes) {
      if (nodes && nodes.snapshotItem) {
       this.length = nodes.snapshotLength;
       this.item = function(index) {
        if (index < 0) {
         index += this.length
        }
        return nodes.snapshotItem(index)
       }
      } else {
       this.base(nodes)
      }
     }
    }
   });
   StaticNodeList.implement(Enumerable);
   var _matchesSelector = function(test, context) {
    if (typeof test != "function") {
     test = bind("test", new Selector(test))
    }
    return this.base(test, context)
   };
   StaticNodeList.implement({
    every: _matchesSelector,
    filter: _matchesSelector,
    not: _matchesSelector,
    some: _matchesSelector
   });
   StaticNodeList.implement({
    filter: function(test, context) {
     return new StaticNodeList(this.base(test, context))
    }
   });
   var _SORTER = _INDEXED ? function(node1, node2) {
    return node1.sourceIndex - node2.sourceIndex
   } : function(node1, node2) {
    return (Node.compareDocumentPosition(node1, node2) & 2) - 1
   };
   Document.implement(DocumentSelector);
   Element.implement(ElementSelector);
   var HTMLDocument = Document.extend(null, {
    bind: function(document) {
     DocumentState.createState(document);
     return this.base(document)
    }
   });
   var HTMLElement = Element.extend(null, {
    bindings: {},
    tags: "*",
    bind: function(element) {
     if (!element.classList) {
      element.classList = new _ElementClassList(element)
     }
     if (!element.ownerDocument) {
      element.ownerDocument = Traversal.getOwnerDocument(element)
     }
     return this.base(element)
    },
    extend: function() {
     var binding = base(this, arguments);
     forEach.csv(binding.tags, function(tagName) {
      HTMLElement.bindings[tagName] = binding
     });
     return binding
    }
   });
   HTMLElement.extend(null, {
    tags: "APPLET,EMBED",
    bind: I
   });
   var ClassList = Module.extend({
    add: function(element, token) {
     if (!this.has(element, token)) {
      element.className += (element.className ? " " : "") + token
     }
    },
    has: function(element, token) {
     var regexp = new RegExp("(^|\\s)" + token + "(\\s|$)");
     return regexp.test(element.className)
    },
    remove: function(element, token) {
     var regexp = new RegExp("(^|\\s)" + token + "(\\s|$)", "g");
     element.className = trim(element.className.replace(regexp, "$2"))
    },
    toggle: function(element, token) {
     this[this.has(element, token) ? "remove" : "add"](element, token)
    }
   });

   function _ElementClassList(element) {
    this.add = function(token) {
     ClassList.add(element, token)
    };
    this.has = function(token) {
     return ClassList.has(element, token)
    };
    this.remove = function(token) {
     ClassList.remove(element, token)
    }
   }
   _ElementClassList.prototype.toggle = function(token) {
    this[this.has(token) ? "remove" : "add"](token)
   };
   var DocumentState = Base.extend({
    constructor: function(document) {
     this.document = document;
     this.events = {};
     this._hoverElement = document.documentElement;
     this.isBound = function() {
      return !!DOM.bind[document.base2ID]
     };
     forEach(this, function(method, name, documentState) {
      if (/^on((DOM)?\w+|[a-z]+)$/.test(name)) {
       documentState.registerEvent(name.slice(2))
      }
     })
    },
    includes: function(element, target) {
     return target && (element == target || Traversal.contains(element, target))
    },
    hasFocus: function(element) {
     return element == this._focusElement
    },
    isActive: function(element) {
     return this.includes(element, this._activeElement)
    },
    isHover: function(element) {
     return this.includes(element, this._hoverElement)
    },
    handleEvent: function(event) {
     return this["on" + event.type](event)
    },
    onblur: function(event) {
     delete this._focusElement
    },
    onmouseover: function(event) {
     this._hoverElement = event.target
    },
    onmouseout: function(event) {
     delete this._hoverElement
    },
    onmousedown: function(event) {
     this._activeElement = event.target
    },
    onfocus: function(event) {
     this._focusElement = event.target
    },
    onmouseup: function(event) {
     delete this._activeElement
    },
    registerEvent: function(type) {
     this.document.addEventListener(type, this, true);
     this.events[type] = true
    },
    "@(document.activeElement===undefined)": {
     constructor: function(document) {
      this.base(document);
      if (this.isBound()) {
       document.activeElement = document.body
      }
     },
     onfocus: function(event) {
      this.base(event);
      if (this.isBound()) {
       this.document.activeElement = this._focusElement
      }
     },
     onblur: function(event) {
      this.base(event);
      if (this.isBound()) {
       this.document.activeElement = this.document.body
      }
     }
    },
    "@!(element.addEventListener)": {
     constructor: function(document) {
      this.base(document);
      var dispatcher = new EventDispatcher(this);
      this._dispatch = function(event) {
       event.target = event.target || event.srcElement || document;
       dispatcher.handleEvent(event)
      };
      this.handleEvent = function(event) {
       if (this["on" + event.type]) {
        this["on" + event.type](event)
       }
       return dispatcher.handleEvent(event)
      }
     },
     registerEvent: function(type, target) {
      var events = this.events[type];
      var canDelegate = _CAN_DELEGATE.test(type);
      if (!events || !canDelegate) {
       if (!events) {
        events = this.events[type] = {}
       }
       if (canDelegate || !target) {
        target = this.document
       }
       var state = this;
       target["on" + type] = function(event) {
        if (!event) {
         event = Traversal.getDefaultView(this).event
        }
        if (event) {
         state.handleEvent(event)
        }
       }
      }
      return events
     },
     "@MSIE.+win": {
      constructor: function(document) {
       this.base(document);
       var forms = {};
       this._registerForm = function(form) {
        var formID = assignID(form);
        if (!forms[formID]) {
         forms[formID] = true;
         form.attachEvent("onsubmit", this._dispatch);
         form.attachEvent("onreset", this._dispatch)
        }
       }
      },
      fireEvent: function(type, event) {
       event = copy(event);
       event.type = type;
       this.handleEvent(event)
      },
      registerEvent: function(type, target) {
       var events = this.events[type];
       var canDelegate = _CAN_DELEGATE.test(type);
       if (!events || !canDelegate) {
        if (!events) {
         events = this.events[type] = {}
        }
        if (canDelegate || !target) {
         target = this.document
        }
        var state = this;
        target.attachEvent("on" + type, function(event) {
         event.target = event.srcElement || state.document;
         state.handleEvent(event);
         if (state["after" + type]) {
          state["after" + type](event)
         }
        })
       }
       return events
      },
      onDOMContentLoaded: function(event) {
       forEach(event.target.forms, this._registerForm, this);
       try {
        this.setFocus(this.document.activeElement)
       } catch (x) {}
      },
      onmousedown: function(event) {
       this.base(event);
       this._button = event.button
      },
      onmouseup: function(event) {
       this.base(event);
       if (this._button == null) {
        this.fireEvent("mousedown", event)
       }
       delete this._button
      },
      aftermouseup: function() {
       if (this._selectEvent) {
        this._dispatch(this._selectEvent);
        delete this._selectEvent
       }
      },
      onfocusin: function(event) {
       this.setFocus(event.target);
       this.onfocus(event)
      },
      setFocus: function(target) {
       var change = this.events.change,
        select = this.events.select;
       if (change || select) {
        var dispatch = this._dispatch;
        if (change) {
         target.attachEvent("onchange", dispatch)
        }
        if (select) {
         var state = this;
         var onselect = function(event) {
          if (state._activeElement == target) {
           state._selectEvent = copy(event)
          } else {
           dispatch(event)
          }
         };
         target.attachEvent("onselect", onselect)
        }
        target.attachEvent("onblur", function() {
         target.detachEvent("onblur", arguments.callee);
         if (change) {
          target.detachEvent("onchange", dispatch)
         }
         if (select) {
          target.detachEvent("onselect", onselect)
         }
        })
       }
      },
      onfocusout: function(event) {
       this.onblur(event)
      },
      onclick: function(event) {
       var target = event.target;
       if (target.form) {
        this._registerForm(target.form)
       }
      },
      ondblclick: function(event) {
       this.fireEvent("click", event)
      }
     }
    }
   }, {
    init: function() {
     assignID(document);
     DocumentState = this;
     this.createState(document);
     new DOMContentLoadedEvent(document)
    },
    createState: function(document) {
     var base2ID = document.base2ID;
     if (!this[base2ID]) {
      this[base2ID] = new this(document)
     }
     return this[base2ID]
    },
    getInstance: function(target) {
     return this[Traversal.getDocument(target).base2ID]
    }
   });
   eval(this.exports)
  };
  try {
   if (NodeList && !(NodeList.prototype.forEach)) {
    NodeList.prototype.forEach = function(B, A) {
     for (var C = 0; C < this.length; C++) {
      B.call(A, this.item(C), C, this)
     }
    }
   }
  } catch (e) {}
  try {
   if (typeof StaticNodeList != "undefined" && !(StaticNodeList.prototype.forEach)) {
    StaticNodeList.prototype.forEach = function(B, A) {
     for (var C = 0; C < this.length; C++) {
      B.call(A, this.item(C), C, this)
     }
    }
   }
  } catch (e) {}
  try {
   (function(A) {
    if (!("window" in A && "document" in A)) {
     return
    }
    if ("TextRectangle" in this && !("width" in TextRectangle.prototype)) {
     Object.defineProperties(TextRectangle.prototype, {
      "width": {
       get: function() {
        return this.right - this.left
       }
      },
      "height": {
       get: function() {
        return this.bottom - this.top
       }
      }
     })
    }
   }(this))
  } catch (e) {}
  if (typeof(base2) == "undefined") {
   throw new Error("Base2 not found. wForms 3 depends on the base2 library.")
  }
  base2.DOM.HTMLElement.implement({
   hasClass: function(A, B) {
    if (A.classList && A.classList.contains) {
     return A.classList.contains(B)
    } else {
     return A.className.match(new RegExp("(\\s|^)" + B + "(\\s|$)"))
    }
   },
   removeClass: function(A, B) {
    if (base2.DOM.HTMLElement.hasClass(A, B)) {
     var C = new RegExp("(\\s|^)" + B + "(\\s|$)");
     A.className = A.className.replace(C, " ").replace(/^\s+|\s+$/g, "")
    }
   },
   addClass: function(A, B) {
    if (!base2.DOM.HTMLElement.hasClass(A, B)) {
     A.className = (A.className + " " + B).replace(/^\s+|\s+$/g, "")
    }
   }
  });
  if (typeof(wFORMS) == "undefined") {
   wFORMS = {}
  }
  wFORMS.NAME = "wFORMS";
  wFORMS.VERSION = "3.10.0";
  wFORMS.__repr__ = function() {
   return "[" + this.NAME + " " + this.VERSION + "]"
  };
  wFORMS.toString = function() {
   return this.__repr__()
  };
  wFORMS.behaviors = {};
  wFORMS.helpers = {};
  wFORMS.instances = [];
  wFORMS.initialized = false;
  wFORMS.helpers.randomId = function() {
   var A = (new Date()).getTime();
   A = A.toString().substr(6);
   for (var B = 0; B < 6; B++) {
    A += String.fromCharCode(48 + Math.floor((Math.random() * 10)))
   }
   return "id_" + A
  };
  wFORMS.helpers.getFieldValue = function(C) {
   switch (C.tagName) {
    case "INPUT":
     if (C.type == "checkbox") {
      return C.checked ? C.value : null
     }
     if (C.type == "radio") {
      return C.checked ? C.value : null
     }
     return C.value;
     break;
    case "SELECT":
     if (C.selectedIndex == -1) {
      return null
     }
     if (C.getAttribute("multiple")) {
      var A = [];
      for (var B = 0; B < C.options.length; B++) {
       if (C.options[B].selected) {
        A.push(C.options[B].value)
       }
      }
      return A
     }
     return C.options[C.selectedIndex].value;
     break;
    case "TEXTAREA":
     return C.value;
     break;
    default:
     return null;
     break
   }
  }, wFORMS.helpers.escapeQuerySelector = function(A) {
   if (!A || A === "") {
    return null
   }
   return A.replace(/\[(\d+)\]/g, function(C, B) {
    return "\\[" + B + "\\]"
   })
  }, wFORMS.helpers.getLabel = function(C) {
   if (!C || !C.form) {
    return null
   }
   if (!C.form.querySelectorAll) {
    return null
   }
   var B = C.getAttribute("id");
   var A = this.escapeQuerySelector(B);
   l = C.form.querySelectorAll("label[for=" + A + "]");
   if (l && l.length >= 1) {
    return l.item(0).innerHTML
   }
   return null
  }, wFORMS.helpers.detectLocaleDecimalSeparator = function() {
   var A = 1.1;
   A = A.toLocaleString().substring(1, 2);
   return A
  };
  wFORMS.helpers.normalizeNumberToUSLocale = function(B) {
   var A = wFORMS.helpers.detectLocaleDecimalSeparator();
   if (A == ",") {
    B = String(B).replace(",", ".")
   } else {
    B = String(B).replace(",", "")
   }
   return B
  };
  wFORMS.helpers.isNumericValue = function(A) {
   A = wFORMS.helpers.normalizeNumberToUSLocale(A);
   if (String(A) !== "" && String(A).match(/^\s*(\+|-)?[0-9]*[\.]?[0-9]*\s*$/)) {
    return true
   }
   return false
  };
  wFORMS.helpers.isEmptyValue = function(A) {
   A = String(A);
   A = A.replace(/^\s+|\s+$/g, "");
   return (A === "")
  };
  wFORMS.helpers.getNumericValue = function(B) {
   var A = wFORMS.helpers;
   if (A.isNumericValue(B)) {
    B = A.normalizeNumberToUSLocale(B)
   }
   var C = parseFloat(B);
   if (isNaN(C)) {
    C = 0
   }
   return C
  };
  wFORMS.helpers.getComputedStyle = function(B, A) {
   return document.defaultView.getComputedStyle(B, "").getPropertyValue(A)
  };
  wFORMS.helpers.getForm = function(A) {
   if (A && A.tagName && A.tagName.toLowerCase() == "form") {
    wFORMS.standardizeElement(A);
    return A
   }
   if (A.form) {
    wFORMS.standardizeElement(A.form);
    return A.form
   } else {
    if (A.parentNode) {
     if (A.parentNode.tagName.toLowerCase() == "form") {
      wFORMS.standardizeElement(A.parentNode);
      return A.parentNode
     } else {
      return this.getForm(A.parentNode)
     }
    } else {
     return null
    }
   }
  };
  wFORMS.helpers.getLeft = function(B) {
   var C = 0;
   while (B.offsetParent) {
    try {
     if (document.defaultView.getComputedStyle(B, "").getPropertyValue("position") == "relative") {
      return C
     }
     if (C > 0 && document.defaultView.getComputedStyle(B, "").getPropertyValue("position") == "absolute") {
      return C
     }
    } catch (A) {}
    C += B.offsetLeft;
    B = B.offsetParent
   }
   if (!window.opera && document.all && document.compatMode && document.compatMode != "BackCompat") {
    C += parseInt(document.body.currentStyle.marginTop)
   }
   return C
  };
  wFORMS.helpers.getTop = function(B) {
   var C = 0;
   while (B.offsetParent) {
    try {
     if (document.defaultView.getComputedStyle(B, "").getPropertyValue("position") == "relative") {
      return C
     }
     if (C > 0 && document.defaultView.getComputedStyle(B, "").getPropertyValue("position") == "absolute") {
      return C
     }
    } catch (A) {}
    C += B.offsetTop;
    B = B.offsetParent
   }
   if (!window.opera && document.all && document.compatMode && document.compatMode != "BackCompat") {
    C += parseInt(document.body.currentStyle.marginLeft) + 1
   }
   return C
  };
  wFORMS.helpers.position = function(B) {
   var A = B.offsetLeft;
   var D = B.offsetTop;
   if (B.offsetParent) {
    var C = this.position(B.offsetParent);
    A += C.left;
    D += C.top
   }
   return {
    left: A,
    top: D
   }
  };
  wFORMS.helpers.useSpotlight = false;
  wFORMS.helpers.spotlight = function(A) {};
  wFORMS.helpers.activateStylesheet = function(C) {
   if (document.getElementsByTagName) {
    var B = document.getElementsByTagName("link")
   } else {
    if (document.styleSheets) {
     var B = document.styleSheets
    }
   }
   for (var A = 0; B[A]; A++) {
    if (B[A].href.indexOf(C) != -1) {
     B[A].rel = "stylesheet";
     B[A].title = "";
     B[A].disabled = true;
     B[A].disabled = false
    }
   }
  };
  wFORMS.helpers.contains = function(D, C) {
   var A = D.length;
   for (var B = 0; B < A; B++) {
    if (D[B] === C) {
     return true
    }
   }
   return false
  };
  wFORMS.helpers.isHTMLElement = function(A) {
   return (typeof HTMLElement === "object" ? A instanceof HTMLElement : A && typeof A === "object" && A.nodeType === 1 && typeof A.nodeName === "string")
  };
  wFORMS.helpers.deleteResumedFiles = function(B) {
   var A = document.getElementById("tfa_uploadDelete_" + B);
   var C = document.getElementById("tfa_uploadedFile_" + B);
   A.checked = !A.checked;
   C.className = A.checked ? "uploadedFile uploadDelete" : "uploadedFile uploadKeep";
   return false
  };
  wFORMS.helpers.deleteResumedFilesFinder = function(A) {
   if (!A) {
    A = document
   }
   return base2.DOM.HTMLElement.querySelectorAll(A, ".deleteUploadedFileCb")
  };
  wFORMS.LOADER = {};
  wFORMS.LOADER.enabled = false;
  wFORMS.LOADER.message = "Please wait...";
  wFORMS.LOADER.spinner = "";
  wFORMS.LOADER.speed = 2;
  wFORMS.LOADER.show = function(placeholder) {
   if (wFORMS.LOADER.enabled) {
    var p = wFORMS.LOADER.create();
    p.style.visibility = "hidden";
    p.style.overflow = "hidden";
    /*@cc_on
    		@if(@_jscript_version <= 5.7)
    			p.style.width = "100%"; // triggers hasLayout in IE6
    		@end
    		@*/
    var where = (arguments[1] == "above") ? placeholder : placeholder.nextSibling;
    p = placeholder.parentNode.insertBefore(p, where);
    p.id = "wfLoader_" + placeholder.id;
    wFORMS.LOADER._id = p.id;
    var h = p.clientHeight;
    p.style.height = h + "px";
    wFORMS.LOADER._padding = p.clientHeight - h;
    p.style.height = (h - wFORMS.LOADER._padding) + "px";
    p.style.visibility = "visible"
   }
  };
  wFORMS.LOADER.hide = function(B) {
   if (wFORMS.LOADER.enabled && wFORMS.LOADER._id) {
    var A = document.getElementById(wFORMS.LOADER._id);
    if (A) {
     if (arguments[1]) {
      A.parentNode.removeChild(A)
     } else {
      wFORMS.LOADER._interval = setInterval(function() {
       var C = A.clientHeight - wFORMS.LOADER.speed - wFORMS.LOADER._padding;
       if (C < 0) {
        C = 0
       }
       A.style.height = C + "px";
       if (A && !(A.clientHeight - wFORMS.LOADER._padding)) {
        A.parentNode.removeChild(A);
        clearInterval(wFORMS.LOADER._interval)
       }
      }, 10)
     }
    }
    wFORMS.LOADER._id = null
   }
  };
  wFORMS.LOADER.create = function() {
   var C = document.createElement("DIV");
   C.className = "wfLoader";
   var B = C.appendChild(document.createElement("DIV"));
   B.className = "inner";
   if (wFORMS.LOADER.spinner) {
    var A = B.appendChild(document.createElement("IMG"));
    A.src = wFORMS.LOADER.spinner
   }
   if (wFORMS.LOADER.message) {
    B.appendChild(document.createTextNode(wFORMS.LOADER.message))
   }
   return C
  };
  wFORMS.onLoadHandler = function() {
   var B = document.getElementsByTagName("FORM");
   var A = [];
   for (var D = 0; D < B.length; D++) {
    (function(F) {
     if (F.getAttribute("rel") != "no-behavior") {
      A.push(function() {
       E(F)
      })
     }
    })(B[D])
   }

   function C() {
    if (A.length == 0) {
     return
    }
    A.shift()()
   }

   function E(F) {
    wFORMS.LOADER.show(F, "above");
    setTimeout(function() {
     wFORMS.applyBehaviors(F);
     wFORMS.LOADER.hide(F);
     C()
    }, 1)
   }(function() {
    if (typeof window.CustomEvent === "function") {
     return false
    }

    function F(H, J) {
     J = J || {
      bubbles: false,
      cancelable: false,
      detail: undefined
     };
     var G = document.createEvent("CustomEvent");
     G.initCustomEvent(H, J.bubbles, J.cancelable, J.detail);
     return G
    }
    F.prototype = window.Event.prototype;
    window.CustomEvent = F
   })();
   A.push(function() {
    wFORMS.initialized = true;
    var F = new CustomEvent("wFORMSLoaded");
    document.dispatchEvent(F)
   });
   C()
  };
  wFORMS.standardizeElement = function(A) {
   if (A.tagName == "HTML") {
    return
   }
   if (!A.addEventListener) {
    A.addEventListener = function(C, B, D) {
     base2.DOM.Element.addEventListener(this, C, B, D)
    }
   }
   if (!A.hasClass) {
    A.hasClass = function(B) {
     if ((" " + this.className + " ").indexOf(" " + B + " ") != -1) {
      return true
     }
     return false
    }
   }
   if (!A.removeClass) {
    A.removeClass = function(B) {
     return base2.DOM.HTMLElement.removeClass(this, B)
    }
   }
   if (!A.addClass) {
    A.addClass = function(B) {
     return base2.DOM.HTMLElement.addClass(this, B)
    }
   }
  };
  wFORMS.applyBehaviors = function(f) {
   var doBind = /*@cc_on @if(@_jscript_version >= 5.8)!@end @*/ true;
   if (doBind) {
    base2.DOM.bind(f)
   }
   if (wFORMS.behaviors["switch"]) {
    var b = wFORMS.behaviors["switch"].applyTo(f);
    if (!wFORMS.instances["switch"]) {
     wFORMS.instances["switch"] = [b]
    } else {
     wFORMS.removeBehavior(f, "switch");
     wFORMS.instances["switch"].push(b)
    }
   }
   var orderedBehaviorNames = [];
   for (var behaviorNameCounter in wFORMS.behaviors) {
    orderedBehaviorNames.push(behaviorNameCounter)
   }
   var validationInd = orderedBehaviorNames.indexOf("validation");
   var calculationInd = orderedBehaviorNames.indexOf("calculation");
   if (validationInd > -1 && calculationInd > -1 && validationInd < calculationInd) {
    var leftIndex = Math.min(validationInd, calculationInd);
    var rightIndex = Math.max(validationInd, calculationInd);
    var removedBehaviorNames = orderedBehaviorNames.splice(rightIndex, 1);
    orderedBehaviorNames.splice(leftIndex, 0, removedBehaviorNames[0])
   }
   for (var ind = 0; ind < orderedBehaviorNames.length; ind++) {
    var behaviorName = orderedBehaviorNames[ind];
    if (behaviorName == "switch") {
     continue
    }
    if (wFORMS.behaviors[behaviorName].applyTo) {
     var b = wFORMS.behaviors[behaviorName].applyTo(f);
     if (b && b.constructor != Array) {
      b = [b]
     }
     for (var i = 0; b && i < b.length; i++) {
      if (!wFORMS.instances[behaviorName]) {
       wFORMS.instances[behaviorName] = [b[i]]
      } else {
       wFORMS.removeBehavior(f, behaviorName);
       wFORMS.instances[behaviorName].push(b[i])
      }
     }
    }
   }
   if (wFORMS.behaviors.onApplyAll) {
    wFORMS.behaviors.onApplyAll(f)
   }
  };
  wFORMS.removeBehavior = function(C, A) {
   return null;
   if (!wFORMS.instances[A]) {
    return null
   }
   for (var B = 0; B < wFORMS.instances[A].length; B++) {
    if (wFORMS.instances[A][B].target == C) {
     wFORMS.instances[A][B] = null
    }
   }
   return null
  };
  wFORMS.getBehaviorInstance = function(C, A) {
   if (!C || !wFORMS.instances[A]) {
    return null
   }
   for (var B = 0; B < wFORMS.instances[A].length; B++) {
    if (wFORMS.instances[A][B].target == C) {
     return wFORMS.instances[A][B]
    }
   }
   return null
  };
  var loadIE = false;
  /*@cc_on
  	@if(@_jscript_version < 9)
  		loadIE = true;
  		document.write("<script id=__ie_onload defer src=//javascript:void(0)><\/script>");
  		var script = document.getElementById("__ie_onload");
  		script.onreadystatechange = function() {
  		  if (this.readyState == "complete") {
  			wFORMS.onLoadHandler(); // call the onload handler
  		  }
  		};
  		
  	@end
  	
  	wFORMS.behaviors.prefill.skip = false;
  @*/
  if (!loadIE) {
   base2.DOM.Element.addEventListener(document, "DOMContentLoaded", wFORMS.onLoadHandler, false)
  }
  wFORMS.helpers.activateStylesheet("wforms-jsonly.css");
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.hint = {
   CSS_INACTIVE: "field-hint-inactive",
   CSS_ACTIVE: "field-hint",
   HINT_SELECTOR: '*[id$="-H"]',
   HINT_SUFFIX: "-H",
   instance: function(A) {
    this.behavior = wFORMS.behaviors.hint;
    this.target = A
   }
  };
  wFORMS.behaviors.hint.applyTo = function(C) {
   var A = new wFORMS.behaviors.hint.instance(C);
   if (!C.querySelectorAll) {
    base2.DOM.bind(C)
   }
   var B = C.querySelectorAll(wFORMS.behaviors.hint.HINT_SELECTOR);
   if (!B.forEach) {
    B.forEach = NodeList.prototype.forEach
   }
   B.forEach(function(D) {
    var E = A.getElementByHintId(D.id);
    if (E) {
     if (!E.addEventListener) {
      base2.DOM.bind(E)
     }
     if (E.tagName == "SELECT" || E.tagName == "TEXTAREA" || (E.tagName == "INPUT" && E.type != "radio" && E.type != "checkbox")) {
      E.addEventListener("focus", function(F) {
       A.run(F, this)
      }, false);
      E.addEventListener("blur", function(F) {
       A.run(F, this)
      }, false)
     } else {
      E.addEventListener("mouseover", function(F) {
       A.run(F, E)
      }, false);
      E.addEventListener("mouseout", function(F) {
       A.run(F, E)
      }, false)
     }
    }
   });
   A.onApply();
   return A
  };
  wFORMS.behaviors.hint.instance.prototype.onApply = function() {};
  wFORMS.behaviors.hint.instance.prototype.run = function(B, A) {
   if (!this.behavior.skip) {
    var C = this.getHintElement(A);
    if (!C) {
     return
    }
    if (!C.removeClass) {
     base2.DOM.bind(C)
    }
    if (B.type == "focus" || B.type == "mouseover") {
     C.removeClass(wFORMS.behaviors.hint.CSS_INACTIVE);
     C.addClass(wFORMS.behaviors.hint.CSS_ACTIVE);
     if (!wFORMS.helpers.getForm(A).hasClass("hintsSide")) {
      this.setup(C, A)
     }
    } else {
     C.addClass(wFORMS.behaviors.hint.CSS_INACTIVE);
     C.removeClass(wFORMS.behaviors.hint.CSS_ACTIVE)
    }
   }
  };
  wFORMS.behaviors.hint.instance.prototype.getElementByHintId = function(C) {
   var B = C.substr(0, C.length - wFORMS.behaviors.hint.HINT_SUFFIX.length);
   var A = document.getElementById(B);
   return A
  };
  wFORMS.behaviors.hint.instance.prototype.getHintElement = function(A) {
   var B = document.getElementById(A.id + this.behavior.HINT_SUFFIX);
   if (B && !B.hasClass) {
    base2.DOM.bind(B)
   }
   return B && B != "" ? B : null
  };
  wFORMS.behaviors.hint.instance.prototype.setup = function(E, D) {
   var A = wFORMS.helpers.position(D);
   var B = wFORMS.helpers.position(E);
   var C = {
    left: A.left - B.left,
    top: A.top - B.top
   };
   if (D.tagName.toLowerCase() == "select") {
    E.style.left = E.offsetLeft + C.left + D.offsetWidth + "px";
    E.style.top = E.offsetTop + C.top + "px"
   } else {
    if (D.tagName.toLowerCase() == "span") {
     wFORMS.standardizeElement(D);
     if (D.hasClass("vertical")) {
      C.left += D.getBoundingClientRect().width
     } else {
      C.top += D.getBoundingClientRect().height
     }
    }
    E.style.left = E.offsetLeft + C.left + "px";
    E.style.top = E.offsetTop + C.top + D.offsetHeight + "px"
   }
  };
  wFORMS.behaviors.hint.isHintId = function(A) {
   return A.match(new RegExp(wFORMS.behaviors.hint.HINT_SUFFIX + "$")) != null
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.paging = {
   SELECTOR: ".wfPage",
   CSS_PAGE: "wfPage",
   CSS_CURRENT_PAGE: "wfCurrentPage",
   CSS_BUTTON_NEXT: "wfPageNextButton",
   CSS_BUTTON_PREVIOUS: "wfPagePreviousButton",
   CSS_BUTTON_PLACEHOLDER: "wfPagingButtons",
   CSS_PAGETAB: "wfPageTab",
   CSS_TABS: "wfTab",
   CSS_HIDDENTABS: "wfHiddenTab",
   CSS_TABSID: "wfTabNav",
   CSS_TABNAVLABEL: "wfTabNavLabel",
   CSS_TABSCURRENT: "wfTabCurrentPage",
   CSS_TABSEPARATOR_SPAN: "wfTabSep",
   CSS_TABSEPARATOR: " | ",
   ID_BUTTON_NEXT_PREFIX: "wfPageNextId",
   ID_BUTTON_PREVIOUS_PREFIX: "wfPagePreviousId",
   CSS_SUBMIT_HIDDEN: "wfHideSubmit",
   ID_PAGE_PREFIX: "wfPgIndex-",
   ID_PLACEHOLDER_SUFFIX: "-buttons",
   ATTR_INDEX: "wfPageIndex_activate",
   CAPTCHA_ERROR: "#tfa_captcha_text-E",
   MESSAGES: {
    CAPTION_NEXT: "Next Page",
    CAPTION_PREVIOUS: "Previous Page",
    CAPTION_UNLOAD: "Any data entered on ANY PAGE of this form will be LOST.",
    NAV_LABEL: "Page: ",
    TAB_LABEL: "Page "
   },
   showTabNavigation: false,
   runValidationOnPageNext: true,
   warnOnUnload: true,
   onPageNext: function() {},
   onPagePrevious: function() {},
   onPageChange: function() {},
   instance: function(A) {
    this.behavior = wFORMS.behaviors.paging;
    this.target = A;
    this.currentPageIndex = 1
   }
  };
  wFORMS.behaviors.paging.applyTo = function(G) {
   var A = null;
   var F = wFORMS.behaviors.paging;
   if (F.showTabNavigation) {
    F.runValidationOnPageNext = false
   }
   var D = (wFORMS.behaviors.validation && wFORMS.behaviors.paging.runValidationOnPageNext);
   base2.DOM.Element.querySelectorAll(G, wFORMS.behaviors.paging.SELECTOR).forEach(function(M) {
    if (!A) {
     A = new wFORMS.behaviors.paging.instance(G)
    }
    var O = A.getOrCreatePlaceHolder(M);
    var J = wFORMS.behaviors.paging.getPageIndex(M);
    if (J == 1) {
     var N = base2.DOM.bind(O.appendChild(F._createNextPageButton(J)));
     if (D) {
      N.addEventListener("click", function(Q) {
       var P = wFORMS.getBehaviorInstance(A.target, "validation");
       if (P.run(Q, M)) {
        A.run(Q, N)
       }
      }, false)
     } else {
      N.addEventListener("click", function(P) {
       A.run(P, N)
      }, false)
     }
     wFORMS.behaviors.paging.showPage(M)
    } else {
     var N = base2.DOM.bind(F._createPreviousPageButton(J));
     O.insertBefore(N, O.firstChild);
     N.addEventListener("click", function(P) {
      A.run(P, N)
     }, false);
     if (!wFORMS.behaviors.paging.isLastPageIndex(J, true)) {
      var L = base2.DOM.bind(O.appendChild(F._createNextPageButton(J)));
      if (D) {
       L.addEventListener("click", function(Q) {
        var P = wFORMS.getBehaviorInstance(A.target, "validation");
        if (P.run(Q, M)) {
         A.run(Q, L)
        }
       }, false)
      } else {
       L.addEventListener("click", function(P) {
        A.run(P, L)
       }, false)
      }
     }
    }
   });
   if (A) {
    p = A.findNextPage(0);
    A.currentPageIndex = 0;
    A.activatePage(wFORMS.behaviors.paging.getPageIndex(p), false);
    if (!window.onbeforeunload) {
     window.onbeforeunload = function() {
      if (A.behavior.warnOnUnload) {
       return A.behavior.MESSAGES.CAPTION_UNLOAD
      }
     }
    }
    if (A.behavior.showTabNavigation) {
     var E = wFORMS.behaviors["condition"].onHide;
     wFORMS.behaviors["condition"].onHide = function(J) {
      E();
      A.generateTabs()
     };
     var C = wFORMS.behaviors["condition"].onShow;
     wFORMS.behaviors["condition"].onShow = function(J) {
      C();
      A.generateTabs()
     };
     A.generateTabs()
    }
    A.onApply();
    var B = base2.DOM.Element.querySelector(document, wFORMS.behaviors.paging.CAPTCHA_ERROR);
    if (B) {
     var H = wFORMS.behaviors["condition"].onSetupFinish;
     wFORMS.behaviors["condition"].onSetupFinish = function(M) {
      H(M);
      var L = 1;
      for (var J = 1; J < 100; J++) {
       if (A.behavior.isLastPageIndex(J)) {
        L = J;
        break
       }
      }
      A.jumpTo(L)
     }
    }
    base2.DOM.Element.addEventListener(G, "submit", function(J) {
     A.onSubmit(J, A)
    })
   }
   return A
  };
  wFORMS.behaviors.paging.instance.prototype.onApply = function() {};
  wFORMS.behaviors.paging.instance.prototype.onSubmit = function(E, A) {
   if (!wFORMS.behaviors.paging.isLastPageIndex(A.currentPageIndex) && wFORMS.behaviors.paging.runValidationOnPageNext) {
    var D = wFORMS.behaviors.paging.getPageByIndex(A.currentPageIndex);
    var B = A.findNextPage(A.currentPageIndex);
    var C = wFORMS.getBehaviorInstance(A.target, "validation");
    if (C.run(E, D)) {
     A.activatePage(A.currentPageIndex + 1);
     var F = base2.DOM.Element.querySelector(B, "input, textarea, select");
     if (F) {
      F.focus()
     }
    }
    E.stopPropagation();
    E.preventDefault();
    E.pagingStopPropagation = true
   } else {
    if (window.onbeforeunload) {
     window.onbeforeunload = null
    }
   }
  };
  wFORMS.behaviors.paging.instance.prototype.onPageNext = function(A) {
   this.behavior.onPageNext(A)
  };
  wFORMS.behaviors.paging.instance.prototype.onPagePrevious = function(A) {
   this.behavior.onPagePrevious(A)
  };
  wFORMS.behaviors.paging.instance.prototype.onPageChange = function(A) {
   this.behavior.onPageChange(A);
   if (wFORMS.instances["responsive"] && wFORMS.instances["responsive"][0]) {
    for (i = 0; i < wFORMS.instances["responsive"].length; i++) {
     wFORMS.instances["responsive"][i].handleAllMatrixLayouts();
     wFORMS.instances["responsive"][i].handleAllGridLayouts()
    }
   }
  };
  wFORMS.behaviors.paging.getPageIndex = function(B) {
   if (B && B.id) {
    var A = B.id.replace(new RegExp(wFORMS.behaviors.paging.ID_PAGE_PREFIX + "(\\d+)"), "$1");
    A = parseInt(A);
    return !isNaN(A) ? A : false
   }
   return false
  };
  wFORMS.behaviors.paging.isElementVisible = function(A) {
   while (A && A.tagName != "BODY") {
    if (A.className) {
     if (A.className.indexOf(this.CSS_CURRENT_PAGE) != -1) {
      return true
     }
     if (A.className.indexOf(this.CSS_PAGE) != -1) {
      return false
     }
    }
    A = A.parentNode
   }
   return true
  };
  wFORMS.behaviors.paging._createNextPageButton = function(A) {
   var B = this.createNextPageButton();
   B.setAttribute(this.ATTR_INDEX, A + 1);
   B.id = this.ID_BUTTON_NEXT_PREFIX + A;
   return B
  };
  wFORMS.behaviors.paging.createNextPageButton = function() {
   var A = document.createElement("input");
   A.setAttribute("value", this.MESSAGES.CAPTION_NEXT);
   A.type = "button";
   A.className = this.CSS_BUTTON_NEXT;
   return A
  };
  wFORMS.behaviors.paging._createPreviousPageButton = function(A) {
   var B = this.createPreviousPageButton();
   B.setAttribute(this.ATTR_INDEX, A - 1);
   B.id = this.ID_BUTTON_PREVIOUS_PREFIX + A;
   return B
  };
  wFORMS.behaviors.paging.createPreviousPageButton = function() {
   var A = document.createElement("input");
   A.setAttribute("value", this.MESSAGES.CAPTION_PREVIOUS);
   A.type = "button";
   A.className = this.CSS_BUTTON_PREVIOUS;
   return A
  };
  wFORMS.behaviors.paging.instance.prototype.getOrCreatePlaceHolder = function(A) {
   var C = A.id + this.behavior.ID_PLACEHOLDER_SUFFIX;
   var B = document.getElementById(C);
   if (!B) {
    B = A.appendChild(document.createElement("div"));
    B.id = C;
    B.className = this.behavior.CSS_BUTTON_PLACEHOLDER
   }
   return B
  };
  wFORMS.behaviors.paging.hidePage = function(A) {
   if (A) {
    if (!A.removeClass) {
     A.removeClass = function(B) {
      return base2.DOM.HTMLElement.removeClass(this, B)
     }
    }
    if (!A.addClass) {
     A.addClass = function(B) {
      return base2.DOM.HTMLElement.addClass(this, B)
     }
    }
    A.removeClass(wFORMS.behaviors.paging.CSS_CURRENT_PAGE);
    A.addClass(wFORMS.behaviors.paging.CSS_PAGE)
   }
  };
  wFORMS.behaviors.paging.showPage = function(A) {
   if (A) {
    if (!A.removeClass) {
     A.removeClass = function(B) {
      return base2.DOM.HTMLElement.removeClass(this, B)
     }
    }
    A.removeClass(wFORMS.behaviors.paging.CSS_PAGE);
    if (!A.addClass) {
     A.addClass = function(B) {
      return base2.DOM.HTMLElement.addClass(this, B)
     }
    }
    A.addClass(wFORMS.behaviors.paging.CSS_CURRENT_PAGE)
   }
  };
  wFORMS.behaviors.paging.instance.prototype.activatePage = function(B) {
   if (arguments.length > 1) {
    var E = arguments[1]
   } else {
    var E = true
   }
   if (B == this.currentPageIndex) {
    return false
   }
   B = parseInt(B);
   if (B > this.currentPageIndex) {
    var C = this.findNextPage(this.currentPageIndex)
   } else {
    var C = this.findPreviousPage(this.currentPageIndex)
   }
   if (C) {
    var A = this;
    var B = A.behavior.getPageIndex(C);
    A.setupManagedControls(B);
    A.behavior.hidePage(A.behavior.getPageByIndex(A.currentPageIndex));
    A.behavior.showPage(C);
    var D = A.currentPageIndex;
    A.currentPageIndex = B;
    if (E) {
     if (C.scrollIntoView) {
      C.scrollIntoView()
     } else {
      location.hash = "#" + wFORMS.behaviors.paging.ID_PAGE_PREFIX + B
     }
    }
    A.labelCurrentPageTab(C);
    A.onPageChange(C);
    if (B > D) {
     A.onPageNext(C)
    } else {
     A.onPagePrevious(C)
    }
   }
  };
  wFORMS.behaviors.paging.instance.prototype.setupManagedControls = function(B) {
   if (!B) {
    B = this.currentPageIndex
   }
   var A = wFORMS.behaviors.paging;
   if (A.isFirstPageIndex(B)) {
    if (ctrl = A.getPreviousButton(B)) {
     ctrl.style.visibility = "hidden"
    }
   } else {
    if (ctrl = A.getPreviousButton(B)) {
     ctrl.style.visibility = "visible"
    }
   }
   if (A.isLastPageIndex(B)) {
    if (ctrl = A.getNextButton(B)) {
     ctrl.style.visibility = "hidden"
    }
    this.showSubmitButtons();
    this.showCaptchas(A.getPageByIndex(B).querySelector("." + wFORMS.behaviors.paging.CSS_BUTTON_PLACEHOLDER))
   } else {
    if (ctrl = A.getNextButton(B)) {
     ctrl.style.visibility = "visible"
    }
    this.hideSubmitButtons();
    this.hideCaptchas()
   }
  };
  wFORMS.behaviors.paging.instance.prototype.showSubmitButtons = function() {
   var A = this.target.getElementsByTagName("input");
   for (var B = 0; B < A.length; B++) {
    if (A[B].type == "submit") {
     A[B].className = A[B].className.replace(new RegExp("(^|\\s)" + this.behavior.CSS_SUBMIT_HIDDEN + "(\\s|$)", "g"), "$2")
    }
   }
  };
  wFORMS.behaviors.paging.instance.prototype.hideSubmitButtons = function() {
   var A = this.target.getElementsByTagName("input");
   for (var B = 0; B < A.length; B++) {
    if (A[B].type == "submit") {
     if (!(new RegExp("(^|\\s)" + this.behavior.CSS_SUBMIT_HIDDEN + "(\\s|$)")).test(A[B].className)) {
      A[B].className += " " + this.behavior.CSS_SUBMIT_HIDDEN
     }
    }
   }
  };
  wFORMS.behaviors.paging.instance.prototype.hideCaptchas = function() {
   var B = document.getElementById("google-captcha");
   var A = document.getElementById("captcha");
   if (B != null) {
    B.style.display = "none"
   }
   if (A != null) {
    A.style.display = "none"
   }
  };
  wFORMS.behaviors.paging.instance.prototype.showCaptchas = function(A) {
   var C = document.getElementById("google-captcha");
   var B = document.getElementById("captcha");
   if (C != null) {
    if (A != null) {
     A.parentNode.insertBefore(C, A)
    }
    C.style.display = "block"
   }
   if (B != null) {
    B.style.display = "block"
   }
  };
  wFORMS.behaviors.paging.getPageByIndex = function(A) {
   var B = document.getElementById(wFORMS.behaviors.paging.ID_PAGE_PREFIX + A);
   return B ? base2.DOM.bind(B) : false
  };
  wFORMS.behaviors.paging.getNextButton = function(A) {
   return document.getElementById(wFORMS.behaviors.paging.ID_BUTTON_NEXT_PREFIX + A)
  };
  wFORMS.behaviors.paging.getPreviousButton = function(A) {
   return document.getElementById(wFORMS.behaviors.paging.ID_BUTTON_PREVIOUS_PREFIX + A)
  };
  wFORMS.behaviors.paging.isLastPageIndex = function(C, B) {
   C = parseInt(C) + 1;
   var A = wFORMS.behaviors.paging;
   var D = A.getPageByIndex(C);
   if ((_b = wFORMS.behaviors["condition"]) && !B) {
    while (D && _b.hasOffState(D)) {
     C++;
     D = A.getPageByIndex(C)
    }
   }
   return D ? false : true
  };
  wFORMS.behaviors.paging.isFirstPageIndex = function(C, B) {
   C = parseInt(C) - 1;
   var A = wFORMS.behaviors.paging;
   var D = A.getPageByIndex(C);
   if ((_b = wFORMS.behaviors["condition"]) && !B) {
    while (D && _b.hasOffState(D)) {
     C--;
     D = A.getPageByIndex(C)
    }
   }
   return D ? false : true
  };
  wFORMS.behaviors.paging.instance.prototype.findNextPage = function(B) {
   B = parseInt(B) + 1;
   var A = wFORMS.behaviors.paging;
   var C = A.getPageByIndex(B);
   if (_b = wFORMS.behaviors["condition"]) {
    while (C && _b.hasOffState(C)) {
     B++;
     C = A.getPageByIndex(B)
    }
   }
   return C
  };
  wFORMS.behaviors.paging.instance.prototype.findPreviousPage = function(B) {
   B = parseInt(B) - 1;
   var A = wFORMS.behaviors.paging;
   var C = A.getPageByIndex(B);
   if (_b = wFORMS.behaviors["condition"]) {
    while (C && _b.hasOffState(C)) {
     B--;
     C = A.getPageByIndex(B)
    }
   }
   return C ? C : false
  };
  wFORMS.behaviors.paging.instance.prototype.jumpTo = function(C) {
   var A = this;
   var B = C;
   if (A.currentPageIndex != B) {
    A.behavior.hidePage(A.behavior.getPageByIndex(A.currentPageIndex));
    A.setupManagedControls(B);
    A.behavior.showPage(A.behavior.getPageByIndex(B));
    A.currentPageIndex = B
   }
   vInstance = wFORMS.getBehaviorInstance(A.target, "validation");
   if (vInstance && vInstance.errorPages && vInstance.errorPages[B] && !arguments[1]) {
    var D = document.getElementById(vInstance.errorPages[B][0]);
    if (D.scrollIntoView) {
     setTimeout(function() {
      D.scrollIntoView()
     }, 1)
    }
   }
   var E = A.behavior.getPageByIndex(B);
   this.labelCurrentPageTab(E);
   this.onPageChange(E)
  };
  wFORMS.behaviors.paging.instance.prototype.generateTabs = function(G) {
   var C = this;
   if (document.getElementById(this.behavior.CSS_TABSID)) {
    var B = document.getElementById(this.behavior.CSS_TABSID);
    B.parentNode.removeChild(B)
   }
   var H = document.createElement("div");
   H.id = this.behavior.CSS_TABSID;
   H.className = this.behavior.CSS_TABSID;
   var F = document.createTextNode(this.behavior.MESSAGES.NAV_LABEL);
   var D = document.createElement("span");
   D.className = this.behavior.CSS_TABNAVLABEL;
   D.appendChild(F);
   H.appendChild(D);
   if (G) {
    G.appendChild(H)
   } else {
    this.target.parentNode.insertBefore(H, this.target)
   }
   var A = base2.DOM.Element.querySelectorAll(this.target, "." + this.behavior.CSS_PAGE + ", ." + this.behavior.CSS_CURRENT_PAGE);
   A.forEach(function(O, M) {
    if (wFORMS.behaviors["condition"].hasOffState(O)) {
     var N = document.createElement("span");
     N.setAttribute("class", C.behavior.CSS_TABS + " " + C.behavior.CSS_HIDDENTABS);
     N.setAttribute("id", C.behavior.CSS_PAGETAB + "_" + (M + 1))
    } else {
     var N = document.createElement("a");
     N.setAttribute("class", C.behavior.CSS_TABS);
     N.setAttribute("id", C.behavior.CSS_PAGETAB + "_" + (M + 1));
     N.setAttribute("href", "#");
     base2.DOM.Element.addEventListener(N, "click", function(S) {
      C.jumpTo(M + 1);
      S.preventDefault();
      return false
     })
    }
    var L = base2.DOM.Element.querySelector(O, "h4");
    var P = null;
    if (L) {
     P = L.innerText ? L.innerText : L.textContent
    }
    N.setAttribute("title", P ? P : C.behavior.MESSAGES.TAB_LABEL + (M + 1));
    var R = document.createTextNode(M + 1);
    N.appendChild(R);
    if (M < A.length - 1) {
     var J = document.createElement("span");
     J.className = C.behavior.CSS_TABSEPARATOR_SPAN;
     var Q = document.createTextNode(C.behavior.CSS_TABSEPARATOR);
     J.appendChild(Q)
    }
    H.appendChild(N);
    if (J) {
     H.appendChild(J)
    }
   });
   var E = C.behavior.getPageByIndex(1);
   this.labelCurrentPageTab(E);
   this.onPageChange(E);
   return A
  };
  wFORMS.behaviors.paging.instance.prototype.labelCurrentPageTab = function(A) {
   _b = this;
   currentIndex = this.currentPageIndex;
   base2.DOM.Element.querySelectorAll(this.target.parentNode, 'a[id^="' + this.behavior.CSS_PAGETAB + '"]').forEach(function(B) {
    if (!B.removeClass || !B.hasClass || !B.addClass) {
     wFORMS.standardizeElement(B)
    }
    B.removeClass(_b.behavior.CSS_TABSCURRENT);
    if (B.getAttribute("id") == (_b.behavior.CSS_PAGETAB + "_" + currentIndex)) {
     B.addClass(_b.behavior.CSS_TABSCURRENT)
    }
   })
  };
  wFORMS.behaviors.paging.instance.prototype.run = function(B, A) {
   this.activatePage(A.getAttribute(wFORMS.behaviors.paging.ATTR_INDEX))
  };
  wFORMS.behaviors.paging.helpers = {};
  wFORMS.behaviors.paging.helpers.findPage = function(A) {
   if (A && (A.className.match("wfPage") || A.className.match("wfCurrentPage"))) {
    wFORMS.standardizeElement(A);
    return A
   } else {
    if (A && A.parentNode) {
     if (A.parentNode.className.match("wfPage") || A.parentNode.className.match("wfCurrentPage")) {
      wFORMS.standardizeElement(A.parentNode);
      return A.parentNode
     } else {
      return wFORMS.behaviors.paging.helpers.findPage(A.parentNode)
     }
    }
   }
   return null
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.repeat = {
   SELECTOR_REPEAT: '*[class~="repeat"]',
   SELECTOR_REMOVEABLE: '*[class~="removeable"]',
   ID_SUFFIX_DUPLICATE_LINK: "-wfDL",
   ID_SUFFIX_COUNTER: "-RC",
   CSS_DUPLICATE_LINK: "duplicateLink",
   CSS_DUPLICATE_SPAN: "duplicateSpan",
   CSS_DELETE_LINK: "removeLink",
   CSS_DELETE_SPAN: "removeSpan",
   CSS_REMOVEABLE: "removeable",
   CSS_REPEATABLE: "repeat",
   ATTR_DUPLICATE: "wfr__dup",
   ATTR_DUPLICATE_ELEM: "wfr__dup_elem",
   ATTR_LABEL: "data-repeatlabel",
   ATTR_HANDLED: "wfr_handled",
   ATTR_MASTER_SECTION: "wfr__master_sec",
   ATTR_LINK_SECTION_ID: "wfr_sec_id",
   MESSAGES: {
    ADD_CAPTION: "Add another response",
    ADD_TITLE: "Will duplicate this question or section.",
    REMOVE_CAPTION: "Remove",
    REMOVE_TITLE: "Will remove this question or section",
    REMOVE_WARNING: "Are you sure you want to remove this section? All data in this section will be lost."
   },
   UPDATEABLE_ATTR_ARRAY: ["id", "name", "for"],
   preserveRadioName: false,
   CSS_PRESERVE_RADIO_NAME: "preserveRadioName",
   onRepeat: function(A) {},
   onRemove: function(A) {},
   allowRepeat: function(B, A) {
    return true
   },
   _callbacks: {
    "onRepeatStart": [],
    "onRepeat": [],
    "onRemove": [],
    "onMasterIdChange": [],
    "onRepeatIdCreate": []
   },
   instance: function(A) {
    this.behavior = wFORMS.behaviors.repeat;
    this.target = A;
    this._idUpdates = {
     "master": {},
     "repeat": {}
    }
   }
  };
  var _b = wFORMS.behaviors.repeat;
  var _i = wFORMS.behaviors.repeat.instance;
  _b.applyTo = function(G) {
   var C = this;
   var B = new Array();
   if (!G.querySelectorAll) {
    base2.DOM.bind(G)
   }
   if (wFORMS.behaviors.repeat.getMasterSection(G)) {
    var D = Array();
    var H = wFORMS.behaviors.repeat.getMasterSection(G);
    if (!H.querySelectorAll) {
     base2.DOM.bind(H)
    }
   }
   G.querySelectorAll(this.SELECTOR_REPEAT).forEach(function(M, L) {
    if (C.isHandled(M)) {
     return
    }
    if (!M.id) {
     M.id = wFORMS.helpers.randomId()
    }
    var J = new C.instance(M);
    var N = J.getOrCreateRepeatLink(M);
    N.addEventListener("click", function(O) {
     J.run(O, N)
    }, false);
    J.setElementHandled(M);
    B.push(J)
   });
   if (!G.hasClass) {
    G.hasClass = function(J) {
     return base2.DOM.HTMLElement.hasClass(this, J)
    }
   }
   if (G.hasClass(this.CSS_REMOVEABLE)) {
    var A = this.getMasterSection(G);
    var F = wFORMS.getBehaviorInstance(A, "repeat");
    if (F) {
     F.getOrCreateRemoveLink(G)
    } else {
     if (B[0]) {
      B[0].getOrCreateRemoveLink(G)
     }
    }
   }
   G.querySelectorAll(this.SELECTOR_REMOVEABLE).forEach(function(M) {
    var J = wFORMS.behaviors.repeat.getMasterSection(M);
    var L = wFORMS.getBehaviorInstance(J, "repeat");
    if (L) {
     L.getOrCreateRemoveLink(M)
    } else {
     if (B[0]) {
      B[0].getOrCreateRemoveLink(M)
     }
    }
   });
   for (var E = 0; E < B.length; E++) {
    B[E].onApply()
   }
   return B
  };
  _i.prototype.onApply = function() {
   var B;
   if (this.doesCounterFieldExist(this.target)) {
    B = this.getSectionsCount()
   } else {
    B = 1
   }
   if (B > 1) {
    this.counterRepeatedFields = B
   }
   var A = parseInt(this.target.getAttribute("data-repeatlimit"));
   if (!isNaN(A) && A != null) {
    if (this.counterRepeatedFields >= A) {
     var C = this.target.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
     document.getElementById(C).style.display = "none"
    }
   }
  };
  _i.prototype.counterRepeatedFields = 1;
  _i.prototype.getOrCreateRepeatLink = function(D) {
   var F = D.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
   var E = document.getElementById(F);
   if (!E || E == "") {
    E = this.createRepeatLink(F);
    var A = document.createElement("div");
    A.className = this.behavior.CSS_DUPLICATE_SPAN;
    E = A.appendChild(E);
    if (D.tagName.toUpperCase() == "TR") {
     var C = D.parentNode.parentNode;
     C.style.marginBottom = "0px";
     var B = C.nextSibling;
     while (B && B.nodeType != 1) {
      B = B.nextSibling
     }
     if (!B) {
      C.parentNode.appendChild(A)
     } else {
      C.parentNode.insertBefore(A, B)
     }
    } else {
     D.parentNode.insertBefore(A, this.getLastRepeat(D).nextSibling)
    }
   }
   return base2.DOM.bind(E)
  };
  _i.prototype.getLastRepeat = function(D) {
   var C = D.parentNode;
   if (!C.querySelectorAll) {
    base2.DOM.bind(C)
   }
   var B = D.id.match("^.[^[]+")[0];
   var A = C.querySelectorAll(wFORMS.behaviors.repeat.SELECTOR_REMOVEABLE + "[id^=" + B + "]");
   if (A.length > 0) {
    return A.item(A.length - 1)
   } else {
    return D
   }
  };
  _i.prototype.createRepeatLink = function(C) {
   var A = document.createElement("A");
   A.id = C;
   A.setAttribute("href", "#");
   A.className = this.behavior.CSS_DUPLICATE_LINK;
   A.setAttribute("title", this.behavior.MESSAGES.ADD_TITLE);
   var B = this.target.getAttribute(wFORMS.behaviors.repeat.ATTR_LABEL);
   A.appendChild(document.createElement("span").appendChild(document.createTextNode(B ? B : this.behavior.MESSAGES.ADD_CAPTION)));
   return A
  };
  _i.prototype.getOrCreateRemoveLink = function(C) {
   var D = this.createRemoveLink(C.id);
   if (C.tagName == "TR") {
    var B = C.getElementsByTagName("TD");
    var A = B[B.length - 1];
    A.appendChild(D)
   } else {
    C.insertBefore(D, C.children[0])
   }
  };
  _i.prototype.createRemoveLink = function(D) {
   var B = document.createElement("a");
   B.id = D + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
   B.setAttribute("href", "#");
   B.className = this.behavior.CSS_DELETE_LINK;
   B.setAttribute("title", this.behavior.MESSAGES.REMOVE_TITLE);
   B.setAttribute(this.behavior.ATTR_LINK_SECTION_ID, D);
   var C = document.createElement("span");
   C.appendChild(document.createTextNode(this.behavior.MESSAGES.REMOVE_CAPTION));
   B.appendChild(C);
   var A = this;
   B.onclick = function(E) {
    A.onRemoveLinkClick(E, B);
    return false
   };
   var C = document.createElement("span");
   C.className = this.behavior.CSS_DELETE_SPAN;
   C.appendChild(B);
   return C
  };
  _i.prototype.counterRepeatedFields = 1;
  _i.prototype.duplicateSection = function(D) {
   if (!this.behavior.allowRepeat(D, this)) {
    return false
   }
   this.callRepeatStartObservers(D);
   this.updateMasterSection(D);
   var C = D.cloneNode(true);
   var B = this.getNextDuplicateIndex(this.target);
   var E = this.createSuffix(D, B);
   this.updateDuplicatedSection(C, B, E);
   C = D.parentNode.insertBefore(C, this.getInsertNode(D));
   this.callRepeatCompleteObservers(D, C);
   wFORMS.applyBehaviors(C);
   this.counterRepeatedFields++;
   var A = D.getAttribute("data-repeatlimit");
   var F = D.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
   if (A != null) {
    if (this.counterRepeatedFields >= A) {
     document.getElementById(F).style.display = "none"
    }
   }
   this.behavior.onRepeat(C);
   wFORMS.helpers.spotlight(C)
  };
  _i.prototype.removeSection = function(C) {
   if (C) {
    var B = this.behavior.getMasterSection(C);
    this.logRemovedSection(C);
    var C = C.parentNode.removeChild(C);
    this.callRemoveCompleteObservers(C);
    this.counterRepeatedFields--;
    var A = C.getAttribute("data-repeatlimit");
    var D = B.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
    if (A != null) {
     if (this.counterRepeatedFields <= A) {
      document.getElementById(D).style.display = ""
     }
    }
    this.behavior.onRemove(C)
   }
  };
  _i.prototype.logRemovedSection = function(C) {
   if (!C || !C.id) {
    return
   }
   var F = C.id;
   var B = this.behavior.getMasterSection(C);
   var D = this.getOrCreateCounterField(B);
   if (D) {
    var A = D.value.split("|");
    var E = [];
    if (A[1]) {
     E = A[1].split(",")
    }
    A = A[0];
    E.push(F);
    D.value = A + "|" + E.join(",")
   }
  };
  _i.prototype.getInsertNode = function(B) {
   var A = B.nextSibling;
   if (A && A.nodeType == 1 && !A.hasClass) {
    A.hasClass = function(C) {
     return base2.DOM.HTMLElement.hasClass(this, C)
    }
   }
   while (A && (A.nodeType != 1 || A.hasClass(this.behavior.CSS_REMOVEABLE))) {
    A = A.nextSibling;
    if (A && A.nodeType == 1 && !A.hasClass) {
     A.hasClass = function(C) {
      return base2.DOM.HTMLElement.hasClass(this, C)
     }
    }
   }
   return A
  };
  _i.prototype.onRemoveLinkClick = function(B, A) {
   if (confirm(this.behavior.MESSAGES.REMOVE_WARNING)) {
    var C = document.getElementById(A.getAttribute(this.behavior.ATTR_LINK_SECTION_ID));
    this.removeSection(C);
    if (B) {
     B.preventDefault()
    }
   }
  };
  _i.prototype.updateMasterSection = function(A) {
   if (A.doItOnce == true) {
    return true
   } else {
    A.doItOnce = true
   }
   var C = A.id;
   var B = this.createSuffix(A);
   A.id = this.clearSuffix(A.id) + B;
   if (A.id != C) {
    this.callMasterIdChangeObservers(C, A.id)
   }
   this.updateMasterElements(A, B, C)
  };
  _i.prototype.updateMasterElements = function(C, O, A) {
   if (!C || C.nodeType != 1) {
    return
   }
   if (!C.hasClass) {
    C.hasClass = function(P) {
     return base2.DOM.HTMLElement.hasClass(this, P)
    }
   }
   if (C.hasClass(this.behavior.CSS_REPEATABLE)) {
    if (A != C.id) {
     var J = document.getElementById(A + this.behavior.ID_SUFFIX_DUPLICATE_LINK);
     J.id = A + O + this.behavior.ID_SUFFIX_DUPLICATE_LINK
    }
   }
   var M = C.childNodes;
   for (var F = 0; F < M.length; F++) {
    var B = M[F];
    if (B.nodeType != 1) {
     continue
    }
    if (!B.hasClass) {
     B.hasClass = function(P) {
      return base2.DOM.HTMLElement.hasClass(this, P)
     }
    }
    var D = O;
    if (B.hasClass(this.behavior.CSS_REPEATABLE)) {
     O += "[0]"
    }
    var A = B.id;
    if (!B.hasClass(this.behavior.CSS_REMOVEABLE)) {
     for (var E = 0; E < this.behavior.UPDATEABLE_ATTR_ARRAY.length; E++) {
      var H = this.behavior.UPDATEABLE_ATTR_ARRAY[E];
      var N = this.clearSuffix(B.getAttribute(H));
      if (!N) {
       continue
      }
      if (H == "id" && wFORMS.behaviors.hint && wFORMS.behaviors.hint.isHintId(B.id)) {
       B.id = N.replace(new RegExp("(.*)(" + wFORMS.behaviors.hint.HINT_SUFFIX + ")$"), "$1" + O + "$2")
      } else {
       if (H == "id" && wFORMS.behaviors.validation && wFORMS.behaviors.validation.isErrorPlaceholderId(B.id)) {
        B.id = N.replace(new RegExp("(.*)(" + wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX + ")$"), "$1" + O + "$2")
       } else {
        if (H == "id") {
         var L = N.substr(-2);
         var G = N.substr(-5);
         if (L == "-L" || L == "-D" || L == "-R") {
          B.id = N.substr(0, N.length - 2) + O + L
         } else {
          if (G !== "-wfDL") {
           B.id = N + O
          }
         }
        } else {
         if (H == "name") {
          if (N.substr(-2) == "[]") {
           B.name = N.substr(0, N.length - 2) + O + "[]"
          } else {
           B.name = N + O
          }
         } else {
          B.setAttribute(H, N + O)
         }
        }
       }
      }
     }
     this.updateMasterElements(B, O, A)
    }
    if (B.id != A) {
     this.callMasterIdChangeObservers(A, B.id)
    }
    O = D
   }
  };
  _i.prototype.updateDuplicatedSection = function(C, A, D) {
   C[this.behavior.ATTR_MASTER_SECTION] = C.id;
   var E = C.id;
   C.id = this.clearSuffix(C.id) + D;
   C.className = C.className.replace(this.behavior.CSS_REPEATABLE, this.behavior.CSS_REMOVEABLE);
   if (!C.hasClass) {
    C.hasClass = function(F) {
     return base2.DOM.HTMLElement.hasClass(this, F)
    }
   }
   if (C.hasClass(this.behavior.CSS_PRESERVE_RADIO_NAME)) {
    var B = true
   } else {
    var B = this.behavior.preserveRadioName
   }
   if (C.id != E) {
    this.callRepeatIdCreateObservers(E, C.id)
   }
   this.updateSectionChildNodes(C, D, B)
  };
  _i.prototype.updateSectionChildNodes = function(elem, suffix, preserveRadioName) {
   if (elem.doItOnce) {
    elem.doItOnce = null
   }
   var removeStack = new Array();
   var i = 0;
   while (elem && elem.childNodes && elem.childNodes[i]) {
    var e = elem.childNodes[i];
    i++;
    if (e.nodeType != 1) {
     continue
    }
    if (!e.hasClass) {
     e.hasClass = function(className) {
      return base2.DOM.HTMLElement.hasClass(this, className)
     }
    }
    if (this.behavior.isDuplicate(e)) {
     removeStack.push(e);
     continue
    }
    if (e.hasClass(this.behavior.CSS_DUPLICATE_SPAN)) {
     removeStack.push(e);
     continue
    }
    if (e.hasClass(this.behavior.CSS_DUPLICATE_LINK)) {
     removeStack.push(e);
     continue
    }
    if (e.id.match("-R$") && e.type == "hidden") {
     removeStack.push(e);
     continue
    }
    if (e.hasClass("uploadedFile")) {
     removeStack.push(e);
     continue
    }
    if (e.tagName == "INPUT" && e.type == "file" && e.style.display == "none") {
     e.style.display = ""
    }
    var defaultValue = e.getAttribute("default");
    if (!defaultValue && (e.type == "radio" || e.type == "checkbox" || e.tagName == "SELECT")) {
     if (e.tagName == "SELECT") {
      for (var iter = 0; iter < e.options.length; iter++) {
       if (null == e.options[iter].getAttribute("data-default-value") || "" === e.options[iter].getAttribute("value")) {
        e.options[iter].removeAttribute("selected")
       }
      }
     } else {
      var defaultChoice = e.getAttribute("data-default-value");
      if (defaultChoice) {
       defaultValue = e.getAttribute("value")
      }
     }
    }
    if ((e.tagName == "INPUT" && e.type != "button") || e.tagName == "TEXTAREA") {
     if (e.type != "radio" && e.type != "checkbox") {
      e.value = defaultValue ? defaultValue : "";
      if (e.tagName == "TEXTAREA") {
       e.innerHTML = (defaultValue == null) ? "" : defaultValue;
       e.innerText = (defaultValue == null) ? "" : defaultValue
      }
     } else {
      e.checked = (e.value === defaultValue)
     }
    } else {
     if (e.tagName == "SELECT") {
      e.setAttribute("selected", (defaultValue) ? "selected" : "")
     }
    }
    var oldId = e.id;
    if (e.tagName == "INPUT" && e.type == "radio" && !preserveRadioName && /*@cc_on @if(@_jscript_version < 5.8)! @end @*/ false) {
     var tagHtml = '<INPUT type="radio" name="' + e.name + suffix + '"></INPUT>';
     var fixedRadio = e.parentNode.insertBefore(document.createElement(tagHtml), e);
     fixedRadio.id = e.id;
     fixedRadio.className = e.className;
     fixedRadio.value = e.value;
     e = e.parentNode.removeChild(e);
     var l = this.behavior.UPDATEABLE_ATTR_ARRAY.length;
     for (var j = 0; j < l; j++) {
      var attrName = this.behavior.UPDATEABLE_ATTR_ARRAY[j];
      var value = e.getAttribute(attrName);
      fixedRadio.setAttribute(attrName, value)
     }
     e = fixedRadio;
     if (!e.hasClass) {
      e.hasClass = function(className) {
       return base2.DOM.HTMLElement.hasClass(this, className)
      }
     }
    }
    this.updateAttributes(e, suffix, preserveRadioName);
    if (e.hasClass(this.behavior.CSS_REPEATABLE)) {
     if (e.id.substr(-2) == "-D") {
      e.id = e.id.substr(0, e.id.length - 2) + "[0]-D"
     } else {
      e.id = e.id + "[0]"
     }
     this.updateSectionChildNodes(e, suffix + "[0]", preserveRadioName)
    } else {
     this.updateSectionChildNodes(e, suffix, preserveRadioName)
    }
    if (e.id != oldId) {
     this.callRepeatIdCreateObservers(oldId, e.id)
    }
   }
   for (var i = 0; i < removeStack.length; i++) {
    var e = removeStack[i];
    if (e.clearAttributes) {
     e.clearAttributes(false)
    }
    if (e.parentNode) {
     e.parentNode.removeChild(e)
    }
   }
  };
  _i.prototype.createSuffix = function(E, B) {
   var D = "[" + (B ? B : "0") + "]";
   var C = /\[(\d+)\]$/;
   E = E.parentNode;
   while (E && E.tagName) {
    if (!E.hasClass) {
     E.hasClass = function(F) {
      return base2.DOM.HTMLElement.hasClass(this, F)
     }
    }
    if (E.hasClass(this.behavior.CSS_REPEATABLE) || E.hasClass(this.behavior.CSS_REMOVEABLE)) {
     var A = C.exec(E.id);
     if (A) {
      A = A[1]
     }
     D = "[" + (A ? A : "0") + "]" + D
    }
    E = E.parentNode
   }
   return D
  };
  _i.prototype.clearSuffix = function(A) {
   if (!A) {
    return
   }
   A = A.replace(/(\[\d+])+(\[])?(-[RHELD])?$/, "$2$3");
   return A
  };
  _i.prototype.updateAttributes = function(E, C, H) {
   var L = wFORMS.behaviors.hint && wFORMS.behaviors.hint.isHintId(E.id);
   var B = wFORMS.behaviors.validation && wFORMS.behaviors.validation.isErrorPlaceholderId(E.id);
   this.setInDuplicateGroup(E);
   if (this.behavior.isHandled(E)) {
    this.removeHandled(E)
   }
   if (E.hasAttribute("disabled")) {
    if (E.getAttribute("data-wforms-nooverwrite") === "disabled") {
     E.removeAttribute("data-wforms-nooverwrite")
    }
    E.removeAttribute("disabled")
   }
   if (E.hasAttribute("readonly")) {
    if (E.getAttribute("data-wforms-nooverwrite") === "disabled") {
     E.removeAttribute("data-wforms-nooverwrite")
    }
    E.removeAttribute("readonly")
   }
   if (wFORMS.behaviors["switch"] && wFORMS.behaviors["switch"].isHandled(E)) {
    wFORMS.behaviors["switch"].removeHandle(E)
   }
   if (wFORMS.behaviors["calculation"] && wFORMS.behaviors["calculation"].isHandled(E)) {
    wFORMS.behaviors["calculation"].removeHandledFlag(E)
   }
   var A = this.behavior.UPDATEABLE_ATTR_ARRAY.length;
   for (var D = 0; D < A; D++) {
    var F = this.behavior.UPDATEABLE_ATTR_ARRAY[D];
    var J = this.clearSuffix(E.getAttribute(F));
    if (!J) {
     continue
    }
    if (F == "name" && E.tagName == "INPUT" && H) {
     continue
    } else {
     if (B && F == "id") {
      E.id = J.replace(new RegExp("(.*)(" + wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX + ")$"), "$1" + C + "$2")
     } else {
      if (L && F == "id") {
       E.id = J.replace(new RegExp("(.*)(" + wFORMS.behaviors.hint.HINT_SUFFIX + ")$"), "$1" + C + "$2")
      } else {
       if (F == "id") {
        var G = J.substr(-2);
        if (G == "-L" || G == "-D" || G == "-R") {
         E.id = J.substr(0, J.length - 2) + C + G
        } else {
         E.id = J + C
        }
       } else {
        if (F == "name") {
         if (J.substr(-2) == "[]") {
          E.name = J.substr(0, J.length - 2) + C + "[]"
         } else {
          E.name = J + C
         }
        } else {
         E.setAttribute(F, J + C)
        }
       }
      }
     }
    }
   }
  };
  _i.prototype.getNextDuplicateIndex = function(B) {
   var C = this.getOrCreateCounterField(B);
   var A = C.value.split("|");
   var E = [];
   if (A[1]) {
    E = A[1].split(",")
   }
   A = A[0];
   var D = parseInt(A) + 1;
   C.value = D + (E.length > 0 ? "|" + E.join(",") : "");
   return D
  };
  _i.prototype.doesCounterFieldExist = function(C) {
   var A = C.id + this.behavior.ID_SUFFIX_COUNTER;
   var B = document.getElementById(A);
   return !(!B || B == "")
  };
  _i.prototype.getOrCreateCounterField = function(C) {
   var A = C.id + this.behavior.ID_SUFFIX_COUNTER;
   var B = document.getElementById(A);
   if (!B || B == "") {
    B = this.createCounterField(A);
    var D = C.parentNode;
    while (D && D.tagName.toUpperCase() != "FORM") {
     D = D.parentNode
    }
    D.appendChild(B)
   }
   return B
  };
  _i.prototype.createCounterField = function(A) {
   cElem = document.createElement("input");
   cElem.id = A;
   cElem.setAttribute("type", "hidden");
   cElem.setAttribute("name", A);
   cElem.value = "0";
   return cElem
  };
  _i.prototype.getSectionsCount = function() {
   if (this.behavior.isDuplicate(this.target)) {
    return false
   }
   var B = this.getOrCreateCounterField(this.target).value.split("|");
   var A = parseInt(B[0]);
   if (B.length > 1) {
    A -= B[1].split(",").length
   }
   return A + 1
  };
  _i.prototype.setInDuplicateGroup = function(A) {
   return A.setAttribute(this.behavior.ATTR_DUPLICATE_ELEM, true)
  };
  _i.prototype.setElementHandled = function(A) {
   return A.setAttribute(this.behavior.ATTR_HANDLED, true)
  };
  _i.prototype.removeHandled = function(A) {
   return A.removeAttribute(this.behavior.ATTR_HANDLED)
  };
  _b.isDuplicate = function(A) {
   if (!A.hasClass) {
    A.hasClass = function(B) {
     return base2.DOM.HTMLElement.hasClass(this, B)
    }
   }
   return A.hasClass(this.CSS_REMOVEABLE)
  };
  _b.isMaster = function(A) {
   if (!A.hasClass) {
    A.hasClass = function(B) {
     return base2.DOM.HTMLElement.hasClass(this, B)
    }
   }
   return A.hasClass(this.CSS_REPEATABLE)
  };
  _b.isInDuplicateGroup = function(A) {
   return A.getAttribute(this.ATTR_DUPLICATE_ELEM) ? true : false
  };
  _b.getRepeatedElement = function(A) {
   while (A && A.nodeType == 1 && A.tagName != "BODY") {
    if (base2.DOM.HTMLElement.hasClass(A, this.CSS_REMOVEABLE) || base2.DOM.HTMLElement.hasClass(A, this.CSS_REPEATABLE)) {
     return A
    }
    A = A.parentNode
   }
   return null
  };
  _b.isHandled = function(A) {
   return A.getAttribute(this.ATTR_HANDLED)
  };
  _b.getMasterSection = function(A) {
   if (!this.isDuplicate(A)) {
    return false
   }
   if (A[this.ATTR_MASTER_SECTION]) {
    return document.getElementById(A[this.ATTR_MASTER_SECTION])
   } else {
    A = A.previousSibling;
    while (A && (A.nodeType != 1 || !this.isMaster(A))) {
     A = A.previousSibling
    }
    return A
   }
  };
  _b.observeMasterIdChange = function(A) {
   this.stopObservingMasterIdChange(A);
   this._callbacks.onMasterIdChange.push(A)
  };
  _b.stopObservingMasterIdChange = function(B) {
   for (var A = 0; A < this._callbacks.onMasterIdChange.length; A++) {
    if (this._callbacks.onMasterIdChange[A].toString() == B.toString()) {
     this._callbacks.onMasterIdChange.splice(A, 1);
     return
    }
   }
  };
  _i.prototype.callMasterIdChangeObservers = function(B, A) {
   this._idUpdates.master[B] = A;
   for (var C = 0; C < this.behavior._callbacks.onMasterIdChange.length; C++) {
    this.behavior._callbacks.onMasterIdChange[C].call(window, B, A)
   }
  };
  _b.observeRepeatIdCreate = function(A) {
   this.stopObservingRepeatIdCreate(A);
   this._callbacks.onRepeatIdCreate.push(A)
  };
  _b.stopObservingRepeatIdCreate = function(B) {
   for (var A = 0; A < this._callbacks.onRepeatIdCreate.length; A++) {
    if (this._callbacks.onRepeatIdCreate[A].toString() == B.toString()) {
     this._callbacks.onRepeatIdCreate.splice(A, 1);
     return
    }
   }
  };
  _i.prototype.callRepeatIdCreateObservers = function(B, C) {
   this._idUpdates.repeat[B] = C;
   for (var A = 0; A < this.behavior._callbacks.onRepeatIdCreate.length; A++) {
    this.behavior._callbacks.onRepeatIdCreate[A].call(window, B, C)
   }
  };
  _b.observeRepeatStart = function(A) {
   this.stopObservingRepeatStart(A);
   this._callbacks.onRepeatStart.push(A)
  };
  _b.stopObservingRepeatStart = function(B) {
   for (var A = 0; A < this._callbacks.onRepeatStart.length; A++) {
    if (this._callbacks.onRepeatStart[A].toString() == B.toString()) {
     this._callbacks.onRepeatStart.splice(A, 1);
     return
    }
   }
  };
  _i.prototype.callRepeatStartObservers = function(B) {
   for (var A = 0; A < this.behavior._callbacks.onRepeatStart.length; A++) {
    this.behavior._callbacks.onRepeatStart[A].call(window, B)
   }
  };
  _b.observeRepeatComplete = function(A) {
   this.stopObservingRepeatComplete(A);
   this._callbacks.onRepeat.push(A)
  };
  _b.stopObservingRepeatComplete = function(B) {
   for (var A = 0; A < this._callbacks.onRepeat.length; A++) {
    if (this._callbacks.onRepeat[A].toString() == B.toString()) {
     this._callbacks.onRepeat.splice(A, 1);
     return
    }
   }
  };
  _i.prototype.callRepeatCompleteObservers = function(B, D) {
   function C(G) {
    if (G == null || typeof(G) != "object") {
     return G
    }
    var E = G.constructor();
    for (var F in G) {
     if (G.hasOwnProperty(F)) {
      E[F] = C(G[F])
     }
    }
    return E
   }
   for (var A = 0; A < this.behavior._callbacks.onRepeat.length; A++) {
    this.behavior._callbacks.onRepeat[A].call(window, B, D, C(this._idUpdates))
   }
   this._idUpdates = {
    "master": {},
    "repeat": {}
   }
  };
  _b.observeRemoveComplete = function(A) {
   this.stopObservingRemoveComplete(A);
   this._callbacks.onRemove.push(A)
  };
  _b.stopObservingRemoveComplete = function(B) {
   for (var A = 0; A < this._callbacks.onRemove.length; A++) {
    if (this._callbacks.onRemove[A].toString() == B.toString()) {
     this._callbacks.onRemove.splice(A, 1);
     return
    }
   }
  };
  _i.prototype.callRemoveCompleteObservers = function(B) {
   for (var A = 0; A < this.behavior._callbacks.onRemove.length; A++) {
    this.behavior._callbacks.onRemove[A].call(window, B)
   }
  };
  _i.prototype.run = function(B) {
   if (!wFORMS.LOADER.enabled) {
    this.duplicateSection(this.target)
   } else {
    var A = this;
    wFORMS.LOADER.show(A.target);
    setTimeout(function() {
     A.duplicateSection(A.target);
     wFORMS.LOADER.hide(A.target, true)
    }, 1)
   }
   if (B) {
    B.preventDefault()
   }
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors["condition"] = (function() {
   var DELIMITER = "`";
   var CONDITIONAL_ATTRIBUTE_NAME = "data-condition";
   var TRIGGER_CONDITIONALS = "data-conditionals";
   var TRIGGER_DEFAULT_ENABLED = true;
   var DEFAULT_NON_EXIST_TRIGGER_VALUE = false;

   function _renameTriggers(masterRenameTable, referenceConditionalClones, involvedConditionals) {
    involvedConditionals = involvedConditionals || [];
    var renamedTriggers = reduce(masterRenameTable, function(renamed, original, sum) {
     if (!(new Trigger(renamed)).isValid()) {
      return sum
     }
     sum[original] = renamed;
     return sum
    }, {});
    var renamedConditionals = reduce(masterRenameTable, function(renamed, original, sum) {
     if (!(new Conditional(renamed)).isValid()) {
      return sum
     }
     sum[original] = renamed;
     return sum
    }, {});
    map(renamedTriggers, function(newName, original) {
     var trigger = new Trigger(newName);
     var conditionals = trigger.getConditionals();
     map(conditionals, function(conditional) {
      var currentConditionalName = renamedConditionals[conditional.getIdentifier()] || conditional.getIdentifier();
      var conditionalsToChange = [currentConditionalName];
      if (referenceConditionalClones[currentConditionalName]) {
       conditionalsToChange.push(referenceConditionalClones[currentConditionalName])
      }
      map(conditionalsToChange, function(identifier) {
       conditional = new Conditional(identifier);
       if (!conditional.isValid()) {
        return
       }
       conditional.unlinkTriggers();
       conditional.replaceTrigger(original, newName);
       involvedConditionals.push(identifier);
       conditional.linkTriggers()
      })
     })
    })
   }

   function _renameConditionals(idMappings, involvedConditionals) {
    var repeat = idMappings.repeat;
    var renamedConditionals = reduce(repeat, function(renamed, original, sum) {
     if (!(new Conditional(renamed)).isValid()) {
      return sum
     }
     sum[original] = renamed;
     return sum
    }, {});
    var conditionals = map(renamedConditionals, function(newClone, oldName) {
     return newClone
    });
    if (!isObjectEmpty(idMappings.master)) {
     conditionals = conditionals.concat(map(renamedConditionals, function(newClone, oldName) {
      return oldName
     }))
    }
    map(conditionals, function(identifier) {
     var conditional = new Conditional(identifier);
     conditional.unlinkTriggers();
     conditional.linkTriggers();
     involvedConditionals.push(identifier)
    })
   }

   function _consolidateTriggers(repeatMapping, masterNode, duplicateNode, involvedConditionals) {
    involvedConditionals = involvedConditionals || [];
    var clonedTriggers = reduce(repeatMapping, function(cloneName, original, sum) {
     if (!(new Trigger(original)).isValid()) {
      return sum
     }
     sum[original] = cloneName;
     return sum
    }, {});
    map(clonedTriggers, function(cloneName, original) {
     var trigger = new Trigger(original);
     var conditionals = trigger.getConditionals();
     map(conditionals, function(conditional) {
      if (!conditional.isValid()) {
       return
      }
      var conditionalElement = conditional.getConditionalElement();
      if (!conditionalElement) {
       return
      }
      if (isDescendantOf(conditionalElement, masterNode)) {
       return
      }
      var replacement;
      if (isDescendantOf(conditionalElement, duplicateNode)) {
       replacement = cloneName
      } else {
       replacement = {
        "OR": [original, cloneName]
       }
      }
      conditional.unlinkTriggers();
      conditional.replaceTrigger(original, replacement);
      conditional.linkTriggers();
      involvedConditionals.push(conditional.getIdentifier())
     })
    })
   }

   function _detachConditionals(removedNode) {
    var conditionalDOMs = base2.DOM.Element.querySelectorAll(removedNode, "[" + CONDITIONAL_ATTRIBUTE_NAME + "]");
    var conditionals = [];
    conditionalDOMs.forEach(function(conditionalDOM) {
     conditionals.push(new Conditional(conditionalDOM, removedNode))
    });
    map(conditionals, function(conditional) {
     conditional.unlinkTriggers()
    })
   }

   function _detachTriggers(removedNode) {
    var triggerDOMs = base2.DOM.Element.querySelectorAll(removedNode, "[" + TRIGGER_CONDITIONALS + "]");
    var triggers = [];
    triggerDOMs.forEach(function(triggerDOM) {
     triggers.push(new Trigger(triggerDOM, removedNode))
    });
    map(triggers, function(trigger) {
     var conditionals = trigger.getConditionals();
     map(conditionals, function(conditional) {
      if (!conditional.isValid()) {
       return
      }
      var conditionalElement = conditional.getConditionalElement();
      if (!isDescendantOf(conditionalElement, removedNode)) {
       conditional.detach(trigger.getIdentifier())
      }
     })
    })
   }

   function _preprocessParameter(idMappings) {
    function _replace(renamed, original, sum) {
     sum[_escapeQuerySelector("#" + original)] = _escapeQuerySelector("#" + renamed);
     return sum
    }
    idMappings.master = reduce(idMappings.master, _replace, {});
    idMappings.repeat = reduce(idMappings.repeat, _replace, {});
    return idMappings
   }

   function _escapeQuerySelector(selector) {
    if (!selector || selector === "") {
     return null
    }
    return selector.replace(/\[(\d+)\]/g, function($, $1) {
     return "\\[" + $1 + "\\]"
    })
   }

   function map(enumerable, callback) {
    if (!enumerable) {
     return null
    }
    var result = [];
    if (enumerable instanceof Array) {
     for (var i = 0, l = enumerable.length; i < l; i++) {
      result.push(callback(enumerable[i], i))
     }
    } else {
     if (typeof enumerable === "object") {
      for (var key in enumerable) {
       if (typeof key === "undefined") {
        continue
       }
       result.push(callback(enumerable[key], key))
      }
     } else {
      return null
     }
    }
    return result
   }

   function filter(enumerable, callback) {
    var result = [];
    map(enumerable, function(element) {
     if (callback.apply(null, arguments)) {
      result.push(element)
     }
    });
    return result
   }

   function extend() {
    var extendee = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
     var attributes = arguments[i];
     for (var key in attributes) {
      extendee[key] = attributes[key]
     }
    }
    return extendee
   }

   function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "")
   }

   function reduce(enumerable, callback, sum) {
    sum = sum || {};
    map(enumerable, function(value, key) {
     sum = callback.call(window, value, key, sum)
    });
    return sum
   }

   function removeDuplicates(enumerable) {
    var hash = {};
    var result = [];
    map(enumerable, function(value) {
     if (!hash[value]) {
      result.push(value);
      hash[value] = 1
     }
    });
    return result
   }

   function getOrAssignID(domElement) {
    if (!isHTMLElement(domElement)) {
     throw new Error("not a dom element")
    }
    var id;
    return domElement.getAttribute("id") || (id = wFORMS.helpers.randomId() && (domElement.setAttribute("id", id) || id))
   }

   function isDescendantOf(child, parent) {
    while (child) {
     if (child.parentNode === parent) {
      return true
     }
     child = child.parentNode
    }
    return false
   }

   function isObjectEmpty(object) {
    return (filter(object, function() {
     return true
    })).length === 0
   }
   var inArray = wFORMS.helpers.contains;
   var isHTMLElement = wFORMS.helpers.isHTMLElement;
   var Conditional = (function() {
    function Conditional(domElementIdentifier, referenceDOMTree) {
     this._conditionalDomIdentifier = domElementIdentifier;
     if (typeof domElementIdentifier !== "string") {
      var domElement = domElementIdentifier;
      this._conditionalDomIdentifier = "#" + getOrAssignID(domElement);
      if (!isHTMLElement(domElement) || !domElement.hasAttribute(CONDITIONAL_ATTRIBUTE_NAME)) {
       throw new Error("this element doesn't have a \"" + CONDITIONAL_ATTRIBUTE_NAME + '" attribute')
      }
     }
     this._conditionalDomIdentifier = _escapeQuerySelector(this._conditionalDomIdentifier);
     this.referenceDOMTree = referenceDOMTree || document
    }

    function PolishExpression(operator, operands) {
     this.operator = (operator + "").toUpperCase();
     this.operands = operands
    }
    extend(PolishExpression.prototype, {
     toStringy: function() {
      var components = map(this.operands, function(operand) {
       if (operand instanceof PolishExpression) {
        return operand.toStringy()
       }
       return " " + operand + " "
      });
      if (this.operator === "NOT") {
       var component = this.operands[0];
       if (component instanceof PolishExpression) {
        return " ( NOT" + components[0] + ") "
       }
       return " ( NOT (" + components[0] + ") ) "
      }
      if (components.length > 1) {
       return " (" + components.join(this.operator) + ") "
      }
      return components[0]
     }
    });
    var COMPONENT_PATTERN = new RegExp(" ?" + DELIMITER + "([^" + DELIMITER + "]+)" + DELIMITER + " ?", "g");
    var COMPOUND_COMPONENT_PATTERN = new RegExp("((AND)|(OR))\\s*" + DELIMITER + "([^" + DELIMITER + "]+)" + DELIMITER, "g");
    var BRACKETED_SINGLE_TRIGGER_PATTERN = new RegExp("\\(\\s*" + DELIMITER + "([^" + DELIMITER + "]+)" + DELIMITER + "\\s*\\)", "g");

    function _getActiveTriggers(instance) {
     var triggers = instance.getTriggers();
     return filter(triggers, function(trigger) {
      return trigger.getTriggerElement() !== null
     })
    }

    function _mergeImplicitRules() {
     var rule = this.getConditionRuleString();
     var replaceRule = false;
     var domElement = this.getConditionalElement();
     var parentElement = domElement.parentNode;
     while (parentElement && parentElement.nodeType == 1) {
      var parentRule = parentElement.getAttribute(CONDITIONAL_ATTRIBUTE_NAME);
      if (parentRule && rule.indexOf("AND (" + parentRule + ")") === -1) {
       rule = "(" + rule + ") AND (" + parentRule + ")";
       replaceRule = true
      }
      parentElement = parentElement.parentNode
     }
     if (replaceRule) {
      this.unlinkTriggers();
      domElement.setAttribute(CONDITIONAL_ATTRIBUTE_NAME, rule);
      this.linkTriggers()
     }
    }
    extend(Conditional.prototype, {
     getConditionRuleString: function() {
      var domElement = this.getConditionalElement();
      if (!domElement) {
       return null
      }
      return domElement.getAttribute(CONDITIONAL_ATTRIBUTE_NAME)
     },
     getTriggers: function() {
      var conditionRuleString = this.getConditionRuleString();
      if (!conditionRuleString) {
       return null
      }
      var triggerIdentifiers = [],
       match;
      COMPONENT_PATTERN.lastIndex = 0;
      while (match = COMPONENT_PATTERN.exec(conditionRuleString)) {
       triggerIdentifiers.push(match[1])
      }
      return map(triggerIdentifiers, function(identifier) {
       var e;
       try {
        return new Trigger(identifier)
       } catch (e) {
        return null
       }
      })
     },
     getConditionalElement: function() {
      try {
       return base2.DOM.Element.querySelector(this.referenceDOMTree, this._conditionalDomIdentifier)
      } catch (e) {
       return null
      }
     },
     getIdentifier: function() {
      return this._conditionalDomIdentifier
     },
     equals: function(conditional) {
      if (this.getIdentifier() === conditional.getIdentifier()) {
       return true
      }
      var domElementOne = this.getConditionalElement();
      var domElementAnother = conditional.getConditionalElement();
      if (!domElementAnother || !domElementOne) {
       return false
      }
      return domElementAnother === domElementOne
     },
     linkTriggers: function() {
      map(_getActiveTriggers(this), function(conditional) {
       return function(trigger) {
        trigger.addConditional(conditional)
       }
      }(this))
     },
     unlinkTriggers: function() {
      map(_getActiveTriggers(this), function(conditional) {
       return function(trigger) {
        trigger.removeConditional(conditional)
       }
      }(this))
     },
     refresh: function() {
      if (this.isConditionMet()) {
       this.show()
      } else {
       this.hide()
      }
      var b = wFORMS.getBehaviorInstance(wFORMS.helpers.getForm(this.getConditionalElement()), "paging");
      if (b) {
       b.setupManagedControls()
      }
     },
     isConditionMet: function() {
      _mergeImplicitRules.call(this);
      var conditionRuleString = this.getConditionRuleString();
      if (!conditionRuleString) {
       throw new Error("The inferred DOM element doesn't have a rule string")
      }
      COMPONENT_PATTERN.lastIndex = 0;
      var rawBooleanExpression = conditionRuleString.replace(COMPONENT_PATTERN, function($, $sub) {
       var trigger = new Trigger($sub);
       return trigger.getValue() ? "true" : "false"
      });
      var booleanExpression = rawBooleanExpression.replace(/AND/g, " && ").replace(/OR/g, " || ").replace(/NOT/g, " ! ");
      return eval(booleanExpression)
     },
     show: function() {
      var n = this.getConditionalElement();
      var id = n.id;
      if (n.tagName == "INPUT" || n.tagName == "SELECT" || n.tagName == "TEXTAREA" || base2.DOM.HTMLElement.hasClass(n, "choices")) {
       var p = n.parentNode;
       while (p && p.nodeType == 1 && !base2.DOM.HTMLElement.hasClass(p, "oneField")) {
        p = p.parentNode
       }
       if (p && p.nodeType == 1 && base2.DOM.HTMLElement.hasClass(p, "oneField")) {
        n = p
       } else {
        if (n.tagName == "INPUT") {
         if (n._wforms_disabled) {
          n.removeAttribute("disabled")
         }
         if (n.getAttribute(TRIGGER_CONDITIONALS)) {
          (new Trigger(n)).trigger()
         }
         this.flagCalculationForUpdate(n)
        }
       }
      } else {
       if (base2.DOM.HTMLElement.hasClass(n, "pageSection")) {
        n = n.parentNode
       }
      }
      var self = this;
      var _traverse = function(element) {
       switch (element.tagName) {
        case "INPUT":
         if (element._wforms_disabled && element.getAttribute("data-wforms-nooverwrite") !== "disabled" || (element.type !== "radio" && element.type !== "checkbox")) {
          element.removeAttribute("disabled")
         }
         if (element.getAttribute(TRIGGER_CONDITIONALS)) {
          (new Trigger(element)).trigger()
         }
         self.flagCalculationForUpdate(element);
         break;
        case "TEXTAREA":
         if (element._wforms_disabled) {
          element.removeAttribute("disabled")
         }
         self.flagCalculationForUpdate(element);
         break;
        case "SELECT":
         if (element._wforms_disabled && element.getAttribute("data-wforms-nooverwrite") !== "disabled") {
          element.removeAttribute("disabled")
         }
         var opts = element.getElementsByTagName("OPTION");
         for (var j = 0; j < opts.length; j++) {
          if (opts[j].getAttribute(TRIGGER_CONDITIONALS)) {
           (new Trigger(opts[j])).trigger()
          }
         }
         self.flagCalculationForUpdate(element);
         break;
        default:
         for (var i = 0; i < element.childNodes.length; i++) {
          if (element.childNodes[i].nodeType == 1 && !wFORMS.behaviors.condition.hasOffState(element.childNodes[i])) {
           _traverse(element.childNodes[i])
          }
         }
         break
       }
      };
      _traverse(n);
      var s = document.getElementById("tfa_switchedoff");
      if (s) {
       if (s.value) {
        var v = s.value.split(",")
       } else {
        var v = []
       }
       for (var i in v) {
        if (v[i] == id) {
         v.splice(i, 1);
         s.value = v.join(",");
         break
        }
       }
      }
      base2.DOM.HTMLElement.removeClass(n, "offstate");
      var repInst = wFORMS.getBehaviorInstance(n, "repeat");
      if (repInst && repInst.behavior.isHandled(n)) {
       base2.DOM.HTMLElement.removeClass(repInst.getOrCreateRepeatLink(n), "offstate")
      }
      if (wFORMS.behaviors["condition"].onShow) {
       wFORMS.behaviors["condition"].onShow(this)
      }
     },
     hide: function() {
      var n = this.getConditionalElement();
      var id = n.id;
      if (n.tagName == "INPUT" || n.tagName == "SELECT" || n.tagName == "TEXTAREA" || base2.DOM.HTMLElement.hasClass(n, "choices")) {
       var p = n.parentNode;
       while (p && p.nodeType == 1 && !base2.DOM.HTMLElement.hasClass(p, "oneField")) {
        p = p.parentNode
       }
       if (p && p.nodeType == 1 && base2.DOM.HTMLElement.hasClass(p, "oneField")) {
        n = p
       } else {
        if (n.tagName == "INPUT") {
         n.disabled = true;
         n._wforms_disabled = true;
         if (n.getAttribute(TRIGGER_CONDITIONALS)) {
          (new Trigger(n)).trigger()
         }
         this.flagCalculationForUpdate(n)
        }
       }
      } else {
       if (base2.DOM.HTMLElement.hasClass(n, "pageSection")) {
        n = n.parentNode
       }
      }
      var flds = n.getElementsByTagName("INPUT");
      for (var i = 0; i < flds.length; i++) {
       flds[i].disabled = true;
       flds[i]._wforms_disabled = true;
       if (flds[i].getAttribute(TRIGGER_CONDITIONALS)) {
        (new Trigger(flds[i])).trigger()
       }
       this.flagCalculationForUpdate(flds[i])
      }
      var flds = n.getElementsByTagName("TEXTAREA");
      for (var i = 0; i < flds.length; i++) {
       flds[i].disabled = true;
       flds[i]._wforms_disabled = true;
       this.flagCalculationForUpdate(flds[i])
      }
      var flds = n.getElementsByTagName("SELECT");
      for (var i = 0; i < flds.length; i++) {
       flds[i].disabled = true;
       flds[i]._wforms_disabled = true;
       var opts = flds[i].getElementsByTagName("OPTION");
       for (var j = 0; j < opts.length; j++) {
        if (opts[j].getAttribute(TRIGGER_CONDITIONALS)) {
         (new Trigger(opts[j])).trigger()
        }
       }
       this.flagCalculationForUpdate(flds[i])
      }
      var s = document.getElementById("tfa_switchedoff");
      if (s) {
       if (s.value) {
        var v = s.value.split(",")
       } else {
        var v = []
       }
       for (var i in v) {
        if (v[i] == id) {
         v.splice(i, 1);
         break
        }
       }
       v.push(id);
       s.value = v.join(",")
      }
      base2.DOM.HTMLElement.addClass(n, "offstate");
      var repInst = wFORMS.getBehaviorInstance(n, "repeat");
      if (repInst && repInst.behavior.isHandled(n)) {
       base2.DOM.HTMLElement.addClass(repInst.getOrCreateRepeatLink(n), "offstate")
      }
      if (wFORMS.behaviors["condition"].onHide) {
       wFORMS.behaviors["condition"].onHide(this)
      }
     },
     isValid: function() {
      return this.getConditionalElement() && this.getConditionRuleString()
     },
     replaceTrigger: function(oldTrigger, replacement) {
      if (typeof replacement === "string") {
       replacement = {
        "AND": replacement
       }
      }
      replacement = Conditional.makeConditionRules(replacement);
      var conditionRuleString = this.getConditionRuleString();
      if (!conditionRuleString) {
       throw new Error("The inferred DOM element doesn't have a rule string")
      }
      COMPONENT_PATTERN.lastIndex = 0;
      conditionRuleString = conditionRuleString.replace(COMPONENT_PATTERN, function($, $sub) {
       if ($sub === oldTrigger) {
        return replacement
       }
       return $
      });
      (this.getConditionalElement()).setAttribute(CONDITIONAL_ATTRIBUTE_NAME, conditionRuleString)
     },
     detach: function(trigger) {
      var conditionRuleString = this.getConditionRuleString();
      if (!conditionRuleString) {
       throw new Error("The inferred DOM element doesn't have a rule string")
      }
      COMPOUND_COMPONENT_PATTERN.lastIndex = 0;
      conditionRuleString = conditionRuleString.replace(COMPOUND_COMPONENT_PATTERN, function($) {
       var triggerName = _escapeQuerySelector(arguments[4]);
       if (triggerName === trigger) {
        return ""
       }
       return $
      });
      BRACKETED_SINGLE_TRIGGER_PATTERN.lastIndex = 0;
      conditionRuleString = conditionRuleString.replace(BRACKETED_SINGLE_TRIGGER_PATTERN, function($, $1) {
       return DELIMITER + $1 + DELIMITER
      });
      (this.getConditionalElement()).setAttribute(CONDITIONAL_ATTRIBUTE_NAME, conditionRuleString)
     },
     flagCalculationForUpdate: function(element) {
      if (!wFORMS.behaviors.condition.calculationInstance) {
       wFORMS.behaviors.condition.calculationInstance = wFORMS.getBehaviorInstance(wFORMS.helpers.getForm(element), "calculation")
      }
      var calc = wFORMS.behaviors.condition.calculationInstance;
      if (calc) {
       if (calc.isVariable(element)) {
        var fields = calc.getCalculatedFields(element);
        for (var i = 0; i < fields.length; i++) {
         wFORMS.behaviors.condition._dirtyCalculations[fields[i].id] = fields[i]
        }
       }
      }
     }
    });
    return extend(Conditional, {
     makeConditionRules: function(relationshipObject) {
      function transform(leafNode) {
       var value = leafNode,
        id;
       if (isHTMLElement(leafNode)) {
        value = leafNode.getAttribute("id") || (id = wFORMS.helpers.randomId()) && (leafNode.setAttribute("id", id) || id);
        value = "#" + value
       }
       return DELIMITER + value + DELIMITER
      }

      function _isObjectDescribingGroup(object) {
       if (object instanceof Array) {
        return true
       }
       if (object.constructor !== Object) {
        return false
       }
       var properties = map(object, function(value, key) {
        return key
       });
       return properties.length > 1
      }

      function _isLeaf(node) {
       if (typeof node === "string" || isHTMLElement(node)) {
        return true
       }
       var notTerminalProperties = filter(node || {}, function(value, key) {
        return inArray(["NOT", "AND", "OR"], (key || "").toUpperCase())
       });
       return !notTerminalProperties || notTerminalProperties.length === 0
      }

      function _expandGroup(node) {
       return filter(map(node, function(value, key) {
        var obj = {};
        obj[(key || "").toUpperCase()] = value;
        return obj
       }), function(entry) {
        var keys = map(entry, function(value, key) {
         return key
        });
        return inArray(["NOT", "AND", "OR"], keys[0])
       })
      }

      function _unpackObject(object) {
       var transformed = {};
       map(object, function(value, key) {
        transformed.name = key;
        transformed.value = value
       });
       return transformed
      }

      function recursive(node) {
       node = node || {};
       if (_isLeaf(node)) {
        return transform(node)
       }
       if (_isObjectDescribingGroup(node)) {
        return new PolishExpression("AND", map(_expandGroup(node), recursive))
       }
       var nonTerminal = _unpackObject(node);
       var value = nonTerminal.value;
       if (!(value instanceof Array)) {
        value = [value]
       }
       var children = [];
       map(value, function(element) {
        var result = recursive(element);
        if (result instanceof Array) {
         children = children.concat(result)
        } else {
         children.push(result)
        }
       });
       return new PolishExpression(nonTerminal.name, children)
      }
      var result = recursive(relationshipObject);
      return (result && result.toStringy()) || null
     }
    })
   })();
   var Trigger = (function() {
    function Trigger(domElement, referenceDOMTree) {
     var identifier = domElement;
     if (typeof domElement !== "string") {
      identifier = "#" + getOrAssignID(domElement)
     }
     this._triggerElementIdentifier = _escapeQuerySelector(identifier);
     this.referenceDOMTree = referenceDOMTree || document
    }

    function _retrieveConditionals(instance) {
     var triggerDOMElement = instance.getTriggerElement();
     if (!triggerDOMElement) {
      return []
     }
     var conditionalsDef = triggerDOMElement.getAttribute(TRIGGER_CONDITIONALS);
     if (!conditionalsDef) {
      return []
     }
     return map(conditionalsDef.split(","), function(conditionalSelector) {
      var e;
      try {
       return new Conditional(trim(conditionalSelector))
      } catch (e) {
       return null
      }
     })
    }

    function _conditionalToPattern(conditionals) {
     return map(conditionals, function(conditonal) {
      return conditonal.getIdentifier()
     }).join(",")
    }

    function _storeConditionalsToPatternAttribute(instance, conditionals) {
     conditionals = filter(conditionals, function(conditional) {
      return conditional instanceof Conditional
     });
     if (!conditionals) {
      return null
     }
     var domElement = instance.getTriggerElement();
     if (!isHTMLElement(domElement)) {
      throw new Error("Cannot store Conditionals to this Trigger object. The inferred DOM object doesn't exist")
     }
     var pattern = _conditionalToPattern(conditionals);
     domElement.setAttribute(TRIGGER_CONDITIONALS, pattern);
     return pattern
    }
    extend(Trigger.prototype, {
     attachedConditionals: [],
     _getConditionalsPattern: function() {
      return _conditionalToPattern(this.getConditionals())
     },
     setEventListener: function() {
      var n = this.getTriggerElement();
      if (n && n.tagName == "OPTION") {
       while (n && n.tagName != "SELECT") {
        n = n.parentNode
       }
      }
      if (!n || n.__wforms_event_handled) {
       return
      }
      if (n.tagName == "INPUT" && n.getAttribute("type") == "radio") {
       var radioButtons = n.form[n.getAttribute("name")];
       if (!radioButtons.length) {
        radioButtons = [radioButtons]
       }
       for (var i = 0; i < radioButtons.length; i++) {
        var radioButton = radioButtons[i];
        base2.DOM.Element.addEventListener(radioButton, "click", EventHandlers.onChange, false);
        radioButton.__wforms_event_handled = true
       }
      } else {
       if (n.tagName == "INPUT" && n.getAttribute("type") == "checkbox") {
        base2.DOM.Element.addEventListener(n, "click", EventHandlers.onChange, false);
        n.__wforms_event_handled = true
       } else {
        base2.DOM.Element.addEventListener(n, "change", EventHandlers.onChange, false);
        n.__wforms_event_handled = true
       }
      }
     },
     getIdentifier: function() {
      return this._triggerElementIdentifier
     },
     getTriggerElement: function() {
      try {
       return base2.DOM.Element.querySelector(this.referenceDOMTree, this._triggerElementIdentifier)
      } catch (e) {
       return null
      }
     },
     getValue: function() {
      var triggerElement = this.getTriggerElement();
      if (!triggerElement) {
       return DEFAULT_NON_EXIST_TRIGGER_VALUE
      }
      if (triggerElement.disabled && triggerElement.getAttribute("data-wforms-nooverwrite") != "disabled") {
       return false
      }
      if (triggerElement.tagName === "OPTION") {
       var p = triggerElement.parentNode;
       while (p && p.tagName != "SELECT") {
        p = p.parentNode
       }
       if (p && p.disabled && p.getAttribute("data-wforms-nooverwrite") != "disabled") {
        return false
       }
      }
      if (triggerElement.tagName === "INPUT") {
       var type = base2.DOM.Element.getAttribute(triggerElement, "type");
       if (type === "checkbox" || type === "radio") {
        return triggerElement.checked ? true : false
       } else {
        if (type === "text") {
         return trim(triggerElement.value).length !== 0
        }
       }
      } else {
       if (triggerElement.tagName === "TEXTAREA") {
        return trim(triggerElement.value).length !== 0
       } else {
        if (triggerElement.tagName === "OPTION") {
         return triggerElement.selected
        } else {
         if (triggerElement.tagName === "SELECT") {
          if (triggerElement.selectedIndex > 0) {
           return true
          }
          for (var i = 0, l = triggerElement.options.length; i < l; i++) {
           var option = triggerElement.options[i];
           if (option.selected && trim(option.value).length > 0) {
            return true
           }
          }
          return false
         }
        }
       }
      }
      return false
     },
     getConditionals: function() {
      return _retrieveConditionals(this)
     },
     replaceConditionals: function(conditionals) {
      return _storeConditionalsToPatternAttribute(this, conditionals)
     },
     addConditional: function(conditional) {
      var existingConditionals = this.getConditionals();
      var duplicatedEntries = filter(existingConditionals, function(_conditional) {
       return _conditional.equals(conditional)
      });
      if (duplicatedEntries.length !== 0) {
       return null
      }
      existingConditionals.push(conditional);
      return _storeConditionalsToPatternAttribute(this, existingConditionals)
     },
     removeConditional: function(conditional) {
      var existingConditionals = this.getConditionals();
      var unduplicatedEntries = filter(existingConditionals, function(_conditional, index) {
       return !_conditional.equals(conditional)
      });
      return _storeConditionalsToPatternAttribute(this, unduplicatedEntries)
     },
     trigger: function() {
      var element = this.getTriggerElement();
      if (wFORMS.behaviors.condition._triggerChain && (element.id in wFORMS.behaviors.condition._triggerChain)) {
       return
      } else {
       wFORMS.behaviors.condition._triggerChain[element.id] = true;
       var activeConditionals = filter(this.getConditionals(), function(conditional) {
        return conditional && conditional.getConditionalElement()
       });
       map(activeConditionals, function(conditional) {
        conditional.refresh()
       })
      }
     },
     isValid: function() {
      var triggerDOMElement;
      return (triggerDOMElement = this.getTriggerElement()) && triggerDOMElement.getAttribute(TRIGGER_CONDITIONALS)
     }
    });
    return Trigger
   })();
   var EventHandlers = {
    onChange: function(event) {
     var target = event.target;
     if (!target) {
      return
     }
     wFORMS.behaviors.condition.resetTriggerExecutionChain();
     if (target.tagName === "SELECT") {
      for (var i = 0; i < target.options.length; i++) {
       var o = target.options[i];
       if (o.getAttribute(TRIGGER_CONDITIONALS)) {
        (new Trigger(o)).trigger()
       }
      }
     } else {
      if (target.tagName === "INPUT" && target.getAttribute("type") === "radio") {
       var name = target.getAttribute("name");
       var radioButtons = target.form[name];
       if (!radioButtons.length) {
        radioButtons = [radioButtons]
       }
       for (var i = 0; i < radioButtons.length; i++) {
        var radioButton = radioButtons[i];
        (new Trigger(radioButton)).trigger()
       }
      } else {
       if (target.getAttribute(TRIGGER_CONDITIONALS)) {
        (new Trigger(target)).trigger()
       }
      }
     }
     if (wFORMS.instances["responsive"] && wFORMS.instances["responsive"][0]) {
      for (i = 0; i < wFORMS.instances["responsive"].length; i++) {
       wFORMS.instances["responsive"][i].handleAllMatrixLayouts();
       wFORMS.instances["responsive"][i].handleAllGridLayouts()
      }
     }
     wFORMS.behaviors.condition.updateCalculations()
    },
    onRepeatableDuplicated: function(masterNode, duplicateNode, idMappings) {
     var involvedConditionals = [];
     wFORMS.behaviors.condition.resetTriggerExecutionChain();
     idMappings = _preprocessParameter(idMappings);
     var conditionalMapping = reduce(idMappings.repeat, function(mappedTo, original, sum) {
      if (!(new Conditional(original)).isValid()) {
       return sum
      }
      sum[original] = mappedTo;
      return sum
     }, {});
     _renameTriggers(idMappings.master, conditionalMapping, involvedConditionals);
     _renameConditionals(idMappings, involvedConditionals);
     _consolidateTriggers(idMappings.repeat, masterNode, duplicateNode, involvedConditionals);
     map(removeDuplicates(involvedConditionals), function(conditionalIdentifier) {
      var conditional = new Conditional(conditionalIdentifier);
      conditional.refresh()
     });
     wFORMS.behaviors.condition.updateCalculations()
    },
    onRepeatableRemoved: function(removedCopy) {
     _detachConditionals(removedCopy);
     _detachTriggers(removedCopy);
     wFORMS.behaviors.condition.updateCalculations()
    }
   };
   return {
    skip: false,
    onHide: function(hiddenConditional) {},
    onShow: function(shownConditional) {},
    onSetupFinish: function(setupElement) {},
    applyTo: function(domElement) {
     if (wFORMS.behaviors.condition.skip) {
      return null
     }
     this.resetTriggerExecutionChain();
     var triggersElements = base2.DOM.Element.querySelectorAll(domElement, "[" + TRIGGER_CONDITIONALS + "]");
     triggersElements.forEach(function(triggerElement) {
      var trigger = new Trigger(triggerElement);
      trigger.trigger();
      trigger.setEventListener()
     });
     wFORMS.behaviors.condition.updateCalculations();
     if (triggersElements.length > 0) {
      if (wFORMS.behaviors.repeat) {
       wFORMS.behaviors.repeat.observeRepeatComplete(EventHandlers.onRepeatableDuplicated);
       wFORMS.behaviors.repeat.observeRemoveComplete(EventHandlers.onRepeatableRemoved)
      }
     }
     this.onSetupFinish(domElement)
    },
    getConditional: function(domElement) {
     return new Conditional(domElement)
    },
    getTrigger: function(domElement) {
     return new Trigger(domElement)
    },
    Conditional: Conditional,
    Trigger: Trigger,
    mockup: function() {},
    isInitialized: function() {
     return initialized
    },
    hasOffState: function(n) {
     return base2.DOM.HTMLElement.hasClass(n, "offstate")
    },
    resetTriggerExecutionChain: function() {
     wFORMS.behaviors.condition._triggerChain = {};
     wFORMS.behaviors.condition._dirtyCalculations = {}
    },
    updateCalculations: function() {
     for (var id in wFORMS.behaviors.condition._dirtyCalculations) {
      var element = wFORMS.behaviors.condition._dirtyCalculations[id];
      if (!wFORMS.behaviors.condition.calculationInstance) {
       wFORMS.behaviors.condition.calculationInstance = wFORMS.getBehaviorInstance(wFORMS.helpers.getForm(element), "calculation")
      }
      wFORMS.behaviors.condition.calculationInstance.refresh(null, element)
     }
     wFORMS.behaviors.condition._dirtyCalculations = {}
    }
   }
  })();
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.validation = {
   skip: false,
   ERROR_PLACEHOLDER_SUFFIX: "-E",
   LOWER_BOUND_ATTRIBUTE: "min",
   UPPER_BOUND_ATTRIBUTE: "max",
   rules: {
    oneRequired: {
     selector: ".required-one",
     check: "validateOneRequired"
    },
    isRequired: {
     selector: ".required",
     check: "validateRequired"
    },
    isAlpha: {
     selector: ".validate-alpha",
     check: "validateAlpha"
    },
    isAlphanum: {
     selector: ".validate-alphanum",
     check: "validateAlphanum"
    },
    isDateTime: {
     selector: ".validate-datetime",
     check: "validateDateTime"
    },
    isDate: {
     selector: ".validate-date, .validate-datecal",
     check: "validateDate",
     range_verifier: "dateRangeTest",
     range_error_message: "rangeDate"
    },
    isTime: {
     selector: ".validate-time",
     check: "validateTime",
     range_verifier: "timeRangeTest",
     range_error_message: "rangeDate"
    },
    isEmail: {
     selector: ".validate-email",
     check: "validateEmail"
    },
    isInteger: {
     selector: ".validate-integer",
     check: "validateInteger",
     range_verifier: "numberRangeTest",
     range_error_message: "rangeNumber"
    },
    isFloat: {
     selector: ".validate-float",
     check: "validateFloat",
     range_verifier: "numberRangeTest",
     range_error_message: "rangeNumber"
    },
    isPhone: {
     selector: ".validate-phone",
     check: "validatePhone"
    },
    isCustom: {
     selector: ".validate-custom",
     check: "validateCustom"
    },
    wordCount: {
     selector: ".count-words",
     check: "validateWordCount"
    },
    isHostname: {
     selector: ".validate-hostname",
     check: "validateHostname"
    },
    restrictAutosuggest: {
     selector: '.wfAutosuggest[data-dataset-allow-free-responses="0"][id]',
     check: "validateRestrictAutosuggest"
    }
   },
   styling: {
    fieldError: "errFld",
    errorMessage: "errMsg",
    linkedErrorMessage: "linkedErrMsg",
    errorLink: "errLink"
   },
   messages: {
    oneRequired: "This section is required.",
    isRequired: "This field is required.",
    isAlpha: "The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",
    isEmail: "This does not appear to be a valid email address.",
    isInteger: "Please enter an integer.",
    isFloat: "Please enter a number (ex. 1.9).",
    isAlphanum: "Please use alpha-numeric characters only [a-z 0-9].",
    isDateTime: "This does not appear to be a valid date/time.",
    isDate: "This does not appear to be a valid date.",
    isTime: "This does not appear to be a valid time.",
    isPhone: "Please enter a valid phone number.",
    isCustom: "Please enter a valid value.",
    wordCount: "This field is over the word limit.",
    wordsRemPos: " words remaining",
    wordsRemNeg: " words over the limit",
    notification: "The form is not complete and has not been submitted yet. There was %% problem(s) with your submission.",
    rangeNumber: {
     max: "The value must be smaller than the upper bound %1",
     min: "The value must be greater than the lower bound %1",
     both: "The entered value must be between %1 - %2"
    },
    rangeDate: {
     max: "The date must be on or before %1.",
     min: "The date must be on or after %1.",
     both: "This date must be between %1 - %2.",
     cont: "This field determines the date range for %1.",
     dep: "Could not validated date. This field is dependent on %1.",
     link: "another field"
    },
    restrictAutosuggest: "You must select an item from the list",
    wait: "Please wait..."
   },
   instance: function(B) {
    this.behavior = wFORMS.behaviors.validation;
    this.target = B;
    var A = this;
    if (!B.__wFormsValidationHandled) {
     if (!B.addEventListener) {
      wFORMS.standardizeElement(B)
     }
     B.addEventListener("submit", function(C) {
      return A.run(C, this)
     }, false);
     B.__wFormsValidationHandled = true
    }
   },
   onPass: function(B, A) {},
   onFail: function(N, H) {
    var C = null;
    var L = 0;
    for (var B in N.elementsInError) {
     L++;
     if (!C) {
      C = B
     }
    }
    var E;
    if (L == 1) {
     E = wFORMS.behaviors.validation.messages.notification_0
    } else {
     E = wFORMS.behaviors.validation.messages.notification
    }
    E = E.replace("%%", L);
    if (wFORMS.behaviors.paging && wFORMS.behaviors.paging.showTabNavigation) {
     N.errorPages = new Array();
     var F = 9999;
     for (var B in N.elementsInError) {
      var J = wFORMS.behaviors.paging.helpers.findPage(document.getElementById(B));
      if (J) {
       var G = wFORMS.behaviors.paging.getPageIndex(J);
       if (G < F) {
        F = G
       }
       if (typeof N.errorPages[G] == "object") {
        N.errorPages[G].push(B)
       } else {
        N.errorPages[G] = new Array();
        N.errorPages[G].push(B)
       }
      }
     }
     var A = wFORMS.getBehaviorInstance(N.target, "paging");
     A.jumpTo(F);
     var M = base2.DOM.Element.querySelectorAll(N.target.parentNode, 'a[id^="' + A.behavior.CSS_PAGETAB + '"]');
     if (!M.forEach) {
      M = base2.JavaScript.Array2(M)
     }
     M.forEach(function(O) {
      if (!O.removeClass || !O.hasClass || !O.addClass) {
       wFORMS.standardizeElement(O)
      }
      O.removeClass("errMsg")
     });
     if (!N.errorPages.forEach) {
      N.errorPages = base2.JavaScript.Array2(N.errorPages)
     }
     N.errorPages.forEach(function(Q, O) {
      var P = base2.DOM.Element.querySelector(N.target.parentNode, "#" + A.behavior.CSS_PAGETAB + "_" + O);
      if (P) {
       if (!P.addClass) {
        wFORMS.standardizeElement(P)
       }
       P.addClass("errMsg")
      }
     })
    }
    var D = document.getElementById(C);
    if (D.scrollIntoView) {
     D.scrollIntoView()
    } else {
     location.hash = "#" + C
    }
    alert(E)
   },
   dateRegex: (function() {
    var D = "((January)|(February)|(March)|(April)|(May)|(June)|(July)|(August)|(September)|(October)|(November)|(December)|(Jan)|(Feb)|(Mar)|(Apr)|(May)|(Jun)|(Jul)|(Aug)|(Sep)|(Oct)|(Nov)|(Dec))";
    var L = "\\d{1,2}";
    var F = "(\\d{1,4}|\\d{1,2})";
    var E = "(" + L + "|" + D + ")";
    var H = "\\d{1,2}((th)|(rd)|(nd)|(st))?";
    var A = "\\s*[-/\\\\|\\,\\.]?\\s*";
    var C = "((" + E + A + H + ")|(" + H + A + E + ")|(" + E + "))";
    var J = "((" + F + A + C + ")|(" + C + A + F + ")|" + C + ")";
    var G = "((1[012]|[1-9])\\s*[:-]?\\s*([0-5][0-9])?\\s*(a|am|p|pm))";
    var B = "(([0-1]?[0-9]|2[0-4])\\s*[:-]?\\s*[0-5][0-9](\\s*[:-]?\\s*[0-5][0-9])?)";
    return [new RegExp("^" + J + "\\s+" + G + "$", "i"), new RegExp("^" + J + "\\s+" + B + "$", "i"), new RegExp("^" + G + "\\s+" + J + "$", "i"), new RegExp("^" + B + "\\s+" + J + "$", "i"), new RegExp("^" + J + "$", "i"), new RegExp("^" + G + "$", "i"), new RegExp("^" + B + "$", "i")]
   })()
  };
  wFORMS.behaviors.validation.rules.isDate.fail = function(B, C) {
   var A = this;

   function E(O, N, H) {
    var M = base2.DOM.HTMLDocument.querySelector(A.target, wFORMS.helpers.escapeQuerySelector("#" + O));
    var G = base2.DOM.HTMLDocument.querySelector(A.target, wFORMS.helpers.escapeQuerySelector("#" + N));
    if (H) {
     A.addErrorMessage(M, wFORMS.behaviors.validation.messages.rangeDate.cont, true)
    }
    var L = base2.DOM.HTMLDocument.querySelector(A.target, wFORMS.helpers.escapeQuerySelector("#" + M.id + wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX));
    var J = document.createElement("span");
    J.setAttribute("class", "errLink");
    J.textContent = wFORMS.behaviors.validation.messages.rangeDate.link;
    L.innerHTML = L.innerHTML.replace(/%1/, J.outerHTML);
    var F = L.getElementsByClassName(wFORMS.behaviors.validation.styling.errorLink)[0];
    F.onclick = function() {
     wFORMS.behaviors.validation.moveToLinkedDate.call(G)
    }
   }
   if (C.match(/%%(.+)%%/)) {
    var D = C.match(/%%(.+)%%/)[1];
    C = C.replace(/%%(.+)%%/, "%1")
   }
   this.fail(B, C);
   if (D) {
    E(D, B.id, true);
    E(B.id, D)
   }
  }, wFORMS.behaviors.validation.applyTo = function(D) {
   if (wFORMS.behaviors.validation.skip) {
    return null
   }
   if (!D || !D.tagName) {
    throw new Error("Can't apply behavior to " + D)
   }
   if (D.tagName != "FORM") {
    if (D.form) {
     D = D.form
    } else {
     var E = D;
     for (D = D.parentNode; D && D.tagName != "FORM"; D = D.parentNode) {
      continue
     }
     if (!D || D.tagName != "FORM") {
      D = E.getElementsByTagName("form")
     }
    }
   }
   if (!D.tagName && D.length > 0) {
    var A = new Array();
    for (var B = 0; B < D.length; B++) {
     var C = new wFORMS.behaviors.validation.instance(D[B]);
     A.push(C);
     C.onApply()
    }
   } else {
    var A = new wFORMS.behaviors.validation.instance(D);
    A.onApply()
   }
   return A
  };
  wFORMS.behaviors.validation.instance.prototype.onApply = function() {
   var A = this;
   if (wFORMS.behaviors.repeat && !wFORMS.behaviors.repeat.handlingRepeatedErrors) {
    wFORMS.behaviors.repeat.handlingRepeatedErrors = true;
    var B = wFORMS.behaviors.repeat.onRepeat;
    wFORMS.behaviors.repeat.onRepeat = function(C) {
     if (C) {
      A.removeErrorMessage(C)
     }
     base2.DOM.Element.querySelectorAll(C, "*").forEach(function(D) {
      A.removeErrorMessage(D)
     });
     if (B) {
      B.apply(this, arguments)
     }
    };
    wFORMS.behaviors.repeat.observeRepeatComplete(this.repeatHandler)
   }
  };
  wFORMS.behaviors.validation.instance.prototype.run = function(F, B) {
   if (F && F.pagingStopPropagation) {
    return false
   }
   var G = function(M) {
    if (wFORMS.behaviors.paging && !wFORMS.behaviors.paging.showTabNavigation && !wFORMS.behaviors.paging.isElementVisible(M)) {
     return
    }
    if (A.isSwitchedOff(M)) {
     return
    }
    var N = wFORMS.helpers.getFieldValue(M);
    if (E.check.call) {
     var O = E.check.call(A, M, N)
    } else {
     O = A[E.check].call(A, M, N)
    }
    var L = D;
    if (O && E.range_verifier !== undefined) {
     var J = A[E.range_verifier].call(A, M, N, wFORMS.behaviors.validation.messages[E.range_error_message]);
     if (J !== true) {
      O = false;
      if (J !== false) {
       L = J
      }
     }
    }
    if (!O) {
     if (!M.id) {
      M.id = wFORMS.helpers.randomId()
     }
     A.elementsInError[M.id] = {
      id: M.id,
      rule: D
     };
     A.removeErrorMessage(M);
     if (E.fail) {
      E.fail.call(A, M, L)
     } else {
      A.fail.call(A, M, L)
     }
     H++
    } else {
     if (!A.elementsInError[M.id]) {
      A.removeErrorMessage(M)
     }
     if (E.pass) {
      E.pass.call(A, M)
     } else {
      A.pass.call(A, M)
     }
    }
   };
   var H = 0;
   this.elementsInError = {};
   for (var D in this.behavior.rules) {
    var E = this.behavior.rules[D];
    var A = this;
    if (!B.matchesSelector) {
     wFORMS.standardizeElement(B)
    }
    if (!B.matchesSelector) {
     B = base2.DOM.bind(B)
    }
    if (!B.matchesSelector && B.msMatchesSelector) {
     B.matchesSelector = B.msMatchesSelector
    }
    if (!B.matchesSelector && B.mozMatchesSelector) {
     B.matchesSelector = B.mozMatchesSelector
    }
    if (!B.matchesSelector && B.webkitMatchesSelector) {
     B.matchesSelector = B.webkitMatchesSelector
    }
    if (!B.matchesSelector) {
     B.matchesSelector = base2.DOM.Element.matchesSelector
    }
    if (B.matchesSelector(E.selector)) {
     G(B)
    }
    B.querySelectorAll(E.selector).forEach(G)
   }
   if (H > 0) {
    if (F) {
     F.preventDefault ? F.preventDefault() : F.returnValue = false
    }
    if (this.behavior.onFail) {
     this.behavior.onFail(this, F)
    }
    return false
   }
   if (F && F.type == "submit") {
    var C = base2.DOM.Element.querySelector(this.target, '.actions .primaryAction[type="submit"]');
    if (C.className.indexOf("wfHideSubmit") == -1) {
     C.setAttribute("disabled", "disabled");
     C.setAttribute("style", "color: grey");
     C.setAttribute("value", wFORMS.behaviors.validation.messages.wait)
    }
   }
   if (this.behavior.onPass) {
    this.behavior.onPass(this, F)
   }
   return true
  };
  wFORMS.behaviors.validation.instance.prototype.fail = function(B, D) {
   var F = document.getElementById(B.id + "-D");
   if (!F && wFORMS.behaviors.repeat) {
    if (B.id) {
     var A = B.id.replace(/(\[\d+\])+(\-[HED])?$/, "$2");
     var E = B.id.split(A).join("");
     A += "-D";
     if (E) {
      A += E
     }
     F = document.getElementById(A)
    }
   }
   if (F) {
    if (!F.hasClass || !F.addClass) {
     wFORMS.standardizeElement(F)
    }
    F.addClass(this.behavior.styling.fieldError)
   } else {
    if (!B.hasClass || !B.addClass) {
     wFORMS.standardizeElement(B)
    }
    B.addClass(this.behavior.styling.fieldError)
   }
   var C = (D in this.behavior.messages) ? this.behavior.messages[D] : D;
   this.addErrorMessage(B, C)
  }, wFORMS.behaviors.validation.instance.prototype.pass = function(A) {};
  wFORMS.behaviors.validation.instance.prototype.addErrorMessage = function(H, J, A) {
   if (!H.id) {
    H.id = wFORMS.helpers.randomId()
   }
   var F = document.createElement("span");
   F.appendChild(document.createTextNode(J));
   if (!H.removeClass || !H.hasClass || !H.addClass) {
    wFORMS.standardizeElement(H)
   }
   if (A) {
    F.setAttribute("class", this.behavior.styling.linkedErrorMessage)
   }
   var C = document.getElementById(H.id + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
   if (!C) {
    C = document.createElement("div");
    C.setAttribute("id", H.id + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
    if (H.tagName == "TR") {
     if (H.getElementsByTagName("TH").length > 0) {
      C = (H.getElementsByTagName("TH")[0]).appendChild(C)
     } else {
      C = (H.getElementsByTagName("TD")[0]).appendChild(C)
     }
    } else {
     if (H.hasClass("wfSection") || H.hasClass("inlineSection")) {
      C = H.appendChild(C)
     } else {
      var B = document.getElementById(H.id + "-D");
      if (B) {
       C = B.appendChild(C)
      } else {
       C = H.parentNode.insertBefore(C, H.nextSibling)
      }
     }
    }
   } else {
    C.appendChild(document.createElement("br"))
   }
   C.appendChild(F);
   wFORMS.standardizeElement(C);
   C.addClass(this.behavior.styling.errorMessage);
   H.setAttribute("aria-invalid", "true");
   var E = H.getAttribute("aria-describedby");
   var D = E ? E.split(" ") : [];
   for (var G = 0; G < D.length; G++) {
    if (D[G] == H.getAttribute("id") + "-E") {
     break
    }
   }
   if (G == D.length) {
    D.push(H.getAttribute("id") + "-E")
   }
   H.setAttribute("aria-describedby", D.join(" "));
   C.setAttribute("tabindex", "-1")
  };
  wFORMS.behaviors.validation.instance.prototype.removeErrorMessage = function(F) {
   var G = document.getElementById(F.id + "-D");
   if (!F.hasClass) {
    wFORMS.standardizeElement(F)
   }
   if (!F.addClass) {
    wFORMS.standardizeElement(F)
   }
   if (!F.removeClass) {
    wFORMS.standardizeElement(F)
   }
   if (G && !G.hasClass) {
    wFORMS.standardizeElement(G)
   }
   if (G && !G.addClass) {
    wFORMS.standardizeElement(G)
   }
   if (G && !G.removeClass) {
    wFORMS.standardizeElement(G)
   }
   if (F.hasClass(this.behavior.styling.fieldError)) {
    F.removeClass(this.behavior.styling.fieldError)
   }
   if (G && G.hasClass(this.behavior.styling.fieldError)) {
    G.removeClass(this.behavior.styling.fieldError)
   }
   F.setAttribute("aria-invalid", "false");
   var D = F.getAttribute("aria-describedby");
   var A = D ? D.split(" ") : [];
   for (var E = 0; E < A.length; E++) {
    if (A[E] == F.getAttribute("id") + "-E") {
     break
    }
   }
   if (E < A.length) {
    A.splice(E, 1)
   }
   F.setAttribute("aria-describedby", A.join(" "));
   var C = document.getElementById(F.id + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
   if (C) {
    C.parentNode.removeChild(C)
   } else {
    if (F.id) {
     var B = F.id.split("-D").join("");
     var C = document.getElementById(B + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
     if (C) {
      C.parentNode.removeChild(C)
     }
    }
   }
  };
  wFORMS.behaviors.validation.instance.prototype.isSwitchedOff = function(B) {
   switch (B.tagName) {
    case "INPUT":
     return B.disabled ? true : false;
    case "TEXTAREA":
     return B.disabled ? true : false;
    case "SELECT":
     return B.disabled ? true : false;
    default:
     if (B.disabled === true) {
      return true
     }
     var C = B.getElementsByTagName("INPUT");
     for (var A = 0; A < C.length; A++) {
      if (!C[A].disabled) {
       return false
      }
     }
     C = B.getElementsByTagName("TEXTAREA");
     for (var A = 0; A < C.length; A++) {
      if (!C[A].disabled) {
       return false
      }
     }
     C = B.getElementsByTagName("SELECT");
     for (var A = 0; A < C.length; A++) {
      if (!C[A].disabled) {
       return false
      }
     }
     return true
   }
  };
  wFORMS.behaviors.validation.isErrorPlaceholderId = function(A) {
   return A.match(new RegExp(wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX + "$")) != null
  };
  wFORMS.behaviors.validation.instance.prototype.isEmpty = function(A) {
   var B = /^\s+$/;
   return ((A == null) || (A.length == 0) || B.test(A))
  };
  wFORMS.behaviors.validation.instance.prototype.validateRestrictAutosuggest = function(A, B) {
   if (B === "" || B === A.getAttribute("data-selected")) {
    return true
   }
   return false
  };
  wFORMS.behaviors.validation.instance.prototype.validateRequired = function(A, D) {
   if (A.getAttribute("class") && A.getAttribute("class").indexOf("tt-hint") != -1) {
    return true
   }
   switch (A.tagName) {
    case "INPUT":
     var B = A.getAttribute("type");
     if (!B) {
      B = "text"
     }
     switch (B.toLowerCase()) {
      case "checkbox":
      case "radio":
       return A.checked;
       break;
      case "file":
       var C = document.getElementById("tfa_uploadDelete_" + A.id);
       if (this.isEmpty(D)) {
        return (C && !C.checked)
       }
       return true;
       break;
      default:
       return !this.isEmpty(D)
     }
     break;
    case "SELECT":
     return !this.isEmpty(D);
     break;
    case "TEXTAREA":
     return !this.isEmpty(D);
     break;
    default:
     return this.validateOneRequired(A);
     break
   }
   return false
  };
  wFORMS.behaviors.validation.instance.prototype.validateOneRequired = function(B) {
   if (B.nodeType != 1) {
    return false
   }
   if (this.isSwitchedOff(B)) {
    return false
   }
   switch (B.tagName) {
    case "INPUT":
     var C = B.getAttribute("type");
     if (!C) {
      C = "text"
     }
     switch (C.toLowerCase()) {
      case "checkbox":
      case "radio":
       return B.checked;
       break;
      case "file":
       var D = document.getElementById("tfa_uploadDelete_" + B.id);
       if (this.isEmpty(wFORMS.helpers.getFieldValue(B))) {
        return (D && !D.checked)
       }
       return true;
       break;
      default:
       return !this.isEmpty(wFORMS.helpers.getFieldValue(B))
     }
     break;
    case "SELECT":
     return !this.isEmpty(wFORMS.helpers.getFieldValue(B));
     break;
    case "TEXTAREA":
     return !this.isEmpty(wFORMS.helpers.getFieldValue(B));
     break;
    default:
     for (var A = 0; A < B.childNodes.length; A++) {
      if (this.validateOneRequired(B.childNodes[A])) {
       return true
      }
     }
     break
   }
   return false
  };
  wFORMS.behaviors.validation.instance.prototype.validateAlpha = function(A, C) {
   var B = /^[a-zA-Z\s]+$/;
   return this.isEmpty(C) || B.test(C)
  };
  wFORMS.behaviors.validation.instance.prototype.validateAlphanum = function(A, C) {
   var B = /^[\w\s]+$/;
   return this.isEmpty(C) || B.test(C)
  };
  wFORMS.behaviors.validation.instance.prototype.validateHostname = function(A, C) {
   var B = /^[a-z0-9](-(?!($|\.))|\.(?!$)|[a-z0-9]){0,}$/i;
   return this.isEmpty(C) || B.test(C)
  };
  wFORMS.behaviors.validation.instance.prototype.validateDateTime = function(B, D) {
   if (this.isEmpty(D)) {
    return true
   }
   var C = wFORMS.behaviors.validation.dateRegex;
   for (var A = 0; A < C.length - 1; A++) {
    if (C[A].test(D)) {
     return true
    }
   }
   return false
  };
  wFORMS.behaviors.validation.instance.prototype.validateDate = function(B, C) {
   if (this.isEmpty(C)) {
    return true
   }
   var A = this.analyzeDateComponents(C);
   return !(A === null)
  };
  wFORMS.behaviors.validation.relativeDate = function(A, D, B, C) {
   this.sign = A;
   this.qty = D ? D : 0;
   this.unit = B ? B : "Days";
   this.target = C ? C : ""
  };
  wFORMS.behaviors.validation.relativeDate.prototype.toString = function() {
   return this.sign + "|" + this.qty + "_" + this.unit + "{" + this.target + "}"
  };
  wFORMS.behaviors.validation.parseRelativeDateString = function(B) {
   try {
    var E = B.match(/^([+-])\|(\d*)\_?(Day|Month|Year)?\{(tfa_.+)?\}/);
    var A = E[1];
    var G = E[2];
    var D = E[3];
    var F = E[4];
    return new wFORMS.behaviors.validation.relativeDate(A, G, D, F)
   } catch (C) {
    return null
   }
  };
  wFORMS.behaviors.validation.instance.prototype.getRelativeDateControllerIds = function(D) {
   var B = [];
   var E = [];
   if (D.getAttribute(wFORMS.behaviors.validation.LOWER_BOUND_ATTRIBUTE)) {
    B.push(D.getAttribute(wFORMS.behaviors.validation.LOWER_BOUND_ATTRIBUTE))
   }
   if (D.getAttribute(wFORMS.behaviors.validation.UPPER_BOUND_ATTRIBUTE)) {
    B.push(D.getAttribute(wFORMS.behaviors.validation.UPPER_BOUND_ATTRIBUTE))
   }
   for (var C in B) {
    var A = wFORMS.behaviors.validation.parseRelativeDateString(B[C]);
    if (A && (A.target != "") && (E.indexOf(A.target) == -1)) {
     E.push(A.target)
    }
   }
   return E.length ? E : false
  };
  wFORMS.behaviors.validation.instance.prototype.analyzeDateComponents = function(H) {
   var E, F;
   try {
    E = wFORMS.helpers.calendar.locale
   } catch (F) {}
   if (!E) {
    E = {
     MDY_DAY_POSITION: 1,
     MDY_MONTH_POSITION: 2,
     MDY_YEAR_POSITION: 3
    }
   }
   if (H.indexOf("-") != -1 && H.split("-")[0].length == 4) {
    E = {
     MDY_DAY_POSITION: 3,
     MDY_MONTH_POSITION: 2,
     MDY_YEAR_POSITION: 1
    }
   }
   var A = /[\/\.\-\s]/;
   var C = H.split(A);
   if (C.length != 3) {
    var M = this.computeWformsRelativeDateString(H);
    return M ? M : null
   }
   for (var D = 0; D < 3; D++) {
    if (!/^\d+$/.test(C[D])) {
     return null
    }
   }
   if (C[E.MDY_DAY_POSITION - 1].length > 2 || C[E.MDY_MONTH_POSITION - 1].length > 2 || C[E.MDY_YEAR_POSITION - 1].length > 4) {
    return null
   }
   var L = C[E.MDY_YEAR_POSITION - 1];
   if (L.length == 2) {
    L = (L > 50) ? "19" + L : "20" + L
   }
   if (L < 0 || L > 3000) {
    return null
   }
   var B = parseInt(C[E.MDY_MONTH_POSITION - 1], 10);
   if (B < 0 || B > 12) {
    return null
   }
   var J = parseInt(C[E.MDY_DAY_POSITION - 1], 10);
   if (J < 0 || J > 31) {
    return null
   }
   var G = new Date(L, B - 1, J);
   if (!(G.getMonth() + 1 == B && G.getDate() == J && G.getFullYear() == L)) {
    return null
   }
   return G
  };
  wFORMS.behaviors.validation.instance.prototype.computeWformsRelativeDateString = function(val, timeStamp) {
   var wfDateObj = wFORMS.behaviors.validation.parseRelativeDateString(val);
   if (wfDateObj == null) {
    return null
   }
   var base = new Date();
   if (timeStamp) {
    base.setTime(timeStamp)
   } else {
    if (wfDateObj.target) {
     var escaped = wFORMS.helpers.escapeQuerySelector("#" + wfDateObj.target);
     var compTarget = base2.DOM.Element.querySelector(this.target, escaped);
     base = this.analyzeDateComponents(compTarget.value);
     if (!base) {
      return null
     }
    } else {
     var now = new Date();
     base = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }
   }
   var preComp = base.getTime();
   if (wfDateObj.unit == "Day") {
    wfDateObj.unit = "Date"
   }
   if (wfDateObj.unit == "Year") {
    wfDateObj.unit = "FullYear"
   }
   var toComp = "base.set" + wfDateObj.unit + "(base.get" + wfDateObj.unit + "()" + wfDateObj.sign + wfDateObj.qty + ")";
   eval(toComp);
   if (isNaN(base)) {
    base.setTime(preComp)
   }
   return base
  };
  wFORMS.behaviors.validation.instance.prototype.toWformsLocaleDateString = function(B) {
   var A;
   var C;
   var D = [];
   var G;
   try {
    A = wFORMS.helpers.calendar.locale
   } catch (F) {
    A = {
     MDY_DAY_POSITION: 1,
     MDY_MONTH_POSITION: 2,
     MDY_YEAR_POSITION: 3,
     DATE_FIELD_DELIMITER: "/"
    }
   }
   for (var E in A) {
    if (E.match(/position/i)) {
     switch (E.match(/_(.*)_/)[1]) {
      case "DAY":
       G = B.getDate();
       break;
      case "MONTH":
       G = B.getMonth() + 1;
       break;
      case "YEAR":
       G = B.getFullYear();
       break
     }
     D[A[E] - 1] = G
    }
   }
   return D.join(A.DATE_FIELD_DELIMITER)
  };
  wFORMS.behaviors.validation.instance.prototype.repeatHandler = function(G, J, D) {
   var M = wFORMS.behaviors.validation.LOWER_BOUND_ATTRIBUTE;
   var H = wFORMS.behaviors.validation.UPPER_BOUND_ATTRIBUTE;
   var L = function(N, O) {
    for (var P in O) {
     if (O[P] == N) {
      return P
     }
    }
    return N
   };

   function C(N) {
    return base2.DOM.Element.querySelectorAll(N, ".validate-date, .validate-datecal")
   }
   var E = C(G);
   E.forEach(function(O) {
    var N = wFORMS.behaviors.validation.parseRelativeDateString(O.getAttribute(M));
    var P = wFORMS.behaviors.validation.parseRelativeDateString(O.getAttribute(H));
    if (N && D.master[N.target]) {
     N.target = D.master[N.target];
     O.setAttribute(M, N.toString())
    }
    if (P && D.master[P.target]) {
     P.target = D.master[P.target];
     O.setAttribute(H, P.toString())
    }
   });
   var B = {};
   for (var F in D.repeat) {
    var A = L(F, D.master);
    B[A] = D.repeat[F]
   }
   var E = C(J);
   E.forEach(function(O) {
    var N = wFORMS.behaviors.validation.parseRelativeDateString(O.getAttribute(M));
    var P = wFORMS.behaviors.validation.parseRelativeDateString(O.getAttribute(H));
    if (N && B[N.target]) {
     N.target = B[N.target];
     O.setAttribute(M, N.toString())
    }
    if (P && B[P.target]) {
     P.target = B[P.target];
     O.setAttribute(H, P.toString())
    }
   })
  };
  wFORMS.behaviors.validation.instance.prototype.validateTime = function(A, B) {
   if (this.isEmpty(B)) {
    return true
   }
   return this.analyzeTimeComponents(B) !== null
  };
  wFORMS.behaviors.validation.instance.prototype.analyzeTimeComponents = function(F) {
   var E = false,
    B = false,
    D;
   if (D = F.match(/a[^\da-z]?m/ig)) {
    if (D.length > 1) {
     return null
    } else {
     if (D.length == 1) {
      E = true
     }
    }
   }
   if (D = F.match(/p[^\da-z]?m/ig)) {
    if (D.length > 1) {
     return null
    } else {
     if (D.length == 1) {
      B = true
     }
    }
   }
   if (E && B) {
    return null
   }
   var G = null;
   var A = 0,
    H = 0,
    C = 0;
   D = false;
   if ((G = F.match(/(\d{1,2})[-:](\d{1,2})[-:](\d{1,2})/)) && G.length == 4) {
    A = parseInt(G[1]);
    H = parseInt(G[2]);
    C = parseInt(G[3]);
    D = true
   } else {
    if ((G = F.match(/(\d{1,2})[-:](\d{1,2})/)) && G.length == 3) {
     A = parseInt(G[1]);
     H = parseInt(G[2]);
     D = true
    } else {
     if ((G = F.match(/(\d{1,2})/)) && G.length == 2) {
      A = parseInt(G[1]);
      D = true
     }
    }
   }
   if (!D) {
    return null
   }
   if (B && A > 12) {
    return null
   }
   if (B && A < 12) {
    A += 12
   }
   if (E && A === 12) {
    A = 0
   } else {
    if (E && A > 12) {
     return null
    }
   }
   if (A < 0 || A > 23 || H < 0 || H > 59 || C < 0 || C > 59) {
    return null
   }
   return new Date(0, 0, 0, A, H, C, 0)
  };
  wFORMS.behaviors.validation.instance.prototype.validateEmail = function(D, E) {
   var F = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
   if (this.isEmpty(E)) {
    return true
   }
   var A = E.split(",");
   for (var C = 0; C < A.length; C++) {
    var B = A[C].replace(/^\s+|\s+$/g, "");
    if (!F.test(B)) {
     return false
    }
   }
   return true
  };
  wFORMS.behaviors.validation.instance.prototype.validateInteger = function(A, C) {
   var B = /^[\-+]?\d+$/;
   return this.isEmpty(C) || B.test(C)
  };
  wFORMS.behaviors.validation.instance.prototype.validateFloat = function(A, B) {
   return this.isEmpty(B) || wFORMS.helpers.isNumericValue(B)
  };
  wFORMS.behaviors.validation.instance.prototype.validatePhone = function(B, D) {
   if (this.isEmpty(D)) {
    return true
   }
   var A = [/^[\d\-\. \+\(\)]+$/, /^[\d\-\. \+\(\)]+ # {0,1}\d+ *$/, /^[\d\-\. \+\(\)]+ ext\.{0,1} \d+ *$/];
   for (var C in A) {
    if (A[C].test(D)) {
     return true
    }
   }
   return false
  };
  wFORMS.behaviors.validation.instance.prototype.validateCustom = function(A, D) {
   var C = new RegExp("/(.*)/([gi]*)");
   var B = A.className.match(C);
   if (this.isEmpty(D)) {
    return true
   }
   if (B && B[0]) {
    var E = new RegExp(B[1], B[2]);
    if (!D.match(E)) {
     return false
    }
   }
   return true
  };
  wFORMS.behaviors.validation.instance.prototype.ALLOWED_ELEMENT_TYPE = ['input[type="text"][id^="tfa_"]', 'textarea[id^="tfa_"]'];
  wFORMS.behaviors.validation.instance.prototype.validateWordCount = function(A, B) {
   if (A.count > A.getAttribute("data-maxwords")) {
    return false
   } else {
    return true
   }
  };
  wFORMS.behaviors.validation.instance.prototype.numberRangeTest = function(D, E, H) {
   var G = null,
    B = null,
    F, C;
   if (this.isEmpty(E)) {
    return true
   }
   F = D.getAttribute(wFORMS.behaviors.validation.LOWER_BOUND_ATTRIBUTE);
   if (F && (this.validateFloat(F) || this.validateInteger(F))) {
    G = parseFloat(F)
   }
   if (G == null) {
    G = -Infinity
   }
   C = D.getAttribute(wFORMS.behaviors.validation.UPPER_BOUND_ATTRIBUTE);
   if (C && (this.validateFloat(C) || this.validateInteger(C))) {
    B = parseFloat(C)
   }
   if (B == null) {
    B = Infinity
   }
   E = parseFloat(E);
   if (isNaN(E) || E === undefined || E === null) {
    return false
   }
   var A = null;
   if (E < G) {
    A = (A == null ? "" : A) + H.min.replace(/%1/g, G)
   }
   if (E > B) {
    A = (A == null ? "" : A + " ") + H.max.replace(/%1/g, B)
   }
   return A == null ? true : A
  };
  wFORMS.behaviors.validation.instance.prototype.dateRangeTest = function(A, B, C) {
   return this.dateTimeRangeTestCommon(A, B, C, "analyzeDateComponents")
  };
  wFORMS.behaviors.validation.instance.prototype.timeRangeTest = function(A, B, C) {
   return this.dateTimeRangeTestCommon(A, B, C, "analyzeTimeComponents")
  };
  wFORMS.behaviors.validation.moveToLinkedDate = function() {
   var D = (this.id.match(/\[/) != null) ? this.id.replace("[", "-D[") : this.id + "-D";
   var B = document.getElementById(D);
   if (B && !wFORMS.behaviors.paging.isElementVisible(B)) {
    var C = wFORMS.behaviors.paging.helpers.findPage(B);
    var A = wFORMS.getBehaviorInstance(document.getElementById("tfa_0"), "paging");
    A.jumpTo(wFORMS.behaviors.paging.getPageIndex(C))
   }
   if (B && B.scrollIntoView) {
    B.scrollIntoView()
   } else {
    location.hash = "#" + D
   }
  };
  wFORMS.behaviors.validation.instance.prototype.dateTimeRangeTestCommon = function(D, Q, P, E) {
   var J = null,
    M = null,
    F, A;
   if (this.isEmpty(Q)) {
    return true
   }
   F = D.getAttribute(wFORMS.behaviors.validation.LOWER_BOUND_ATTRIBUTE);
   if (F) {
    J = this[E](F)
   }
   A = D.getAttribute(wFORMS.behaviors.validation.UPPER_BOUND_ATTRIBUTE);
   if (A) {
    M = this[E](A)
   }
   if ((Q = this[E](Q)) === null) {
    return false
   }
   if (M && J > M) {
    M = new Date(M.getTime() + 1000 * 60 * 60 * 24);
    var H = new Date(Q);
    H.setHours(12);
    H.setMinutes(0);
    H.setSeconds(0);
    if (Q < H) {
     Q = new Date(Q.getTime() + 1000 * 60 * 60 * 24)
    }
   }
   var O = this.getRelativeDateControllerIds(D);
   if (O) {
    if ((!J && F) || (!M && A) && Q) {
     var L = wFORMS.helpers.escapeQuerySelector("#" + O[(!J && F) ? 0 : O.length - 1]);
     var B = base2.DOM.HTMLDocument.querySelector(this.target, L);
     if (this.isSwitchedOff(B)) {
      return true
     }
     return P.dep.replace(/%1/, "%%" + B.id + "%%")
    }
    var N = this.elementsInError;
    for (var S in N) {
     if (O.indexOf(N[S].id) > -1) {
      return P.dep.replace(/%1/, "%%" + N[S].id + "%%")
     }
    }
   }
   if ((J && M) && J > M) {
    return true
   }
   if (F) {
    if (this.computeWformsRelativeDateString(F) instanceof Date) {
     var C = new Date(this.computeWformsRelativeDateString(F).getTime());
     F = this.toWformsLocaleDateString(C)
    } else {
     if (F.indexOf("-") != -1 && F.split("-")[0].length == 4) {
      var T = F.split("-");
      var C = new Date(T[0], T[1] - 1, T[2]);
      F = this.toWformsLocaleDateString(C)
     }
    }
   }
   if (A) {
    if (this.computeWformsRelativeDateString(A) instanceof Date) {
     var G = new Date(this.computeWformsRelativeDateString(A).getTime());
     A = this.toWformsLocaleDateString(G)
    } else {
     if (A.indexOf("-") != -1 && A.split("-")[0].length == 4) {
      var T = A.split("-");
      var C = new Date(T[0], T[1] - 1, T[2]);
      A = this.toWformsLocaleDateString(C)
     }
    }
   }
   var R = J && (Q.getTime() < J.getTime());
   var U = M && (Q.getTime() > M.getTime());
   if ((R || U) && (M && J)) {
    return P.both.replace(/%1/g, F).replace(/%2/g, A)
   } else {
    if (R) {
     return P.min.replace(/%1/g, F)
    } else {
     if (U) {
      return P.max.replace(/%1/g, A)
     }
    }
   }
   return true
  };
  wFORMS.behaviors.validation.enableResumeLater = function() {
   var A = document.getElementById("tfa_resumeLater");
   if (A) {
    if (!wFORMS.behaviors.validation.messages.isPasswordConfirmed) {
     wFORMS.behaviors.validation.messages.isPasswordConfirmed = "Your password and confirmation field did not match."
    }
    wFORMS.behaviors.validation.instance.prototype.isPasswordConfirmed = function(E, D) {
     if (document.getElementById("tfa_confirmPassword")) {
      if (D != document.getElementById("tfa_confirmPassword").value) {
       return false
      }
     }
     return true
    };
    if (!wFORMS.behaviors.validation.messages.isPasswordStrong) {
     wFORMS.behaviors.validation.messages.isPasswordStrong = "Please choose a more secure password. Passwords must contain 8 or more characters, with at least 1 letter (a to z), 1 number (0 to 9), and 1 symbol (like '%', '$' or '!')."
    }
    wFORMS.behaviors.validation.instance.prototype.isPasswordStrong = function(F, D) {
     var G = [/^([^\s]{8,})/, /[a-zA-Z]/i, /[0-9]/, /[\"!#$%&'()*+,-.\/:;<=>?@\[\]\\\^_`{|}~]/];
     for (var E = 0; E < G.length; E++) {
      if (!D.match(G[E])) {
       return false
      }
     }
     return true
    };
    if (!wFORMS.behaviors.validation.messages.isPasswordMedium) {
     wFORMS.behaviors.validation.messages.isPasswordMedium = "Please choose a more secure password. Passwords must contain 4 or more characters, with at least 1 letter (a to z) and 1 number (0 to 9)."
    }
    wFORMS.behaviors.validation.instance.prototype.isPasswordMedium = function(F, D) {
     var G = [/^([^\s]{4,})/, /[a-zA-Z]/i, /[0-9]/];
     for (var E = 0; E < G.length; E++) {
      if (!D.match(G[E])) {
       return false
      }
     }
     return true
    };
    if (!wFORMS.behaviors.validation.messages.isPasswordWeak) {
     wFORMS.behaviors.validation.messages.isPasswordWeak = "Your password cannot be empty."
    }
    wFORMS.behaviors.validation.instance.prototype.isPasswordWeak = function(F, D) {
     var G = [/^([^\s]{1,})/];
     for (var E = 0; E < G.length; E++) {
      if (!D.match(G[E])) {
       return false
      }
     }
     return true
    };
    var B = document.getElementById("tfa_saveForLaterLink");
    if (B) {
     B.onclick = function() {
      f = this;
      while (f && f.tagName != "FORM") {
       f = f.parentNode
      }
      elem = document.getElementById("tfa_saveForLater");
      if (elem && !elem.checked) {
       elem.click()
      }
      if (elem && elem.scrollIntoView) {
       elem.scrollIntoView()
      } else {
       location.hash = "#tfa_saveForLater"
      }(new wFORMS.behaviors["condition"].Trigger("#tfa_saveForLater")).trigger()
     }
    }
    var C = document.getElementById("tfa_saveForLater");
    if (C) {
     C.onclick = function() {
      var D = document.getElementById("saveAndResumeFieldset");
      if (D) {
       D.style.display = "block"
      }
     }
    }
    A.onclick = function(H) {
     var G = this.form;
     var E = wFORMS.getBehaviorInstance(G, "validation");
     if (E) {
      var F = E.behavior.rules;
      E.behavior.rules = [];
      E.behavior.rules.isEmail = {
       selector: "#tfa_resumeEmail",
       check: "validateEmail"
      };
      E.behavior.rules.isRequired = {
       selector: "#tfa_resumeEmail",
       check: "validateRequired"
      };
      if (!wFORMS.behaviors.validation.passwordStrength) {
       wFORMS.behaviors.validation.passwordStrength = "low"
      }
      switch (wFORMS.behaviors.validation.passwordStrength) {
       case "high":
        E.behavior.rules.isPasswordStrong = {
         selector: "#tfa_resumePassword",
         check: "isPasswordStrong"
        };
        break;
       case "medium":
        E.behavior.rules.isPasswordMedium = {
         selector: "#tfa_resumePassword",
         check: "isPasswordMedium"
        };
        break;
       case "low":
       default:
        E.behavior.rules.isPasswordWeak = {
         selector: "#tfa_resumePassword",
         check: "isPasswordWeak"
        }
      }
      E.behavior.rules.isPasswordConfirmed = {
       selector: "#tfa_resumePassword",
       check: "isPasswordConfirmed"
      }
     }
     var D = wFORMS.getBehaviorInstance(G, "paging");
     if (D) {
      D.behavior.warnOnUnload = false
     }
     if (E && E.run(null, G)) {
      this.value = " ... ";
      G.submit()
     } else {
      if (E) {
       E.behavior.rules = F
      }
     }
    }
   }
  };
  base2.DOM.Element.addEventListener(document, "DOMContentLoaded", wFORMS.behaviors.validation.enableResumeLater, false);
  wFORMS.behaviors.word_counter = {
   ALLOWED_ELEMENT_TYPES: ['input[type="text"][id^="tfa_"]', 'textarea[id^="tfa_"]'],
   CLASSNAME: "count-words",
   ATTRIBUTE: "data-maxwords",
   applyTo: function(E) {
    var F = [];
    var G = [];
    for (D = 0; D < this.ALLOWED_ELEMENT_TYPES.length; D++) {
     G.push(this.ALLOWED_ELEMENT_TYPES[D] + "." + this.CLASSNAME)
    }
    var B = E.querySelectorAll(G.join(","));
    for (var D = 0; D < B.length; D++) {
     var C = B.item(D);
     var A = new wFORMS.behaviors.word_counter.instance(C);
     F.push(A)
    }
    return F
   },
   instance: function(A) {
    this.target = A;
    this.counter = null;
    this.wordCount = 0;
    this.maxWords = parseInt(A.getAttribute(wFORMS.behaviors.word_counter.ATTRIBUTE));
    this.addHandlers(A);
    this.addCounter(A)
   }
  };
  wFORMS.behaviors.word_counter.instance.prototype = {
   addHandlers: function(B) {
    var A = this;
    if (!B.addEventListener) {
     wFORMS.standardizeElement(B)
    }
    B.addEventListener("keyup", function() {
     A.updateCounter(B)
    }, false);
    B.addEventListener("paste", function() {
     setTimeout(function() {
      A.updateCounter(B)
     }, 0)
    }, false);
    B.addEventListener("cut", function() {
     setTimeout(function() {
      A.updateCounter(B)
     }, 0)
    }, false);
    B.addEventListener("focus", function() {
     A.updateCounter(B)
    }, false);
    B.addEventListener("focus", function() {
     A.counter.style.visibility = "visible"
    }, false);
    B.addEventListener("blur", function() {
     A.counter.style.visibility = "hidden"
    }, false)
   },
   addCounter: function(A) {
    var B = A.parentNode;
    this.counter = document.createElement("span");
    this.counter.className = wFORMS.behaviors.word_counter.CLASSNAME;
    this.counter.message = wFORMS.behaviors.validation.messages.wordsRemPos;
    this.counter.style.marginLeft = "10px";
    this.counter.style.visibility = "hidden";
    A.count = 0;
    B.insertBefore(this.counter, A.nextSibling);
    this.updateCounter(A)
   },
   getWordCount: function() {
    return this.wordCount
   },
   updateCounter: function(A) {
    try {
     this.wordCount = this.target.value.match(/\S+/g).length
    } catch (B) {
     this.wordCount = 0
    }
    if (this.maxWords - this.wordCount >= 0) {
     this.counter.message = wFORMS.behaviors.validation.messages.wordsRemPos;
     this.counter.className = this.counter.className.replace(/errMsg/, "")
    } else {
     if (!this.counter.className.match(/errMsg/)) {
      this.counter.message = wFORMS.behaviors.validation.messages.wordsRemNeg;
      this.counter.className += " errMsg"
     }
    }
    this.counter.innerHTML = Math.abs(this.maxWords - this.wordCount) + this.counter.message;
    A.count = this.wordCount
   }
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.calculation = {
   skip: false,
   VARIABLE_SELECTOR_PREFIX: "calc-",
   CHOICE_VALUE_SELECTOR_PREFIX: "calcval-",
   CALCULATION_SELECTOR: '*[class*="formula="]',
   CALCULATION_ERROR_MESSAGE: "There was an error computing this field.",
   instance: function(B) {
    var A = this;
    this.behavior = wFORMS.behaviors.calculation;
    this.target = B;
    this.calculations = [];
    if (!B.__wFormsCalculationInstanceInitializationHandled) {
     if (!B.addEventListener) {
      wFORMS.standardizeElement(B)
     }
     B.addEventListener("submit", function(C) {
      A.refreshAll()
     }, false);
     B.__wFormsCalculationInstanceInitializationHandled = true
    }
   }
  };
  wFORMS.behaviors.calculation.applyTo = function(C) {
   if (wFORMS.behaviors.calculation.skip) {
    return null
   }
   while (C && C.tagName != "FORM") {
    C = C.parentNode
   }
   var B = wFORMS.getBehaviorInstance(C, "calculation");
   if (!B) {
    B = new wFORMS.behaviors.calculation.instance(C)
   } else {
    B.calculations = []
   }
   if (wFORMS.behaviors.repeat && !B._repeatRemoveHandler) {
    var A = wFORMS.behaviors.repeat.onRemove;
    B._repeatRemoveHandler = function() {
     wFORMS.behaviors.calculation.applyTo(C);
     if (A) {
      A.apply(this, arguments)
     }
    };
    wFORMS.behaviors.repeat.onRemove = B._repeatRemoveHandler
   }
   base2.DOM.Element.querySelectorAll(C, wFORMS.behaviors.calculation.CALCULATION_SELECTOR).forEach(function(F) {
    var H = F.className.substr(F.className.indexOf("formula=") + 8).split(" ")[0];
    var G = H.split(/[^a-zA-Z]+/g);
    B.varFields = [];
    for (var E = 0; E < G.length; E++) {
     if (G[E] != "") {
      base2.DOM.Document.querySelectorAll(C, '*[class*="' + wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX + G[E] + '"]').forEach(function(J) {
       if (!J.addEventListener) {
        base2.DOM.bind(J)
       }
       var M = ((" " + J.className + " ").indexOf(" " + wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX + G[E] + " ") != -1);
       if (!M) {
        return
       }
       if (!wFORMS.behaviors.calculation.isHandled(J)) {
        var L = J.tagName.toLowerCase();
        if (L == "input" || L == "textarea") {
         var N = J.type.toLowerCase();
         if (L == "input" && (N == "radio" || N == "checkbox")) {
          J.addEventListener("click", function(O) {
           return B.run(O, this)
          }, false);
          wFORMS.behaviors.calculation.setHandledFlag(J)
         } else {
          J.addEventListener("blur", function(O) {
           return B.run(O, this)
          }, false);
          wFORMS.behaviors.calculation.setHandledFlag(J)
         }
        } else {
         if (L == "select") {
          J.addEventListener("change", function(O) {
           return B.run(O, this)
          }, false);
          wFORMS.behaviors.calculation.setHandledFlag(J)
         } else {
          return
         }
        }
       }
       B.varFields.push({
        name: G[E],
        field: J
       })
      })
     }
    }
    var D = {
     field: F,
     formula: H,
     variables: B.varFields
    };
    B.calculations.push(D);
    B.compute(D)
   });
   B.onApply();
   return B
  };
  wFORMS.behaviors.calculation.instance.prototype.onApply = function() {};
  wFORMS.behaviors.calculation.instance.prototype.run = function(E, D) {
   for (var C = 0; C < this.calculations.length; C++) {
    var B = this.calculations[C];
    for (var A = 0; A < B.variables.length; A++) {
     if (D == B.variables[A].field) {
      this.compute(B)
     }
    }
   }
  };
  wFORMS.behaviors.calculation.instance.prototype.refresh = function(D, C) {
   for (var B = 0; B < this.calculations.length; B++) {
    var A = this.calculations[B];
    if (C == A.field) {
     this.compute(A)
    }
   }
  };
  wFORMS.behaviors.calculation.instance.prototype.refreshAll = function() {
   for (var B = 0; B < this.calculations.length; B++) {
    var A = this.calculations[B];
    this.compute(A)
   }
  };
  wFORMS.behaviors.calculation.instance.prototype.getCalculatedFields = function(C) {
   var E = [];
   for (var D = 0; D < this.calculations.length; D++) {
    var B = this.calculations[D];
    for (var A = 0; A < this.calculations[D].variables.length; A++) {
     if ((C.nodeName && this.calculations[D].variables[A].field == C) || (typeof C == "string" && this.calculations[D].variables[A].name == C)) {
      E.push(this.calculations[D].field)
     }
    }
   }
   return E
  };
  wFORMS.behaviors.calculation.instance.prototype.compute = function(calculation) {
   var f = this.target;
   var formula = calculation.formula;
   var _processedVariables = new Array();
   var isNumericCalculation = true;
   for (var i = 0; i < calculation.variables.length; i++) {
    var v = calculation.variables[i];
    var varval = isNumericCalculation ? 0 : "";
    var _self = this;
    if (wFORMS.helpers.contains(_processedVariables, v.name)) {
     continue
    } else {
     _processedVariables.push(v.name)
    }
    base2.DOM.Document.querySelectorAll(f, '*[class*="' + _self.behavior.VARIABLE_SELECTOR_PREFIX + v.name + '"]').forEach(function(variable) {
     var exactMatch = ((" " + variable.className + " ").indexOf(" " + wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX + v.name + " ") != -1);
     if (!exactMatch) {
      return
     }
     if (!_self.inScope(calculation.field, variable)) {
      return
     }
     if (variable.disabled) {
      return
     }
     if (_self.hasValueInClassName(variable)) {
      var value = _self.getValueFromClassName(variable)
     } else {
      value = wFORMS.helpers.getFieldValue(variable)
     }
     if ((typeof value !== "string") && !value) {
      value = 0
     }
     if (value.constructor == Array) {
      for (var j = 0; j < value.length; j++) {
       if (!wFORMS.helpers.isNumericValue(value[j]) && !wFORMS.helpers.isEmptyValue(value[j])) {
        isNumericCalculation = false
       }
       if (isNumericCalculation) {
        varval += wFORMS.helpers.getNumericValue(value[j])
       } else {
        (!varval) ? (varval = value[j]) : (varval = String(varval).concat(value[j]))
       }
      }
     } else {
      if (!wFORMS.helpers.isNumericValue(value) && !wFORMS.helpers.isEmptyValue(value)) {
       isNumericCalculation = false
      }
      if (isNumericCalculation) {
       varval += wFORMS.helpers.getNumericValue(value)
      } else {
       (!varval) ? (varval = String(value)) : (varval = String(varval).concat(value))
      }
     }
    });
    if (isNumericCalculation) {
     formula = "var " + v.name + " = " + varval + "; " + formula
    } else {
     var varvalAsString = varval.replace(/"/g, '\\"').replace(/\n/g, "\\n");
     formula = "var " + v.name + ' = "' + varvalAsString + '"; ' + formula
    }
   }
   try {
    var calc = function() {
     return eval(formula)
    };
    var result = calc();
    if (result == "Infinity" || result == "NaN" || String(result).match("NaN")) {
     result = "error"
    }
   } catch (x) {
    result = "error"
   }
   var validationBehavior = wFORMS.getBehaviorInstance(this.target, "validation");
   if (validationBehavior) {
    if (!wFORMS.behaviors.validation.messages["calculation"]) {
     wFORMS.behaviors.validation.messages["calculation"] = this.behavior.CALCULATION_ERROR_MESSAGE
    }
    validationBehavior.removeErrorMessage(calculation.field);
    if (result == "error") {
     validationBehavior.fail(calculation.field, "calculation")
    } else {}
   }
   calculation.field.value = result;
   if (this.isVariable(calculation.field)) {
    this.run(null, calculation.field)
   }
  };
  wFORMS.behaviors.calculation.instance.prototype.isVariable = function(A) {
   return A.className && (A.className.indexOf(this.behavior.VARIABLE_SELECTOR_PREFIX) != -1)
  };
  wFORMS.behaviors.calculation.instance.prototype.hasValueInClassName = function(B) {
   switch (B.tagName) {
    case "SELECT":
     for (var A = 0; A < B.options.length; A++) {
      if (B.options[A].className && B.options[A].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX) != -1) {
       return true
      }
     }
     return false;
     break;
    default:
     if (!B.className || (" " + B.className).indexOf(" " + this.behavior.CHOICE_VALUE_SELECTOR_PREFIX) == -1) {
      return false
     }
     break
   }
   return true
  };
  wFORMS.behaviors.calculation.instance.prototype.getValueFromClassName = function(C) {
   switch (C.tagName) {
    case "INPUT":
     if (!C.className || C.className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX) == -1) {
      return null
     }
     var D = C.className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];
     if (C.type == "checkbox" || C.type == "radio") {
      return C.checked ? D : (wFORMS.helpers.isNumericValue(D) ? 0 : "")
     }
     return D;
     break;
    case "SELECT":
     if (C.selectedIndex == -1) {
      return null
     }
     var A = [];
     for (var B = 0; B < C.options.length; B++) {
      if (C.options[B].selected) {
       if (C.options[B].className && C.options[B].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX) != -1) {
        var D = C.options[B].className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];
        A.push(D)
       }
      }
     }
     if (A.length == 0) {
      return null
     }
     return A;
     break;
    case "TEXTAREA":
     if (!C.className || C.className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX) == -1) {
      return null
     }
     var D = C.className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];
     return D;
     break;
    default:
     return null;
     break
   }
   return null
  };
  wFORMS.behaviors["calculation"].isHandled = function(A) {
   return (A._wforms_calc_handled === true)
  };
  wFORMS.behaviors["calculation"].setHandledFlag = function(A) {
   A._wforms_calc_handled = true
  };
  wFORMS.behaviors["calculation"].removeHandledFlag = function(A) {
   try {
    delete A._wforms_calc_handled
   } catch (B) {
    A._wforms_calc_handled = undefined
   }
  };
  wFORMS.behaviors.calculation.instance.prototype.inScope = function(B, F) {
   if (wFORMS.behaviors.repeat) {
    var E = [];
    var D = [];
    var A = wFORMS.behaviors.repeat.getRepeatedElement(B);
    while (A) {
     E.push(A);
     A = wFORMS.behaviors.repeat.getRepeatedElement(A.parentNode)
    }
    A = wFORMS.behaviors.repeat.getRepeatedElement(F);
    while (A) {
     D.push(A);
     A = wFORMS.behaviors.repeat.getRepeatedElement(A.parentNode)
    }
    var C = function(L, G) {
     for (var J = 0; J < L.length; J++) {
      for (var H = 0; H < G.length; H++) {
       if (L[J] === G[H]) {
        break
       }
      }
      if (H == G.length) {
       return false
      }
     }
     return true
    };
    return C(E, D) || C(D, E)
   }
   return true
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.autoformat = {
   ATTRIBUTE_SELECTOR: 'input[autoformat][id^="tfa_"]',
   ALLOWED_ELEMENT_TYPE: ['input[type="text"]'],
   NUMERIC_REGEX: new RegExp("[0-9]"),
   ALPHABETIC_REGEX: new RegExp("[A-Za-z]"),
   _globalCache: {},
   instance: function(A) {
    this.actorsInDomain = []
   },
   Caret: function(A) {
    this.mask = A;
    this.isRtl = this.mask.isRtl;
    var B = this.isRtl ? this.mask.format.length : 0;
    this.caretPos = {
     isRange: false,
     position: B,
     start: B,
     end: B
    };
    this.prevCaretPos = {
     isRange: false,
     position: B,
     start: B,
     end: B
    }
   },
   Mask: function(D) {
    var C = this;
    this.element = D;
    wFORMS.standardizeElement(this.element);
    this.parentForm = this.element.form;
    wFORMS.standardizeElement(this.parentForm);
    this.formatString = this.element.getAttribute("autoformat");
    this.contents = this.formatString.split("");
    this.format = this.contents.slice();
    this.isRtl = this.getRtl(this.element);
    this.Vals = [];
    this.VAL_LENGTH = this.getValLength();
    this.valIndex = {
     start: 0,
     end: 0
    };
    this.handlers = this.getEventHandlers();
    this.firstInputChar = (function() {
     for (var E = 0; E < C.format.length; E++) {
      if (C.isMaskChar(C.format[E])) {
       break
      }
     }
     return E
    }());
    this.lastInputChar = (function() {
     for (var E = C.format.length - 1; E >= 0; E--) {
      if (C.isMaskChar(C.format[E])) {
       break
      }
     }
     return E
    }());
    this.caret = new wFORMS.behaviors.autoformat.Caret(this);
    if (this.element.value !== "") {
     var B = this.element.value.split("");
     for (var A = 0; A < B.length; A++) {
      this.inputChar(B[A])
     }
    }
    window.setTimeout(function() {
     C.addListeners()
    }, 1);
    if (this.isRtl) {
     this.element.style.direction = "ltr";
     this.element.style.textAlign = "right"
    }
   },
   applyTo: function(C) {
    try {
     var D = navigator.userAgent.toLowerCase();
     var G = D.indexOf("android") > -1;
     if (G) {
      return
     }
    } catch (F) {}
    var B = base2.DOM.Element.querySelectorAll(C, wFORMS.behaviors.autoformat.ATTRIBUTE_SELECTOR);
    var E = [];
    B.forEach(function(M) {
     if (!base2.DOM.Element.matchesSelector(M, wFORMS.behaviors.autoformat.ALLOWED_ELEMENT_TYPE[0])) {
      return
     }
     var N = wFORMS.behaviors.autoformat._getIDForActorElement(M);
     E.push(N)
    });
    var J = new wFORMS.behaviors.autoformat.instance(C);
    J.actorsInDomain = E;
    wFORMS.behaviors.autoformat.applyToVisibleElements(J);
    if (wFORMS.behaviors.paging && wFORMS.getBehaviorInstance(C, "paging")) {
     var H = wFORMS.getBehaviorInstance(C, "paging"),
      A = H.onPageChange,
      L = J;
     H.onPageChange = function(M) {
      wFORMS.behaviors.autoformat.applyToVisibleElements(L);
      A.apply(H, arguments)
     }
    }
    return J
   },
   _getIDForActorElement: function(B) {
    var C = B.id;
    if (C === "") {
     while (true) {
      var A = wFORMS.helpers.randomId();
      if (document.getElementById(A) !== null) {
       continue
      }
      B.id = A;
      break
     }
    }
    return B.id
   }
  };
  wFORMS.behaviors.autoformat.instance.prototype.onApply = function() {};
  wFORMS.behaviors.autoformat.instance.prototype.run = function() {};
  wFORMS.behaviors.autoformat.applyToVisibleElements = function(A) {
   var B = function(J, H) {
    if (!wFORMS.behaviors.autoformat._globalCache[J]) {
     var G = new wFORMS.behaviors.autoformat.Mask(H);
     wFORMS.behaviors.autoformat._globalCache[J] = G
    }
   };
   var D = function(H) {
    var G = wFORMS.behaviors.autoformat._globalCache[H];
    if (G) {
     G.removeListeners()
    }
    wFORMS.behaviors.autoformat._globalCache[H] = false
   };
   for (var C = 0; C < A.actorsInDomain.length; C++) {
    var F = A.actorsInDomain[C];
    var E = document.getElementById(F);
    if (wFORMS.behaviors.paging) {
     if (wFORMS.behaviors.paging.isElementVisible(E)) {
      B(F, E)
     } else {}
    } else {
     B(F, E)
    }
   }
  };
  wFORMS.behaviors.autoformat.Mask.prototype.getRtl = function() {
   var A;
   if (this.element) {
    if (window.getComputedStyle) {
     A = window.getComputedStyle(this.element).direction
    } else {
     if (this.element.currentStyle) {
      A = this.element.currentStyle.direction
     }
    }
   }
   return A === "rtl"
  };
  wFORMS.behaviors.autoformat.Mask.prototype.getValLength = function() {
   var A, B = 0;
   for (A = 0; A < this.format.length; A++) {
    if (this.isMaskChar(this.format[A])) {
     B += 1
    }
   }
   return B
  };
  wFORMS.behaviors.autoformat.Mask.prototype.isMaskChar = function(A) {
   return A === "#" || A === "$"
  };
  wFORMS.behaviors.autoformat.Mask.prototype.getEventHandlers = function() {
   var A = null,
    B = this,
    C = {
     BACKSPACE: 8,
     TAB: 9,
     RETURN: 13,
     ESCAPE: 27,
     LEFT_ARR: 37,
     UP_ARR: 38,
     RIGHT_ARR: 39,
     DOWN_ARR: 40,
     DELETE: 46
    };
   return {
    keyDown: function(D) {
     A = D.which || D.keyCode;
     switch (A) {
      case C.RETURN:
      case C.LEFT_ARR:
      case C.UP_ARR:
      case C.RIGHT_ARR:
      case C.DOWN_ARR:
      case C.TAB:
       B.caret.preventOverflow();
       A = null;
       break;
      case C.BACKSPACE:
       D.preventDefault();
       B.backspace();
       A = null;
       break;
      case C.DELETE:
       D.preventDefault();
       B.forwardDel();
       A = null;
       break;
      default:
     }
     return
    },
    keyPress: function(D) {
     var F, E;
     if (A === null) {
      return
     }
     if (D.metaKey || D.ctrlKey || D.altKey) {
      A = null;
      return
     }
     E = D.which || D.keyCode;
     if (E) {
      F = String.fromCharCode(E);
      B.inputChar(F)
     }
     D.preventDefault();
     return
    },
    keyUp: function(D) {
     switch (D.which) {
      case C.RETURN:
      case C.LEFT_ARR:
      case C.UP_ARR:
      case C.RIGHT_ARR:
      case C.DOWN_ARR:
      case C.TAB:
       B.caret.preventOverflow();
       B.caret.savePosition();
       break;
      default:
     }
     A = null;
     return
    },
    cut: function() {
     window.setTimeout(function() {
      B.cut()
     }, 1)
    },
    paste: function() {
     window.setTimeout(function() {
      B.paste()
     }, 1)
    },
    click: function() {
     B.caret.preventOverflow()
    },
    submit: function() {
     B.submit()
    }
   }
  };
  wFORMS.behaviors.autoformat.Mask.prototype.addListeners = function() {
   var A = this;
   this.element.addEventListener("focus", function() {
    A.applyElementValueUncontrolledChanges();
    A.updateValue();
    A.caret.nudge(0)
   });
   this.element.addEventListener("blur", function() {
    A.blur()
   });
   this.element.addEventListener("keydown", this.handlers.keyDown);
   this.element.addEventListener("keypress", this.handlers.keyPress);
   this.element.addEventListener("keyup", this.handlers.keyUp);
   this.element.addEventListener("click", this.handlers.click);
   this.element.addEventListener("cut", this.handlers.cut);
   this.element.addEventListener("paste", this.handlers.paste);
   this.parentForm.addEventListener("submit", this.handlers.submit);
   this.element.blur()
  };
  wFORMS.behaviors.autoformat.Mask.prototype.removeListeners = function() {
   this.element.removeEventListener("keydown", this.handlers.keyDown);
   this.element.removeEventListener("keypress", this.handlers.keyPress);
   this.element.removeEventListener("keyup", this.handlers.keyUp);
   this.element.removeEventListener("click", this.handlers.click);
   this.element.removeEventListener("cut", this.handlers.cut);
   this.element.removeEventListener("paste", this.handlers.paste);
   this.parentForm.removeEventListener("submit", this.handlers.submit)
  };
  wFORMS.behaviors.autoformat.Mask.prototype.blur = function() {
   this.element.value = this.stripExtraInput()
  };
  wFORMS.behaviors.autoformat.Mask.prototype.applyElementValueUncontrolledChanges = function() {
   var A = this.Vals.join("");
   var B = this.element.value;
   if (A == "" && B != "") {
    this.Vals = B.split("");
    this.reformat();
    return true
   }
   return false
  };
  wFORMS.behaviors.autoformat.Mask.prototype.updateValue = function() {
   var A = this;
   this.element.value = this.contents.join("");
   window.setTimeout(function() {
    A.caret.update()
   }, 1)
  };
  wFORMS.behaviors.autoformat.Mask.prototype.inputChar = function(A) {
   var C, B = this.caret.getPosition();
   if (this.isRtl) {
    while (!this.isMaskChar(this.format[B.start - 1]) && B.start > 0) {
     B = this.caret.nudge()
    }
   } else {
    while (!this.isMaskChar(this.format[B.start]) && B.start < this.format.length) {
     B = this.caret.nudge()
    }
   }
   C = this.isRtl ? B.start - 1 : B.start;
   if (!this.isCharAllowed(A, this.format[C])) {
    return
   }
   this.caret.savePosition();
   if (B.isRange) {
    this.Vals.splice(this.valIndex.start, this.valIndex.end - this.valIndex.start, A)
   } else {
    this.Vals.splice(this.valIndex.start, 0, A)
   }
   this.Vals.length = this.VAL_LENGTH;
   this.reformat();
   this.caret.nudge()
  };
  wFORMS.behaviors.autoformat.Mask.prototype.backspace = function() {
   var A = this.caret.getPosition();
   this.caret.savePosition();
   if (A.isRange) {
    this.Vals.splice(this.valIndex.start, this.valIndex.end - this.valIndex.start);
    this.caret.setPosition(this.isRtl ? A.end : A.start)
   } else {
    this.Vals.splice(this.valIndex.start - 1, 1);
    if (!this.isRtl && A.position > this.firstInputChar) {
     this.caret.nudge(-1)
    } else {
     if (this.isRtl && A.position <= this.lastInputChar) {
      this.caret.nudge(-1)
     }
    }
   }
   this.reformat()
  };
  wFORMS.behaviors.autoformat.Mask.prototype.forwardDel = function() {
   var A = this.caret.getPosition();
   this.caret.savePosition();
   if (A.isRange) {
    this.backspace()
   } else {
    this.Vals.splice(this.valIndex.start, 1);
    this.caret.nudge(0);
    this.reformat()
   }
  };
  wFORMS.behaviors.autoformat.Mask.prototype.cut = function() {
   var B = 0,
    A = this.caret.getPosition();
   this.Vals.splice(this.valIndex.start, this.valIndex.end - this.valIndex.start);
   if (this.isRtl) {
    B = this.element.value.length - A.position;
    this.reformat();
    this.caret.setPosition(this.format.length - B)
   } else {
    this.reformat()
   }
  };
  wFORMS.behaviors.autoformat.Mask.prototype.paste = function() {
   var B, E, C, D, A, F = this.caret.previousPosition();
   C = F.isRange ? F.end - F.start : 0;
   E = this.element.value.length - this.contents.length + C;
   if (F.isRange) {
    this.Vals.splice(this.valIndex.start, this.valIndex.end - this.valIndex.start)
   }
   this.caret.setPosition(F.start);
   D = this.element.value.substr(F.start, E).split("");
   if (this.isRtl) {
    A = this.caret.getPosition().position + C;
    this.caret.setPosition(A)
   }
   for (B = 0; B < D.length; B++) {
    this.inputChar(D[B])
   }
  };
  wFORMS.behaviors.autoformat.Mask.prototype.submit = function() {
   this.applyElementValueUncontrolledChanges();
   this.element.value = this.stripExtraInput()
  };
  wFORMS.behaviors.autoformat.Mask.prototype.isCharAllowed = function(B, A) {
   if (A === "#") {
    return Boolean(B.match(wFORMS.behaviors.autoformat.NUMERIC_REGEX))
   }
   if (A === "$") {
    return Boolean(B.match(wFORMS.behaviors.autoformat.ALPHABETIC_REGEX) || B.match(wFORMS.behaviors.autoformat.NUMERIC_REGEX))
   }
   return false
  };
  wFORMS.behaviors.autoformat.Mask.prototype.reformat = function() {
   var C, A, D = [],
    B = this.Vals.slice(),
    E = function(F) {
     if (!B) {
      this.contents[F] = this.format[F]
     } else {
      if (this.isMaskChar(this.format[F])) {
       A = B.shift();
       if (A && this.isCharAllowed(A, this.format[F])) {
        this.contents[F] = A;
        D.push(A)
       } else {
        B = null;
        this.contents[F] = this.format[F]
       }
      }
     }
    };
   if (this.isRtl) {
    for (C = this.format.length - 1; C >= 0; C--) {
     E.call(this, C)
    }
   } else {
    for (C = 0; C < this.format.length; C++) {
     E.call(this, C)
    }
   }
   this.Vals = D.slice();
   this.caret.savePosition();
   this.updateValue()
  };
  wFORMS.behaviors.autoformat.Mask.prototype.stripExtraInput = function() {
   var B, C = 0,
    D = "",
    A = [];
   for (B = 0; B < this.Vals.length; B++) {
    if (this.Vals[B]) {
     A.push(this.Vals[B])
    }
   }
   if (A.length === this.VAL_LENGTH) {
    D = this.contents.join("");
    return D
   }
   if (this.isRtl) {
    for (B = this.contents.length - 1; B >= 0; B--) {
     if (C === A.length) {
      break
     }
     D = this.contents[B] + D;
     if (this.isMaskChar(this.format[B])) {
      C += 1
     }
    }
   } else {
    for (B = 0; B < this.contents.length; B++) {
     if (C === A.length) {
      break
     }
     D += this.contents[B];
     if (this.isMaskChar(this.format[B])) {
      C += 1
     }
    }
   }
   return D
  };
  wFORMS.behaviors.autoformat.Caret.prototype.getSelection = function() {
   var D, C, A, F, E = this.mask.element,
    G = 0,
    B = 0;
   if (typeof E.selectionStart === "number") {
    G = E.selectionStart;
    B = E.selectionEnd
   } else {
    D = document.selection.createRange();
    if (D && D.parentElement() === E) {
     A = E.value.length;
     C = E.createTextRange();
     C.moveToBookmark(D.getBookmark());
     F = E.createTextRange();
     F.collapse(false);
     if (C.compareEndPoints("StartToEnd", F) > -1) {
      G = B = A
     } else {
      G = -C.moveStart("character", -A);
      B = (C.compareEndPoints("EndToEnd", F) > -1) ? A : -C.moveEnd("character", -A)
     }
    }
   }
   return {
    start: G,
    end: B
   }
  };
  wFORMS.behaviors.autoformat.Caret.prototype.setSelection = function(D, A) {
   var C = this.mask.element;
   if (C.setSelectionRange) {
    C.setSelectionRange(D, A)
   } else {
    var B = C.createTextRange();
    B.collapse(true);
    if (D === A) {
     B.move("character", D)
    } else {
     B.moveEnd("character", A);
     B.moveStart("character", D)
    }
    B.select()
   }
  };
  wFORMS.behaviors.autoformat.Caret.prototype.update = function() {
   this.setSelection(this.caretPos.start, this.caretPos.start);
   this.savePosition();
   return this.caretPos
  };
  wFORMS.behaviors.autoformat.Caret.prototype.getPosition = function() {
   var D = this.getSelection(),
    C = D.start,
    A = D.end,
    B = {
     isRange: null,
     position: null,
     start: C,
     end: A
    };
   if (A - C === 0) {
    B.isRange = false;
    B.position = C
   } else {
    B.isRange = true
   }
   return B
  };
  wFORMS.behaviors.autoformat.Caret.prototype.savePosition = function() {
   this.prevCaretPos = this.cloneCaretPos();
   this.caretPos = this.getPosition();
   this._setValIndex();
   return this.caretPos
  };
  wFORMS.behaviors.autoformat.Caret.prototype.setPosition = function(A) {
   this.caretPos.isRange = false;
   this.caretPos.start = this.caretPos.end = this.caretPos.position = A;
   return this.update()
  };
  wFORMS.behaviors.autoformat.Caret.prototype.cloneCaretPos = function() {
   return {
    isRange: this.caretPos.isRange,
    position: this.caretPos.position,
    start: this.caretPos.start,
    end: this.caretPos.end
   }
  };
  wFORMS.behaviors.autoformat.Caret.prototype.nudge = function(A) {
   A = (A !== undefined) ? A : 1;
   if (this.isRtl) {
    A = -A
   }
   if (this.caretPos.isRange) {
    if (this.isRtl) {
     this.caretPos.position = this.caretPos.start = this.caretPos.end
    } else {
     this.caretPos.position = this.caretPos.end = this.caretPos.start
    }
   }
   this.caretPos.position += A;
   if (this.isRtl) {
    while (this.caretPos.position >= 0 && this.caretPos.position <= this.mask.format.length && !this.mask.isMaskChar(this.mask.format[this.caretPos.position - 1])) {
     if (A === 0) {
      this.caretPos.position -= 1
     } else {
      this.caretPos.position += (A > 0) ? 1 : -1
     }
    }
   } else {
    while (this.caretPos.position >= 0 && this.caretPos.position <= this.mask.format.length && !this.mask.isMaskChar(this.mask.format[this.caretPos.position])) {
     if (A === 0) {
      this.caretPos.position += 1
     } else {
      this.caretPos.position += (A > 0) ? 1 : -1
     }
    }
   }
   this.caretPos.start = this.caretPos.end = this.caretPos.position;
   return this.update()
  };
  wFORMS.behaviors.autoformat.Caret.prototype.preventOverflow = function() {
   var A, B;
   this.savePosition();
   if (this.caretPos.isRange) {
    return
   }
   if (this.isRtl) {
    for (B = this.mask.contents.length - 1; B >= 0; B--) {
     if (this.mask.isMaskChar(this.mask.contents[B])) {
      A = B;
      break
     }
    }
    if (this.caretPos.position > this.mask.lastInputChar) {
     this.caretPos.position = this.mask.lastInputChar + 1
    } else {
     if (this.caretPos.position <= A) {
      this.caretPos.position = A + 1
     }
    }
   } else {
    for (B = 0; B < this.mask.contents.length; B++) {
     if (this.mask.isMaskChar(this.mask.contents[B])) {
      A = B;
      break
     }
    }
    if (this.caretPos.position < this.mask.firstInputChar) {
     this.caretPos.position = this.mask.firstInputChar
    } else {
     if (this.caretPos.position > A) {
      this.caretPos.position = A
     }
    }
   }
   this.caretPos.start = this.caretPos.end = this.caretPos.position;
   return this.update()
  };
  wFORMS.behaviors.autoformat.Caret.prototype.previousPosition = function() {
   return this.prevCaretPos
  };
  wFORMS.behaviors.autoformat.Caret.prototype._setValIndex = function() {
   var B, C = 0,
    A = 0;
   if (this.mask.isRtl) {
    for (B = this.mask.format.length; B > this.caretPos.end; B--) {
     if (this.mask.isMaskChar(this.mask.format[B - 1])) {
      C += 1
     }
    }
    A = C;
    for (B = this.caretPos.end; B > this.caretPos.start; B--) {
     if (this.mask.isMaskChar(this.mask.format[B - 1])) {
      A += 1
     }
    }
   } else {
    for (B = 0; B < this.caretPos.start; B++) {
     if (this.mask.isMaskChar(this.mask.format[B])) {
      C += 1
     }
    }
    A = C;
    for (B = this.caretPos.start; B < this.caretPos.end; B++) {
     if (this.mask.isMaskChar(this.mask.format[B])) {
      A += 1
     }
    }
   }
   this.mask.valIndex = {
    start: C,
    end: A
   }
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.lengthPrompt = {
   ATTRIBUTE_SELECTOR: "maxLength",
   ALLOWED_ELEMENT_TYPE: ['input[type="text"][id^="tfa_"]', 'input[type="color"][id^="tfa_"]', 'input[type="date"][id^="tfa_"]', 'input[type="datetime"][id^="tfa_"]', 'input[type="datetime-local"][id^="tfa_"]', 'input[type="email"][id^="tfa_"]', 'input[type="month"][id^="tfa_"]', 'input[type="number"][id^="tfa_"]', 'input[type="range"][id^="tfa_"]', 'input[type="search"][id^="tfa_"]', 'input[type="tel"][id^="tfa_"]', 'input[type="time"][id^="tfa_"]', 'input[type="url"][id^="tfa_"]', 'input[type="week"][id^="tfa_"]', 'textarea[id^="tfa_"]'],
   MONITOR_CHECK_TIMES: 10,
   CUSTOM_INDICATOR_STYLE: "lengthIndicator",
   keyCode: {
    LEFT: 37,
    RIGHT: 39,
    END: 35,
    HOME: 36,
    DELETE: 46,
    BACKSPACE: 8
   },
   instance: function() {
    return function A(B) {
     this.element = B;
     this.ui_indicator = null;
     this.maxLength = -1;
     this.previousLength = -1;
     this._pasteMonitorHandler = null;
     this.inputCache = null
    }
   }(),
   _globalCache: {},
   applyTo: function(B) {
    var A = base2.DOM.Element.querySelectorAll(B, wFORMS.behaviors.lengthPrompt._getActorsSelector());
    A.forEach(function(E) {
     var D = E.getAttribute(wFORMS.behaviors.lengthPrompt.ATTRIBUTE_SELECTOR);
     if (D === null || D === undefined) {
      return
     }
     var C = new wFORMS.behaviors.lengthPrompt.instance(E);
     C.maxLength = parseInt(D);
     var F = wFORMS.behaviors.lengthPrompt._getIDForActorElement(E);
     wFORMS.standardizeElement(E);
     C.deployUI();
     C.bindEvents();
     wFORMS.behaviors.lengthPrompt._globalCache[F] = C
    })
   },
   eventHandlers: {
    focus: function(B) {
     var A = wFORMS.behaviors.lengthPrompt._globalCache[this.id];
     if (!A) {
      return
     }
     A.showIndicator()
    },
    blur: function(B) {
     var A = wFORMS.behaviors.lengthPrompt._globalCache[this.id];
     if (!A) {
      return
     }
     A.hideIndicator()
    },
    keyup: function(B) {
     var A = wFORMS.behaviors.lengthPrompt._globalCache[this.id];
     if (!A) {
      return
     }
     A.checkUpdate()
    },
    paste: function(C) {
     var A = wFORMS.behaviors.lengthPrompt._globalCache[this.id];
     if (!A) {
      return
     }
     var B = wFORMS.behaviors.lengthPrompt.getSelection(A.element);
     A.inputCache = this.value;
     A._pasteMonitorHandler = window.setInterval((function() {
      var D = 0;
      return function() {
       var E = A.checkCacheTempered(B);
       if (E !== false) {
        window.clearInterval(A._pasteMonitorHandler);
        A.handlePaste(E, B)
       }
       D++;
       if (D >= wFORMS.behaviors.lengthPrompt.MONITOR_CHECK_TIMES) {
        window.clearInterval(A._pasteMonitorHandler)
       }
      }
     })(), 10)
    },
    textarea_input: function(B) {
     var A = wFORMS.behaviors.lengthPrompt._globalCache[this.id];
     if (!A) {
      return
     }
     A.restrictInput(B)
    }
   },
   messages: "%1 characters left.",
   _getActorsSelector: function() {
    if (!wFORMS.behaviors.lengthPrompt.ACTORS_SELECTOR) {
     var A = "";
     for (var B = 0; B < wFORMS.behaviors.lengthPrompt.ALLOWED_ELEMENT_TYPE.length; B++) {
      A += wFORMS.behaviors.lengthPrompt.ALLOWED_ELEMENT_TYPE[B] + "[" + wFORMS.behaviors.lengthPrompt.ATTRIBUTE_SELECTOR + "], "
     }
     wFORMS.behaviors.lengthPrompt.ACTORS_SELECTOR = A.slice(0, -2)
    }
    return wFORMS.behaviors.lengthPrompt.ACTORS_SELECTOR
   },
   _getIDForActorElement: function(B) {
    var C = B.id;
    if (C === "") {
     while (true) {
      var A = wFORMS.helpers.randomId();
      if (document.getElementById(A) != null) {
       continue
      }
      B.id = A;
      break
     }
    }
    return B.id
   },
   getSelection: function(B) {
    var E = -1,
     F;
    if (B.selectionStart >= 0) {
     E = B.selectionStart;
     F = B.selectionEnd - B.selectionStart
    } else {
     if (document.selection) {
      var C, D, A;
      if (B.tagName && B.tagName === "TEXTAREA") {
       C = document.selection.createRange().duplicate();
       D = B.createTextRange();
       D.collapse(false);
       D.moveToBookmark(C.getBookmark());
       if (C.text === "") {
        A = D.duplicate();
        A.moveEnd("character", 1);
        if (C.boundingWidth === A.boundingWidth && C.boundingHeight === A.boundingHeight) {
         D = A
        }
       }
      } else {
       D = document.selection.createRange().duplicate()
      }
      F = D.text.length;
      E = Math.abs(D.moveStart("character", -1000000))
     } else {
      if (document.getSelection) {
       E = 0;
       F = document.getSelection().length
      }
     }
    }
    return {
     caret: E,
     length: F
    }
   },
   setCaretPosition: function(B, C) {
    if (B.setSelectionRange) {
     B.focus();
     B.setSelectionRange(C, C)
    } else {
     if (B.createTextRange) {
      var A = B.createTextRange();
      A.collapse(true);
      A.moveEnd("character", C);
      A.moveStart("character", C);
      A.select()
     }
    }
   }
  };
  (function(B) {
   for (var A in B) {
    wFORMS.behaviors.lengthPrompt.instance.prototype[A] = B[A]
   }
  })({
   deployUI: function() {
    var A = this.element.parentNode;
    if (!base2.DOM.Element.matchesSelector(this.element.parentNode, wFORMS.INPUT_CONTROL_WRAPPER_SELECTOR)) {
     A = this.mirrorWrapperDiv()
    }
    var B = document.createElement("div");
    A.appendChild(B);
    B.style.display = "none";
    B.className = wFORMS.behaviors.lengthPrompt.CUSTOM_INDICATOR_STYLE;
    this.ui_indicator = B;
    this.adjustIndicatorPosition();
    this.checkUpdate()
   },
   adjustIndicatorPosition: function() {
    var B = (function(F) {
     return function(G) {
      return parseFloat(base2.DOM.AbstractView.getComputedStyle(window, F, "").getPropertyValue(G).replace(/px$/, "")) || 0
     }
    })(this.element);
    var E = this.element.offsetWidth || B("width");
    var D = ["margin-left", "margin-right", "border-left-width", "border-right-width", "padding-left", "padding-right"];
    for (var C = 0, A = D.length; C < A; C++) {
     E += B(D[C]) || 0
    }
    this.ui_indicator.style.left = E + "px"
   },
   mirrorWrapperDiv: function() {
    var A = document.createElement("div");
    this.element.parentNode.insertBefore(A, this.element);
    A.appendChild(this.element);
    return A
   },
   bindEvents: function() {
    for (var B = 0, A = ["focus", "blur"]; B < A.length; B++) {
     var C = A[B];
     this.element.addEventListener(C, wFORMS.behaviors.lengthPrompt.eventHandlers[C], true)
    }
    if (this.element.tagName.toUpperCase() == "TEXTAREA") {
     this.element.addEventListener("paste", wFORMS.behaviors.lengthPrompt.eventHandlers["paste"], true);
     this.element.addEventListener("keydown", wFORMS.behaviors.lengthPrompt.eventHandlers["textarea_input"], true)
    }
   },
   bindMonitorEvent: function() {
    for (var B = 0, A = ["keyup"]; B < A.length; B++) {
     var C = A[B];
     this.element.addEventListener(C, wFORMS.behaviors.lengthPrompt.eventHandlers[C], true)
    }
   },
   releaseMonitorEvent: function() {
    for (var B = 0, A = ["keyup"]; B < A.length; B++) {
     var C = A[B];
     base2.DOM.Element.removeEventListener(this.element, C, wFORMS.behaviors.lengthPrompt.eventHandlers[C], true)
    }
   },
   checkCacheTempered: function(B) {
    var C = this.element.value;
    if (C == this.inputCache) {
     return false
    }
    var A = C.length - this.inputCache.length + B.length;
    var E = wFORMS.behaviors.lengthPrompt.getSelection(this.element).caret;
    var F = E - A;
    var D = C.substr(F, A);
    return {
     diff: D,
     start: F,
     length: A
    }
   },
   handlePaste: function(B, A) {
    var C = this.inputCache.length - A.length + B.length - this.maxLength;
    var D = B.diff;
    if (C > 0) {
     D = D.substr(0, D.length - C)
    }
    this.element.value = this.inputCache.substr(0, A.caret) + D + this.inputCache.substr(A.caret + A.length, this.inputCache.length);
    wFORMS.behaviors.lengthPrompt.setCaretPosition(this.element, A.caret + D.length);
    this.checkUpdate()
   },
   restrictInput: function(A) {
    if (this.element.value.replace(/(\r\n|\n|\r)/g, "--").length == this.maxLength && !this.testSpecialKey(A) && (wFORMS.behaviors.lengthPrompt.getSelection(this.element).length == 0)) {
     A.preventDefault()
    }
   },
   testSpecialKey: function(A) {
    var B = A.which || A.keyCode;
    return ((A.ctrlKey && (B == 65 || B == 88 || B == 67 || B == 86)) || (B == wFORMS.behaviors.lengthPrompt.keyCode["END"]) || (B == wFORMS.behaviors.lengthPrompt.keyCode["HOME"]) || (B == wFORMS.behaviors.lengthPrompt.keyCode["LEFT"]) || (B == wFORMS.behaviors.lengthPrompt.keyCode["RIGHT"]) || (B == wFORMS.behaviors.lengthPrompt.keyCode["DELETE"]) || (B == wFORMS.behaviors.lengthPrompt.keyCode["BACKSPACE"]))
   },
   showIndicator: function() {
    this.adjustIndicatorPosition();
    this.ui_indicator.style.display = "block";
    this.bindMonitorEvent()
   },
   hideIndicator: function() {
    this.ui_indicator.style.display = "none";
    this.releaseMonitorEvent()
   },
   updateIndicator: function() {
    var A = this.element.value.replace(/(\r\n|\n|\r)/g, "--").length;
    var B = this.maxLength - A;
    this.ui_indicator.innerHTML = wFORMS.behaviors.lengthPrompt.messages.replace(/%1/g, B)
   },
   checkUpdate: function() {
    var A = this.element.value.replace(/(\r\n|\n|\r)/g, "--").length;
    if (A != this.previousLength) {
     this.updateIndicator();
     this.previousLength = A
    }
   }
  });
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.dependent_list = {
   skip: false,
   instance: function(A) {
    this.behavior = wFORMS.behaviors.dependent_list;
    this.target = A
   }
  };
  wFORMS.behaviors.dependent_list.applyTo = function(C) {
   if (wFORMS.behaviors.dependent_list.skip) {
    return null
   }
   var A = new wFORMS.behaviors.dependent_list.instance(C);
   if (!C.querySelectorAll) {
    base2.DOM.bind(C)
   }
   var B = C.querySelectorAll("option[data-filter-dependent], select[data-filter-dependent], input[data-filter-dependent]");
   B.forEach(function(D) {
    if (!D.addEventListener) {
     base2.DOM.bind(D)
    }
    D.addEventListener("change", function(E) {
     A.run(E, this)
    }, false);
    A.run(null, D)
   });
   if (B.length > 0 && wFORMS.behaviors.repeat) {
    wFORMS.behaviors.repeat.observeRepeatComplete(function(E, D, F) {
     A.onRepeatableDuplicated(E, D, F)
    });
    wFORMS.behaviors.repeat.observeRemoveComplete(function(D) {
     A.onRepeatableRemoved(D)
    })
   }
   A.onApply();
   return A
  };
  wFORMS.behaviors.dependent_list.instance.prototype.onApply = function() {};
  wFORMS.behaviors.dependent_list.instance.prototype.run = function(E, C) {
   var B = this;
   var D = wFORMS.helpers.getForm(this.target);
   var A = C.getAttribute("data-filter-dependent");
   var F = D.querySelectorAll(A);
   F.forEach(function(G) {
    B.applyFiltersTo(G)
   })
  };
  wFORMS.behaviors.dependent_list.instance.prototype.applyFiltersTo = function(D) {
   var B = this;
   var E = wFORMS.helpers.getForm(this.target);
   var A = D.getAttribute("data-filter-control");
   var C = E.querySelectorAll(A);
   C.forEach(function(F) {
    B.filter(F, D)
   })
  };
  wFORMS.behaviors.dependent_list.instance.prototype.filter = function(D, B) {
   var A = this;
   this._dirtyCalculations = {};
   var E = function(J, O) {
    var M = (J.checked || J.selected) && !J.disabled;
    var N = J.getAttribute("data-filter-include");
    var H = J.getAttribute("data-filter-exclude");
    if (!N && !H) {
     var L = A.getChoiceLabel(J);
     N = "optgroup[label='" + L.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "']"
    }
    if (N) {
     if (M) {
      if (O == "selected") {
       A.include(B, N)
      }
     } else {
      if (O == "deselected") {
       A.exclude(B, N)
      }
     }
    }
    if (H) {
     if (M) {
      if (O == "selected") {
       A.exclude(B, H)
      }
     } else {
      if (O == "deselected") {
       A.include(B, H)
      }
     }
    }
   };
   if (D.tagName == "INPUT") {
    E(D, "deselected");
    E(D, "selected")
   } else {
    var G = D.querySelectorAll("input[type=checkbox],input[type=radio],option");
    G.forEach(function(H) {
     E(H, "deselected")
    });
    G.forEach(function(H) {
     E(H, "selected")
    })
   }
   var C = wFORMS.getBehaviorInstance(wFORMS.helpers.getForm(this.target), "calculation");
   for (var F in this._dirtyCalculations) {
    C.run(null, this._dirtyCalculations[F])
   }
   this._dirtyCalculations = {};
   if (B.getAttribute("data-filter-dependent")) {
    this.run(null, B)
   }
  };
  wFORMS.behaviors.dependent_list.instance.prototype.include = function(C, A) {
   var B = C.querySelectorAll(A);
   B.forEach(function(D) {
    D.disabled = false;
    D.style.display = "";
    if (D.tagName == "OPTGROUP" || D.tagName == "OPTION") {
     if (D.parentNode.tagName == "SPAN") {
      var E = D.parentNode;
      E.parentNode.insertBefore(D, E);
      E.parentNode.removeChild(E)
     }
    }
    fields = D.querySelectorAll("input,select,textarea,option");
    fields.forEach(function(F) {
     F.disabled = false
    })
   })
  };
  wFORMS.behaviors.dependent_list.instance.prototype.exclude = function(D, A) {
   var C = D.querySelectorAll(A);
   var E = wFORMS.getBehaviorInstance(wFORMS.helpers.getForm(this.target), "calculation");
   var B = this;
   C.forEach(function(F) {
    F.disabled = "disabled";
    F.style.display = "none";
    if (F.selected) {
     F.selected = false
    }
    if (F.checked) {
     F.checked = false
    }
    if (F.tagName == "OPTGROUP" || F.tagName == "OPTION") {
     if (F.parentNode.tagName != "SPAN") {
      F.parentNode.insertBefore(document.createElement("span"), F).appendChild(F)
     }
     var G = F.parentNode;
     while (G && G.tagName != "SELECT") {
      G = G.parentNode
     }
     if (G && E && E.isVariable(G)) {
      B._dirtyCalculations[G.id] = G
     }
    } else {
     if (E && E.isVariable(F)) {
      B._dirtyCalculations[G.id] = G
     }
    }
    fields = F.querySelectorAll("input,select,textarea,option");
    fields.forEach(function(H) {
     H.disabled = "disabled";
     H.selected = false;
     if (E && E.isVariable(H)) {
      B._dirtyCalculations[H.id] = H
     }
    })
   })
  };
  wFORMS.behaviors.dependent_list.instance.prototype.getChoiceLabel = function(A) {
   if (A.tagName != "OPTION") {
    A = this.target.querySelector("label[for='" + A.getAttribute("id") + "']")
   }
   var B = A.textContent || A.innerText;
   return B
  };
  wFORMS.behaviors.dependent_list.instance.prototype.updateReference = function(D, G, F, C, J) {
   var B = D.getAttribute(G);
   var H = B ? B.split(",") : [];
   if (H.length > 0) {
    if (J) {
     for (var E = 0; E < H.length; E++) {
      var A = this.unescapeId(H[E]);
      if (A == F) {
       H[E] = this.escapeId(C);
       break
      }
     }
    } else {
     H.push(this.escapeId(C))
    }
    D.setAttribute(G, H.join(","))
   }
   return D
  };
  wFORMS.behaviors.dependent_list.instance.prototype.updateSelectors = function(B, C) {
   var B = B ? B.split(",") : [];
   for (var A = 0; A < B.length; A++) {
    var D = this.unescapeId(B[A]);
    if (C[D]) {
     B[A] = this.escapeId(C[D])
    }
   }
   return B.join(",")
  };
  wFORMS.behaviors.dependent_list.instance.prototype.unescapeId = function(A) {
   return A ? A.replace(/^#/, "").replace(/\\\[/g, "[").replace(/\\\]/g, "]") : null
  };
  wFORMS.behaviors.dependent_list.instance.prototype.escapeId = function(A) {
   return A ? "#" + A.replace(/\[/g, "\\[").replace(/\]/g, "\\]") : null
  };
  wFORMS.behaviors.dependent_list.instance.prototype.isInSameScope = function(B, A) {
   return wFORMS.behaviors.repeat.getRepeatedElement(B) === wFORMS.behaviors.repeat.getRepeatedElement(A)
  };
  wFORMS.behaviors.dependent_list.instance.prototype.onRepeatableDuplicated = function(J, G, F) {
   var E = wFORMS.helpers.getForm(J);
   var L = this;
   var H = function(M, N) {
    for (var O in N) {
     if (N[O] == M) {
      return O
     }
    }
    return M
   };
   var C = J.querySelectorAll("option[data-filter-dependent], select[data-filter-dependent], input[data-filter-dependent], option[data-filter-control], select[data-filter-control], input[data-filter-control]");
   if (C.length > 0) {
    C.forEach(function(P) {
     var O = P.id;
     var Q = H(O, F.master);
     if (O == Q) {
      return
     }
     var M = L.updateSelectors(P.getAttribute("data-filter-dependent"), F.master);
     if (M) {
      var R = E.querySelectorAll(M);
      R.forEach(function(S) {
       L.updateReference(S, "data-filter-control", Q, O, true)
      })
     }
     var M = L.updateSelectors(P.getAttribute("data-filter-control"), F.master);
     if (M) {
      var N = E.querySelectorAll(M);
      N.forEach(function(S) {
       L.updateReference(S, "data-filter-dependent", Q, O, true)
      })
     }
    });
    var C = G.querySelectorAll("option[data-filter-dependent], select[data-filter-dependent], input[data-filter-dependent], option[data-filter-control], select[data-filter-control], input[data-filter-control]");
    var B = {};
    for (var D in F.repeat) {
     var A = H(D, F.master);
     B[A] = F.repeat[D]
    }
    C.forEach(function(P) {
     var O = P.id;
     var Q = H(O, F.repeat);
     Q = H(Q, F.master);
     var M = L.updateSelectors(P.getAttribute("data-filter-dependent"), B);
     if (M) {
      var R = E.querySelectorAll(M);
      R.forEach(function(T) {
       var S = L.isInSameScope(P, T);
       L.updateReference(T, "data-filter-control", Q, O, S)
      })
     }
     var M = L.updateSelectors(P.getAttribute("data-filter-control"), F.repeat);
     if (M) {
      var N = E.querySelectorAll(M);
      N.forEach(function(T) {
       var S = L.isInSameScope(P, T);
       L.updateReference(T, "data-filter-dependent", Q, O, S)
      })
     }
    })
   }
  };
  wFORMS.behaviors.dependent_list.instance.prototype.onRepeatableRemoved = function(A) {};
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.prefill = {
   instance: function(B) {
    this.behavior = wFORMS.behaviors.prefill;
    this.target = B;
    var A = this
   },
   skip: false
  };
  wFORMS.behaviors.prefill.applyTo = function(J) {
   if (wFORMS.behaviors.prefill.skip) {
    return
   }
   var F = new wFORMS.behaviors.prefill.instance(J);
   var H = wFORMS.getBehaviorInstance(J, "switch");
   var D = wFORMS.getBehaviorInstance(J, "calculation");
   var E = F.getParameters();
   for (var M in E) {
    try {
     var C = J.elements[M];
     if (C) {
      F.populateField(C, E[M], H, D)
     } else {
      var B = document.getElementById(M);
      var A = B.getElementsByTagName("input");
      for (var G = 0; G < A.length; G++) {
       if (A[G].getAttribute("type") == "checkbox") {
        F.populateField(A[G], E[M], H, D)
       }
      }
     }
    } catch (L) {}
   }
   F.onApply();
   return F
  };
  wFORMS.behaviors.prefill.instance.prototype.onApply = function() {};
  wFORMS.behaviors.prefill.instance.prototype.populateField = function(F, G, H, C) {
   if (F) {
    if (F.tagName) {
     if ((F.tagName == "INPUT" && (F.type == "text" || F.type == "hidden" || F.type == "password")) || (F.tagName == "TEXTAREA")) {}
     F.value = G;
     if (F.tagName == "INPUT" && F.type == "checkbox") {
      if ((G == "1" || this.getLabel(F) == G || F.id == G)) {
       F.checked = true
      } else {
       var B = G.split(";");
       for (var E = 0; E < B.length; E++) {
        var A = B[E].replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        if ((A == "1" || this.getLabel(F) == A || F.id == A)) {
         F.checked = true
        }
       }
      }
     }
     if (F.tagName == "SELECT" && !F.multiple) {
      for (var D = 0; D < F.options.length; D++) {
       if (F.options[D].value == G || F.options[D].text == G) {
        F.options[D].selected = true
       }
      }
     }
     if (F.tagName == "SELECT" && F.multiple) {
      var B = G.split(";");
      for (var D = 0; D < F.options.length; D++) {
       if (F.options[D].value == G || F.options[D].text == G) {
        F.options[D].selected = true
       } else {
        for (var E = 0; E < B.length; E++) {
         var A = B[E].replace(/^\s\s*/, "").replace(/\s\s*$/, "");
         if (F.options[D].value == A || F.options[D].text == A) {
          F.options[D].selected = true
         }
        }
       }
      }
     }
     if (H) {
      H.run(null, F)
     }
     if (C) {
      C.run(null, F)
     }
    } else {
     for (E = 0; E < F.length; E++) {
      if (F[E].value == G || this.getLabel(F[E]) == G) {
       F[E].checked = true;
       if (H) {
        H.run(null, F[E])
       }
       if (C) {
        C.run(null, F[E])
       }
       break
      }
     }
    }
   }
  };
  wFORMS.behaviors.prefill.instance.prototype.getLabel = function(B) {
   if (!B || !B.form) {
    return null
   }
   if (!B.form.querySelectorAll) {
    return null
   }
   var A = B.getAttribute("id");
   l = B.form.querySelectorAll("label[for=" + A + "]");
   if (l && l.length >= 1) {
    return l.item(0).innerHTML
   }
   return null
  };
  wFORMS.behaviors.prefill.instance.prototype.getParameters = function() {
   var D = Array();
   if (arguments.length == 1) {
    var C = arguments[0]
   } else {
    var C = document.location.search
   }
   if (C.length == 0) {
    return
   }
   if (C.split("?")[1]) {
    var A = C.split("?")[1].split("&")
   } else {
    var A = C.split("&")
   }
   for (var B = 0; B < A.length; B++) {
    D[A[B].split("=")[0]] = decodeURIComponent(A[B].split("=")[1].replace(/\+/g, " "))
   }
   return D
  };
  if (typeof(wFORMS) == "undefined") {
   throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")
  }
  wFORMS.behaviors.responsive = {
   skip: false,
   instance: function(B) {
    this.behavior = wFORMS.behaviors.responsive;
    this.target = B;
    var A = this;
    this.run()
   },
  };
  wFORMS.behaviors.responsive.applyTo = function(B) {
   if (wFORMS.behaviors.responsive.skip) {
    return null
   }
   var A = new wFORMS.behaviors.responsive.instance(B);
   return A
  };
  wFORMS.behaviors.responsive.instance.prototype.run = function() {
   this.handleAllMatrixLayouts();
   this.handleAllGridLayouts()
  };
  wFORMS.behaviors.responsive.instance.prototype.handleAllMatrixLayouts = function() {
   var B = this.target.clientWidth;
   var A = this.target.querySelectorAll("table.matrixLayout");
   var D = false;
   for (var C = 0; C < A.length; C++) {
    D = this.handleMatrixLayout(A.item(C), B) || D
   }
   return D
  };
  wFORMS.behaviors.responsive.instance.prototype.handleMatrixLayout = function(L, M) {
   var E = false;
   var G = (L.clientWidth && L.clientWidth > M);
   if (G) {
    var F = "" + L.className;
    var D = (F.search("stacked") > -1);
    if (!D) {
     L.className = L.className + " stacked"
    }
    var H = L.querySelectorAll("input");
    var J = "" + L.className;
    var A = (J.search("isStackedAndLabeled") > -1);
    if (!A) {
     for (var C = 0; C < H.length; C++) {
      var B = this.createLabel(H.item(C).getAttribute("title"), H.item(C).id, "postField");
      H.item(C).parentNode.insertBefore(B, H.item(C).nextSibling);
      E = true
     }
     L.className = L.className + " isStackedAndLabeled"
    }
   }
   return E
  };
  wFORMS.behaviors.responsive.instance.prototype.handleAllGridLayouts = function() {
   var B = this.target.clientWidth;
   var A = this.target.querySelectorAll("table.gridLayout");
   var D = false;
   for (var C = 0; C < A.length; C++) {
    D = this.handleGridLayout(A.item(C), B) || D
   }
   return D
  };
  wFORMS.behaviors.responsive.instance.prototype.handleGridLayout = function(A, M) {
   var F = false;
   var H = (A.clientWidth && A.clientWidth > M);
   if (H) {
    var G = "" + A.className;
    var E = (G.search("stacked") > -1);
    if (!E) {
     A.className = A.className + " stacked"
    }
    var L = "" + A.className;
    var B = (L.search("isStackedAndLabeled") > -1);
    if (!B) {
     var J = A.querySelectorAll("input[type=text],input[type=password],input[type=file],textarea,select");
     for (var D = 0; D < J.length; D++) {
      var C = this.createLabel(J.item(D).getAttribute("title"), J.item(D).id, "preField");
      J.item(D).parentNode.insertBefore(C, J.item(D));
      F = true
     }
     A.className = A.className + " isStackedAndLabeled"
    }
   }
   return F
  };
  wFORMS.behaviors.responsive.instance.prototype.createLabel = function(B, D, C) {
   var A = document.createElement("label");
   A.innerHTML = B;
   A.setAttribute("for", D);
   A.className = C;
   return A
  };
  wFORMS.behaviors.autosuggest = {
   MESSAGES: {
    NO_RESULTS: "No matches"
   },
   DISPLAY_KEY: "a",
   SELECTOR: 'input[type="text"].wfAutosuggest',
   instance: function(G) {
    this.behavior = wFORMS.behaviors.autosuggest;
    this.target = G;
    var F = G.getAttribute("data-dataset-url");
    var D = G.getAttribute("data-dataset-id");
    var C = G.getAttribute("data-dataset-map");
    var B = G.getAttribute("data-dataset-action");
    var E = G.getAttribute("data-dataset-json");
    var A = G.getAttribute("data-dataset-allow-free-responses") !== null ? G.getAttribute("data-dataset-allow-free-responses") : 1;
    this.setupAutosuggest(G, F, D, C, B, E, A)
   },
   applyTo: function(B) {
    if (typeof FA$ == "undefined") {
     return
    }
    FA$.support.cors = true;
    var A = new Array();
    B.querySelectorAll(wFORMS.behaviors.autosuggest.SELECTOR).forEach(function(D) {
     var C = new wFORMS.behaviors.autosuggest.instance(D);
     A.push(C);
     C.onApply()
    });
    wFORMS.behaviors.repeat.observeRepeatStart(function(C) {
     C.querySelectorAll(wFORMS.behaviors.autosuggest.SELECTOR).forEach(function(D) {
      FA$(D).typeahead("destroy")
     })
    });
    wFORMS.behaviors.repeat.observeRepeatComplete(function(C, D) {
     C.querySelectorAll(wFORMS.behaviors.autosuggest.SELECTOR).forEach(function(F) {
      var E = new wFORMS.behaviors.autosuggest.instance(F);
      A.push(E);
      E.onApply()
     })
    });
    return A
   }
  };
  wFORMS.behaviors.autosuggest.bloodhoundWhitespaceTokenizer = function(A) {
   A = (typeof A === "undefined" || A === null) ? "" : A + "";
   A = FA$.trim(A);
   if (!A) {
    return []
   }
   var B = A.split(/\s+/);
   return B
  };
  wFORMS.behaviors.autosuggest.instance.prototype.setupAutosuggest = function(N, G, Q, D, B, O, R) {
   var A = null;
   var M = [];
   if (Q) {
    A = {
     url: G + "/" + B + "?uuid=" + Q + decodeURIComponent("%26") + "query=%QUERY%",
     dataType: "jsonp",
     ajax: {
      beforeSend: function(T, S) {
       jqXHRsetRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      },
     },
     prepare: function(T, S) {
      T = FA$.trim(T);
      S.url = S.url.replace("%QUERY%", encodeURIComponent(T));
      return S
     }
    }
   }
   if (O) {
    M = JSON.parse(O)
   }
   var L = new Bloodhound({
    identify: function(S) {
     return S.a
    },
    queryTokenizer: wFORMS.behaviors.autosuggest.bloodhoundWhitespaceTokenizer,
    datumTokenizer: function(S) {
     return Bloodhound.tokenizers.whitespace(S.a)
    },
    remote: A,
    local: M
   });
   var J = function(U, T, S) {
    if (typeof U === "undefined" || U === null) {
     U = ""
    } else {
     U = FA$.trim(U + "")
    }
    if (U === "") {
     S([])
    } else {
     L.search(U, T, S)
    }
   };
   FA$(N).typeahead({
    minLength: 0,
    hint: true,
    highlight: true,
   }, {
    source: J,
    displayKey: wFORMS.behaviors.autosuggest.DISPLAY_KEY,
    limit: 39,
    templates: {
     empty: '<div class="tt-empty-message">' + wFORMS.behaviors.autosuggest.MESSAGES["NO_RESULTS"] + "</div>"
    },
   }).on("typeahead:asyncrequest", function() {
    if (FA$(this).typeahead("val")) {
     FA$(this).closest(".inputWrapper").find(".tt-spinner").show()
    } else {
     FA$(this).closest(".inputWrapper").find(".tt-spinner").hide()
    }
   }).on("typeahead:asynccancel typeahead:asyncreceive", function() {
    FA$(this).closest(".inputWrapper").find(".tt-spinner").hide()
   });
   if (parseInt(R) === 0) {
    var E = null;
    FA$(N).on("typeahead:select typeahead:autocompleted", function(T, S) {
     FA$(this).attr("data-selected", S[wFORMS.behaviors.autosuggest.DISPLAY_KEY])
    })
   }
   if (O) {
    FA$(N).closest(".inputWrapper").find(".tt-caret-down").click(function(S) {
     FA$(N).focus()
    })
   }
   if (D) {
    var H = N.id.match(/(\[\d+\])+$/) || "";
    if (H) {
     H = H[0].replace(/\[/g, "\\[").replace(/\]/g, "\\]")
    }
    if (D.indexOf("=") === -1) {
     D = "b=" + D
    }
    var C = [];
    var P = D.split(",");
    for (var F = 0; F < P.length; F++) {
     if (P[F].indexOf("=") !== -1) {
      C.push(P[F].split("="))
     }
    }
    FA$(N).on("typeahead:autocomplete typeahead:select", function(V, S) {
     var W;
     var U;
     for (var T = 0; T < C.length; T++) {
      W = "#" + C[T][1] + H;
      U = S[C[T][0]];
      FA$(W).val(U)
     }
    }).on("typeahead:change", function(T) {
     if (!FA$(this).typeahead("val")) {
      for (var S = 0; S < C.length; S++) {
       FA$("#" + C[S][1] + H).val("")
      }
     }
    }).on("keyup", function() {
     if (!FA$(this).parent().find(".tt-suggestion").length) {
      for (var S = 0; S < C.length; S++) {
       FA$("#" + C[S][1] + H).val("")
      }
     }
    })
   }
  };
  wFORMS.behaviors.autosuggest.instance.prototype.onApply = function() {}
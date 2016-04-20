(function() {

    var Shift = {};

    Shift.extend = function(Child, Parent, prototype) {
        var F = function() {};　　　　
        F.prototype = Parent.prototype;　　　　
        Child.prototype = new F();　　　　
        Child.prototype.constructor = Child;　　　　
        Child.uber = Parent.prototype;

        for(var attr in prototype) {
            if (prototype.hasOwnProperty(attr)) {
                Child.prototype[attr] = prototype[attr];
            }
        }
    }

    window.srequire = function(path) {
        var names = path.split('.');
        var last = window;
        for (var i = 0; i < names.length; i++) {
            last = last[names[i]];
            if (last === undefined) {
                throw 'Requre ERROR: ' + path + ', no ' + names[i];
            }
        }
        return last;
    }
    window.sregister = function(path, obj) {
        var names = path.split('.');
        var last = window;
        for (var i = 0; i < names.length; i++) {
            if (last === undefined) {
                throw 'Register ERROR: ' + path + ', no' + names[i-1];
            }

            if (i === (names.length - 1)) {
                last[names[i]] = obj;
            } else {
                last = last[names[i]];
            }
        }
    }

    window.sregister('Shift', Shift);

})();

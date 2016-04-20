(function() {

    // 依赖
    var Shift = window.srequire('Shift');

    var componentNumber = 0;
    function getId() {
        return 'cp' + (componentNumber++);
    }

    function Component() {}

    Component.prototype.init = function() {
        this.id = getId();
        this.__events = {};
    }

    Component.prototype.render = function(selector) {
        throw 'Child class must implament this function!';
    }

    // event 相关
    Component.prototype.listionEvent = function(name, callback) {
        if (!this.__events.hasOwnProperty([name])) {
            this.__events[name] = [];
        }
        this.__events[name].push(callback);
    }
    Component.prototype.removeEvent = function(name) {
        if (this.__events.hasOwnProperty([name])) {
            this.__events[name] = [];
        }
    }
    Component.prototype.fireEvent = function(name) {
        if (this.__events.hasOwnProperty([name])) {
            var cbs = this.__events[name];
            for (var i = 0; i < cbs.length; i++) {
                cbs[i](name, data);
            }
        }
    }

    window.sregister('Shift.Component', Component);

})();

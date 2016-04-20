(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var AbstractNode = window.srequire('Shift.AbstractNode');
    var AbstractNodeFactory = window.srequire('Shift.AbstractNodeFactory');
    var globalNodeFactory = window.srequire('Shift.globalNodeFactory');


    // 定义本组件对应的 Node 类型
    var TYPE = {
        primary: 'virtual',
        secondary: 'logic',
        tertiary: 'and'
    }

    function AndNode(nodeModel) {
        this.super.init();
        this.model = nodeModel;
    }
    Shift.extend(AndNode, AbstractNode, {
        render: function(selector, instance) {
            var el = this.jsPlumbAddNode(parentId, this.id, this.label, this.position);

            // var inPorts = [];
            // for (var i = 0; i < this._nameObj.inputNum ; i++) {
            //     var port = 'in' + i;
            //     inPorts.push(port);
            // }
            // addPorts(instance, el, inPorts, 'input');

            // var outPorts = [];
            // for (var i = 0; i < this._nameObj.outputNum ; i++) {
            //     var port = 'out' + i;
            //     outPorts.push(port);
            // }
            // addPorts(instance, el, outPorts, 'output');

            instance.draggable($(el));

            return el;
        }
    });

    window.sregister('Shift.AndNode', AndNode);


    //========================================================================
    //== Factory ==
    function AndNodeFactory() {}
    Shift.extend(AndNodeFactory, AbstractNodeFactory, {
        check: function(type) {
            if (type.primary == TYPE.primary &&
                type.secondary == TYPE.secondary &&
                type.tertiary == TYPE.tertiary) {
                return true;
            }
            return false;
        },
        doBuild: function(type) {
            return new AndNode();
        }
    });
    globalNodeFactory.register(new AndNodeFactory());


})();

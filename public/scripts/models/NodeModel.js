(function() {

    // 依赖
    var Shift = window.srequire('Shift');

    /**
     * [Node Model]
     */
    function NodeModel() {
        this.id = null;
        this.type = null;
        this.operation = null;
        this.address = null;
        this.label = null;
        this.position = null;
        this.inputs = null;
        this.outputs = null;
    }

    //---------------------------------------------------
    /**
     * [NodeType description]
     * @param {string} primary   primary type
     * @param {string} secondary secondary type
     * @param {string} tertiary  tertiary type
     */
    var NodeType = function(primary, secondary, tertiary) {
        this.primary = primary;
        this.secondary = secondary;
        this.tertiary = tertiary;
    }

    var NodePosition = function(x, y) {
        this.x = x;
        this.y = y;
    }

    var NodeInput = function(port, type, refId,
        refOutputPort, constValue, value, valueType, sub) {
        this.port = port;
        this.type = type;
        this.refId = refId;
        this.refOutputPort = refOutputPort;
        this.constValue = constValue;
        this.value = value;
        this.valueType = valueType;
        this.sub = sub;
    }

    /**
     * [pushSub description]
     * @param  {NodeInput} inputSub 子输入
     */
    NodeInput.prototype.pushSub = function(inputSub) {
        if (toString.apply(this.sub) !== '[object Array]') {
            this.sub = [];
        }
        this.sub.push(inputSub);
    }

    var NodeOutput = function(port, value, valueType) {
        this.port = port;
        this.value = value;
        this.valueType = valueType;
    }

    //---------------------------------------------------
    NodeModel.buildType = function(primary, secondary, tertiary) {
        return new NodeType(primary, secondary, tertiary);
    }
    NodeModel.buildPosition = function(x, y) {
        return new NodePosition(x, y);
    }
    NodeModel.buildInput = function(port, type, refId,
        refOutputPort, constValue, value, valueType, sub) {
        return new NodeInput(port, type, refId,
        refOutputPort, constValue, value, valueType, sub);
    }
    NodeModel.buildOutput = function(port, value, valueType) {
        return new NodeOutput(port, value, valueType);
    }
    //---------------------------------------------------
    // export
    window.sregister('Shift.NodeModel', NodeModel);


})();

(function($) {

    // check env.
    if (window.SHIFT === null || window.SHIFT === undefined) {
        throw "ERROR, can't find window.SHIFT!";
        return;
    }

    var NODE_TYPE_CONFIG = {
        logic: {
            label: 'Logic Patch',
            names: {
                and: {
                    label: 'AND',
                    inputNum: 2,
                    outputNum: 1,
                    valueType: 'boolean'
                },
                or: {
                    label: 'OR',
                    inputNum: 2,
                    outputNum: 1,
                    valueType: 'boolean'
                },
                not: {
                    label: 'NOT',
                    inputNum: 1,
                    outputNum: 1,
                    valueType: 'boolean'
                },
                conditional: {
                    label: 'Conditional',
                    inputNum: 0,
                    outputNum: 0,
                    valueType: 'boolean'
                }
            }
        },
        // TODO
        control: {
            label: 'Control Flow Patch',
            names: {
                // TODO
            }
        },
        operator: {
            label: 'Operator Patch',
            names: {
                // TODO
            }
        },
        math: {
            label: 'Math Patch',
            names: {
                // TODO
            }
        },
        utility: {
            label: 'Utility Patch',
            names: {
                // TODO
            }
        },
        data: {
            label: 'Data Patch',
            names: {
                // TODO
            }
        },
        switch: {
            label: 'Switch',
            names: {
                // TODO
            }
        },
        sensor: {
            label: 'Sensor',
            names: {
                // TODO
            }
        },
        module: {
            label: 'Module Patch',
            names: {
                // TODO
            }
        }
    }

    /**
     * [Node Component]
     * @param {[object]} params {id, name, type, label, position}
     */
    var Node = function(params) {
        var id = params.id;
        var type = params.type;
        var label = params.label;
        var position = params.position;
        var name = params.name;

        this.id = id ? id : 'TMP' + new Date().getTime();

        this._typeObj = NODE_TYPE_CONFIG[type];
        if (!this._typeObj) {
            throw 'Param: "type" is not correct!';
        }
        this.type = type;

        this._nameObj = this._typeObj.names[name];
        if (!this._nameObj) {
            throw 'Param: "name" is not correct!';
        }
        this.name = name;

        this.label = label ? label : this._nameObj.label;
        this.position = position ? position : {x: 0, y: 0};

        this.address = null;
        this.pre = [];
        this.after = [];
        this.value = null;

        this.valueType = this._nameObj.valueType;

        // register
        window.SHIFT.addNode(this);
    }

    Node.prototype.render = function(parentId) {
        var instance = window.SW_INSTANCE;
        //instance || throw new error('No instance, must init jPlumb first!');

        var el = addNode(parentId, this.id, this.label, this.position);

        var inPorts = [];
        for (var i = 0; i < this._nameObj.inputNum ; i++) {
            var port = 'in' + i;
            inPorts.push(port);
        }
        addPorts(instance, el, inPorts, 'input');

        var outPorts = [];
        for (var i = 0; i < this._nameObj.outputNum ; i++) {
            var port = 'out' + i;
            outPorts.push(port);
        }
        addPorts(instance, el, outPorts, 'output');

        instance.draggable($(el));

        return el;
    };

    Node.NODE_TYPE_CONFIG = NODE_TYPE_CONFIG;

    // 作用域检查
    if (window.SHIFT === undefined || window.SHIFT === null) {
        window.SHIFT = {};
    }
    if (window.SHIFT.nodes === undefined || window.SHIFT.nodes === null) {
        window.SHIFT.nodes = [];
    }
    if (window.SHIFT.idMap === undefined || window.SHIFT.idMap === null) {
        window.SHIFT.idMap = {};
    }

    window.SHIFT.Node = Node;

    //--------

    function addNode(parentId, nodeId, nodeLable, position) {
        var panel = d3.select("#" + parentId);
        panel.append('div').style('width', '120px').style('height', '50px')
            .style('position', 'absolute')
            .style('top', position.y).style('left', position.x)
            .style('border', '2px #9DFFCA solid').attr('align', 'center')
            .attr('id', nodeId).classed('node', true)
            .text(nodeLable);

        return jsPlumb.getSelector('#' + nodeId)[0];
    }

    function addPorts(instance, node, ports, type) {
        //Assume horizental layout
        var number_of_ports = ports.length;
        var i = 0;
        var height = $(node).height(); //Note, jquery does not include border for height
        var y_offset = 1 / (number_of_ports + 1);
        var y = 0;

        for (; i < number_of_ports; i++) {
            var anchor = [0, 0, 0, 0];
            var paintStyle = { radius: 5, fillStyle: '#FF8891' };
            var isSource = false,
                isTarget = false;
            if (type === 'output') {
                anchor[0] = 1;
                paintStyle.fillStyle = '#D4FFD6';
                isSource = true;
            } else {
                isTarget = true;
            }

            anchor[1] = y + y_offset;
            y = anchor[1];

            instance.addEndpoint(node, {
                uuid: node.getAttribute("id") + "-" + ports[i],
                paintStyle: paintStyle,
                anchor: anchor,
                maxConnections: -1,
                isSource: isSource,
                isTarget: isTarget
            });
        }
    }

    function connectPorts(instance, node1, port1, node2, port2) {
        // declare some common values:
        var color = "gray";
        var arrowCommon = { foldback: 0.8, fillStyle: color, width: 5 },
            // use three-arg spec to create two different arrows with the common values:
            overlays = [
                ["Arrow", { location: 0.8 }, arrowCommon],
                ["Arrow", { location: 0.2, direction: -1 }, arrowCommon]
            ];

        var uuid_source = node1.getAttribute("id") + "-" + port1;
        var uuid_target = node2.getAttribute("id") + "-" + port2;

        instance.connect({ uuids: [uuid_source, uuid_target] });
    }

})(jQuery);

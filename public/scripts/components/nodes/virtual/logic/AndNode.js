(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var AbstractNode = window.srequire('Shift.AbstractNode');
    var AbstractNodeFactory = window.srequire('Shift.AbstractNodeFactory');
    var NodeModel = window.srequire('Shift.NodeModel');
    var NodeTypes = window.srequire('Shift.NodeTypes');
    var globalNodeFactory = window.srequire('Shift.globalNodeFactory');


    // 定义本组件对应的 Node 类型
    var TYPE = {
        primary: 'virtual',
        secondary: 'logic',
        tertiary: 'and'
    }

    function AndNode(nodeModel) {
        this.init(nodeModel);
    }

    Shift.extend(AndNode, AbstractNode, {

        render: function(parentEl, instance) {
            this.instance = instance;
            // this.parentId = parentId;

            console.log(this.model);

            // set label
            var label = this.model.label ? this.model.label : NodeTypes[TYPE.primary].sub[TYPE.secondary].sub[TYPE.tertiary].label;

            // layout
            var $panel = $(parentEl)
            var html = [];
            // --title
            html.push('<div class="Node AndNode" id="' + this.id + '">');
            html.push('<div class="title">', label, '</div>');
            // --content
            html.push('<div class="content">');
            html.push('</div>');
            html.push('</div>');
            $panel.append(html.join(''));

            // 设置
            this.__el = $('#' + this.id);
            // 设置位置
            this.__el.css('top', this.model.position.y - 30 + 'px');
            this.__el.css('left', this.model.position.x -45 + 'px');
            // 可拖动
            instance.draggable(this.__el);

            // -----------------
            // render ports
            this._renderPorts();
        },

        _renderPorts: function() {
            // input port 1
            this.instance.addEndpoint(this.__el[0], {
                uuid: this.id + '-in-0',
                anchor: [0.1, 0.53, 0, 0],
                cssClass: "NodePort",
                endpoint: 'Dot',
                maxConnections: -1,
                isSource: false,
                isTarget: true
            });
            // input port 2
            this.instance.addEndpoint(this.__el[0], {
                uuid: this.id + '-in-1',
                anchor: [0.1, 0.74, 0, 0],
                cssClass: "NodePort",
                endpoint: 'Dot',
                maxConnections: -1,
                isSource: false,
                isTarget: true
            });
            // output port 1
            this.instance.addEndpoint(this.__el[0], {
                uuid: this.id + '-out-0',
                anchor: [0.9, 0.53, 0, 0],
                cssClass: "NodePort",
                endpoint: 'Dot',
                maxConnections: -1,
                isSource: true,
                isTarget: false
            });
        }


    });


    //     jsPlumbAddPorts: function(instance, node, ports, type) {
    //         //Assume horizental layout
    //         var number_of_ports = ports.length;
    //         var i = 0;
    //         var height = $(node).height(); //Note, jquery does not include border for height
    //         var y_offset = 1 / (number_of_ports + 1);
    //         var y = 0;

    //         for (; i < number_of_ports; i++) {
    //             var anchor = [0, 0, 0, 0];
    //             var paintStyle = { radius: 5, fillStyle: '#FF8891' };
    //             var isSource = false,
    //                 isTarget = false;
    //             if (type === 'output') {
    //                 anchor[0] = 1;
    //                 paintStyle.fillStyle = '#D4FFD6';
    //                 isSource = true;
    //             } else {
    //                 isTarget = true;
    //             }

    //             anchor[1] = y + y_offset;
    //             y = anchor[1];

    //             instance.addEndpoint(node, {
    //                 uuid: node.getAttribute("id") + "-" + ports[i],
    //                 paintStyle: paintStyle,
    //                 anchor: anchor,
    //                 maxConnections: -1,
    //                 isSource: isSource,
    //                 isTarget: isTarget
    //             });
    //         }
    //     },

    //     jsPlumbConnectPorts: function(instance, node1, port1, node2, port2) {
    //         // declare some common values:
    //         var color = "gray";
    //         var arrowCommon = { foldback: 0.8, fillStyle: color, width: 5 },
    //             // use three-arg spec to create two different arrows with the common values:
    //             overlays = [
    //                 ["Arrow", { location: 0.8 }, arrowCommon],
    //                 ["Arrow", { location: 0.2, direction: -1 }, arrowCommon]
    //             ];

    //         var uuid_source = node1.getAttribute("id") + "-" + port1;
    //         var uuid_target = node2.getAttribute("id") + "-" + port2;

    //         instance.connect({ uuids: [uuid_source, uuid_target] });
    //     }
    // });


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
        doBuild: function(type, model) {
            return new AndNode(model);
        }
    });
    globalNodeFactory.register(new AndNodeFactory());


})();

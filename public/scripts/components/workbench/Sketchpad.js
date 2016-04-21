(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var Component = window.srequire('Shift.Component');
    var NodeTypes = window.srequire('Shift.NodeTypes');
    var NodeModel = window.srequire('Shift.NodeModel');

    function Sketchpad() {
        this.init();
    }

    Shift.extend(Sketchpad, Component, {

        /**
         * @override
         */
        render: function(selector) {

            var $parent = $(selector);
            var html = [];
            html.push('<div id="', this.id, '" class="Sketchpad">');
            html.push('<div id="', this.id, '_desk" class="desk"></div>')
            html.push('</div>');
            $parent.append(html.join(''));
            this.__el = $parent.find('#' + this.id + '_desk');

            this.renderDrawArea();
        },

        renderDrawArea: function() {
            var _this = this;
            jsPlumb.bind('ready', function() {
                console.log('jsPlumb start.');

                var color = "#E8C870";
                var instance = jsPlumb.getInstance({
                    Connector: ["Bezier", { curviness: 50 }],
                    DragOptions: { cursor: "pointer", zIndex: 2000 },
                    PaintStyle: { strokeStyle: color, lineWidth: 2 },
                    EndpointStyle: { radius: 5, fillStyle: color },
                    HoverPaintStyle: { strokeStyle: "#7073EB" },
                    EndpointHoverStyle: { fillStyle: "#7073EB" },
                    Container: "flow-panel"
                });
                _this.jsPlumbInstance = instance;

                _this.bind();

            });

        },
        bind: function() {
            var _this = this;
            this.__el.on('drop', function(event) {
                console.log('drag drop');

                // avoid event conlict for jsPlumb
                if (event.target.className.indexOf('_jsPlumb') >= 0) {
                    return;
                }
                event.preventDefault();

                var typeStr = event.originalEvent.dataTransfer.getData('text');
                var nodeType = NodeModel.buildType.apply({}, typeStr.split('.'));
                var nodePosition = NodeModel.buildPosition(
                    event.originalEvent.offsetX,
                    event.originalEvent.offsetY);

                // TODO build & render Node

                var model = new NodeModel({
                    type: nodeType,
                    position: nodePosition
                });

                var newNode = Shift.globalNodeFactory.build(nodeType, model);
                newNode.render(_this.__el, _this.jsPlumbInstance);

            }).on('dragover', function(event) {
                event.preventDefault();
            });


    //     jsPlumb.fire("jsFlowLoaded", instance);

    //     instance.bind("connection", function(info) {
    //         //  .. update your model in here, maybe.
    //         console.log(info);
    //     });
        }

    });

    window.sregister('Shift.Sketchpad', Sketchpad);

})();

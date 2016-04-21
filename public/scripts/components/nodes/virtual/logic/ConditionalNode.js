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
        tertiary: 'conditional'
    }

    function ConditionalNode(nodeModel) {
        this.init(nodeModel);
    }

    Shift.extend(ConditionalNode, AbstractNode, {


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

    window.sregister('Shift.ConditionalNode', ConditionalNode);


    //========================================================================
    //== Factory ==
    function ConditionalNodeFactory() {}
    Shift.extend(ConditionalNodeFactory, AbstractNodeFactory, {
        check: function(type) {
            if (type.primary == TYPE.primary &&
                type.secondary == TYPE.secondary &&
                type.tertiary == TYPE.tertiary) {
                return true;
            }
            return false;
        },
        doBuild: function(type, model) {
            return new ConditionalNode(model);
        }
    });
    globalNodeFactory.register(new ConditionalNodeFactory());


})();

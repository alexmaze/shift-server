(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var Component = window.srequire('Shift.Component');
    var NodeTypes = window.srequire('Shift.NodeTypes');
    var NodeModel = window.srequire('Shift.NodeModel');

    function Showcase() {
        this.init();
    }

    var nodeTypeMap = {};
    var nodeId = 0;
    function getNodeId(key1, key2, key3) {
        // var type = NodeModel.buildType(key1, key2, key3);
        var type = [key1, key2, key3].join('.');
        nodeTypeMap[nodeId] = type;
        nodeId++;
        return nodeId-1;
    }

    Shift.extend(Showcase, Component, {

        /**
         * @override
         */
        render: function(selector) {
            var $parent = $(selector);

            var html = [];
            html.push('<div id="', this.id, '" class="Showcase">');
            for (var key in NodeTypes) {
                if (NodeTypes.hasOwnProperty(key)) {
                    html.push('<div class="firstType">');
                    html.push('<div class="label">', NodeTypes[key].label, '</div>');
                    html.push('<div class="content">');

                    var secondTypes = NodeTypes[key].sub;
                    for (var key2 in secondTypes) {
                        if (secondTypes.hasOwnProperty(key2)) {
                            html.push('<div class="secondType">');
                            html.push('<div class="label">', secondTypes[key2].label, '</div>');
                            html.push('<div class="content">');

                            var thirdTypes = secondTypes[key2].sub;
                            for (var key3 in thirdTypes) {
                                if (thirdTypes.hasOwnProperty(key3)) {
                                    html.push('<div class="thirdType" id="', getNodeId(key, key2, key3),'">');
                                    html.push('<div class="label">', thirdTypes[key3].label, '</div>');
                                    html.push('</div>');
                                }
                            }

                            html.push('</div>');
                            html.push('</div>');
                        }
                    }

                    html.push('</div>');
                    html.push('</div>');
                }
            }
            html.push('</div>');

            $parent.append(html.join(''));


            // handle drag & drop
            $parent.find('.thirdType').attr('draggable', 'true').on('dragstart', function(ev) {
                ev.originalEvent.dataTransfer.setData('text', nodeTypeMap[ev.target.id]);
                // console.log('drag start');
                // console.log(nodeTypeMap[ev.target.id]);
            });
        },

    });

    window.sregister('Shift.Showcase', Showcase);

})();

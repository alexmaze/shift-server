(function($) {
    var Shift = window.srequire('Shift');

    // 保存全局信息
    var app = {
        nodes: [],
        idMap: {}
    };

    app.addNode = function(node) {
        this.idMap[node.id] = this.nodes.length;
        this.nodes.push(node);
    }

    window.sregister('Shift.app', app);

})(jQuery);

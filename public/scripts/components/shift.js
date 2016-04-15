(function($) {

    var SHIFT = {
        nodes: [],
        idMap: {},
        addNode: function(node) {
            this.idMap[node.id] = this.nodes.length;
            this.nodes.push(node);
        }
    };

    window.SHIFT = SHIFT;

})(jQuery);

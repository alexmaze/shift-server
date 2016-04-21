(function() {

    // 依赖
    var Shift = window.srequire('Shift');
    var Component = window.srequire('Shift.Component');

    function AbstractNode() {}
    Shift.extend(AbstractNode, Component, {

        init: function(nodeModel) {
            Component.prototype.init.apply(this);

            // update model id
            this.model = nodeModel;
            if (this.model.id !== null && this.model.id !== undefined) {
                this.id = this.model.id;
            } else {
                this.model.id = this.id;
            }
        },

        render: function(parentEl, instance) {
            throw 'Child class must implament this function!';
        },

        getModel: function() {
            return this.model;
        }
    })

    window.sregister('Shift.AbstractNode', AbstractNode);

})();

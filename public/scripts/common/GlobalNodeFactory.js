(function() {

    // 依赖
    var Shift = window.srequire('Shift');
    var AbstractNodeFactory = window.srequire('Shift.AbstractNodeFactory');

    function GlobalNodeFactory() {
        this.first = null;
        this.last = null;
    }

    Shift.extend(GlobalNodeFactory, AbstractNodeFactory, {

        /**
         * @override
         */
        check: function(type) {
            // no use for global factory
            if (this.first instanceof AbstractNodeFactory) {
                return true;
            }
            return false;
        },

        /**
         * @override
         */
        doBuild: function(type, model) {
            return this.first.build(type, model);
        },

        /**
         * 注册新的 factory
         * @param  {[type]} factory [description]
         * @return {[type]}         [description]
         */
        register: function(factory) {
            if (!(this.first instanceof AbstractNodeFactory)) {
                this.first = factory;
                this.first.next = this.last;
            } else if (!(this.last instanceof AbstractNodeFactory)) {
                this.last = factory;
                this.first.next = this.last;
            } else {
                this.last.next = factory;
                this.last = factory;
            }
        }
    });


    //---------------------------------------------------------
    //Shift.register('GlobalNodeFactory', GlobalNodeFactory);
    window.sregister('Shift.globalNodeFactory', new GlobalNodeFactory());

})();

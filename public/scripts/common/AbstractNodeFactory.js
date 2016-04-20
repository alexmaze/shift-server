(function() {

    // 依赖
    var Shift = window.srequire('Shift');

    function AbstractNodeFactory() {
        this.next = null;
    }

    /**
     * 构造相应的 Node 实例
     * 禁止子类 override
     *
     * @param  {NodeType} type NodeType object
     * @return {[type]}      [description]
     */
    AbstractNodeFactory.prototype.build = function(type) {
        if (this.check(type)) {
            return this.doBuild(type);
        }
        if (this.next instanceof AbstractNodeFactory) {
            return this.next.build();
        }
        throw 'No available factories for ' + JSON.stringify(type);
    }

    /**
     * 子类实现，用于检查是否匹配
     *
     * 必须由子类重写
     * [check description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    AbstractNodeFactory.prototype.check = function(type) {
        throw 'Child class must implament this function!';
    }

    /**
     * 构建子类对应的Node
     *
     * 必须由子类重写
     * [doBuild description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    AbstractNodeFactory.prototype.doBuild = function(type) {
        throw 'Child class must implament this function!';
    }

    //---------------------------------------------------------
    window.sregister('Shift.AbstractNodeFactory', AbstractNodeFactory);

})();

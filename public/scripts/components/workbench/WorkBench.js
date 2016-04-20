(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var Component = window.srequire('Shift.Component');
    var Showcase = window.srequire('Shift.Showcase');
    var CodeBox = window.srequire('Shift.CodeBox');
    var Sketchpad = window.srequire('Shift.Sketchpad');

    function WorkBench() {
        this.init();

        this.showcase = new Showcase();
        this.codebox = new CodeBox();
        this.sketchpad = new Sketchpad();
    }

    Shift.extend(WorkBench, Component, {

        /**
         * @override
         */
        render: function(selector) {
            var $parent = $(selector);
            var html = [];
            html.push('<div id="', this.id, '" class="WorkBench">');
            html.push('</div>');
            $parent.append(html.join(''));

            this._el = $parent.find('#' + this.id);
            this.showcase.render(this._el);
            this.sketchpad.render(this._el);
            this.codebox.render(this._el);
        }

    });

    window.sregister('Shift.WorkBench', WorkBench);

})();

(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var Component = window.srequire('Shift.Component');

    function CodeBox() {
        this.init();
    }

    Shift.extend(CodeBox, Component, {

        /**
         * @override
         */
        render: function(selector) {
            var $parent = $(selector);

            var html = [];
            html.push('<div id="', this.id, '" class="CodeBox">');
            html.push('<div class="codeArea">');
            html.push('<pre><code class="javascript"></code></pre>');
            html.push('</div>');
            html.push('</div>');

            $parent.append(html.join(''));

            this.fetchCode();
        },

        fetchCode: function() {
            var _this = this;
            setTimeout(function() {

            }, 0);
        }

    });

    window.sregister('Shift.CodeBox', CodeBox);

})();

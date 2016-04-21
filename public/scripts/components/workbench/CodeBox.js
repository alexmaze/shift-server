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

            this.__el = $parent.find('#' + this.id).find('code');
        },

        update: function(code) {
            this.__el.text(code);
            hljs.highlightBlock(this.__el[0]);
        }

    });

    window.sregister('Shift.CodeBox', CodeBox);

})();

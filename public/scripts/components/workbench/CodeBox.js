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
            html.push('<button class="deploy">Deploy</button>')
            html.push('</div>');
            html.push('</div>');

            $parent.append(html.join(''));

            this.__el = $parent.find('#' + this.id);
            this.__el_code = this.__el.find('code');

            this.bind();
        },

        update: function(code) {
            this.__el_code.text(code);
            hljs.highlightBlock(this.__el_code[0]);
        },

        bind: function() {
            this.__el.find('.deploy').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                console.log('Deploy!');

            });
        }

    });

    window.sregister('Shift.CodeBox', CodeBox);

})();

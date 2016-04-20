(function() {
    // 依赖
    var Shift = window.srequire('Shift');
    var Component = window.srequire('Shift.Component');

    function Sketchpad() {
        this.init();
    }

    Shift.extend(Sketchpad, Component, {

        /**
         * @override
         */
        render: function(selector) {


            var $parent = $(selector);

            var html = [];
            html.push('<div id="', this.id, '" class="Sketchpad">');

            html.push('<p>alex</p>');

            html.push('</div>');

            $parent.append(html.join(''));
        }

    });

    window.sregister('Shift.Sketchpad', Sketchpad);

})();

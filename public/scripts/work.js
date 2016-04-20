(function() {

    var WorkBench = window.srequire('Shift.WorkBench');

    var wb = new WorkBench();
    wb.render('#workbench_container');

    // function getTreeData() {
    //     var tree = [{
    //         text: "Logic Patch",
    //         nodes: [{
    //             text: "AND"
    //         }, {
    //             text: "OR"
    //         }, {
    //             text: "NOT"
    //         }, {
    //             text: "Conditional"
    //         }]
    //     }, {
    //         text: "Swithes",
    //         nodes: [{
    //             text: "Switch",
    //         }, {
    //             text: "Infrared"
    //         }]
    //     }];
    //     return tree;
    // }

    // $('#btnExport').click(function(event) {
    //     /* Act on the event */
    //     console.log(window.Shift.app.nodes);
    // });

    // jsPlumb.bind("ready", function() {
    //     console.log("jsPlumb is ready to use");

    //     //Initialize JsPlumb
    //     var color = "#E8C870";
    //     var instance = jsPlumb.getInstance({
    //         // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
    //         // than the curves on the first demo, which use the default curviness value.
    //         Connector: ["Bezier", { curviness: 50 }],
    //         DragOptions: { cursor: "pointer", zIndex: 2000 },
    //         PaintStyle: { strokeStyle: color, lineWidth: 2 },
    //         EndpointStyle: { radius: 5, fillStyle: color },
    //         HoverPaintStyle: { strokeStyle: "#7073EB" },
    //         EndpointHoverStyle: { fillStyle: "#7073EB" },
    //         Container: "flow-panel"
    //     });
    //     window.Shift.app.jsPlumbInstance = instance;

    //     //Initialize Control Tree View
    //     $('#control-panel').treeview({ data: getTreeData() });

    //     //Handle drag and drop
    //     $('.list-group-item').attr('draggable', 'true').on('dragstart', function(ev) {
    //         //ev.dataTransfer.setData("text", ev.target.id);
    //         ev.originalEvent.dataTransfer.setData('text', ev.target.textContent);
    //         console.log('drag start');
    //     });

    //     $('#flow-panel').on('drop', function(ev) {
    //         //avoid event conlict for jsPlumb
    //         if (ev.target.className.indexOf('_jsPlumb') >= 0) {
    //             return;
    //         }
    //         ev.preventDefault();
    //         var mx = '' + ev.originalEvent.offsetX + 'px';
    //         var my = '' + ev.originalEvent.offsetY + 'px';
    //         var nodeText = ev.originalEvent.dataTransfer.getData('text');
    //         var nodeParams = buildNodeParams(nodeText);
    //         nodeParams.position = { x: mx, y: my };
    //         var newNode = new SHIFT.Node(nodeParams);
    //         newNode.render('flow-panel');
    //         console.log('on drop : ' + nodeText);
    //     }).on('dragover', function(ev) {
    //         ev.preventDefault();
    //         console.log('on drag over');
    //     });

    //     jsPlumb.fire("jsFlowLoaded", instance);

    //     instance.bind("connection", function(info) {
    //         //  .. update your model in here, maybe.
    //         console.log(info);
    //     });

    // });

})();

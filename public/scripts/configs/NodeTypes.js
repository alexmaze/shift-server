(function() {
    var Shift = window.srequire('Shift');

    var NodeTypes = {
        virtual: {
            label: 'Virtual Nodes',
            sub: {
                logic: {
                    label: 'Logic Patches',
                    sub: {
                        and: {
                            label: 'AND'
                        },
                        or: {
                            label: 'OR'
                        },
                        not: {
                            label: 'NOT'
                        },
                        conditional: {
                            label: 'Conditional'
                        }
                    }
                },
                control: {
                    label: 'Control Flow Patches',
                    sub: {
                        // TODO
                    }
                },
                operator: {
                    label: 'Operator Patches',
                    sub: {
                        // TODO
                    }
                },
                math: {
                    label: 'Math Patches',
                    sub: {
                        // TODO
                    }
                },
                utility: {
                    label: 'Utility Patches',
                    sub: {
                        // TODO
                    }
                },
                data: {
                    label: 'Data Patches',
                    sub: {
                        // TODO
                    }
                }
            }
        },
        device: {
            label: 'Device Nodes',
            sub: {
                // TODO
            }
        }
    };

    window.sregister('Shift.NodeTypes', NodeTypes);
})();

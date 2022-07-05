let module = (function() {
    const moduleList = {}

    function define(name, modules, action) {
        modules.map((m, i) => {
            modules[i] = moduleList[m]
        })
        console.log(modules);
        moduleList[name] = action.apply(null, modules)

    }
    return {
        define
    }
})()

module.define('a', [], function() {
    return {
        max(arr) {
            return arr.sort((a, b) => b - a)[0]
        }
    }
})
module.define('b', ['a'], function(a) {

    return {
        min(arr) {
            return arr.sort((a, b) => a - b)[0]
        }
    }
})
module.define('c', ['a', 'b'], function(a, b) {

    console.log(a.max(['3', '4', '5']));
    console.log(b.min(['3', '4', '5']));
    return {

    }
})
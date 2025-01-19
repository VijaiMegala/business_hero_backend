var fs = require('fs');

module.exports = function (app: any) {
    fs.readdirSync(__dirname).forEach(function (file: any) {
        if (file == "index.ts" || file === "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}
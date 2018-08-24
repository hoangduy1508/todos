var configValues = require("./config");
module.exports = {
    getDbConnecString: function() {
        return `mongodb://${configValues.usename}:${configValues.password}@ds125422.mlab.com:25422/node-todo1`
    }
}
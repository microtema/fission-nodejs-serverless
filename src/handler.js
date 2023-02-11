const process = require("process");
//const convert = require('xml-js');

module.exports = async function (context) {
    return {
        status: 200,
        body: {
            foo: new Date(),
            BODY_PARSER_LIMIT: process.env.BODY_PARSER_LIMIT,
            ENV: process.env
        },
        header: {
            "Content-Type": "application/json"
        }
    };
};

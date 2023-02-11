const process = require("process");
const converter = require("xml-js");

module.exports = async function (context) {
    return {
        status: 200,
        body: {foo: new Date(), BODY_PARSER_LIMIT: process.env.BODY_PARSER_LIMIT},
        header: {
            "Content-Type": "application/json"
        }
    };
};

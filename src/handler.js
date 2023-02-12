const xmljs = require('xml-js');

module.exports = async function (context) {

    const {request} = context

    const from = request.headers['x-fission-params-from']
    const to = request.headers['x-fission-params-to']

    const configurations = {
        'xml-json': {
            handler: xmljs.xml2json,
            config: {compact: true, spaces: 4},
            payload: request.body,
            header: {
                "Content-Type": "application/json"
            }
        },
        'json-xml': {
            handler: xmljs.json2xml,
            config: {compact: true, spaces: 4, ignoreComment: true},
            payload: request.body,
            header: {
                "Content-Type": "plain/html"
            }
        }
    }

    const configuration = configurations[from + '-' + to]

    const {handler, config, payload, header} = configuration;

    return {
        status: 200,
        body: handler(payload, config),
        header
    };
};

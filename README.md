# Fission Serverless with Node-JS

## Port Forward
```
kubectl --namespace fission port-forward $(kubectl --namespace fission get pod -l svc=router -o name) 31314:8888
```

```
fission httptrigger update --method PUT --url "/convert/{from}/{to}" --function convert --name route-convert
```

```
fission route create --spec --method POST --url /convert/{from}/{to} --function convert --namespace default --name convert
```

## Function signature

Every Node.js function has the same basic form:

```javascript
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
```
## handler.js

This is a basic "Hello, World!" example. It simply returns a status of `200` and text body.

### Usage
Since it is an `async` function, you can `await` `Promise`s, as demonstrated in the `handler.js` function.

```bash
# Create a function
$ fission fn create --name hello --pkg [pkgname] --entrypoint "hello"

# Test the function
$ fission fn test --name hello
```

## index.js

This file does nothing but for demonstrating `require` feature.

### Usage
```bash
# Create a function, you can skip `--entrypoint` as node will look for `index.js` by default
$ fission fn create --name index --pkg [pkgname]

# Test the function
$ fission fn test --name index
```

## multi-entry.js

This is a multiple exports example. There are two exports: entry1 and entry2

### Usage
```bash
# Create a function for entry1
$ fission fn create --name entry1 --pkg [pkgname]  --entrypoint "multi-entry.entry1"

# Test the function
$ fission fn test --name entry1

# Create a function for entry2
$ fission fn create --name entry2 --pkg [pkgname]  --entrypoint "multi-entry.entry2"

# Test the function
$ fission fn test --name entry2
```

## handler.js

This is a basic "Hello, World!" example implemented with the legacy callback implementation. If you declare your function with two arguments (`context`, `callback`), a callback taking three arguments (`status`, `body`, `headers`) is provided.

⚠️️ Callback support is only provided for backwards compatibility! We recommend that you use `async` functions instead.

### Usage

```bash
# Create a function
$ fission fn create --name convert --pkg [pkgname] --entrypoint "handler"

# Map GET /hello-callback to your new function
$ fission route create --method GET --url /convert/{from}/{to} --function handler

# Run the function.
$ curl http://$FISSION_ROUTER/convert/{from}/{to}
{...}
```

# Restaurant

Mainly for the front-end of restaurant order delivery project.

The original [create-react-app](https://github.com/facebook/create-react-app) content belongs to Facebook under MIT license.

## Table of contents

<!-- TOC -->

- [Table of contents](#table-of-contents)
- [Proposed modules design](#proposed-modules-design)
- [Production related settings and HTTP server examples](#production-related-settings-and-http-server-examples)
    - [Build for production](#build-for-production)
    - [Node `serve` as a simple http server](#node-serve-as-a-simple-http-server)
    - [One way to call API address (usually proxy settings required)](#one-way-to-call-api-address-usually-proxy-settings-required)
    - [Webpack HTTP server (come with create-react-app) with proxy](#webpack-http-server-come-with-create-react-app-with-proxy)
    - [Nginx with proxy](#nginx-with-proxy)

<!-- /TOC -->

## Proposed modules design

1. Main page

   - Search bar
   - Navigation bar
   - Left panel
     - Avatar
     - controls/categories?
   - Main content canvas?

1. Sign on panel

   - login
   - register

1. Personal management page
   - orders
   - accounts

## Production related settings and HTTP server examples

### Build for production

To use "node serve" or [Nginx](https://nginx.org) serving this React app, we need run building process:

```sh
npm run build
```

The generated files will goto `build` folder.

### Node `serve` as a simple http server

The `serve` package can easily serve a static site.

```sh
npm install -g serve
serve build # build is the folder name
```

### One way to call API address (usually proxy settings required)

One way in React codes is that we can let browser call `fetch` to other back-end API.

```js
componentDidMount() {
  const apiUrl = '/data/path/to/destination.html';
  fetch(apiUrl).then((response) => {
    if (response.status !== 200) {
      throw new Error('Fail to get response with status ' + response.status);
    }

    response.json()
      .then((responseJson) => {
        // do something
      })
      .catch((error) => {
        // do something
      });
  });
}
```

### Webpack HTTP server (come with create-react-app) with proxy

When we are developing, we can use

```sh
npm install
npm start
```

to run a temporary HTTP server.

It can support HTTP proxy by adding this line to `package.json`.

```json
"proxy": "http://dataserver.com"
```

Then it will forward unknown content to the proxy address.
Please refer
[devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

You can also check the server details by

```sh
# WARNING: this command cannot be reversed
npm run eject
```

### Nginx with proxy

Nginx is a more powerful and full-featured HTTP server.

Copy the content in `build` to the root of Nginx served path (or update Nginx's setting to correct position).
Here it is `html` folder.

And below is the Nginx settings for homepage and other back-end server (dataserver.com for example).

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root   html;
        index  index.html index.htm;
    }

    location /data/ {
        proxy_pass  http://dataserver.com;
    }
```

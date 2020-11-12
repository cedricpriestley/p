const debug = require('debug');
const supportsColor = require('supports-color');
const https = require('http');
const net = require('net');
const os = require('os');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const Route = require('route-parser');
const numCPUs = require('os').cpus().length;

// const compression = require('compression');
// function shouldCompress(req, res) {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false;
//   }
//   // fallback to standard filter function
//   return compression.filter(req, res);
// }

// https.use(compression({ filter: shouldCompress }));

// debug('booting app...');

const serverOptions = {
  key: fs.readFileSync(`${process.env.HOME}/server.key`),
  cert: fs.readFileSync(`${process.env.HOME}/server.crt`),
};
/*
if (cluster.isMaster && numCPUs) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} died. Code: ${code}. Signal: ${signal}`
    );
  });
} else {
*/
  // index.js

  // const SocketService = require("./SocketService");

  /* 
  Create Server from http module.
  If you use other packages like express, use something like,
  const app = require("express")();
  const server = require("http").Server(app);

*/
  const router = (() => {
    let routes = [];

    const addRoute = (method, url, handler) => {
      routes.push({ method, url: new Route(url), handler });
    };

    const findRoute = (method, url) => {
      const route = routes.find(route => {
        return route.method === method && route.url.match(url);
      });

      if (!route) return null;

      return { handler: route.handler, params: route.url.match(url) };
    };

    const get = (route, handler) => addRoute('get', route, handler);
    const post = (route, handler) => addRoute('post', route, handler);
    const put = (route, handler) => addRoute('put', route, handler);
    const del = (route, handler) => addRoute('delete', route, handler);

    const router = () => {
      const listen = (port, cb) => {
        https
          .createServer(serverOptions, (req, res) => {

            console.log('request ', req.url);

            const method = req.method.toLowerCase();
            let url = req.url.toLowerCase();
            const found = findRoute(method, url);

            // if (!res.send) {
            //   res.send = function(body) {
            //     res.writeHead(200, {
            //       "Content-Type": "text/plain"
            //     });
            //     res.end(body);
            //   };
            // }

            if (found) {

              switch (method) {
                case "post":
                  // req.body = await bodyParser(req);
                  postHandler(req, res);
                  break

                case "get":
                  break

                case "put":
                  postHandler(req, res);
                  // req.body = await bodyParser(req);
                  break

                case "delete":
                  break

                default:
                  response.writeHead(400, { "Content-type": "text/plain" })
              }

              req.params = found.params;
              res.send = content => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(content, 'utf-8');
              };

              return found.handler(req, res);
            } else {
              if (url == './' || url == '/') {
                url = './index.html';
              }

              // const extname = String(path.extname(url)).toLowerCase();
              // const mimeTypes = {
              //   '.html': 'text/html',
              //   '.js': 'text/javascript',
              //   '.css': 'text/css',
              //   '.json': 'application/json',
              //   '.png': 'image/png',
              //   '.jpg': 'image/jpg',
              //   '.gif': 'image/gif',
              //   '.svg': 'image/svg+xml',
              //   '.wav': 'audio/wav',
              //   '.mp4': 'video/mp4',
              //   '.woff': 'application/font-woff',
              //   '.ttf': 'application/font-ttf',
              //   '.eot': 'application/vnd.ms-fontobject',
              //   '.otf': 'application/font-otf',
              //   '.wasm': 'application/wasm',
              // };

              // const contentType = mimeTypes[extname] || 'application/octet-stream';

              fs.readFile(url, (error, content) => {
                if (error) {
                  if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', (error, content) => {
                      res.writeHead(404, { 'Content-Type': 'text/html' });
                      res.end(content, 'utf-8');
                    });
                  } else {
                    res.writeHead(500);
                    // res.end(
                    //   `Sorry, check with the site admin for error: ${error.code} ..\n`,
                    // );
                  }
                } else {
                  // res.writeHead(200, { 'Content-Type': 'application/json' });
                  // // res.writeHead(200, { 'Content-Type': contentType });
                  // res.end(content, 'utf-8');
                  // req.params = found.params;
                  res.send = content => {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(content, 'utf-8');
                  };

                  return found.handler(req, res);
                }
              });
            }

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Route not found.');
          })
          .listen(port, cb);
      };

      return {
        get,
        post,
        put,
        del,
        listen
      };
    };

    return router;
  })();


/**
 * Extract posted data from request body
 * @param req
 * @returns {Promise<any>}
 */
async function bodyParser(req) {
  return new Promise((resolve, reject) => {
    let totalChunked = ""
    req
      .on("error", err => {
        console.error(err)
        reject()
      })
      .on("data", chunk => {
        totalChunked += chunk
      })
      .on("end", () => {
        request.body = JSON.parse(totalChunked)
        resolve()
      })
  })
}

async function postHandler(req, res) {
  try {
    await bodyParser(req)
  } catch (err) {
    response.writeHead(400, { "Content-type": "text/plain" })
    response.write("Invalid body data was provided", err.message)
    response.end()
  }
}

module.exports = router;

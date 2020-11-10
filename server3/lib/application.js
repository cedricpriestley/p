const debug = require('debug');
const supportsColor = require('supports-color');
const https = require('http');
const net = require('net');
const os = require('os');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Router = require("./router");



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
  exports = module.exports = {
    _router: new Router(),

    get: function(path, fn) {
      return this._router.get(path, fn);
    },

    put: function(path, fn) {
      return this._router.put(path, fn);
    },

    listen: function(port, cb) {
      var self = this;
      const server = https.createServer((request, response) => {
        console.log('request ', request.url);

        if (!response.send) {
          response.send = function(body) {
            response.writeHead(200, {
              "Content-Type": "text/plain"
            });
            response.end(body);
          };
        }

        let data = '';
        request.on('data', chunk => {
          data += chunk;
        })
        request.on('end', () => {
          // JSON.parse(data).todo // 'Buy the milk'
          console.log(data)
        })

        let filePath = `.${request.url}`;
        if (filePath == './') {
          filePath = './index.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.wav': 'audio/wav',
          '.mp4': 'video/mp4',
          '.woff': 'application/font-woff',
          '.ttf': 'application/font-ttf',
          '.eot': 'application/vnd.ms-fontobject',
          '.otf': 'application/font-otf',
          '.wasm': 'application/wasm',
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
          if (error) {
            if (error.code == 'ENOENT') {
              fs.readFile('./404.html', (error, content) => {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
              });
            } else {
              response.writeHead(500);
              response.end(
                `Sorry, check with the site admin for error: ${error.code} ..\n`,
              );
            }
          } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
          }
        });

        return self._router.handle(request, response);
      });

      server.on('error', (err) => console.error(err));

      // return server.listen.apply(server, arguments);
      return server.listen(process.env.PORT || 8080, () => {
        console.log(`HTTPS Server started on port ${server.address().port} :)`);
        // const socketService = new SocketService();
        // socketService.attachServer(server);
      });
    }
  };

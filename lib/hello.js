var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());

/**
 * @swagger
 * definitions:
 *   Hello:
 *     type: object
 *     required:
 *       - msg
 *     properties:
 *       msg:
 *         type: string
 *   HelloPost:
 *     type: object
 *     required:
 *       - hello
 *     properties:
 *       hello:
 *         type: string
 */

/**
 * @swagger
 * /hello:
 *   get:
 *     description: Get Hello endpoint
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hello
 *         description: Name of greeting .
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Hello world response
 *         schema:
 *         $ref: '#/definitions/Hello'
 */
  hello.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

/**
 * @swagger
 * /hello:
 *   post:
 *     description: POST Hello endpoint
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hello
 *         description: Name of greeting.
 *         in: body
 *         required: false
 *         type: string
 *         schema:
 *           $ref: "#/definitions/HelloPost"
 *     responses:
 *       200:
 *         description: Hello world response
 *         schema:
 *         $ref: '#/definitions/Hello'
 */
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var world = req.body && req.body.hello ? req.body.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  return hello;
}

module.exports = helloRoute;

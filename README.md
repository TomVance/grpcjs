# GRPCJS
> This project is still very much in the early days of development.

> Documentation is currently lacking and will be improved on soon.

Simplistic GRPC framework for [node](http://nodejs.org).

```javascript
const { App } = require('grpcjs')
const path = require('path')

const Server = new App(path.resolve('./Calculator.proto'))

const Calculator = Server.createService('Calculator') // must match a service in the protobuf file

Calculator.on('Add', async ({ number1, number2 }) => {  // must match a rpc method in the protobuf file
  return { result: number1 + number2 }
})

Server.serve()
```

## Installation
This is a node module hosted on the NPM registry and call be installed using your favourite client:

```
yarn add grpcjs
```

```
npm install grpcjs
```

## Getting Started / API
Getting started with GRPCJS is relativly simple. First it's a good idea to get aquantied to the
grpc library. I have a guide for this here: https://tech.holidayextras.com/the-path-to-grpc-with-node-js-e2be9b5d3c5c

This framework builds on top of this with a nicer API.

```javascript
const { App } = require('grpcjs')
const Server = new App(path.resolve('./Calculator.proto'))
```
Creates a new GRPC server, and loads in the Calculator protobuf file.

```javascript
const Calculator = Server.createService('Calculator')
```
Defines a new service on this server. The service name should match a defined service in the protobuf file passed to the server.

```javascript
Calculator.on('Add', async ({ number1, number2 }) => {  // must match a rpc method in the protobuf file
  return { result: number1 + number2 }
})
```
Defines a new handler for a defined rpc function. Again the first parameter should match a defined method 
in the protobuf file.

```javascript
Server.serve()
```
This tells the server to start listening. This MUST be called last.

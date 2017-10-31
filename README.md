# Base 64 Python Parser

Be carefull, this is a WIP module !

## Install

To install the package use npm or yarn :

> npm i --save b64-python-parser

## How To

This module currently return a function `b64PythonParser`. To use it just call it with base 64 as argument : `b64PythonParser(myBase64Data)`.
This function return a promise that resolve when the b64 string is fully parsed, see the exemples below for more detailed usage.

## Exemple:

In the Browser :

```js
b64PythonParser('SG9sYSwgSGVsbG8sIEJvbmpvdXIgIQ==').then(function(res){
  console.log('Result : \n ' + res);
}, function(err){
  console.log(err)
})
```

Or as a node module :

```js
const b64PythonParser = require('b64-python-parser')

b64PythonParser('SG9sYSwgSGVsbG8sIEJvbmpvdXIgIQ==').then( res => {
  console.log(res);
}, err => {
  console.log(err);
})
```

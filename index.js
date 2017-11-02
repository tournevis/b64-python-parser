(function(root){
  function b64PythonParser(b64String){
    return new Promise(function(resolve, reject) {
      try {
        var rawB64 = atob(b64String)
        var utfDecoding = utf8Decode(rawB64)
        resolve(utfDecoding)
      } catch (err) {
        reject(err)
      }
    })
  }

  function btoa(str) {
    if (Buffer.byteLength(str) !== str.length)
      throw new Error('bad string!');
    return Buffer(str, 'binary').toString('base64');
  }

  function atob(str) {
    /*
      Based on this Repo :
      https://github.com/node-browser-compat/btoa
    */
    // browserify (web worker)
    if (root && 'function' === typeof root.atob) {
      return  root.atob(str);
    }
    else if ('function' === typeof Buffer) {
      return new Buffer(str, 'base64').toString('binary');
    }// normal window

    // ios web worker with base64js
    else if (root && 'object' === typeof root.base64js) {
      // bufferToBinaryString
      // https://github.com/coolaj86/unibabel-js/blob/master/index.js#L50
      var buf = root.base64js.b64ToByteArray(str);

      return Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
      }).join('');
    }
    // ios web worker without base64js
    else {
      throw new Error("you're probably in an ios webworker. please include use beatgammit's base64-js");
    }
  }

  /*
    UTF-8 Decoding special characters :
    https://gist.github.com/chrisveness/bcb00eb717e6382c5608
  */
  function utf8Decode(utf8String) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precedence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
        return String.fromCharCode(cc); }
      ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
        function(c) {  // (note parentheses for precedence)
          var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
          return String.fromCharCode(cc);
        }
      )
      return unicodeString;
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = b64PythonParser;
    }
    exports.b64PythonParser = b64PythonParser;
  } else {
    root['b64PythonParser'] = b64PythonParser;
  }
})(this);

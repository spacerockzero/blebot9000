//-----------------------------------
//	author: Monofuel
//	website: japura.net

'use strict';
require("babel-register");
require("babel-polyfill");

require('./main.js').init().catch((err) => {
  console.error(err);
});

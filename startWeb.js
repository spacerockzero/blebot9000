//-----------------------------------
//	author: Monofuel
//	website: japura.net

'use strict';
require("babel-register");
require("babel-polyfill");

require('./web.js').init().catch((err) => {
  console.error(err);
});

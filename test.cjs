const fetch = require('node-fetch');

// Or using built-in fetch
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0101_')
  .then(r => r.text())
  .then(html => console.log(html));

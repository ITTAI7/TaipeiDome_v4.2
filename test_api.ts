import fetch from 'node-fetch';
(async () => {
  const res = await fetch('http://127.0.0.0:3000/api/get_games');
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
})();

import fetch from 'node-fetch';

async function test() {
    const res = await fetch("http://localhost:3000/api/get_games/brothers");
    const text = await res.text();
    console.log("RESPONSE:", text);
}
test();

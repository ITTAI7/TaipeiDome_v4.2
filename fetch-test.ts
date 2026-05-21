import fetch from 'node-fetch';

async function test() {
    const res = await fetch("http://localhost:3000/api/get_tickets/brothers?url=https%3A%2F%2Ftix.brothers.tw%2FUTK0102_");
    const text = await res.text();
    console.log("RESPONSE:", text);
}
test();

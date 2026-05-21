import fetch from 'node-fetch';

async function test() {
    const res = await fetch("http://localhost:3000/api/get_tickets/brothers?url=https%3A%2F%2Ftix.ctbcsports.com%2FBROTHERS%2FUTK0201_%3FPRODUCT_ID%3DP16ANF0O%26STARTDATE%3D2026%2F05%2F22");
    const text = await res.text();
    console.log("RESPONSE:", text);
}
test();

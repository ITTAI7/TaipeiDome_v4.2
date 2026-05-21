import fs from 'fs';

async function test() {
  const res = await fetch('https://ticket.tsghawks.com/assets/index-BMkZfU1m.js');
  const js = await res.text();
  
  // Find assignment to Zf
  let idx = js.indexOf('Zf=');
  if(idx === -1) {
    // Try to find x-company-code value using regex
    console.log("No Zf=");
  } else {
    console.log(js.substring(Math.max(0, idx - 20), idx + 50));
  }
}
test();

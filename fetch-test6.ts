import fetch from 'node-fetch';

async function test() {
    const pubUrl = "https://ais-dev-h5f3hn6krv36zayaya4hap-465207096986.asia-east1.run.app/api/get_tickets/brothers?url=https%3A%2F%2Ftix.ctbcsports.com%2FBROTHERS%2FUTK0201_%3FPRODUCT_ID%3DP16ANF0O%26STARTDATE%3D2026%2F05%2F22";
    console.log("Fetching", pubUrl);
    
    // We send Accept: application/json to avoid SSE block just to see HTTP code
    const res = await fetch(pubUrl, {
       headers: {
          'Accept': 'application/json'
       }
    });
    console.log("STATUS:", res.status);
    const text = await res.text();
    console.log("BODY:", text);
}
test();

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/get_tickets/tsg?url=' + encodeURIComponent('https://ticket-platform.newretail.tw/tsg-api-params?activityId=AC_260105GC4888&eventSessionId=TSGHAWKS_2627_REG_115'));
    if(res.ok) {
       console.log(await res.json());
    } else {
       console.log(res.status, await res.text());
    }
  } catch(e) {
    console.error(e);
  }
}
test();

async function test() {
  const url = 'https://ticket-platform.newretail.tw/api/v1/public/seat-availability?activityId=AC_260105GC4888&eventSessionId=TSGHAWKS_2627_REG_115';
  const res = await fetch(url, { headers: { 'x-company-code': 'tsghawks' } });
  const data = await res.json();
  console.log(data.slice(0, 5));
}
test();

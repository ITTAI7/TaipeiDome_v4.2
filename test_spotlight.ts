async function test() {
  const url = 'https://ticket-platform.newretail.tw/api/v1/public/spotlight';
  const res = await fetch(url, { headers: { 'x-company-code': 'tsghawks' }});
  const data = await res.json();
  const available = data.regulars.filter(g => g.eligibilityStatus !== 'disabled' || g.disabledNotice !== '購票時間已結束');
  console.log("Available:", available.length);
  if(available.length > 0) console.log(available[0]);
}
test();

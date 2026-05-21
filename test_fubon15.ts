import * as fs from 'fs';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const initRes = await fetch(new URL('UTK0101_', baseUrl));
  let cookies: string[] = [];
  initRes.headers.forEach((v, k) => {
     if (k.toLowerCase() === 'set-cookie') cookies.push(v);
  });
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  
  const text = await initRes.text();
  const reqVerMatch = text.match(/name="__RequestVerificationToken" type="hidden" value="(.*?)"/);
  const jwtMatch = text.match(/name="__JWtToken" type="hidden" value="(.*?)"/);
  
  const reqVer = reqVerMatch ? reqVerMatch[1] : '';
  const auth = jwtMatch ? jwtMatch[1] : '';

  const evRes = await fetch(new URL('UTK0101_/GET_CALENDAR_EVENTS', baseUrl), {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': cookieStr,
      'RequestVerificationToken': reqVer,
      'Authorization': auth,
      'Referer': baseUrl + 'UTK0101_',
      'Origin': 'https://guardians.fami.life'
    },
    body: '' 
  });

  const evText = await evRes.text();
  const match = evText.match(/_cevent\s*=\s*(\[[\s\S]*\])/);
  if (match) {
     const events = JSON.parse(match[1]);
     const domeEvents = events.filter((e: any) => e.PLACE_NAME && e.PLACE_NAME.includes('大巨蛋'));
     console.log('Dome games from API directly:', domeEvents.length);
     if (domeEvents.length > 0) {
        console.log(domeEvents[0]);
     }
  }
}

test();

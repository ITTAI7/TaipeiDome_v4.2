import * as fs from 'fs';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const res = await fetch(new URL('UTK0101_/GET_CALENDAR_EVENTS', baseUrl), {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
  });
  const text = await res.text();
  console.log('Result length:', text.length);
  if (text.length > 0) {
      console.log(text.substring(0, 1000));
  }
}

test();

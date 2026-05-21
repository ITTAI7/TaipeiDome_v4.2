async function test() {
  const res = await fetch('https://tix.wdragons.com/Captcha.ashx');
  const body = await res.text();
  console.log("Body length:", body.length);
  console.log("Body start:", body.substring(0, 500));
}
test();

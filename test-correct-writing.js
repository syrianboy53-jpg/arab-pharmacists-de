async function test() {
  const url = 'https://www.b1-syrer.de/api/correct-writing';
  console.log('Sending POST to', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Ich lerne Deutsch und das ist sehr gut für mich. Ich will arbeiten.' })
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();

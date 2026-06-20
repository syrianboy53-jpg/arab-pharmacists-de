async function test() {
  const url = 'https://www.b1-syrer.de/api/ai-chat';
  console.log('Sending POST to', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hallo', persona: 'friend', history: [] })
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();

import bcrypt from 'bcryptjs';
try {
  console.log('Testing bcrypt...');
  const res = bcrypt.compareSync('test', '$2a$10$testtesttesttesttesttes');
  console.log('Result:', res);
} catch (e) {
  console.error('ERROR:', e);
}

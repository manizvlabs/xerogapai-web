const bcrypt = require('bcryptjs');

async function testPassword() {
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 12);
  
  console.log('Original password:', password);
  console.log('Hashed password:', hashedPassword);
  
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('Password comparison result:', isValid);
  
  // Test with the same password again
  const hashedPassword2 = await bcrypt.hash(password, 12);
  console.log('Second hash:', hashedPassword2);
  console.log('Same password, different hash:', hashedPassword !== hashedPassword2);
  
  const isValid2 = await bcrypt.compare(password, hashedPassword2);
  console.log('Second comparison result:', isValid2);
}

testPassword().catch(console.error);

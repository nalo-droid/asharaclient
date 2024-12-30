import { testUsers } from './testUsers';

// Test function to simulate login
function testLogin(email, password) {
  const user = testUsers.find(
    user => user.email === email && user.password === password
  );
  
  if (user) {
    console.log('Login successful:', user);
    return true;
  } else {
    console.log('Login failed: Invalid credentials');
    return false;
  }
}

// Run tests
console.log('Testing client login:');
testLogin('client@test.com', 'client123');

console.log('\nTesting admin login:');
testLogin('admin@test.com', 'admin123');

console.log('\nTesting invalid login:');
testLogin('wrong@email.com', 'wrongpass'); 
// Import both servers
const part1Server = require('./part1-server');
const part2Server = require('./part2-server');

console.log('====================================');
console.log('GDG Node.js Track - Task 1 Solution');
console.log('====================================\n');

console.log('Both servers are now running:');
console.log('1. Basic HTTP Server - http://localhost:3000');
console.log('2. Student REST API  - http://localhost:4000');
console.log('\nPress Ctrl+C to stop both servers\n');

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\nShutting down servers...');
    process.exit(0);
});
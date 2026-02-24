// Create favicon.svg
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="#1a1a2e" stroke="#00d9ff" stroke-width="3"/>
  <circle cx="32" cy="32" r="12" fill="#00d9ff"/>
  <circle cx="32" cy="32" r="5" fill="#1a1a2e"/>
</svg>`;

const fs = require('fs');
fs.writeFileSync('public/favicon.svg', svg);
console.log('Created public/favicon.svg');

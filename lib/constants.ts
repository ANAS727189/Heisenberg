export const MOCK_TRAFFIC_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  requests: Math.floor(Math.random() * 100) + 50,
  latency: Math.floor(Math.random() * 50) + 10,
}));

export const VULNERABILITY_DATA = [
  { name: 'SQL Injection', value: 20 },
  { name: 'XSS', value: 35 },
  { name: 'CSRF', value: 15 },
  { name: 'Auth Bypass', value: 30 },
];

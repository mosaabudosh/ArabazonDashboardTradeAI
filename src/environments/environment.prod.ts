export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:5000/api/v1',
  signalR: {
    marketHub:  'http://localhost:5000/hubs/market',
    signalHub:  'http://localhost:5000/hubs/signals',
    tradeHub:   'http://localhost:5000/hubs/trades',
  }
};
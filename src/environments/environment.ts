export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api/v1',
  signalR: {
    marketHub:  'http://localhost:5000/hubs/market',
    signalHub:  'http://localhost:5000/hubs/signals',
    tradeHub:   'http://localhost:5000/hubs/trades',
    notificationHub: 'http://localhost:5000/hubs/notifications'
  }
};
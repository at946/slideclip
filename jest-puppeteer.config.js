module.exports = {
  launch: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'yarn build && yarn start --port 3000',
    port: 3000,
    launchTimeout: 50000
  }
}
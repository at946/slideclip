module.exports = {
  launch: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'yarn run testServer',
    port: 3000,
    launchTimeout: 50000
  }
}
module.exports = {
  apps: [
    {
      name: 'website',
      script: 'npm run start -- --port $PORT',
      instances: 4,
      exec_mode: 'cluster',
      watch: true,
      increment_var: 'PORT',
      env: {
        PORT: 4000,
      },
    },
  ],
}

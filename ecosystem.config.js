module.exports = {
  apps: [
    {
      name: 'website',
      script: 'npm',
      args: 'start',
      instances: 4,
      exec_mode: 'cluster',
      increment_var: 'PORT',
      env: {
        PORT: 4000,
      },
    },
  ],
}

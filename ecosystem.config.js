module.exports = {
  apps: [
    {
      name: 'website',
      script: 'npm run start',
      instances: 4,
      exec_mode: 'cluster',
      watch: true,
      increment_var: 'PORT',
      env: {
        PORT: 4000,
        NEXT_PUBLIC_BASE_PATH: '/next',
      },
    },
  ],
}

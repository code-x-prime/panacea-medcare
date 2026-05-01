module.exports = {
  apps: [
    {
      name: "panacea-medcare",
      cwd: "/home/admin/panacea-medcare",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/error.log",
      out_file: "./logs/combined.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
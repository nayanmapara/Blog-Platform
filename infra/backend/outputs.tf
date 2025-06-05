output "backend_url" {
  description = "The URL of the deployed Spring Boot API"
  value       = azurerm_linux_web_app.backend.default_hostname
}

output "postgres_fqdn" {
  description = "PostgreSQL database FQDN"
  value       = azurerm_postgresql_flexible_server.db.fqdn
}

output "backend_url" {
  description = "The URL of the deployed Spring Boot API"
  value       = azurerm_linux_web_app.backend.default_hostname
}

output "postgres_fqdn" {
  description = "PostgreSQL database FQDN"
  value       = azurerm_postgresql_flexible_server.db.fqdn
}

output "frontend_url" {
    description = "The URL of the deployed frontend static website"
    value = azurerm_storage_account.frontend.primary_web_endpoint
}
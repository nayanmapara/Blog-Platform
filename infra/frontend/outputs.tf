output "frontend_url" {
    description = "The URL of the deployed frontend static website"
    value = azurerm_storage_account.frontend.primary_web_endpoint
}
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "random_string" "rand" {
  length  = 6
  special = false
  upper   = false
}

resource "azurerm_resource_group" "rg" {
  name     = "blog-platform-rg"
  location = "Canada Central"
}

resource "azurerm_storage_account" "frontend" {
  name                     = "blogfrontend"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}

resource "local_file" "frontend_env" {
  content  = "window.env = { VITE_API_BASE_URL: \"${var.vite_api_base_url}\" };"
  filename = "${path.module}/../frontend/dist/env.js"
}

resource "azurerm_storage_blob" "frontend_build" {
  for_each = fileset("${path.module}/../frontend/dist", "**/*")

  name                   = each.value
  type                   = "Block"
  source                 = "${path.module}/../frontend/dist/${each.value}"
  storage_account_name   = azurerm_storage_account.frontend.name
  storage_container_name = "$web"
  content_type           = lookup(var.mime_types, substr(each.value, length(each.value) - length(split(".", each.value)[-1]) - 1, length(each.value)), "application/octet-stream")
}

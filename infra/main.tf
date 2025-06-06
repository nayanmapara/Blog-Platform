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

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "blogplatformdb"
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  administrator_login    = var.db_username
  administrator_password = var.db_password
  sku_name               = "B_Standard_B1ms"
  version                = "14"
  storage_mb             = 32768
  zone                   = "1"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_all" {
  name       = "allow-all"
  server_id  = azurerm_postgresql_flexible_server.db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}

resource "azurerm_service_plan" "plan" {
  name                = "blog-platform-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "backend" {
  name                = "blog-platform-api"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    application_stack {
      java_version        = "21"
      java_server         = "JAVA"
      java_server_version = "21"
    }
  }

  app_settings = {
    "SPRING_PROFILES_ACTIVE"      = "prod"
    "SPRING_DATASOURCE_URL"       = "jdbc:postgresql://${azurerm_postgresql_flexible_server.db.fqdn}:5432/postgres"
    "SPRING_DATASOURCE_USERNAME"  = var.db_username
    "SPRING_DATASOURCE_PASSWORD"  = var.db_password
    "JWT_SECRET"                  = var.jwt_secret
  }
}

resource "azurerm_storage_account" "frontend" {
  name                     = "blogfrontend"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_account_static_website" "frontend_static" {
  storage_account_id = azurerm_storage_account.frontend.id
  index_document     = "index.html"
  error_404_document = "index.html"
}

resource "azurerm_storage_blob" "frontend_build" {
  for_each = fileset("${path.module}/../frontend/dist", "**/*")

  name                   = each.value
  type                   = "Block"
  source                 = "${path.module}/../frontend/dist/${each.value}"
  storage_account_name   = azurerm_storage_account.frontend.name
  storage_container_name = "$web"
  content_type = lookup(
  var.mime_types,
  regex("\\.([^.]+)$", each.value)[0],
  "application/octet-stream"
)

}

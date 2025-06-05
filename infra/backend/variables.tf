variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "db_username" {
  description = "PostgreSQL admin username"
  type        = string
}

variable "db_password" {
  description = "PostgreSQL admin password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
}
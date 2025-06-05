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

variable "vite_api_base_url" {
  description = "The base URL of the backend API for the frontend to consume"
  type        = string
}

variable "mime_types" {
  description = "Map of file extensions to MIME types"
  type = map(string)
  default = {
    html = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    json = "application/json"
    png  = "image/png"
    svg  = "image/svg+xml"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    ico  = "image/x-icon"
  }
}

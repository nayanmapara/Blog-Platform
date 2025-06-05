variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
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

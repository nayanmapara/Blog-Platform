# 🌐 Infrastructure as Code – Blog Platform App (Terraform + Azure)

This directory contains the **Terraform configuration** for provisioning cloud infrastructure on **Microsoft Azure** to deploy the Blog Platform App (Spring Boot + React + PostgreSQL).



## 🚀 Provisioned Resources

Terraform will create and manage the following Azure resources:

### ✅ Core Infrastructure
- **Resource Group**
- **App Service Plan**
- **App Service** (for Spring Boot backend)
- **PostgreSQL Flexible Server**
- **Database and Firewall Rules**
- *(Planned)* **Static Web App or Storage Account + CDN** for React frontend


## 📁 Folder Structure

```
infra/
├── main.tf                 # Main Terraform configuration
├── variables.tf            # Input variables
├── terraform.tfvars        # Sensitive values (never commit)
├── outputs.tf              # Useful outputs like backend URL
```


## ⚙️ Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install)
- Azure CLI (`az login`)
- Azure Subscription
- Service Principal with Contributor role (recommended for automation)



## 🔐 Secrets Setup

Configure `terraform.tfvars` or environment variables for:

```hcl
client_id       = "xxxxx"
client_secret   = "xxxxx"
tenant_id       = "xxxxx"
subscription_id = "xxxxx"
location        = "Canada East" # or any supported region
db_admin_user   = "blogadmin"
db_admin_pass   = "secure_password"
```

> ⚠️ **Do not commit `terraform.tfvars`** — add it to `.gitignore`.


## 📦 Usage

### 1. Initialize Terraform
```bash
terraform init
```

### 2. Plan Infrastructure Changes
```bash
terraform plan
```

### 3. Apply Infrastructure Changes
```bash
terraform apply
```

### 4. Destroy (Teardown)
```bash
terraform destroy
```


## 📤 Outputs

After `apply`, Terraform will output:
- Backend Web App URL
- PostgreSQL Server FQDN
- Connection Strings

These values can be exported as environment variables to configure CI/CD or frontend proxy settings.


## 🧠 Notes

- PostgreSQL may take a few minutes to provision and become available.
- Frontend Terraform deployment is coming soon.



## 📎 Related Docs

- [Azure Provider Docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure App Service Terraform](https://learn.microsoft.com/en-us/azure/developer/terraform/create-web-app)

---


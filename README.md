# Deploy Test - Azure App Service

A sample Node.js application demonstrating deployment to Azure App Service using Azure CLI and PowerShell. This project includes a basic Express.js server with static file hosting and REST API endpoints.

## 🚀 Features

- **Express.js Web Server** - Lightweight Node.js web application
- **Static File Hosting** - Serves HTML, CSS, and JavaScript files
- **REST API Endpoints** - Sample endpoints for application info, greetings, and echo
- **Azure Deployment Script** - Automated PowerShell script for Azure CLI deployment
- **Interactive UI** - Web interface to test API endpoints

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v20 LTS or later)
- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)
- An active Azure subscription
- PowerShell (for running the deployment script)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd deploy-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run locally:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serves the main HTML page |
| GET | `/api/info` | Returns application metadata and environment info |
| GET | `/api/greet/:name` | Returns a personalized greeting |
| POST | `/api/echo` | Echoes back the JSON payload sent in the request body |

### Example API Usage

```bash
# Get application info
curl http://localhost:3000/api/info

# Get a greeting
curl http://localhost:3000/api/greet/World

# Echo a message
curl -X POST http://localhost:3000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Azure"}'
```

## ☁️ Azure Deployment

### Quick Deploy

Deploy the application to Azure using the provided PowerShell script:

```powershell
.\deploy.ps1 -ResourceGroup "my-rg" -AppName "my-nodejs-app" -Location "eastus"
```

### Script Parameters

| Parameter | Required | Description | Default |
|-----------|----------|-------------|---------|
| `ResourceGroup` | Yes | Azure resource group name | - |
| `AppName` | Yes | App Service name (must be globally unique) | - |
| `Location` | Yes | Azure region (e.g., eastus, westus2, westeurope) | - |
| `RuntimeVersion` | No | Node.js runtime version | NODE:20-lts |
| `PlanName` | No | App Service Plan name | {AppName}-plan |
| `Sku` | No | App Service Plan tier | B1 |

### Example Deployment

```powershell
# Deploy with default settings
.\deploy.ps1 -ResourceGroup "my-resource-group" -AppName "my-unique-app-name" -Location "eastus"

# Deploy with custom SKU
.\deploy.ps1 -ResourceGroup "my-rg" -AppName "my-app" -Location "westus2" -Sku "P1V2"

# Deploy with custom runtime
.\deploy.ps1 -ResourceGroup "my-rg" -AppName "my-app" -Location "eastus" -RuntimeVersion "NODE:18-lts"
```

### What the Script Does

1. ✅ Validates Azure CLI installation and login status
2. ✅ Creates or verifies the resource group
3. ✅ Creates an App Service Plan (Linux-based)
4. ✅ Creates the Web App with Node.js runtime
5. ✅ Configures deployment settings
6. ✅ Packages and deploys the application
7. ✅ Provides the deployment URL

### Important Notes

- **Free Tier (F1)**: Does not support Linux apps. Use B1 or higher for this deployment.
- **App Name**: Must be globally unique across all Azure App Services.
- **Linux Plan**: The script creates a Linux-based App Service Plan.

## 📁 Project Structure

```
deploy-test/
├── index.js           # Express.js server entry point
├── package.json       # Node.js dependencies and scripts
├── deploy.ps1         # Azure deployment PowerShell script
└── public/            # Static web files
    ├── index.html     # Main application page
    ├── about.html     # About page
    ├── 404.html       # Custom 404 error page
    ├── app.js         # Client-side JavaScript
    └── styles.css     # Application styles
```

## 🔧 Configuration

### Environment Variables

The application supports the following environment variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

### Azure App Settings

After deployment, you can configure additional app settings in the Azure Portal or using Azure CLI:

```powershell
az webapp config appsettings set `
  --name <app-name> `
  --resource-group <resource-group> `
  --settings KEY=VALUE
```

## 📊 Monitoring

### View Application Logs

```powershell
# Stream live logs
az webapp log tail --name <app-name> --resource-group <resource-group>

# Download logs
az webapp log download --name <app-name> --resource-group <resource-group>
```

### Enable Application Insights

```powershell
az monitor app-insights component create `
  --app <app-name> `
  --location <location> `
  --resource-group <resource-group>
```

## 🧹 Cleanup

To remove all Azure resources created by this deployment:

```powershell
az group delete --name <resource-group> --yes
```

## 📝 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For issues related to:
- **Application**: Open an issue in this repository
- **Azure Deployment**: Check [Azure App Service documentation](https://docs.microsoft.com/azure/app-service/)
- **Azure CLI**: Visit [Azure CLI documentation](https://docs.microsoft.com/cli/azure/)

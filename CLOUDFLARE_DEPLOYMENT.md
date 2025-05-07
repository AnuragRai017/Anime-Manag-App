# Cloudflare Pages Deployment Guide for Manga Reader Web App

This guide explains how to deploy the Manga Reader Web App to Cloudflare Pages/Workers.

## Prerequisites

- A Cloudflare account
- Wrangler CLI installed globally (`npm install -g wrangler`)
- Node.js 18+ and npm

## Setup Files

The following configuration files have been set up for your Cloudflare deployment:

- `wrangler.toml` - Main Cloudflare Workers configuration
- `wrangler.jsonc` - Asset configuration for Cloudflare Pages
- `next.cloudflare.js` - Next.js configuration specific to Cloudflare
- `public/_redirects` - URL redirection rules
- `public/_headers` - HTTP header configuration
- `.github/workflows/cloudflare-pages-deploy.yml` - GitHub Actions deployment workflow

## First-time Setup

1. Login to your Cloudflare account with Wrangler:
   ```bash
   npx wrangler login
   ```

2. Create a Cloudflare Pages project:
   ```bash
   npx wrangler pages project create manga-reader-web-app
   ```

3. Set up your secrets in Cloudflare Pages dashboard:
   - Go to Cloudflare Dashboard > Pages > Your Project > Settings > Environment variables
   - Add environment variables like `NEXT_PUBLIC_API_URL`

4. Configure your custom domain in the Cloudflare Pages dashboard:
   - Go to Cloudflare Dashboard > Pages > Your Project > Custom domains
   - Add your domain and follow the instructions

## Local Development

1. Run the local development server:
   ```bash
   npm run dev
   ```

2. To preview with Cloudflare Pages locally:
   ```bash
   npm run pages:preview
   ```

## Manual Deployment

1. Build your Next.js application:
   ```bash
   npm run build
   ```

2. Build for Cloudflare Pages:
   ```bash
   npm run pages:build
   ```

3. Deploy to Cloudflare Pages:
   ```bash
   npm run pages:deploy
   ```

## Automatic Deployment with GitHub Actions

If you're using GitHub, the `.github/workflows/cloudflare-pages-deploy.yml` file automates the deployment process:

1. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
   - `NEXT_PUBLIC_API_URL` - Your API URL

2. Push your code to the main branch to trigger a deployment.

## Troubleshooting

### Common Issues and Solutions

- **Build failures**: Check if all required dependencies are installed properly
- **Runtime errors**: Check browser console and Cloudflare Workers logs
- **API connectivity issues**: Verify your environment variables are correctly set
- **Image loading issues**: Ensure your Next.js image configuration is compatible with Cloudflare

### Debugging Commands

- Check Wrangler configuration:
  ```bash
  npx wrangler config show
  ```

- Check Cloudflare account:
  ```bash
  npx wrangler whoami
  ```

- List Cloudflare Pages deployments:
  ```bash
  npx wrangler pages deployment list
  ```

- View logs from your Cloudflare Workers:
  ```bash
  npx wrangler pages deployment tail
  ```

## Performance Optimization

- Use Cloudflare R2 for storing and serving large assets
- Implement proper cache headers for static assets
- Configure HTTP/3 support in Cloudflare dashboard
- Enable Brotli compression in Cloudflare dashboard

## Security Best Practices

- Always use environment variables for secrets
- Configure proper security headers in `_headers` file
- Use Cloudflare Access for admin areas if needed
- Enable Cloudflare WAF for additional protection

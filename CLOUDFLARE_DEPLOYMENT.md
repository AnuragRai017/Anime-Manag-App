# Cloudflare Pages Deployment Guide for Manga Reader Web App

This guide explains how to deploy the Manga Reader Web App to Cloudflare Pages.

## Prerequisites

- A Cloudflare account
- Node.js 18+ and npm
- The following environment variables configured in your CI/CD or GitHub Actions:
  - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages permissions
  - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
  - `NEXT_PUBLIC_API_URL`: The URL of your API (default: https://api.mangadex.org)

## Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Preview with Cloudflare Pages locally:
   ```bash
   npm run pages:preview
   ```

## Manual Deployment

To deploy manually from your local machine:

1. Build and deploy in one step:
   ```bash
   npm run pages:deploy
   ```

This command:
- Builds your Next.js application
- Processes it with `@cloudflare/next-on-pages`
- Deploys it to Cloudflare Pages

## GitHub Actions Deployment (CI/CD)

The repository includes a GitHub Actions workflow at `.github/workflows/cloudflare-pages-deploy.yml` that automatically deploys your application to Cloudflare Pages whenever you push to the `main` branch.

To set it up:

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Add the following secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `NEXT_PUBLIC_API_URL`

## Configuration Files

### wrangler.jsonc / wrangler.toml

These files configure how your application is deployed to Cloudflare Pages. Key settings include:

- `name`: Your project name
- `compatibility_date`: The date that determines your Worker runtime features
- `site.bucket`: The directory containing your static assets

### next.cloudflare.js

This file customizes the Next.js configuration for Cloudflare Pages deployment. It includes:

- Image optimization settings
- Remote pattern configurations for external images
- Edge compatibility settings

### public/_headers

This file configures HTTP headers for your deployed application, including:

- Security headers like Content Security Policy
- Cache control settings
- CORS configurations

### public/_redirects

This file configures URL redirects and rewrites, useful for SPA or handling legacy URLs.

## Troubleshooting

### Asset Size Limitations

Cloudflare Pages has size limits:
- Individual assets: up to 25MB
- Total site size: generally up to 20GB

### Missing _middleware.js Error

If you see an error about missing `_middleware.js`:

1. Make sure to run `npm run pages:build` before deploying
2. Check that the `.vercel/output/static` directory contains your built assets
3. Remove any `main` reference to non-existent middleware in wrangler configuration

### Asset Configuration Warning

If you see a warning about unexpected fields in `assets`:

1. Remove any unsupported fields like `exclude` from your wrangler configuration
2. Use only supported fields in the `assets` configuration

## Useful Commands

- `wrangler whoami`: Verify your Cloudflare authentication
- `wrangler pages list`: List your Cloudflare Pages projects
- `wrangler pages deployment list --project-name=manga-reader-web-app`: List deployments
- `npm run pages:build`: Build for Cloudflare Pages without deploying

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

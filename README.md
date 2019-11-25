# Ghost Tech website

## Requirements

- Webpack
- NPM
- Yarn

## Development setup

Install the dependencies and start the dev server

```bash
yarn install
yarn dev
```

## Deployment

The site is hosted in an Amazon S3 bucket with Cloudfront. If you have AWS CLI credientials, you can run the following;

> NOTE: You must run `yarn prod` before deploying

```
yarn deploy:uat - push to UAT
yarn deploy:prod - push to PROD
```
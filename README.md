# UCL API OpenAPI

This repository contains the OpenAPI specification for the [UCL API](https://uclapi.com). The [`uclapi.json`](./uclapi.json) specification file **should not** be manually edited unless via Swagger Hub.

## The aim

The aim is to set up repositories containing various client SDKs in different languages, automatically generated and maintained via our OpenAPI specification.

## Current progress on auto updates

A JavaScript client SDK is automatically generated on pushed to `master`. These are then automatically pushed to the [`uclapi-js-sdk`](https://github.com/uclapi/uclapi-js-sdk) repository on GitHub.

## Deployment notes

### JavaScript (npm)

**NOTE**: To publish the package to npm, you need to update the `generator-cli.generators.javascript.additionalProperties.projectVersion` in the `openapitools.json` file -- this means publishing won't be 100% automatic on-push unless this is updated, and allows for you to decide what the new version number should be (major/minor/patch).

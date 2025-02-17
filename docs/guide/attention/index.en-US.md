# Precautions

When using Viteland to build static sites, please pay attention to the following points to ensure the project runs smoothly.

## Directory Structure

Ensure the project directory structure is clear, suggested as follows:

```
my-viteland-site/
├── docs/
│   ├── config.js
│   ├── guide/
│   │   ├── start/
│   │   │   └── index.en-US.md
│   │   ├── install/
│   │   │   └── index.en-US.md
│   │   ├── config/
│   │   │   └── index.en-US.md
│   │   └── attention/
│   │       └── index.en-US.md
│   └── index.mdx
└── package.json
```

## File Naming

- Use lowercase letters and hyphens (-) to name files and directories.
- Ensure the file extensions are correct, such as `.md` or `.mdx`.

## Configuration File

- Ensure the `docs/config.js` file exists and is configured correctly.
- The paths and links in the configuration file should match the actual file structure.

## Internationalization

- Correctly set the `i18n` configuration item in the configuration file.
- Ensure that documents for each language version exist and the paths are correct.

## Plugin Usage

- Correctly import and configure plugins in `vite.config.ts`, such as `pluginRoutes`.
- Ensure the plugin configuration items match the project requirements.

## Build and Deployment

- Before building, ensure all documents and configuration files are saved and there are no errors.
- After the build is complete, upload the files in the `build` directory to the deployment platform.

## Common Issues

### Development Server Cannot Start

- Check if the configuration in the `vite.config.ts` file is correct.
- Ensure all dependencies are installed correctly.

### Routes Cannot Be Generated

- Check if the configuration of the `pluginRoutes` plugin is correct.
- Ensure the project directory structure meets the plugin requirements.

By following the above precautions, you can use Viteland to build and deploy static sites more smoothly.
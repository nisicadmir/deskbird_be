import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

interface Config {
  ENV: string;
  url: string;
  frontendUrl: string;
  port: number;

  database: {
    url: string;
    synchronize: boolean;
    logging: boolean;
  };

  jwt: {
    secret: string;
    accessTokenExpiresIn: number;
  };
}

// Function to recursively replace ${VAR} patterns with environment variables
function replaceEnvVars<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // If it's a string, replace any ${VAR} patterns
  if (typeof obj === 'string') {
    // Check if any env var in the string is missing
    const missing = obj.match(/\${([^}]+)}/g)?.some((match) => {
      const varName = match.slice(2, -1);
      return process.env[varName] === undefined;
    });
    if (missing) return undefined as unknown as T;
    return obj.replace(/\${([^}]+)}/g, (match, varName) => process.env[varName]!) as unknown as T;
  }

  // If it's an array, process each element
  if (Array.isArray(obj)) {
    return obj.map((item: unknown) => replaceEnvVars(item)) as T;
  }

  // If it's an object, process each property
  if (typeof obj === 'object') {
    const result = {} as Record<string, unknown>;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = replaceEnvVars((obj as Record<string, unknown>)[key]);
      }
    }
    return result as unknown as T;
  }

  // Otherwise return the original value (numbers, booleans, etc.)
  return obj;
}

let configLoaded: Config;

function loadConfig(): Config {
  const env = process.env.ENV || 'local';

  // Get the project root directory by going up from src/config to root
  const projectRoot = path.resolve(__dirname, '../..');
  const configPath = path.join(projectRoot, 'src/config', `${env}.yml`);

  // Verify if the file exists before trying to read it
  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found for environment "${env}" at ${configPath}`);
  }

  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const configLoaded = yaml.load(fileContents) as Config;

    // Replace environment variables in the entire config object
    const config = replaceEnvVars(configLoaded);

    console.log('Config loaded successfully', config);
    return config;
  } catch (error) {
    console.error(`Error loading config for environment ${env}:`, error);
    throw error;
  }
}

export function initConfig(): Config {
  if (!configLoaded) {
    configLoaded = loadConfig();
  }
  return configLoaded;
}

export function getConfig(): Config {
  if (!configLoaded) {
    initConfig();
  }
  return configLoaded;
}

export const config = getConfig();

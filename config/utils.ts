class ConfigUtils {
    private static get(envName: string, defaultValue?: string | number): string | number {
        const envValue = process.env[envName] || defaultValue;
        if (envValue === undefined) {
            throw Error(`Environment variable '${envName}' is not set`);
        }
        return envValue;
    }

    static getAsString(envName: string, defaultValue?: string): string {
        const envValue = ConfigUtils.get(envName, defaultValue);
        return envValue.toString();
    }

    static getAsBoolean(envName: string, defaultValue?: string): boolean {
        const envValue = ConfigUtils.get(envName, defaultValue);
        return envValue === 'true';
    }

    static getAsNumber(envName: string, defaultValue: number): number {
        const envValue = ConfigUtils.get(envName, defaultValue);
        return typeof envValue === 'string' ? parseInt(envValue, 10) : envValue;
    }
}

export {ConfigUtils};

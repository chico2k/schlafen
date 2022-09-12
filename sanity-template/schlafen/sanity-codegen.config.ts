import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
    schemaPath: './schemas/schema.js',
    outputPath: '../../src/lib/types/sanity.ts',

}

export default config;
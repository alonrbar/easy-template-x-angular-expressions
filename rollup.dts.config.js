import { dts } from 'rollup-plugin-dts';

export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/types/index.d.ts', format: 'es' },
        { file: 'dist/types/index.d.mts', format: 'es' },
        { file: 'dist/types/index.d.cts', format: 'es' }
    ],
    plugins: [
        dts()
    ]
};

import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

const extensions = ['.ts'];

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/cjs/easy-template-x-angular-expressions.js',
            format: 'cjs'
        },
        {
            file: 'dist/es/easy-template-x-angular-expressions.js',
            format: 'es'
        }
    ],
    plugins: [
        autoExternal(),
        nodeResolve({
            extensions
        }),
        babel({
            extensions,
        })
    ]
};

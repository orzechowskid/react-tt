/* eslint-env node */

import sass from "node-sass";
import cssnext from "postcss-cssnext";
import simpleVars from "postcss-simple-vars";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import nodeResolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss-modules";
import {
    terser
} from 'rollup-plugin-terser';

const APP_ENV = process.env.APP_ENV || process.env.NODE_ENV;

function sassPreprocessor(content, id) {
    return new Promise(function(resolve) {
        resolve({
            code: sass
                .renderSync({
                    file: id
                })
                .css.toString()
        });
    });
}

const baseConfig = {
    external: [
        `prop-types`,
        `react`,
        `react-dom`
    ],
    input: `src/index.js`,
    output: {
        name: `ReactTT`,
        sourcemap: APP_ENV !== `production`
            ? `inline`
            : false
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        postcss({
            extensions: [ `.css`, `.scss` ],
            plugins: [
                simpleVars(),
                cssnext({
                    warnForDuplicates: false
                })
            ],
            preprocessor: sassPreprocessor,
            writeDefinitions: false
        }),
        nodeResolve({
            browser: true,
            extensions: [ `.js` ],
            module: true,
            preferBuiltins: true
        }),
        babel({
            exclude: [ `node_modules/**`, `*.json` ],
            runtimeHelpers: true
        })
    ]
};

const umdConfig = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        file: `dist/index.js`,
        format: `umd`,
        globals: {
            'prop-types': `PropTypes`,
            react: `React`,
            'react-dom': 'ReactDOM'
        }
    },
    plugins: [
        ...baseConfig.plugins,
        ...(APP_ENV === `development`
            ? []
            : [ terser({}) ])
    ]
};

const esmConfig = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        file: `esm/index.js`,
        format: `es`
    },
    plugins: [
        ...baseConfig.plugins,
        ...(APP_ENV === `development`
            ? []
            : [ terser({}) ])
    ]
};

const demoConfig = {
    ...baseConfig,
    external: [],
    input: `example/index.src.js`,
    output: {
        ...baseConfig.output,
        file: `example/index.dist.js`,
        format: `iife`,
        globals: {},
        sourcemap: `inline`
    },
    plugins: [
        commonjs({
            include: [
                /node_modules/,
                `node_modules/prop-types/**/*`,
                `node_modules/react/**/*`
            ],
            sourcemap: false
        }),
        ...baseConfig.plugins
    ]
};

export default [
    umdConfig,
    esmConfig,
    demoConfig
];

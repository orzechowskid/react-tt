import cssnano from "cssnano";
import sass from "node-sass";
import cssnext from "postcss-cssnext";
import simpleVars from "postcss-simple-vars";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
// import json from "rollup-plugin-json";
// import liveReload from 'rollup-plugin-livereload';
import replace from "rollup-plugin-replace";
// import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeResolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss-modules";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

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

const config = {
    input: `src/index.js`,
    output: {
        file: `dist/index.js`,
        format: `umd`,
        name: `ReactTT`
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
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

switch (APP_ENV) {
    case `development`:
        config.output.sourcemap = `inline`;
        config.plugins.unshift(
            commonjs({
                include: [
                    `node_modules/prop-types/**/*`,
                    `node_modules/react/**/*`
                ]
            }),
        );
        config.plugins.unshift(
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
            })
        );

        break;
    case `example`:
        config.input = `example/index.src.js`;
        config.output.file = `example/index.dist.js`;
        config.output.format = `iife`;
        config.output.sourcemap = `inline`;
        config.plugins.unshift(
            commonjs({
                include: /node_modules/,
                sourcemap: false
            })
        );
        config.plugins.unshift(
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
            })
        );

        break;
    case `production`:
        config.output.globals = {
            'prop-types': `PropTypes`,
            react: `React`,
            'react-dom': 'ReactDOM'
        };
        config.output.sourcemap = false;
        config.external = [
            `prop-types`,
            `react`,
            `react-dom`
        ];
        config.plugins.unshift(
            postcss({
                extensions: [ `.css`, `.scss` ],
                plugins: [
                    simpleVars(),
                    cssnext({
                        warnForDuplicates: false
                    }),
                    cssnano()
                ],
                preprocessor: sassPreprocessor,
                writeDefinitions: false
            })
        );
        config.plugins.push(uglify({}, minify));

        break;
    default:
}

export default config;

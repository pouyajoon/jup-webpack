"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalLibs = [
    {
        name: { module: 'react', dom: 'React' },
        cdn: {
            development: function (v) { return "https://unpkg.com/react@" + v + "/umd/react.development.js"; },
            production: function (v) { return "https://unpkg.com/react@" + v + "/umd/react.production.min.js"; }
        }
    },
    {
        name: { module: 'react-dom', dom: 'ReactDOM' },
        cdn: {
            development: function (v) { return "https://unpkg.com/react-dom@" + v + "/umd/react-dom.development.js"; },
            production: function (v) { return "https://unpkg.com/react-dom@" + v + "/umd/react-dom.production.min.js"; }
        }
    },
    {
        name: { module: '@material-ui/core', dom: 'window["material-ui"]' },
        cdn: {
            development: function (v) { return "https://unpkg.com/@material-ui/core@" + v + "/umd/material-ui.development.js"; },
            production: function (v) { return "https://unpkg.com/@material-ui/core@" + v + "/umd/material-ui.production.min.js"; }
        }
    }
    // {
    //     name: { module: '@material-ui/icons', dom: 'window["material-ui-icons"]' },
    //     cdn: {
    //         development: (v: string) => `https://cdn.jsdelivr.net/npm/@material-ui/icons@${v}/index.js`,
    //         production: (v: string) => `https://cdn.jsdelivr.net/npm/@material-ui/icons@${v}/index.min.js`
    //     }
    // }
];

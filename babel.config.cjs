const isJest = (process.env.NODE_ENV === 'test');

module.exports = {
    "presets": [
        "@babel/typescript"
    ],
    "plugins": [
        "ts-nameof",
        "@babel/proposal-optional-chaining",
        isJest && '@babel/transform-modules-commonjs'
    ].filter(Boolean)
};

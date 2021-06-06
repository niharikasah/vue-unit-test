module.exports = {
  env: {
    mocha: true
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    "no-underscore-dangle": "off"
  },
   "overrides": [
      {
        "files": ["*.spec.js"],
        "rules": {
            "func-names": "off",
            "prefer-arrow-callback": "off"
         }
      }
   ]
}
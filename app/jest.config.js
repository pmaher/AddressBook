module.exports = {
    "testEnvironment": "node",
    "moduleFileExtensions": ["js", "json", "jsx", "ts", "tsx", "node", "css"],
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
      }
}
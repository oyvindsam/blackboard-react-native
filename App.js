"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const MainApp_1 = __importDefault(require("./src/MainApp"));
const store_1 = __importDefault(require("./src/store/store"));
class App extends react_1.Component {
    render() {
        return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
            react_1.default.createElement(MainApp_1.default, null)));
    }
}
exports.default = App;

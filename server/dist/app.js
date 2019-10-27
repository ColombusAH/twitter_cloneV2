"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});
const PORT = process.env.PORT || 3000;
function listen() {
    app.listen(PORT, () => {
        console.log(`Server is listennig at http://localhost:${PORT}/`);
    });
}
exports.default = listen;
//# sourceMappingURL=app.js.map
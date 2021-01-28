const post = require("./post");
const login = require("./login");
const user = require("./user");
module.exports = (app) =>{
    app.use("/post",post);
    app.use("/login",login);
    app.use("/user",user);
};
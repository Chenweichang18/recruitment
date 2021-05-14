const post = require("./post");
const login = require("./login");
const user = require("./user");
const work = require("./work");
const apply = require("./apply");
module.exports = (app) =>{
    app.use("/post",post);
    app.use("/login",login);
    app.use("/user",user);
    app.use("/apply", apply);
    app.use("/work", work);
};
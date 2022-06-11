//imported from project
const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("sequelize");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: "its a secret duh",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Running on port ${PORT}!`));
});

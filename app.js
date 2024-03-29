require("dotenv").config();
console.log(process.env.PRISMIC_ENDPOINT, process.env.PRISMIC_CLIENT_ID);
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
};

const handlelinkResolver = (doc) => {
  if (doc.type === "page") {
    return "/page/" + doc.uid;
  } else if (doc.type === "blog_post") {
    return "/blog/" + doc.uid;
  }
};

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handlelinkResolver,
  };
  res.locals.PrismicDOM;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", async (req, res) => {
  initApi(req).then((api) => {
    api
      .query(Prismic.Predicates.at("document.type", "about"))
      .then((response) => {
        console.log(response);
        // res.render("pages/about", { document: response.results[0] });
        res.render("pages/about");
      });
  });
  res.render("pages/about");
});

app.get("/collections", (req, res) => {
  res.render("pages/collections");
});

app.get("/detail/:uid", (req, res) => {
  res.render("pages/detail");
});

// app.get('/', (req, res) => {
//   res.send('<strong>Hello Worldasdasd!</strong>')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

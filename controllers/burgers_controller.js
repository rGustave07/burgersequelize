var express = require("express");
var router = express.Router();
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  // burger.all(function(data) {
  //   // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
  //   var hbsObject = { burgers: data };
  //   res.render("index", hbsObject);
  // });
  db.burgers.findAll({}).then((result) => {
    let templateObject = {
      burgers: result
    }
    res.render("index", templateObject);
  })
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  // burger.create(req.body.burger_name, function(result) {
  //   // wrapper for orm.js that using MySQL insert callback will return a log to console,
  //   // render back to index with handle
  //   console.log(result);
  //   res.redirect("/");
  // });
  db.burgers.create({burger_name: req.body.burger_name, devoured: 0}).then( () => {
      console.log(req.body.burger_name);
      res.redirect("/");
  })
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
  // burger.update(req.body.burger_id, function(result) {
  //   // wrapper for orm.js that using MySQL update callback will return a log to console,
  //   // render back to index with handle
  //   console.log(result);
  //   res.redirect("/");
  // });
  db.burgers.update({
    devoured: true
  }, {
    where: {
      id: req.body.burger_id
    }
  }).then(() => {
      console.log("burger devoured");
      res.redirect("/");
  });
});

module.exports = router;

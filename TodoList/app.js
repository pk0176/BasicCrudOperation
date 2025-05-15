const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
// const date = require(__dirname + '/date.js')
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");

// const items =["buy Food","Cook food", "Eat food"];
// const workItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://admin-pawan:Test123@cluster0.w4aix.mongodb.net/todolistDB",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const ItemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", ItemsSchema);

const item1 = new Item({
  name: "Welcome To your Todo list",
});

const item2 = new Item({
  name: "Hello world!",
});

const item3 = new Item({
  name: "Hit this to delete an item",
});

const Default_Items = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [ItemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  // let day = date.getDate();
  //Finding Data from mongoose
  Item.find({}, function (err, FoundItem) {
    if (FoundItem.length === 0) {
      Item.insertMany(Default_Items, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully Saved Default itemTO DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { newListItem: FoundItem, listTitle: "Today" });
    }
  });
  // res.render("list",{newListItem: items,listTitle: day});
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, FoundList) {
    if (!err) {
      if (!FoundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: Default_Items,
        });

        list.save();
        // console.log("Does NOt exit");
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        // console.log("Exist");
        res.render("list", {
          newListItem: FoundList.items,
          listTitle: customListName,
        });
      }
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundlist) => {
      foundlist.items.push(item);
      foundlist.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listname = req.body.listName;

  if (listname === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("succesfully Deleted Item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listname },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundlist) {
        if (!err) {
          res.redirect("/" + listname);
        }
      }
    );
  }
});

// app.post('/work',(req, res)=>{
//     let item = req.body.newItem;
//     workItems.push(item)
//     res.redirect('/work')
// })

app.get("/about", (req, res) => {
  res.render("about");
});

let port = process.env.PORT || 3001;
// if (port === null || port === "") {
//   port = 3001;
// }

app.listen(port, function () {
  console.log(`Server has started successfully on ${port}`);
});

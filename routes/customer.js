const express = require("express")
const router = express.Router();
const session = require('express-session');
const bodyParser = require("body-parser");
const db = require("../Database/db")
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
router.use(express.static("JS_Files"), express.static("Images"), express.static("Css-Files"));

// Session
router.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));


// Login API's
router.get("/", (req, res) => {
    res.render("customer/login", {
        data: 0
    });
})


router.get("/signin-error", (req, res) => {
    res.render("customer/login", {
        data: 1
    });
})


router.post("/", (req, res) => {
    db.login(req.body, (status, data) => {
        if (status === 1) {
            req.session.data = data[0];
            res.redirect("customer/home");
        }
        if (status === 0) {
            res.redirect("customer/signin-error");
        }
    })

})


// Registration API's
router.get("/signup", (req, res) => {
    res.render("customer/register", {
        data: 0
    });
})

router.get("/signup-error", (req, res) => {
    res.render("customer/register", {
        data: 1
    });
})

router.post("/signup", (req, res) => {
    db.register(req.body, (status) => {
        if (status === 1) res.redirect("/customer");
        else res.redirect("signup-error");
    })
})



// Home Page API
router.get("/home", (req, res) => {
    if (req.session.data) {
        res.render("customer-pages/home", {
            data: req.session.data
        });

    } else {
        res.redirect("/customer");
    }
})


// Orders Page API
router.get("/orders", (req, res) => {
    if (req.session.data) {
        res.render("customer-pages/orders", {
            data: req.session.data,
            ordered_items: db.ordered_items(req.session.data["_id"])
        });
    } else {
        res.redirect("/customer");
    }
})


// Cart Page API
router.get("/cart", (req, res) => {
    if (req.session.data) {
        res.render("customer-pages/cart", {
            data: req.session.data
        });
    } else {
        res.redirect("/customer");
    }
})


// Products Page API
router.get("/products", (req, res) => {
    if (req.session.data) {
        res.render("customer-pages/products", {
            data: req.session.data
        });
    } else {
        res.redirect("/customer");
    }
})


// Place Order Page API
router.post("/place_order", (req, res) => {

    db.upload_order_details(req.body, req.session.data["_id"], req.session.data["user_data"]["username"], req.session.data["user_data"]["address"], status => {
        if (status === 1) res.render("customer-pages/order_placed");
        else console.log("error");
    })


})


// See More Page API
router.get("/:username-:num", (req, res) => {
    console.log(req.params.username + req.params.num)
    db.see_more(req.params.username, parseInt(req.params.num), (data, status) => {
        if (status === 1) {
            res.render("customer-pages/more", {
                data: data
            });
            console.log(data);
        } else {
            console.log("wrong data");
        }
    })
})


// Logout Page
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) console.log("somme error occured");
        else res.redirect("/customer");
    })

})




// Exporting the Router

module.exports = router

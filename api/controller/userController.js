var User = require("../models/user");
var express = require('express');

// get usser
function getUser(res) {
    User.find(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
}

module.exports = function(app) {
    // =====================================
    // HOME PAGE (Với những link đăng nhập) ========
    // =====================================
    app.get('/', isLoggedIn, function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // Hiển thị form login
    app.get('/login', function(req, res) {
        // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
        res.render('login.ejs');
    });
    // log thong tin user cho trang chu 
    app.get("/user", isLoggedIn, function(req, res) {
        User.findById({ _id: req.session.userId }, function(err, user) {
            if (err) {
                throw err;
            } else {
                res.json(user);
            }
        });
    });
    // Hiển thị man hinh dang nhap
    app.get('/index-login', function(req, res) {
        // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
        res.render('index-login.ejs', { message: req.flash('loginMessage') });
    });
    // Xử lý thông tin khi có người thực hiện đăng nhập


    app.post("/login", function(req, res, next) {


        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error) {
                var error = new Error('co loi o day.');
                error.status = 401;
                return next(error);
            } else {

                console.log(user);
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    });
    // app.post('/login', chúng ta sẽ xử lý với passport ở đây);
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // Hiển thị trang đăng ký
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // Xử lý thông tin khi có người đăng ký


    app.post("/signup", function(req, res, next) {
        var user = {
                email: req.body.email,
                password: req.body.password
            }
            // find all athletes that play tennis
        data = {};
        console.log(data);

        if (req.body.email == "") {
            res.render('signup.ejs', { message: "vui long nhap email" });

        } else if (req.body.password == "") {
            res.render('signup.ejs', { message: "vui long nhap mat khau" });

        } else {

            User.create(user, function(err, user) {
                if (err) throw err;
                else {
                    // // tai lai trang va gui du lieu ra ngoai
                    // res.render('signup.ejs', { message: "ban da dang ky thang con voi tai khoan " + req.body.email });
                    console.log("ban da dang ky thang con voi tai khoan " + req.body.email);
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });
        }


    });
    // app.post('/signup', chúng ta sẽ xử lý với passport ở đây);
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // Đây là trang sẽ được bảo vệ, chỉ những người đã đăng nhập mới có thể xem được
    // Chúng ta sẽ sử dụng route middleware để kiểm tra xem người đó đã đăng nhập chưa
    // hàm isLoggedIn sẽ làm việc đó.

    // GET route after registering
    app.get('/profile', isLoggedIn, function(req, res, next) {


        console.log(req.session.userId);

        User.findById({ _id: req.session.userId }, function(err, user) {
            if (err) {
                throw err;
            } else {
                res.render('profile.ejs', {
                    email: user.email
                });
            }
        });

    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    });
};
// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.session.userId)
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/index-login');
}
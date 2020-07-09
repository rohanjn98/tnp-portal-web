const Student = require("../models/student");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport')

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const student = new Student(req.body);

  // HASH Password using bcrypt
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(student.password, salt, (err, hash) => {
      if (err) throw err;
      student.password = hash;
      student
        .save()
        .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
          const id = student._id;
          res.redirect('/login');
        })
        .catch(err => console.log(err));
    });
  });
};

exports.signin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/home/1')
  } else {
    passport.authenticate('local', {
      successRedirect: '/home/1',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  }
};

exports.signout = (req, res) => {
  req.logout();
  req.flash('success_msg','Log out')
  res.redirect('/login')
};

exports.showLoginPage = (req, res) => {
  if (req.user) {
    res.redirect('/home/1')
  } else {
    res.render("login")
  }
}

exports.showSignupPage = (req, res) => {
  if (req.user) {
    res.redirect('/home/1')
  } else {
    res.render("signup")
  }
}

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
};

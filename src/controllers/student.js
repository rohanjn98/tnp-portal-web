const Student = require("../models/student");
const multer = require("multer");
const sharp = require("sharp");

exports.getStudentById = async (req, res, next, id) => {
  try {
    const student = Student.findById(id);
    req.profile = student;
    next();
  } catch (error) {
    res.status(500).send();
  }
};

exports.showAllStudentsPage = async (req, res) => {
  if (req.user.role === 1) {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).send();
    }
  } else {
    res.redirect("/login");
  }
};

exports.showUpdateProfilePage = (req, res) => {
  res.render("add-profile", {
    Student: req.user,
  });
};

exports.updateProfile = async (req, res) => {
  //console.log(req.body);
  try {
    //res.render("myProfile", { Student: req.body });
    Student.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: req.user },
      { new: true, useFindAndModify: false },
      (err, student) => {
        (err, student) => {
          if (err) {
            return res.status(400).json({
              error: "You are not authorized to update this user",
            });
          }
          res.render("myProfile", { Student: req.user });
        };
      }
    );
    res.json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.showProfilePage = (req, res) => {
  // TODO
  // DONE
  res.render("myProfile", { Student: req.user });
};

exports.createAvatar = (req, res) => {
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    };
};

exports.showAvatar = async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error("Avatar does not exist.");
    }
    res.set("Content-Type", "image/jpg");
    res.send(req.user.avatar);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

exports.deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

exports.deleteStudent = async (req, res) => {
  if (req.user.role === 1) {
    const student = req.profile;
    try {
      await student.remove();
      res.redirect("/home");
    } catch (error) {
      res.status(500).send();
    }
  } else {
    res.redirect("/login");
  }
};

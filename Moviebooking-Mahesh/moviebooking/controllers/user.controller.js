const db = require("../models");
const { v4 : uuidv4} = require("uuid");
const { atob, btoa } = require("b2a");
const TokenGenerator = require("uuid-token-generator");
const tokenGenerator = new TokenGenerator();

const User = db.users;


exports.signUp= async (req, res) => {

  if (!req.body.email && !req.body.password) {
    res.status(400).send({ message: "Please provide email and password to continue." });
    return;
  }
  
  try {
    const filter = { email: req.body.email };
    
    let data = await User.findOne(filter);

    if(data === null) {

      const user = new User({
        userid: "",
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.first_name+req.body.last_name,
        contact: req.body.mobile_number,
        password: req.body.password,
        role: req.body.role ? req.body.role : "user",
        isLoggedIn: true, 
      });
      try {
        let userSaved =  user.save(user);
        res.send(userSaved);
      } 
      catch(err) {
        res.status(500).send({message: err.message || "Some error occurred, please try again later."});
      }
    }
    else {

      res.status(400).send({message: "User Already Exists."});
    }
  } 
  catch(err) {
    res.status(500).send({message: err.message || "Some error occurred, please try again later."});
  }
};


exports.login =async (req, res) => {
  try {
    
    const encAuth = req.headers["authorization"];
    const splitdata = atob(encAuth.split(" ")[1]);
    const username = splitdata.split(":")[0];
    const password = splitdata.split(":")[1];
    
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    
    const user = await User.findOne({ username: username });

    if (!user)
      return res.status(400).json({ msg: "No account with this email has been registered." });
  
      if (user.password === password) {
        user.isLoggedIn = true;
        user.uuid = uuidv4();
        user.accesstoken = tokenGenerator.generate();
        User.findOneAndUpdate({ username: username }, user,  { useFindAndModify: false })
          .then(data => {
            if (data === null) throw new Error("Failed to update");
            res.status(200).send({
              "id" : user._id,
              "uuid": user.uuid,
              "token": user.accesstoken,
            });
          })
          .catch(err => {
            res.status(500).send(err.message || "Internal server error");
          });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } catch (err) {
      res.status(500).send(err.message || "user not found");
    }
};


exports.logout = async (req, res) => {
  
  if (!req.body.uuid) {
    res.status(400).send({ message: "Please provide user Id." });
    return;
  }
  
    const uuid = req.body.uuid;
    const update = { isLoggedIn: false,accesstoken: "", uuid: ""};

    User.findOneAndUpdate({ uuid: uuid }, update, { useFindAndModify: false })
    .then(data => {
      if (data === null) throw new error("unable to logout");
      res.send({ message: "Logged Out successfully." });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
    
};

exports.getCouponCode = async (req, res) => {
  const accesstoken = atob(req.header["authorization"].split(" ")[1]);
  if (!accesstoken) {
    return res.status(401).send("user not logged in");
  }
  try {
    const users = await User.find({ accesstoken: accesstoken });
    if (users[0].coupens) {
      res.send(users[0].coupens);
    } else {
      res.send([]);
    }
  } catch (err) {
    return res.status(500).send(err.message || "user not found");
  }
 
};


exports.bookShow = (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  console.log(token)
  User.find({accesstoken: token}).then(function(user){
      if(user[0].bookingRequests)
          res.send(user[0].bookingRequests);
      else
          res.send([])
  });
 
};

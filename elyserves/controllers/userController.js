const User = require("../models/User");
const Artist = require("../models/Artist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

let transporter =nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'saakethlogs@gmail.com',
    pass:process.env.EMAIL_PASS
  }
})


exports.registerUser = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    
    
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      username: req.body.username,
    };
    
    user = await User.create(user);
    
    jwt.sign({
      user:user._id
    },
    process.env.EMAIL_SECRET
    ,{
      expiresIn:'1d'
    },async(err,emailToken)=>{
      if(err){console.log(err)}else{
      let confURL = `http://localhost:3000/confirmation/${emailToken}`
      let mailOption = {
        from: 'saakethlogs@gmail.com',
        to:req.body.email,
        subject:'Elywalls Confirmation',
        html: `Click on this link to activate your account:
        <a href = "${confURL}">${confURL}</a>`
      }
      await transporter.sendMail(mailOption)
    }})
    
    //TODO directly login after registration
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          console.log("err", err);
          return res.json({ err: err });
        }
        return res.json({
          msg: "User created",
          user: user,
          token,
        });
      }
    );
  } catch (err) {
    return res.json({
      err: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email }).then(
      async (user) => {
        if(user.confirmed==true){
        if (user) {
          bcrypt.compare(req.body.password, user.password).then((match) =>
            match
              ? jwt.sign(
                  { id: user._id, utype: user.user_type },
                  process.env.JWT_SECRET,
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) {
                      return res.json({
                        msg: "Token creation failed",
                        err: err,
                      });
                    }
                    return res.json({
                      msg: "User Logged",
                      token,
                      logged: true,
                      profile: user,
                    });
                  }
                )
              : res.json({ msg: "Wrong password", logged: false })
          );
        } else {
          let artist = await Artist.findOne({ email: req.body.email }).then(
            async (artist) => {
              if (artist) {
                bcrypt
                  .compare(req.body.password, artist.password)
                  .then((match) =>
                    match
                      ? jwt.sign(
                          { id: artist._id, utype: artist.user_type },
                          process.env.JWT_SECRET,
                          { expiresIn: 3600 },
                          (err, token) => {
                            if (err) {
                              return res.json({
                                msg: "Token failed",
                                err: err,
                              });
                            }
                            return res.json({
                              msg: "Artist Logged",
                              token,
                              logged: true,
                              profile: artist,
                            });
                          }
                        )
                      : res.json({ msg: "Wrong password", logged: false })
                  );
              } else {
                try{
                let user = await User.findOne({username: req.body.username}).then(
                  async (user) => {
                    if (user) {
                    bcrypt
                      .compare(req.body.password, user.password)
                      .then((match) =>
                        match
                          ? jwt.sign(
                              { id: user._id, utype: user.user_type },
                              process.env.JWT_SECRET,
                              { expiresIn: 3600 },
                              (err, token) => {
                                if (err) {
                                  return res.json({
                                    msg: "Token creation failed",
                                    err: err,
                                  });
                                }
                                return res.json({
                                  msg: "User Logged",
                                  token,
                                  logged: true,
                                  profile: user,
                                });
                              }
                            )
                          : res.json({ msg: "Wrong password", logged: false })
                      ).catch((err)=>console.log(err));
                    } else {
                    let artist = await Artist.findOne({username: req.body.username }).then(
                      async (artist) => {
                      if (artist) {
                        bcrypt
                          .compare(req.body.password, artist.password)
                          .then((match) =>
                            match
                              ? jwt.sign(
                                  { id: artist._id, utype: artist.user_type },
                                  process.env.JWT_SECRET,
                                  { expiresIn: 3600 },
                                  (err, token) => {
                                    if (err) {
                                      return res.json({
                                        msg: "Token failed",
                                        err: err,
                                      });
                                    }
                                    return res.json({
                                      msg: "Artist Logged",
                                      token,
                                      logged: true,
                                      profile: artist,
                                    });
                                  }
                                )
                              : res.json({
                                  msg: "Wrong password",
                                  logged: false,
                                })
                          );
                      } else {
                        return res.json({
                          msg: "Email or Username does not exist",
                        });
                      }
                    });
                  }
                })}catch(err){console.log(err) 
                  res.json({err:err})}
              }
            }
          );
        }
      }else{
        res.json({
          msg:"Confirm your email before logging in."
        })
      }
    }
    );
  } catch (err) {
    return res.json({
      err: err,
    });
  }
};

exports.registerArtist = async (req, res, next) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    let mailOption = {
      from: 'saakethlogs@gmail.com',
      to:req.body.email,
      subject:'Elywalls',
      text:'workss'
    }
    
    await transporter.sendMail(mailOption)

    let artist = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      username:req.body.username
    };

    artist = await Artist.create(artist);
    //TODO directly login after registration
    jwt.sign(
      { id: artist._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          return res.json({ err: err });
        }
        return res.json({
          msg: "Artist created",
          user: artist,
          token,
        });
      }
    );
  } catch (err) {
    return res.json({
      err: err,
    });
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    if(req.user.utype==='artist'){
      const editted_artist = {
        'quote':req.body.quote,
        'igLink':req.body.igLink,
        'name':req.body.name,
        'email':req.body.email
      }
      await Artist.findByIdAndUpdate({_id:req.user.id},
        {editted_artist})
    }else{
      const editted_user = {
      'name':req.body.name,
      'email':req.body.email
    }
    await User.findByIdAndUpdate({_id:req.user.id},
      {editted_user})     
    }
    return res.status(200).json({
      success: true,
      msg:"Editted"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: error
    });
  }
};

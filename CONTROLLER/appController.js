const nodemailer = require('nodemailer')
const {EMAIL , PASSWORD} = require('../ENV.JS');
const { PassThrough } = require('nodemailer/lib/xoauth2');
const Mailgen = require('mailgen')

//testing account
const signup = async(req,res) =>{
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com , 019bsccsit043@sxc.edu.np , sujitshrestha0004@gmail.com", // list of receivers
    subject: "Hello ONLY", // Subject line
    text: "something is sent", // plain text body
    html: "<b>something</b>", // html body
  }
  transporter.sendMail(message).then((info)=>{
    return res.status(201).json(
      {msg:"you should receive a mail" , 
       info : info.messageId , 
       preview : nodemailer.getTestMessageUrl(info)
  })
    
  })

 // res.status(201).json("Signed up successfully");

}

//real gmail account
const getBill = async(req,res) =>{

  const {userEmail} = req.body;

  let config = {
    service : 'gmail', 
    auth:{
        user:EMAIL,
        pass:PASSWORD
    }
  }
  
  let transporter = nodemailer.createTransport(config);
  try {
    let mailGenerator = new Mailgen({
      theme:"default",
      product:{
        name:"Mailgen" , 
        link : 'https://mailgen.js/'
      }
    })

    let response = {
      body:{
        name:"Daily name" , 
        intro:"Your bill has arrived",
        table:{
          data:[
                {      
                  item : "Nodemailer test title",
                  description: "a test only",
                  price: "Rs. 250000"
                }   ,
                    
               ]
        },
        outro: "this is outro only"  
      }
    }

    let mail =mailGenerator.generate(response);
    let message = {
      from: EMAIL , 
      to: userEmail,
      subject: "place order",
      html: mail
    }

    transporter.sendMail(message).then(()=>{
      return res.status(201).json({
        msg:"You should receive an email"
      })
    })

} catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while sending the email." });
}
  

}
module.exports= {
  signup , 
  getBill
}
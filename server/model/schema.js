const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type : Number,
        unique :true,
        min : 10,
    },
    work:{
        type : String
    },
    password:{
        type : String,
        required:true
    },
    cpassword:{
        type : String
    },
    img:{
        type:String
    },
    messages:[
        {
            name:{
                type:String,
            },
            email:{
                type:String
            },
            message:{
                type:String
            }
        }
    ],
    date:{
        type:Date,
        default : Date.now()
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
})

userSchema.pre('save',async function (next){
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password,12);
      this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
})

userSchema.methods.addMessage = async function (name,email,message){
    try {
        this.messages = this.messages.concat({name,email,message});
        await this.save()
        return this.message;
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.generateAuthToken = async function (){
    try {
       let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY );
       this.tokens = this.tokens.concat({token:token});
       await this.save();
       return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('user',userSchema);
module.exports = User;

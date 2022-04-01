const mongoose=require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    // This also validates whether the user has entered valid and unique email
    email: {
        type: String,
        unique: true, 
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

userSchema.pre('save', async function (next) {            
    const user = this    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)    
    }
    next()
})
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email: email}) 
    if(!user){
        throw new Error('unable to login') 
    }
    const isMatch = await bcrypt.compare(password, user.password)  
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}

const User=mongoose.model('User', userSchema)
module.exports=User
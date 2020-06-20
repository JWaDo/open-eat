import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { rightSchema } from './right';

export const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['BUSINESS', 'SUPER_ADMIN', 'USER'],
    },
    businessName: {
        type: String,
        required: true,
    },
    lastname:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    password:  {
        type: String,
        required: true,
    },
    phone:  {
        type: String,
        required: true,
    },
    actions: {
        type: [ String ],
    },
});

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.pre("updateOne", async function(next) {

    let currentUser = await this.model.findOne(this.getQuery());
    //
    if (!this.getUpdate().password) next();
    //
    if (currentUser.password !== this.getUpdate().password) {
        this._update.password = bcrypt.hashSync(this.getUpdate().password, 10);
    }
    //
    next();
});

userSchema.methods.comparePassword = function(plaintext) {
    return bcrypt.compareSync(plaintext, this.password);
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
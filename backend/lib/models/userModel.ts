import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstname		 : {
        type: String,
        required: 'Enter a first name'
    },
    lastname	 : {
        type: String,
        required: 'Enter a last name'
    },
    password	 : String,
    email		 : { type: String, required: true, unique: true },
    created_at   : Date,
    updated_at   : Date
});
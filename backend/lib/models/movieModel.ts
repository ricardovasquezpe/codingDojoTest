import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MovieSchema = new Schema({
    title		 : {
        type: String,
        required: 'Enter a title'
    },
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at   : Date,
    updated_at   : Date
});
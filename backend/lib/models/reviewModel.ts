import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ReviewSchema = new Schema({
    user		 : String,
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movie_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    rating   : Number,
    review: String,
    created_at   : Date,
    updated_at   : Date
});
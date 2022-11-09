import mongoose from 'mongoose';

const Schema = mongoose.Schema;
//needs to be worked on
const SurveySchema = new Schema({
    Question: String, 
    inputOption: Number, 
    Title: String,
    
}, {
        collection: 'movies'
});

export default mongoose.model('Movies', MovieSchema);
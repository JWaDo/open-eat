import mongoose from 'mongoose';

export const rightSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    actions: {
        type: [ String ],
        required: true,
    },
});

const rightModel = mongoose.model('Right', rightSchema);

export default rightModel;
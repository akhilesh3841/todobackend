import mongoose from 'mongoose';

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
 
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
    }
  })



export const Task=mongoose.model('Task',taskSchema);
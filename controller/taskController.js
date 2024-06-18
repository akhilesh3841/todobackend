import { Task } from "../models/taskschema.js";





//add the task
export const createTaskSchema = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const createdBy = req.user._id;

        if (!title || !description) {
            return next(res.status(404).json({
                success: false,
                message: "Please provide a title and description"
            }));
        }

        const task = await Task.create({ title, description, createdBy });

        res.status(200).json({
            success: true,
            message: "Task created successfully",
            task: task
        });
    } catch (error) {
        next(error);
    }
};





//get all the tasks

export const getMyTasks=async(req, res, next) => {
    const tasks=await Task.find({createdBy: req.user._id});
    res.status(200).json({
        sucess:true,
        tasks:tasks,
    })
    
}

//deleting the task

export const deleteTask=async(req,res,next)=>{
    const task=await Task.findByIdAndDelete(req.params.id);

    if(!task){
        return next(res.status(404).json({
            success:false,
            message:"Task not found"
        }))
    }
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message:"Task deleted successfully"
    })
}









//updating the task
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const { title, description } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(200).json({
            success: true,
            message: "Task successfully updated",
            task: updatedTask,
        });
    } catch (error) {
        next(error);
    }
};

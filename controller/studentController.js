const Student =require('../model/Studentsmodels')

module.exports={
    AddStudent: async (req, res) =>{
        try {
            const student = new Student(req.body); //use 'req.body' instead of 'res.body'
            const result = await student.save();
            res.send(result);
        } catch (error){
            console.error(error.message);
        }
        // res.send({type:"Post Request"});
    }
}

getStudent: async(req, res, next)=>{
    const id = req.params.id;
    try{
      const student = await Student.findById(id)
      if(!student){
        throw(createError(404, "student does not exist"))
      }res.send(student)
    }catch (error) {
      console.log(error.message);
      if(error instanceof mongoose.CastError){
        next(createError(400, "invalid student id"));
        return;
      }
      next(error);
    }
  }

deleteStudent:async(req, res, next)=>{
    const id = req.params.id
    try {
        const student = await Student.findByIdAndRemove(id)
        if(!student){
            throw(createError(404, "student does not exist"))
        }
        res.send(student);
    }catch(error){
        console.log(error.message)
        if(error instanceof mongoose.CastError){
            next(createError(400, "invalid student id"));
            return;
          }
          next(error);
    }
}
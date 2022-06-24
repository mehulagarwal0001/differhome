const router =require('express').Router();
const Project = require('../modals/ProjectSchema');


let path_of_photos =   (array) => {
          
    let val=[];
    let i=1;
     array.forEach(element => {
        var path_name= '/images/' +Date.now() + `_${i}`+ element.name;
        val.push(path_name);
        i++;
     });
    return val ;
}

let move_to_public = (array1,array2)=>{


 for (let index = 0; index < array1.length; index++) {
      
    array1[index].mv('public/'+array2[index],(err)=>{
        if(err){
            return false;
           // return res.status(500).json({status:"failed"});
        }
    })
    
 }
return true;
}

// To add a new Project 
router.post('/addProject',async (req,res)=>{

  try {
    
 
let project = req.body;

if( Array.isArray(req.files.brochure) == false ) req.files.brochure =[req.files.brochure];
if( Array.isArray(req.files.photos) == false ) req.files.brochure =[req.files.photos];
if( Array.isArray(req.files.floorPlan) == false ) req.files.brochure =[req.files.floorPlan];
if( Array.isArray(req.files.layout) == false ) req.files.brochure =[req.files.layout];

//console.log(req.files.photos);
project.photos= await path_of_photos(req.files.photos);

if( await move_to_public(req.files.photos,project.photos) == false) {
   return  res.status(500).json({status:"failed"});
}

project.layout= await path_of_photos(req.files.layout);

if(await move_to_public(req.files.layout,project.layout) ==false ){
    return  res.status(500).json({status:"failed"});
}

project.floorPlan= await path_of_photos(req.files.floorPlan);

if( await move_to_public(req.files.floorPlan,project.floorPlan) == false) {
   return  res.status(500).json({status:"failed"});
}

project.brochure= await path_of_photos(req.files.brochure);

if(await move_to_public(req.files.brochure,project.brochure) ==false ){
    return  res.status(500).json({status:"failed"});
}


//console.log(project);
const saving_project= await new Project(project);
const saved_project= await saving_project.save();

return res.send(saved_project);


} catch (error) {
    return res.status(500).json({error:error});
}

})

 // Getting all Projects 
router.get('/allProject',async (req,res)=>{
  try {
    let project = await Project.find();

    return res.json(project);

  } catch (error) {
     return res.status(500).json({error:error});
  }
    
})


// Getting Specific Project 

router.get('/project/:id',async (req,res)=>{
    try {
   
             
        let project = await Project.findById(req.params.id);
    
        return res.json(project);
    
      } catch (error) {
         return res.status(500).json({error:error});
      }

})



module.exports = router;
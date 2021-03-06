const mongoose=require('mongoose');

const ProjectSchema= new mongoose.Schema({
     propertyName:String,
     propertyType:String,
     areaType:String,
     city:String,
     state:String,
     pincode:Number,
     address:String,
     area:String,
     carpetArea:Number,
     price:Number,
     priceSqft:Number,
     bedrooms:Number,
     bathrooms:Number,
     reraRegistered:Boolean,
     age:Number,
     status:String,
     furnished:Boolean,
     about:String,
     

     
     photos: [{
        type: String,
   
    }],
    layout:[{
        type:String
    }],
    floorPlan:[{
        type:String
    }],
    brochure:[{
        type:String
    }]
})

module.exports= mongoose.model('project',ProjectSchema);


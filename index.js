const express=require('express');
//const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

const FoodModel=require("./models/Food");


//mongoose.connect("mongodb://127.0.0.1:27017/food");

app.post("/insert",async(req,res)=>{

    const foodName=req.body.foodName
    const description=req.body.description

    const food=new FoodModel({
        foodName:foodName,
        description:description
    });
    try{
        await(food.save());
    }catch(err){
        console.log(err);
    }
});

app.get("/read",async(req,res)=>{
 FoodModel.find({},(err,result)=>{
    if(err){
        res.send(err)
    }
    res.send(result);
 });
   
});

app.put("/update",async(req,res)=>{

    const newFoodName=req.body.newFoodName;
    const id=req.body.id;

 
    try{
      await FoodModel.findById(id,(err,updatedFood) => {
            updatedFood.foodName=newFoodName;
            updatedFood.save();
            res.send("update");
        });
    }catch(err){
        console.log(err);
    }
});
app.delete("/delete/:id", async(req,res) => {
    const id=req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});
app.listen(3001, () =>{
    console.log("server is running");
});

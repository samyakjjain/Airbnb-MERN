const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review =require("./review.js")

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/1360554439/photo/maldives-tropical-island.jpg?s=1024x1024&w=is&k=20&c=WsFXHNdPXliwtrZN_GVlw24Woh2X02od8-ULZQiCfaE=",
        set:(v)=>v===""?"https://media.istockphoto.com/id/1360554439/photo/maldives-tropical-island.jpg?s=1024x1024&w=is&k=20&c=WsFXHNdPXliwtrZN_GVlw24Woh2X02od8-ULZQiCfaE=" : v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete",async (listing )=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;
import mongoose,{Schema} from "mongoose";
const topicSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    paragraph:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    }
},{timestamps:true})
const Topic= mongoose?.models?.Topic|| mongoose.model("Topic",topicSchema);
export default Topic;
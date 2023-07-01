import connectMongoDb from "@/libs/mongodb";
import Topic from "@/model/topic";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){
    const {id}=params;
    const {newTitle:title,newContent:content,newParagraph:paragraph,newImageUrl:imageUrl}=await request.json()
    await connectMongoDb();
    await Topic.findByIdAndUpdate(id,{title,content,paragraph,imageUrl})
    return NextResponse.json({message:"deleted topic"},{status:200})
}
export async function GET (request,{params}){
    const{id}=params;
    await connectMongoDb();
    const topic=await Topic.findOne({_id:id})
    return NextResponse.json({topic},{status:200});
}
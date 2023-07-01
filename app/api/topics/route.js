import connectMongoDb from "@/libs/mongodb";
import Topic from "@/model/topic";
import { NextResponse } from "next/server";

export async function POST(request){
    const {title,content,paragraph,imageUrl}=await request.json();
    await connectMongoDb();
    await Topic.create({title,content,paragraph,imageUrl});
    return NextResponse.json({message:"topic created"},{status:201})
}
export async function GET(){
    await connectMongoDb();
    const topics=await Topic.find();
    return NextResponse.json({topics})
}
export async function DELETE(request){
    const id=request.nextUrl.searchParams.get('id');
    await connectMongoDb()
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message:"deleted"},{status:200})
}

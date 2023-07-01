import EditTopicForm from "@/app/component/EditTopicForm";
const getTopicById=async(id)=>{
    try {
        const res=await fetch(`http://localhost:3000/api/topics/${id}`,{
            cache:"no-store"
        })
        if(!res.ok){
            throw new Error("failed to fetch data")
        }
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export default async function EditTopic({params}){
    const {id}=params
    const {topic}=await getTopicById(id)
    const {title,content,paragraph,imageUrl}=topic
    return(
        <EditTopicForm id={id} title={title} content={content} paragraph={paragraph} imageUrl={imageUrl}/>
    )
}
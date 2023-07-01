"use client";
import { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { useRouter } from "next/navigation";
export default function EditTopicForm({
  id,
  title,
  content,
  paragraph,
  imageUrl,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newParagraph, setNewParagraph] = useState(paragraph);
  const [newImageUrl,setNewImageUrl]=useState(imageUrl);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newContent, newParagraph ,newImageUrl}),
      });
      if (!res.ok) {
        throw new Error("failed to update topic");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2 "
        type="text"
        placeholder="Enter title"
      />
      <input
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="border border-slate-500 px-8 py-2 "
        type="text"
        placeholder="Enter content"
      />
      <textarea
        onChange={(e) => setNewParagraph(e.target.value)}
        value={newParagraph}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Enter paragraph"
      />
      <label htmlFor="image" className="border border-slate-500 px-8 py-2">
        Upload Image <AiOutlineFileImage className="text-red-800" />
      </label>
      <input id="image" type="file" style={{ display: "none" }} onChange={(e)=>setNewImageUrl(e.target.files[0])}/>
      <button className="bg-green-700 w-fit text-white p-2 rounded">
        Update
      </button>
    </form>
  );
}

import { useState } from "react"
import todo from "./assets/todoimg.png"
import { FaRegCircle, FaDotCircle } from "react-icons/fa"
import { FaEdit, FaTrash } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"
function Home() {
    const [editindex, seteditindex] = useState(null)
    const [open, setopen] = useState(false)
    const [input, setinput] = useState("")
    const [task, settask] = useState([])
    const [filter, setfilter] = useState("all")

    function handletask() {
        if (input.trim() === "") {
            return alert("Value required")
        }
        if (editindex !== null) {
            const updated = task.map((item, i) => {
                if (i === editindex) {
                    return { ...item, text: input }
                }
                return item
            })
            settask(updated)
            seteditindex(null)
        } else {
            settask([...task, { text: input, done: false }])
        }
        setopen(!open)
        setinput("")

    }

    const filteredtasks = task.filter((item) => {
        if (filter === "done") return item.done
        if (filter === "notdone") return !item.done
        return true
    })

    function toogletask(index) {
        const updatedtask = task.map((item, i) => {
            if (i === index) {
                return { ...item, done: !item.done }
            }
            return item
        })
        settask(updatedtask)
    }

    function handleEdit(index) {
        setinput(task[index].text)
        seteditindex(index)
        setopen(true)
    }

    function handledelete(index) {
        const updated = task.filter((_, i) => i !== index)
        settask(updated)
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 px-16">


                    <div className="py-10 lg:py-32">
                        <img src={todo} alt="" className="h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 mx-auto" />
                    </div>


                    <div className="w-full px-2 sm:px-6 lg:px-16">
                        <h1 className="font-bold text-2xl sm:text-3xl text-center py-1 text-violet-500">
                            React To-Do App
                        </h1>
                        <h1 className="text-center font-bold text-2xl sm:text-3xl">
                            All Your Tasks
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-3 justify-between py-2 mt-8 sm:mt-12">
                            <p className="font-semibold text-lg sm:text-xl">Tasks</p>

                            <div className="flex gap-2 flex-wrap items-center justify-center sm:justify-start">
                                <button onClick={() => setfilter("all")}
                                    className={`border border-gray-300 py-1 px-3 rounded-lg ${filter === "all" ? "bg-blue-400 text-white " : ""} font-semibold`}>
                                    All
                                </button>

                                <button onClick={() => setfilter("done")}
                                    className={`border border-gray-300 py-1 px-3 rounded-lg ${filter === "done" ? "bg-blue-400 text-white " : ""} font-semibold`}>
                                    Done
                                </button>

                                <button onClick={() => setfilter("notdone")}
                                    className={`border border-gray-300 py-1 px-3 rounded-lg ${filter === "notdone" ? "bg-blue-400 text-white " : ""} font-semibold`}>
                                    Not Done
                                </button>
                            </div>
                        </div>
                        {
                            filteredtasks.map((item, index) => (
                                <div key={index} className="my-2">
                                    <div className="flex select-none items-center gap-3 justify-between bg-white shadow w-full border border-gray-300 py-4 px-4 rounded-md " >
                                        <div className="cursor-pointer " onClick={() => toogletask(index)}>
                                            {item.done ? <FaDotCircle /> : <FaRegCircle />}
                                        </div>
                                        <div>
                                            <p className={`break-words ${item.done ? "line-through text-gray-400" : ""}`}>{item.text}</p>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <FaEdit onClick={() => handleEdit(index)} className="text-gray-600 cursor-pointer" size={25} />
                                            <FaTrash onClick={() => handledelete(index)} className="text-gray-600 cursor-pointer" size={25} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="border-2 border-gray-300 w-full rounded-md py-2 my-2" onClick={() => setopen(!open)}>
                            <div className="flex items-center justify-center gap-3 cursor-pointer">
                                <FaPlus className="text-gray-600" size={25} />
                                <button className="text-center text-gray-600 text-xl font-semibold"> Add Task</button>
                            </div>
                        </div>
                        {open && (
                            <div className="fixed inset-0 bg-black/60  flex items-center justify-center" onClick={() => setopen(false)}>
                                <div className="bg-white rounded-md w-[350px] p-6 shadow-lg" onClick={(e) => e.stopPropagation()} >
                                    <h2 className="text-xl font-semibold text-center py-2">Add Task</h2>
                                    <input type="text" value={input} onChange={(e) => setinput(e.target.value)} name="" id="" className="border border-gray-300 py-2 w-full rounded-md px-2"
                                        placeholder="Enter a Task" />
                                    <div className=" flex justify-end gap-3 py-2">
                                        <button onClick={() => setopen(!open)} className="p-2 rounded-md border border-gray-300 cursor-pointer">Cancel</button>
                                        <button onClick={handletask} className="p-2 rounded-md bg-blue-500 font-semibold text-white cursor-pointer">Add</button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}
export default Home

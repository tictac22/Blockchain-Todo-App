
import React from "react"
import { Task } from '../components/task';

export interface Todo {
    id: {
      _hex:string
    },
    text:string,
    completed:boolean
}
interface Props {
    todos: Todo[],
    toggleTodo: (id: number) => Promise<void>,
    deleteTodo: (id: number) => Promise<void>,
}
export const Todos:React.FC<Props> = ({todos,toggleTodo,deleteTodo}) => {
    return (
        <>
            {
                todos.length > 0 && todos.filter(item=>item.text != "").map(item=>{
                    return <Task 
                            key={`${item.text}${item.id._hex}`} 
                            text={item.text} 
                            completed={item.completed} 
                            id={parseInt(`${item.id._hex}`.toString(16), 16)}
                            toggleTodo={toggleTodo} 
                            deleteTodo={deleteTodo}
                            />
                })
            }
        </>
    )
}

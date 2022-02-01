

import React, { useContext,useState,useEffect } from "react"
import { Context } from "../context"
import { CreateTodo } from "./createTodo"
import { Todos,Todo } from "./todos"

import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

export const TodoLogic:React.FC = () => {
    const {contract,provider} = useContext(Context)
    const [isLoading,setLoading] = useState<boolean>(true);
    const [todos,setTodos] = useState<Todo[]>([]);
    const [hash,setHash] = useState<string>("")
    useEffect(()=>{
        const getTodos = async ():Promise<void> => {
            if(!window.ethereum || !window.ethereum.isMetaMask) return
            try{
                const getTodos = await contract.getTodo();
                setTodos(getTodos);
                console.log(getTodos)
            } 
            catch(e) {
                setTodos([])
            }
            finally{
                setLoading(false)
            }
        }
        getTodos()
    },[hash]);
    window.ethereum.on('accountsChanged',accounts => {
        setHash(accounts[0])
    })
    const addTodo = async (ref:React.MutableRefObject<any>,cb:React.Dispatch<React.SetStateAction<boolean>>):Promise<void> => {
        let inputValue = ref.current.value.trim();
        if(inputValue === "") return cb(true);
        const {hash} = await contract.addTodo(inputValue);
        provider.once(hash, () => {
            setHash(hash)
            setLoading(true)
            ref.current.value = "";
        });
    }
    const toggleTodo = async (id:number) => {
        const {hash} =  await contract.toggledTask(id)
        provider.once(hash, () => {
            setHash(hash)
            setLoading(true)
        });
    }
    const deleteTodo = async (id:number) => {
        const {hash} = await contract.deleteTask(id)
        provider.once(hash, () => {
            setHash(hash)
            setLoading(true)
        });
    }
    return (
        <>
            <CreateTodo addTodo={addTodo}/>
            {isLoading ? <Spinner>
                            <CircularProgress color="secondary"/>
                        </Spinner> : 
            <Todos todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>}
        </>
    )
}

export const Spinner = styled("div")({
    display:"flex",
    justifyContent:"center",
    marginTop:"20px"
})
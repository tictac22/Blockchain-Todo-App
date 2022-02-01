
import React, { useRef,useState } from 'react'

import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

interface Props {
    addTodo: (ref: React.MutableRefObject<any>, cb: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>
}

export const CreateTodo:React.FC<Props> = ({addTodo}) => {
    const ref = useRef(null)
    const [inputError,setInputError] = useState<boolean>(false);
    const addTask = ():void => {
        addTodo(ref,setInputError)
    }
    return(
        <Wrapper>
            <InputWrapper>
                <TextField
                error={inputError}
                inputRef={ref} 
                color="secondary" 
                sx={{width:"100%","input":{padding:"7.5px 14px",}}} 
                id="standard-basic" 
                hiddenLabel 
                placeholder="Add new todo" 
                variant="outlined"/>
                <Icon onClick={addTask}>
                    <AddIcon sx={{color:"#63458A"}}/>
                </Icon>
            </InputWrapper>
        </Wrapper>
    )
}

const Wrapper = styled("div")({
    display:"flex",
    flexDirection:"column",
    justifyContent:"align-start",
    marginBottom:"15px"
})
const InputWrapper = styled("div")({
    display:"flex",
    alignItems:"center"
})
const Icon = styled("div")({
    height:"40px",
    width:"40px",
    backgroundColor:"#b288c0",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:"10px",
    borderRadius:"10px"
})
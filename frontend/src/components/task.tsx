
import React from "react"

import { Typography } from "@mui/material"
import { styled } from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface Props {
    text:string,
    completed:boolean,
    id:number,
    toggleTodo: (id: number) => Promise<void>,
    deleteTodo: (id: number) => Promise<void>,
}

export const Task:React.FC<Props> = ({text,completed,id,toggleTodo,deleteTodo}) => {
    const todoToggle = () => {
        toggleTodo(id)
    }
    const todoDelete = () => {
        deleteTodo(id)
    }
    return (
        <Wrapper>
            <WrapperContainer>
                {completed ? <CheckBoxIcon color="primary"  onClick={todoToggle}/> : <CheckBoxOutlineBlankIcon  color="primary" onClick={todoToggle}/>}
                <Text>{text}</Text>
            </WrapperContainer>
            <DeleteIcon sx={{marginLeft:"15px"}} color="primary"  onClick={todoDelete}/>
        </Wrapper>
    )
}

const Wrapper = styled("div")({
    border:"2px solid #9A48D0",
    borderBottom:"none",
    borderRadius:"5px",
    padding:"10px",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    "&:last-child": {
        borderBottom:"2px solid #9A48D0",
    }
})
const WrapperContainer = styled("div")({
    display:"flex",
    minWidth:"0"
})
const Text = styled(Typography)({
    marginLeft:"10px",
    textOverflow:"ellipsis",
    overflow:"hidden"
})
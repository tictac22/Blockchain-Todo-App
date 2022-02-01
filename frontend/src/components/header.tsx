
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

import React from 'react'
export const Header:React.FC = () => {
    
    return (
        <Wrapper>
            <Logo></Logo>
            <Typography>Todo App</Typography>
        </Wrapper>
    )
}

const Wrapper = styled('header')({
    backgroundColor: '#63458A',
    width:"100%",
    height:"50px",
    display:"flex",
    alignItems:'center',
});

const Logo = styled("div")({
    width:"30px",
    height:"30px",
    backgroundColor:"white",
    borderRadius:"50%",
    margin:"0 8px"
})
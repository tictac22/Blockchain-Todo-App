

import React from "react"

import { ethers } from "ethers";
import Todo from "./Todo.json";

export const Context = React.createContext(null);

interface Props {
    children:React.ReactNode
}

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract("0x26Dd67b6782e216Bfde0D836DeAFD9a542725a4f", Todo.abi, signer);

export const ContractContext:React.FC<Props> = ({children}) => {
    return (
        <Context.Provider value={{contract,provider}}>
            {children}
        </Context.Provider>
    )
}
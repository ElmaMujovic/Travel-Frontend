import React, { createContext, useContext, useState } from 'react'

export const MainContext = createContext({
    user: null,
    onSetUserHandler: () => { }
});

export const useMainContext = () => {
    const context = useContext(MainContext);

    return context;
}

export const MainContextProvider = (props) => {
    const [user, setUser] = useState(null)

    const onSetUserHandler = (payload) => {
        setUser(payload)
    }

    return <MainContext.Provider value={{ user, onSetUserHandler }}>
        {props.children}
    </MainContext.Provider>
} 

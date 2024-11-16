import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [loggedin, setloggedin] = useState(false);

    return (
        <>
            <DataContext.Provider value={{ loggedin, setloggedin }}>
                {children}
            </DataContext.Provider>
        </>
    )
}

export default DataProvider;
import { createContext, useState } from 'react';
import Header from '../../Components/Header/Header';
import Loader from '../../Components/Loader/Loader';

interface IContextShape {
    updateLoader: (value: boolean) => void
}

export const LoaderContext = createContext<IContextShape>({ updateLoader: () => { } });
const Layout = ({ children }: any) => {
    const [isloading, setLoader] = useState(false);

    const updateLoader = (loader: boolean) => {
        setLoader(loader);
    };

    return (
        <>
            <Header />
            <LoaderContext.Provider value={{ updateLoader: updateLoader }}>
                <main className='weather-layout'>
                    {isloading && <Loader />}
                    {children}
                </main>
            </LoaderContext.Provider>
        </>
    )
}

export default Layout;
import { createContext, useState } from 'react';
import Header from '../../Components/Header/Header';
import Loader from '../../Components/Loader/Loader';

export const LoaderContext = createContext<any>(null);
const Layout = ({ children }: any) => {
    const [isloading, setLoader] = useState(false);

    const updateLoader = (loader: boolean) => {
        setLoader(loader);
    };

    return (
        <>
            <Header />
            <LoaderContext.Provider value={{ updateLoader }}>
                <main className='weather-layout'>
                    {isloading && <Loader />}
                    {children}
                </main>
            </LoaderContext.Provider>
        </>
    )
}

export default Layout;
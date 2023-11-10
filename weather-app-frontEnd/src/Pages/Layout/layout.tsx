import Header from '../../Components/Header/Header';

const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout;
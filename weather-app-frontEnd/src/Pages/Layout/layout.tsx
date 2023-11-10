import Header from '../../Components/Header/header';

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
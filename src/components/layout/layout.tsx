import {PropsWithChildren, useEffect} from 'react';
import {Header} from './header-slice';
import Footer from './footer'

interface Props extends PropsWithChildren {}

const Layout = (props: Props) => {
    const {children} = props;

    return (
        <>
            <Header />

            <main className='flex w-full justify-center'>{children}</main>

            <Footer />

            {/* Optional: Add global modals, toasts, or other components */}
        </>
    );
};

export default Layout;
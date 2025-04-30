import {PropsWithChildren, useEffect} from 'react';
import {Header} from './header-slice';

interface Props extends PropsWithChildren {}

const Layout = (props: Props) => {
    const {children} = props;
    console.log('Layout props:', props);

    useEffect(() => {
        // Optional: Add global event listeners, or other side effects
        return () => {
            console.log('Layout cleanup');
        }
    }, [])

    return (
        <>
            <Header />

            <main className='flex'>{children}</main>

            <Footer />

            {/* Optional: Add global modals, toasts, or other components */}
        </>
    );
};

export default Layout;

const Footer = () => {
    return (
        <footer>
            <p>© {new Date().getFullYear()}, Built with Gatsby</p>
        </footer>
    );
}
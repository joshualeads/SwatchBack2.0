import React from "react";
import Nav from "./Nav";
import Footer from './Footer';

import { UserProvider } from "../../lib/authContext";

const Layout = ({user, loadingUser = false, children}) => {
    return(
        <UserProvider value={{ user, loadingUser }}>
            <Nav />
            <main className="template">
                {children}
            </main>
            <Footer />
        </UserProvider>
    )
}

export default Layout;
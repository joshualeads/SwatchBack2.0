import React from "react";
import Nav from "./Nav";
import NavHome from "./NavHome";
import Footer from './Footer';

import { UserProvider } from "../../lib/authContext";

const Layout = ({user, loadingUser = false, path = "", children}) => {
    return(
        <UserProvider value={{ user, loadingUser }}>
            { path === "home" ? <NavHome/> :  <Nav /> }
            
            <main className="template">
                {children}
            </main>
            <Footer />
        </UserProvider>
    )
}

export default Layout;
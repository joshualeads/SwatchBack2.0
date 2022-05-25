import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({children}) => {
    return(
        <>
            <Nav />

            <main className="template">
                {children}
            </main>

            <Footer />
        </>
    )
}

export default Layout;
import Navbar from "./Navbar"

function BaseLayout ({children}) {

    return(
        
        <>
        <Navbar/>
        <div>{children}</div>
        </>

    )

}

export default BaseLayout
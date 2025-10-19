import Header from "../\bcomponents/Header";

const HeaderLayout = ({children}) => {
    return(
        <>
            <Header isLoggedIn={false}/>
            <main style={{marginTop:'20px'}}>{children}</main>
           
        </>
    )
}

export default HeaderLayout;
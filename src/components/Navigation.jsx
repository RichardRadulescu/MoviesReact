import "../styles/navigation.css"
export function Navigation({menu, setActiveMenu}){

    return (
    <nav>
    {
        menu.map(item => 
            ( <button key={item} type="button" onClick={()=> setActiveMenu(item)}>{item}</button>)
        )
    }
    </nav>
)
}
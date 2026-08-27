import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom"

const ScrollToTop = () => {
    const { pathname } = useLocation()
    const navType = useNavigationType()

    // Pathname:> yah dekhta hai ki kis page par gaye hai== e.g /home /about /contact
    // useNavigation :> yah dekhta hai ki user link par click karke aaya hai ya back ya forward button click karke
    // useNavigation me do hai :> "PUSH" -- "POP"
    // "PUSH" :> Kisi link par naya click kiya tab
    // "POP" :> Browser ka back ya forward button ko dabaya

    useEffect(() => {
        if (navType !== "POP") {
            window.scrollTo(0, 0)
        }
    }, [pathname, navType])
}

export default ScrollToTop
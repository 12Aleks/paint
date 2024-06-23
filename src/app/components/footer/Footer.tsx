"use client"
import FooterRight from "./FooterRight";
import FooterLeft from "./FooterLeft";
import {useAppSelector} from "@/lib/hooks";


const Footer = () => {
    const {isStatusBar} = useAppSelector(state => state.view)

    return (
        <footer style={{display: isStatusBar ? "flex" : "none"}}>
            <FooterLeft/>
            <FooterRight/>
        </footer>
    );
};

export default Footer;
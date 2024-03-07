'use client'
import {useAppDispatch} from "@/lib/hooks";
import {updateSizeInFooter} from "@/lib/features/paintSlice";

const Footer = () => {
    const dispatch = useAppDispatch();

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        dispatch(updateSizeInFooter(newSize))
    }

    return (
        <footer className="d-flex align-items-center">
            <input
                className="d-block ms-auto"
                type="range"
                min="0"
                max="1200"
                step="20"
                onChange={handleSizeChange} // Call handleSizeChange when size changes
            />
        </footer>
    );
};

export default Footer;
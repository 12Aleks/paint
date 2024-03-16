'use client'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateCursorMainColor} from "@/lib/features/cursorSlice";
import {useState} from "react";

const colors = ['black', 'gray', 'darkred', 'red', 'orange', 'yellow', 'green', 'turquoise',
    'indigo', 'purple', 'white', 'lightgray', 'brown',
    'pink', 'gold', 'lightyellow', 'lime',
    'paleturquoise', 'slategray', 'lavender'];

const ColorBlock = () => {
    const dispatch = useAppDispatch();
    const cursorData = useAppSelector(state => state.cursorData);
    const [transparentArray, isTransparentArray] = useState<string[]>(Array(10).fill("transparent"))
    const [isActive, setIsActive] = useState<boolean>(true);

    const updateColor = (color: string) => {
        dispatch(updateCursorMainColor([isActive, color]))
    }

    const updateColorTransparent = (index: number) => {
        const newTransparentArray = [...transparentArray];
        newTransparentArray.splice(index, 1, cursorData.colorFirst);
        isTransparentArray(newTransparentArray)
    }

    return (
        <div className="color_block d-inline-flex flex-column h-100 border-start border-2-secondary">
            <div className="d-flex align-items-center">
                <div className="me-4">
                    <div className="firstColor"
                         style={{background: cursorData.colorFirst, borderColor: isActive ? '#0095ff': 'transparent' }}
                         onClick={() => {
                             updateColor(cursorData.colorFirst); setIsActive(true)
                         }}
                    ></div>
                    <div className="secondColor mt-2"
                         style={{background: cursorData.colorSecond, borderColor: !isActive ? '#0095ff': 'transparent'}}
                         onClick={() => {
                             updateColor(cursorData.colorFirst); setIsActive(false)
                         }}
                    ></div>
                </div>

                <div className="wrapper">
                    {
                        colors.map(color =>
                            <div key={color} className="colorList" onClick={() => updateColor(color)}
                                 style={{background: color}}></div>
                        )
                    }
                    {
                        transparentArray.map((color, index) =>
                            <div key={index} className="colorList" style={{background: color}}
                            onClick={() => {updateColorTransparent(index)}}
                            ></div>
                        )
                    }
                </div>
                <div className="ms-4">
                    <div className='color-input-wrapper'>
                        <input type="color"
                               onChange={(e) => updateColor(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <p className="text-center mt-auto mb-0">Colors</p>
        </div>
    );
};

export default ColorBlock;
import {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateTextInput} from "@/lib/features/paintSlice";
import {
    updateFonStyle,
    updateFontFamily,
    updateFontSize,
    updateFontWeight,
    updateTextDecoration,
    updateTextStrikethrough,
    updateTextPosition, TextAlign
} from "@/lib/features/cursorSlice";


interface IShow {
    show: boolean
}

const fontSize: number[] = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
const fontName : string[] = [
    'Arial',
    'Arial Black',
    'Comic Sans MS',
    'Courier New',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Lucida Sans Unicode',
    'Palatino Linotype',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
    'Webdings',
    'Wingdings'
];

const textDecorations: string[] = ['bold', 'italic', 'underline', 'strikethrough'];


const Modal: FC<IShow> = ({show}) => {
    const cursorData = useAppSelector(state => state.cursorData);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState<string[]>([])
    const [activePosition, setActivePosition] = useState<string>('left')


    function setTextInput(e: string) {
        dispatch(updateTextInput(e))
    }

    function changeFontSize(size: number){
        dispatch(updateFontSize(size))
    }
    function changeFontFamily(name: string){
        dispatch(updateFontFamily(name))
    }

    function changeTextPosition(position: TextAlign){
        dispatch(updateTextPosition(position))
        setActivePosition(position);
    }

    function changeTextDecoration(format: string) {
        const index = active.indexOf(format);
        if (index === -1) {
            setActive([...active, format]);
              dispatch(updateTextDecoration(format.includes('underline')? 'underline': ''));
              dispatch(updateFontWeight(format.includes('bold')?'bold' : 'normal'));
              dispatch(updateFonStyle(format.includes('italic')?'italic' : 'normal'))
              dispatch(updateTextStrikethrough(format.includes('strikethrough')?'strikethrough' : 'normal'));
        } else {
            const newActive = [...active];
            newActive.splice(index, 1);
            setActive(newActive);
        }

    }

    return (
        <div className={`modal_overlay ${show ? 'show' : ''}`}>
            <div className="modal_wrapper">
                <div className="modal_block">
                    <div className="modal_body d-flex ">
                        <div className="w-50 d-flex pe-2">
                            <div className="dropdown w-75 me-2">
                                <button className="btn btn-dark dropdown-toggle border-secondary w-100 d-flex justify-content-between align-items-center" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    {cursorData.fontFamily}
                                </button>
                                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                    {fontName.map(name => (
                                        <li key={name}>
                                            <button className="dropdown-item" type="button"
                                                    onClick={() => changeFontFamily(name)}>
                                                {name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="dropdown w-25">
                                <button className="btn btn-dark dropdown-toggle border-secondary w-100" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    {cursorData.fontSize} px
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {fontSize.map(size => (
                                        <li key={size}>
                                            <button className="dropdown-item" type="button"
                                                    onClick={() => changeFontSize(size)}>
                                                {size} px
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-25 d-flex justify-content-between
                             border-start border-2-secondary ps-2 pe-2 wrapper">
                            {
                                textDecorations.map(icon =>
                                    <div key={icon} className={active.includes(icon)? 'active': ''}>
                                        <i className={`bi bi-type-${icon}`}
                                           onClick={() => changeTextDecoration(icon)}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-25 d-flex justify-content-between border-start border-2-secondary ps-2 pe-2 wrapper">
                            <div className={activePosition.includes('left') ? 'active' : ''}>
                                <i className="bi bi-filter-left" onClick={() => changeTextPosition('left')}></i>
                            </div>
                            <div className={activePosition.includes('center') ? 'active' : ''}>
                                <i className="bi bi-filter" onClick={() => changeTextPosition('center')}></i>
                            </div>
                            <div className={activePosition.includes('right') ? 'active' : ''}>
                                <i className="bi bi-filter-right" onClick={() => changeTextPosition('right')}></i>
                            </div>
                        </div>
                        <div className="w-25 d-flex justify-content-between border-start border-2-secondary ps-2 pe-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
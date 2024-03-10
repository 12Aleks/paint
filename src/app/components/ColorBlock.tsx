import React from 'react';

const ColorBlock = () => {
    const colors = ['black', 'gray', 'darkred', 'red','orange', 'yellow','green','turquoise',
        'indigo', 'purple', 'white', 'lightgray', 'brown',
        'pink',  'gold',  'lightyellow',   'lime',
        'paleturquoise', 'slategray',  'lavender'];
    const transparentArray = Array(10).fill("transparent");

    return (
        <div className="color_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="d-flex align-items-center">
                <div className="me-4">
                    <div className="firstColor"
                         style={{background: "black"}}
                    ></div>
                    <div className="secondColor mt-2"
                         style={{background: "white"}}
                    ></div>
                </div>

                <div className="wrapper">
                    {
                        colors.map(color =>
                            <div className="colorList" style={{background: color}}></div>
                        )
                    }
                    {
                        transparentArray.map(color =>
                            <div className="colorList" style={{background: color}}></div>
                        )
                    }
                </div>
            </div>
           <p className="text-center mt-auto mb-0">Colors</p>
        </div>
    );
};

export default ColorBlock;
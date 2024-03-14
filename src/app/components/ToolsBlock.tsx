import React from 'react';

const ToolsBlock = () => {
    const icons = ['bi-pencil-fill', 'bi-paint-bucket', 'bi-fonts', 'bi-eraser', 'bi-eyedropper', 'bi-zoom-in',
        // 'bi-superscript'
    ]

    return (
        <div className="tools_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
            {
                icons.map(icon =>
                    <div><i className={`bi ${icon}`}></i></div>
                )
            }
            </div>
            <p className="text-center mt-auto mb-0">Tools</p>
        </div>
    );
};

export default ToolsBlock;
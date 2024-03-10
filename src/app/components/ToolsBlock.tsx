import React from 'react';

const ToolsBlock = () => {
    const icons = ['bi-pencil-fill', 'bi-paint-bucket', 'bi-fonts', 'bi-eraser', 'bi-eyedropper', 'bi-zoom-in']

    return (
        <div className="tools_block d-inline-flex flex-column h-100">
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
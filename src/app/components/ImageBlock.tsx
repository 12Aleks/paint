import React from 'react';

const ImageBlock = () => {
    return (
        <div className="image_block d-inline-flex flex-column h-100">
            <i className="bi bi-symmetry-horizontal"></i>
            <i className="bi bi-symmetry-vertical"></i>
            <p className="text-center mt-auto mb-0">Image</p>
        </div>
    );
};

export default ImageBlock;
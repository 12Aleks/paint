import React from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const RulerModal = () => {
    const { isRulerModal} = useAppSelector(state => state.view);

    return (
        <div  className="ruler_wrapper" style={{display: isRulerModal ? "flex" : "none"}}>
            <label>0</label>
            <label>100</label>
            <label>200</label>
            <label>300</label>
            <label>400</label>
            <label>500</label>
            <label>600</label>
            <label>700</label>
            <label>800</label>
            <label>900</label>
            <label>1000</label>
            <label>1100</label>
            <label>1200</label>
            <label>1300</label>
            <label>1400</label>
            <label>1500</label>
            <label>1600</label>
            <label>1700</label>
            <label>1800</label>
            <label>1900</label>
            <label>2000</label>
        </div>
    );
};

export default RulerModal;
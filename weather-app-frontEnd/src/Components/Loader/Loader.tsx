/*
 This file generates the loader
*/

import { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Loader = ({ children }: any) => {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    return (
        <span aria-label='loader'>
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
            />
        </span>
    )
}

export default Loader;
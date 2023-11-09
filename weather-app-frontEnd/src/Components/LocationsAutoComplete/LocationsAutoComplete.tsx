import { useRef, useEffect } from "react";
import TextField from '@mui/material/TextField';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface ILocationsAutoComplete {
    onSearchClick (params:string) : void
}

const LocationsAutoComplete = (props: ILocationsAutoComplete) => {
    const autoCompleteRef: any = useRef();
    const inputRef: any = useRef();
    const options = {
        //componentRestrictions: { },
        // fields: ["address_components", "geometry", "icon", "name"],
        //types: ["establishment"],
        types: ['(cities)'],
    };

    useEffect(() => {
        // autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        //     inputRef.current,
        //     options
        // );
    }, []);

    const onSearchClick = () => {
        if(inputRef?.current?.value?.trim())
            props.onSearchClick(inputRef?.current?.value?.trim())

    }
    return (
        <div>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                inputRef={inputRef}
                placeholder="Search Location"
                inputProps={{ "aria-label": "Search location" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" >
                <SearchIcon onClick={() => onSearchClick()}/>
            </IconButton>
        </div>
    );
};
export default LocationsAutoComplete;
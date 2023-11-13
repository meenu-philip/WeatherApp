// LocationAutocomplete.tsx
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';

interface Location {
    name: string;
    state: string;
    country: string;
}

interface ILocationAutoComplete {
    onLocationSelect: Function
    onLocationClear: Function
    value?: any
}

// Fetches locations based on a query string
export const fetchLocations = async (query: string): Promise<Location[]> => {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=8b7535b42fe1c551f18028f64e8688f7`
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const locations = await response.json();
    // Filter locations based on the exact match of the city name
    const filteredLocations = locations.filter((location: any) =>
        location.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredLocations;
};

export const LocationsAutocomplete = (props: ILocationAutoComplete) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState<Location | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    // Query for fetching locations based on inputValue
    const { data, isLoading, isError } = useQuery<Location[], Error>(
        ['locations', inputValue],
        () => fetchLocations(inputValue),
        {
            enabled: inputValue.trim() !== '',
        }
    );

    // Handle the change event when a location is changed
    const handleSelectChange = (event: React.ChangeEvent<{}>, value: Location | null) => {
        setSelectedValue(value);
        if (value) {
            const selecttedLoc = {
                city: value?.name,
                country: value?.country
            }
            // This method is called when the user selects a location
            props.onLocationSelect(selecttedLoc)
        }
        else {
            // This method is called when the user clears the selection
            props.onLocationClear();

        }
    };

    const handleInputFocus = () => {
        // Retain the dropdown options on input focus
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
        setInputValue(newInputValue);
        if (newInputValue === '') {
            props.onLocationClear();
        }
    };

    return (
        <Autocomplete
            id="location-autocomplete"
            options={data || []}
            getOptionLabel={(option) => `${option.name}, ${option.state}, ${option.country}`}
            loading={isLoading}
            value={selectedValue}
            onChange={handleSelectChange}
            onFocus={handleInputFocus}
            onInputChange={handleInputChange}

            renderInput={(params) => (
                <TextField {...params} label="Search Locations" variant="outlined" inputRef={inputRef} />
            )}
        />
    );
};


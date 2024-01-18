import React, { forwardRef, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
// import PlacesPicker from '@tasiodev/react-places-autocomplete'

// export default function PlacesAutocompleteInput() {
const PlacesAutocompleteInput = forwardRef((props, ref) => {
  const [address, setAddress] = useState("");
  // const [value, setValue] = useState(null);
  // const gapi = "AIzaSyAJlieS2MnisIz4mlnFFpvpqfwry-T6bmM";
  // console.log('ref111',ref)
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={setAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            ref={ref}
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
              
            })}
          />
          <div className="autocomplete-dropdown-container">
            {/* {loading && <div>Loading...</div>} */}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <div className="place-suggestion">{suggestion.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>

    // <PlacesPicker
    //       gMapsKey={gapi}
    //       onChange={setValue}
    //       placeholder='Search Places ...'
    //     />
  );
});

export default PlacesAutocompleteInput;

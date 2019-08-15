import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

const ranges = [
  {
    value: "5",
    label: "5"
  },
  {
    value: "10",
    label: "10"
  },
  {
    value: "15",
    label: "15"
  },
  {
    value: "30",
    label: "30"
  },
  {
    value: "50",
    label: "50"
  }
];

class Search extends Component {
  state = {
    searchText: "", // key phrase to search for
    amount: 15, // number of images to return
    apiUrl: "https://pixabay.com/api",
    apiKey: "13274676-1a7b8c9974a7eae6a936cbc3d",
    images: [] // array to store all the images
  };

  callApi = () => {
    axios
      .get(
        `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
          this.state.searchText
        }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
      )
      // after the promise is returned. res stands for response
      .then(res => this.setState({ images: res.data.hits }))
      .catch(err => console.log(err));
  };

  // e stands for event
  onTextChange = e => {
    // value is the text inside the seatchText bar
    const val = e.target.value;
    // in this case the target.name is searchText
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        console.log("val is null");
        this.setState({ images: [] });
      } else {
        this.callApi();
      }
    });
  };

  // to change the number of images being displayed
  onAmountChange = (e, index, value) => {
    this.setState({ amount: value }, () => {
      if (this.state.searchText === "") {
        this.setState({ images: [] });
      } else {
        this.callApi();
      }
    });
  };

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          {ranges.map(option => (
            <MenuItem
              key={option.value}
              primaryText={option.label}
              value={option.value}
            />
          ))}
        </SelectField>
        <br />
        {/* Display the images if there are any */}
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;

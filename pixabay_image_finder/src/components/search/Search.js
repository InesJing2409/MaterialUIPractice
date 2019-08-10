import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";

const ranges = [
  {
    value: 5,
    label: "5"
  },
  {
    value: 10,
    label: "10"
  },
  {
    value: 15,
    label: "15"
  },
  {
    value: 30,
    label: "30"
  },
  {
    value: 50,
    label: "50"
  }
];

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com.api",
    apiKey: "13274676-1a7b8c9974a7eae6a936cbc3d",
    images: []
  };

  // e stands for event
  onTextChange = e => {
    // in this case the target.name is searchText
    this.setState({ [e.target.name]: e.target.value }, () => {
      axios
        .get(
          `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
        )
        // after the promise is returned, res stands for response
        .then(res => this.setState({ images: res.data.hits }))
        .catch(err => console.log(err));
    });
  };

  render() {
    console.log(this.state.images);
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
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectField>
      </div>
    );
  }
}

export default Search;

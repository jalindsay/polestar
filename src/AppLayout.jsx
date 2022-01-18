import { Button, Input, Table, Typography } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';

class AppLayout extends Component {
    
  constructor() {
    super();
    this.state = {
      searchField: '',
      result: []
    }

    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
      },
      {
        title: 'Published',
        dataIndex: 'first_publish_year'
      }
  ];
  }

  render() {
    return <>
      <Input 
        placeholder='enter book title' 
        value={this.state.searchField} 
        onChange={e => this.setState({searchField: e.target.value})}
      />
      <Button onClick={() => this.onSearchClick()}>Search</Button>
      <Table 
        columns={this.columns}
        dataSource={this.state.result}
      />
    </>
  }

  onSearchClick() {
    console.log(this.state.searchField);
    axios.get('http://openlibrary.org/search.json?q=' + this.state.searchField)
      .then((response) => this.setState({result: response.data.docs}))
      .catch((error) => this.handleError(error));
  }

  handleError(error) {
    console.log(error);
  }
}

export default AppLayout;
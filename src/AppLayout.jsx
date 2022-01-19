import { Button, Input, Table, Row, Col } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';

// Main application react component
class AppLayout extends Component {
    
  constructor() {
    super();

    // Set initial state variables here
    this.state = {
      searchField: '',
      result: [],
      loading: false
    }

    // Set the index and titles of the table columns
    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
      },
      {
        title: 'Author',
        dataIndex: 'author_name',
      },
      {
        title: 'Published',
        dataIndex: 'first_publish_year'
      }
  ];
  }

  // Main react render function
  render() {

    return <>
      <Row>
        <Col span={6}>
          <Input 
            placeholder='enter book title' 
            value={this.state.searchField} 
            onChange={e => this.setState({searchField: e.target.value})}
          />
          <Button onClick={() => this.onSearchClick()}>Search</Button>
        </Col>
      </Row>
      <Row>
      <Col span={24}> 
      <Table 
        columns={this.columns}
        dataSource={this.state.result}
        loading={this.state.loading}
      />
      </Col>
      </Row>
    </>
  }

  // Function called when search buton is clicked
  onSearchClick() {

    // Set loading to true so table will show loading indicator
    this.setState({loading: true});

    // Use axios to send the get request with the query from the text field appended
    axios.get('http://openlibrary.org/search.json?q=' + this.state.searchField)
      .then((response) => this.handleSuccess(response))
      .catch((error) => this.handleError(error));
  }

  // Log caught error
  handleError(error) {

    console.log(error);
  }

  // Handle successful GET request
  handleSuccess(response) {

    this.setState({result: response.data.docs, loading: false})
  }
}

export default AppLayout;
import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddRiver from "./AddRiver";

class Rivers extends Component {
  constructor(props) {
    super(props);
    this.state = {rivers: []};
  }

  componentDidMount() {
    this.fetchRivers();
  }

  addRiver(river) {
    const jwtToken = "Bearer_" + localStorage.getItem("jwt");
    fetch("http://localhost:8080/api/v1/rivers/", {
      method: 'POST',
      headers: {
        "Authorization": jwtToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(river)
    })
      .then(res => this.fetchRivers())
      .catch(err => console.log(err))
  }

  fetchRivers = () => {
    // const jwtToken = "Bearer_" + localStorage.getItem("jwt");
    const jwtToken = "Bearer_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE1ODc2MjkyOTIsImV4cCI6MTU5NjAyOTI5Mn0.966fWaqrHFcYVTyFuFprgQztNdwQ-Zr2Lv5ycDb7LHU";
    // fetch("http://localhost:8080/api/v1/rivers/", {
    //   method: "GET",
    //   mode: "no-cors",
    //   headers: new Headers({
    //     "Authorization": jwtToken,
    //     "Content-Type": "application/json"
    //   }),
    // })

    fetch("http://localhost:8080/api/v1/rivers/", {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Authorization": jwtToken, //the token is a variable which holds the token
        "Origin": "http://localhost:3000",
        "Accept": "*/*",
        "Access-Control-Request-Method": "GET"
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          rivers: responseData
        })
      })
      .catch(err => console.error("error: " + err));
  }

  updateRiver(river) {
    const jwtToken = "Bearer_" + localStorage.getItem("jwt");
    fetch("http://localhost:8080/api/v1/admn/rivers/", {
      method: "PUT",
      headers: {
        "Authorization": jwtToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(river)
    })
      .then(res => this.fetchRivers())
      .catch(err => console.log(err))
  }

  deleteRiver = (id) => {
    const jwtToken = "Bearer_" + localStorage.getItem("jwt");
    if (window.confirm('Are you sure to delete river?')) {
      fetch("http://localhost:8080/api/v1/admn/rivers/" + id, {
        method: 'DELETE',
        headers: new Headers({
          "Authorization": jwtToken,
          "Content-Type": "application/json"
        })
      }).then(res => this.fetchRivers())
        .catch(err => console.error(err));
    }
  };

  editable = (cell) => {
    return (
      <div style={{backgroundColor: "#fafafa"}} contentEditable suppressContentEditableWarning onBlur={e => {
        const rivers = [...this.state.rivers];
        rivers[cell.index][cell.column.id] = e.target.innerHTML;
        this.setState({rivers: rivers});
      }}
           dangerouslySetInnerHTML={{__html: this.state.rivers[cell.index][cell.column.id]}}
      />
    );
  };

  render() {

    const columns = [{
      Header: "River name",
      accessor: "name",
      Cell: this.editable
    }, {
      Header: "Length",
      accessor: "length",
      Cell: this.editable
    }, {
      Header: "Pool area",
      accessor: 'amount',
      Cell: this.editable
    }, {
      Header: "Water consumption",
      accessor: 'rate',
      Cell: this.editable
    }, {
      Header: "Average slope",
      accessor: 'rate',
      Cell: this.editable
    }, {
      Header: "Flow rate",
      accessor: 'rate',
      Cell: this.editable
    }, {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <div>
          <button onClick={() => this.deleteRiver(row.original.id)}>Delete</button>
        </div>
      )
    }, {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <div>
          <button onClick={() => this.updateRiver(row.original)}>Update</button>
        </div>
      )
    }

      ,];

    return (
      <div>
        <AddRiver addRiver={this.addRiver} fetchRivers={this.fetchRivers}/>
        <ReactTable data={this.state.rivers} columns={columns} filterable={true}/>
      </div>
    );
  }

}

export default Rivers;

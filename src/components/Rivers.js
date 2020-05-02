import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import AddRiver from "./AddRiver";

class Rivers extends Component {
  constructor(props) {
    super(props);
    this.state = {rivers: []};
  }

  componentDidMount() {
    this.getRivers();
  }

  addRiver = river => {
    axios.post(
      "http://localhost:8080/api/v1/admin/rivers/",
      river,
      {
        headers: {
          "Authorization": "Bearer_" + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        }
      }).then(() => this.getRivers())
      .catch(err => console.log(err))
  };

  getRivers() {
    axios.get(
      "http://localhost:8080/api/v1/admin/rivers/",
      {
        headers: {
          "Authorization": "Bearer_" + localStorage.getItem("jwt")
        }
      }).then((response) => {
      this.setState({
        rivers: response.data
      })
    })
      .catch(err => console.error("error: " + err));
  }

  updateRiver(river) {
    axios.put(
      "http://localhost:8080/api/v1/admin/rivers/",
      river,
      {
        headers: {
          "Authorization": "Bearer_" + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        }
      },)
      .then(() => this.getRivers())
      .catch(err => console.log(err))
  }

  deleteRiver = (id) => {
    if (window.confirm('Are you sure to delete river?')) {
      axios.delete(
        "http://localhost:8080/api/v1/admin/rivers/" + id,
        {
          headers: {
            "Authorization": "Bearer_" + localStorage.getItem("jwt")
          }
        }).then(() => this.getRivers())
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
      width: "14%",
      Cell: this.editable
    }, {
      Header: "Length (km)",
      accessor: "length",
      width: "14%",
      Cell: this.editable
    }, {
      Header: "Pool area (km2)",
      accessor: "poolArea",
      width: "14%",
      Cell: this.editable
    }, {
      Header: "Water consumption (m3/sec)",
      accessor: "waterConsumption",
      width: "14%",
      Cell: this.editable
    }, {
      Header: "Average slope (m/km)",
      accessor: "averageSlope",
      width: "14%",
      Cell: this.editable
    }, {
      Header: "Flow rate (m/sec)",
      accessor: 'flowRate',
      width: "14%",
      Cell: this.editable
    }, {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <div>
          <button onClick={() => this.updateRiver(row.original)}>Update</button>
        </div>
      )
    }, {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <div>
          <button onClick={() => this.deleteRiver(row.original.id)}>Delete</button>
        </div>
      )
    },
    ];

    return (
      <div>
        <div style={{
          display: "flex", justifyContent: "flex-end"
        }}>
          <AddRiver addRiver={this.addRiver} fetchRivers={this.getRivers}/>
          <button onClick={this.logOut}>Log Out</button>
        </div>
        <ReactTable data={this.state.rivers} columns={columns} filterable={true}/>
      </div>
    );
  }

  logOut() {
    localStorage.clear();
    window.location.reload(false);
  }
}

export default Rivers;

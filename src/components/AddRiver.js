import React, {Component} from 'react';
import SkyLight from 'react-skylight';

class AddRiver extends Component {

  constructor(props) {
    super(props);
    this.state = {name: '', length: '', poolArea: '', waterConsumption: '', averageSlope: '', flowRate: ''};
  }

  handleChange = (event) => {
    this.setState(
      {[event.target.name]: event.target.value}
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let river = {...this.state};
    this.props.addRiver(river);
    this.refs.addDialog.hide();
  };

  render() {
    return (
      <div style={{width: "95%"}}>
        <SkyLight hideOnOverlayClicked ref="addDialog">
          <h3>Add River</h3>
          <form>
            <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/><br/>
            <input type="number" step="1" placeholder="Length" name="length" onChange={this.handleChange}/><br/>
            <input type="number" step="1" placeholder="Pool area" name="poolArea" onChange={this.handleChange}/><br/>
            <input type="number" step="1" placeholder="Water consumption" name="waterConsumption"
                   onChange={this.handleChange}/><br/>
            <input type="number" step="0.01" placeholder="Average slope" name="averageSlope"
                   onChange={this.handleChange}/><br/>
            <input type="number" step="0.01" placeholder="Flow rate" name="flowRate" onChange={this.handleChange}/><br/>
            <button style={{margin: "10px"}} onClick={this.handleSubmit}>Add</button>
          </form>
        </SkyLight>
        <div>
          <button style={{height: "100%", width: "100%", margin: "0"}}
                  onClick={() => this.refs.addDialog.show()}>Add River
          </button>
        </div>
      </div>
    )
  }
}

export default AddRiver;

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Vehicle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSmallDialogOpen: false,
      vehicle: {},
      isLoading: true,
      isError: false
    }
  }

  onSmallDialogOpen = () => {
    this.setState({ ...this.state, isSmallDialogOpen: true });
  }

  onSmailDialogClose = () => {
    this.setState({ ...this.state, isSmallDialogOpen: false });
  }

  async fetchVehicleData(vehicleId) {
    try {
      const res = await axios.get('https://swapi.co/api/vehicles/' + vehicleId);
      this.setState({ ...this.state, vehicle: res.data, isLoading: false });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  }

  componentDidMount() {
    this.fetchVehicleData(this.props.id);
  }

  onRetry = () => {
    this.setState({ ...this.state, isLoading: true, isError: false });
    this.fetchVehicleData(this.props.id);
  }

  render() {
    if (this.state.isError) {
      return <div>
        <div>Load data failed</div>
        <Button
          style={{}}
          label='Retry'
          color='primary'
          onClick={this.onRetry}
        >
          Retry
          </Button>
      </div>;
    }
    return (<div>
      <Button variant='outlined' color='primary' onClick={this.onSmallDialogOpen}>
        {this.state.isLoading ? <CircularProgress size={20} /> : this.state.vehicle.name}
      </Button>
      <Dialog
        open={this.state.isSmallDialogOpen}
        onClose={this.onSmailDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <div>
              <b>{'Name: '}</b> {this.state.vehicle.name} <br />
              <b>{'Model: '}</b> {this.state.vehicle.model} <br />
              <b>{'Manufacturer: '}</b> {this.state.vehicle.manufacturer} <br />
              <b>{'Cost In Credits: '}</b> {this.state.vehicle.cost_in_credits} <br />
              <b>{'Length: '}</b> {this.state.vehicle.length} <br />
              <b>{'Max Atmosphering Speed: '}</b> {this.state.vehicle.max_atmosphering_speed} <br />
              <b>{'Crew: '}</b> {this.state.vehicle.crew} <br />
              <b>{'Passengers: '}</b> {this.state.vehicle.passengers} <br />
              <b>{'Cargo Capacity: '}</b> {this.state.vehicle.cargo_capacity} <br />
              <b>{'Consumables: '}</b> {this.state.vehicle.consumables} <br />
              <b>{'Vehicle Class: '}</b> {this.state.vehicle.vehicle_class} <br />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSmailDialogClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
  }
}

Vehicle.propTypes = {
  id: PropTypes.func.isRequired
};

export default Vehicle

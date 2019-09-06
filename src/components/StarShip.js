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

class StarShip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSmallDialogOpen: false,
      starShip: {},
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

  async fetchStarShipData(starShipId) {
    try {
      const res = await axios.get('https://swapi.co/api/starships/' + starShipId);
      this.setState({ ...this.state, starShip: res.data, isLoading: false });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  }

  componentDidMount() {
    this.fetchStarShipData(this.props.id);
  }

  onRetry = () => {
    this.setState({ ...this.state, isLoading: true, isError: false });
    this.fetchStarShipData(this.props.id);
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
        {this.state.isLoading ? <CircularProgress size={20} /> : this.state.starShip.name}
      </Button>
      <Dialog
        open={this.state.isSmallDialogOpen}
        onClose={this.onSmailDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Star Ship</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <div>
              <b>{'Name: '}</b> {this.state.starShip.name} <br />
              <b>{'Model: '}</b> {this.state.starShip.model} <br />
              <b>{'Manufacturer: '}</b> {this.state.starShip.manufacturer} <br />
              <b>{'Cost In Credits: '}</b> {this.state.starShip.cost_in_credits} <br />
              <b>{'Length: '}</b> {this.state.starShip.length} <br />
              <b>{'Max Atmosphering Speed: '}</b> {this.state.starShip.max_atmosphering_speed} <br />
              <b>{'Crew: '}</b> {this.state.starShip.crew} <br />
              <b>{'Passengers: '}</b> {this.state.starShip.passengers} <br />
              <b>{'Cargo Capacity: '}</b> {this.state.starShip.cargo_capacity} <br />
              <b>{'Consumables: '}</b> {this.state.starShip.consumables} <br />
              <b>{'Hyperdrive Rating: '}</b> {this.state.starShip.hyperdrive_rating} <br />
              <b>{'MGLT: '}</b> {this.state.starShip.MGLT} <br />
              <b>{'Star Ship Class: '}</b> {this.state.starShip.starship_class} <br />
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

StarShip.propTypes = {
  id: PropTypes.func.isRequired
};

export default StarShip

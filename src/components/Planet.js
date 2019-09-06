import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';

class Planet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSmallDialogOpen: false,
      planet: {},
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

  async fetchPlanetData(planetId) {
    try {
      const res = await axios.get('https://swapi.co/api/planets/' + planetId);
      this.setState({ ...this.state, planet: res.data, isLoading: false });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  }

  componentDidMount() {
    // axios.get('https://swapi.co/api/planets/' + this.props.id)
    //   .then(res => {
    //     const planet = res.data;
    //     this.setState({ ...this.state, planet, isLoading: false });
    //   })
    this.fetchPlanetData(this.props.id);
  }

  onRetry = () => {
    this.setState({ ...this.state, isLoading: true, isError: false });
    this.fetchPlanetData(this.props.id);
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
        {this.state.isLoading ? <CircularProgress size={20} /> : this.state.planet.name}
      </Button>
      <Dialog
        open={this.state.isSmallDialogOpen}
        onClose={this.onSmailDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Home World</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <div>
              <b>{'Name: '}</b> {this.state.planet.name} <br />
              <b>{'Rotation Period: '}</b> {this.state.planet.rotation_period} <br />
              <b>{'Orbital Period: '}</b> {this.state.planet.orbital_period} <br />
              <b>{'Diameter: '}</b> {this.state.planet.diameter} <br />
              <b>{'Climate: '}</b> {this.state.planet.climate} <br />
              <b>{'Gravity: '}</b> {this.state.planet.gravity} <br />
              <b>{'Terrain: '}</b> {this.state.planet.terrain} <br />
              <b>{'Surface Water: '}</b> {this.state.planet.surface_water} <br />
              <b>{'Population: '}</b> {this.state.planet.population} <br />
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

Planet.propTypes = {
  id: PropTypes.func.isRequired
};

export default Planet;

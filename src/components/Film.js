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

class Film extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSmallDialogOpen: false,
      film: {},
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

  async fetchFilmData(filmId) {
    try {
      const res = await axios.get('https://swapi.co/api/films/' + filmId);
      this.setState({ ...this.state, film: res.data, isLoading: false });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  }

  componentDidMount() {
    this.fetchFilmData(this.props.id);
  }

  onRetry = () => {
    this.setState({ ...this.state, isLoading: true, isError: false });
    this.fetchFilmData(this.props.id);
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
        {this.state.isLoading ? <CircularProgress size={20} /> : this.state.film.title}
      </Button>
      <Dialog
        open={this.state.isSmallDialogOpen}
        onClose={this.onSmailDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Film</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <div>
              <b>{'Title: '}</b> {this.state.film.title} <br />
              <b>{'Episode Id: '}</b> {this.state.film.episode_id} <br />
              <b>{'Opening Crawl: '}</b> {this.state.film.opening_crawl} <br />
              <b>{'Director: '}</b> {this.state.film.director} <br />
              <b>{'Producer: '}</b> {this.state.film.producer} <br />
              <b>{'Release Date: '}</b> {this.state.film.release_date} <br />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSmailDialogClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
  }
}

Film.propTypes = {
  id: PropTypes.func.isRequired
};

export default Film

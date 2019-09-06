import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import Planet from './Planet';
import Film from './Film';
import Vehicle from './Vehicle';
import StarShip from './StarShip';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});


const Character = (props) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  // console.log(props)
  return (
    <div>
      {props.character ? (
        <React.Fragment>
          <Card >
            <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
              image='https://starwarsblog.starwars.com/wp-content/uploads/2019/07/hyperreal-darth-vader-tall.jpg'
              title={props.character.name}
            />
            <CardContent>
              <Typography gutterBottom variant='headline' component='h2'>
                {props.character.name}
              </Typography>
              <Typography component='p'>
                {props.character.name} {' is '} {props.character.height} {' cm tall, '}
                {props.character.mass} {' kg, has '} {props.character.hair_color} {' hair, '}
                {props.character.skin_color} {' skin and '} {props.character.eye_color} {' eyes.'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='outlined' color='primary' onClick={handleClickOpen}>
                More Details
                            </Button>
              <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar position='static' >
                  <Toolbar>
                    <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                      <CloseIcon />
                    </IconButton>
                    <Typography variant='title' color='inherit'>
                      Character
                                  </Typography>
                  </Toolbar>
                </AppBar>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Grid item xs={12} sm={12} lg={12} xl={12}>
                    <Card >
                      <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                        image='https://starwarsblog.starwars.com/wp-content/uploads/2019/07/hyperreal-darth-vader-tall.jpg'
                        title={props.character.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant='headline' component='h2'>
                          {props.character.name}
                        </Typography>
                        <Typography component='p'>
                          {props.character.name} {' is '} {props.character.height} {' cm tall, '}
                          {props.character.mass} {' kg, has '} {props.character.hair_color} {' hair, '}
                          {props.character.skin_color} {' skin and '} {props.character.eye_color} {' eyes.'}
                        </Typography> <br/>
                        <Typography component='p'>
                          <b>{'Home World: '}</b>
                          <Planet id={(props.character.homeworld.replace('https://swapi.co/api/planets/', '')).replace('/', '')} />
                        </Typography>
                        <Typography component='p'>
                          <b>{'Films: '}</b>
                          <table>
                            <tr>
                              {
                                (props.character.films.length !== 0) ? (props.character.films.map(curFilm =>
                                  <td><Film id={(curFilm.replace('https://swapi.co/api/films/', '')).replace('/', '')} /></td>)) : 'N/A'
                              }
                            </tr>
                          </table>
                        </Typography>
                        <Typography component='p'>
                          <b>{'Vehicles: '}</b>
                          <table>
                            <tr>
                              {
                                (props.character.vehicles.length !== 0) ? (props.character.vehicles.map(curVehicle =>
                                  <td><Vehicle id={(curVehicle.replace('https://swapi.co/api/vehicles/', '')).replace('/', '')} /></td>)) : 'N/A'
                              }
                            </tr>
                          </table>
                        </Typography>
                        <Typography component='p'>
                          <b>{'Star Ships: '}</b>
                          <table>
                            <tr>
                              {
                                (props.character.starships.length !== 0) ? (props.character.starships.map(curStarShip =>
                                  <td><StarShip id={(curStarShip.replace('https://swapi.co/api/starships/', '')).replace('/', '')} /></td>)) : 'N/A'
                              }
                            </tr>
                          </table>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              </Dialog>
            </CardActions>
          </Card>
          <Divider light style={{ marginTop: 8 }}/>
        </React.Fragment>
      ) : null}
    </div>
  )
}

Character.propTypes = {
  chanracter: PropTypes.object.isRequired
};

export default Character
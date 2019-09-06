import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Character from './Character';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

class CharacterList extends React.Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      searchedCharacters: [],
      totalCharacter: -1,
      page: 1,
      isError: false,
      hasMore: true,
      isSearching: false
    };
  }
  async fetchMoreData() {
    if (this.state.characters.length >= this.state.totalCharacter) {
      this.setState({ ...this.state, hasMore: false });
      return;
    }
    try {
      const response = await this.fetchData(this.state.page + 1);
      this.setState({ ...this.state, page: this.state.page + 1, characters: this.state.characters.concat(response.data.results) });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  };

  fetchData(page) {
    return axios.get(`https://swapi.co/api/people/?page=${page}`);
  }

  async componentDidMount() {
    try {
      const res = await this.fetchData(this.state.page);
      const characters = res.data.results;
      this.setState({ ...this.state, characters, totalCharacter: res.data.count });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  }

  componentDidUpdate() {
    if (this.state.searchString && this.state.isSearching) {
      this.getCharacters();
    }
  }

  async onRetry() {
    try {
      let page = this.state.characters.length > 0 ? this.state.page + 1 : this.state.page;
      const res = await this.fetchData(page);

      this.setState({ ...this.state, page, isError: false, characters: this.state.characters.concat(res.data.results), totalCharacter: res.data.count });
    } catch (e) {
      this.setState({ ...this.state, isError: true });
    }
  }

  getCharacters = () => {
    axios.get('https://swapi.co/api/people/?search=' + this.state.searchString)
      .then(res => {
        const characters = res.data.results;
        this.setState({ ...this.state, searchedCharacters: characters, isSearching: false });
      })
  }


  onSearchInputChange = (event) => {
    console.log('Search changed ...' + event.target.value)
    if (event.target.value) {
      this.setState({ ...this.state, searchString: event.target.value, isSearching: true })
    } else {
      this.setState({ ...this.state, searchString: '', isSearching: false })
    }
  }

  render() {
    if (this.state.isError) {
      return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>Load data failed</div>
        <Button
          style={{}}
          label='Retry'
          color='primary'
          onClick={this.onRetry.bind(this)}
        >
          Retry
                </Button>
      </div>;
    }
    if (this.state.totalCharacter === -1) {
      return <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress />
      </div>;
    }
    if (this.state.totalCharacter === 0) {
      return <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        No Character Found
            </div>;
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField style={{ padding: 24 }}
          id='searchInput'
          placeholder='Search for Characters'
          margin='normal'
          onChange={this.onSearchInputChange}
        />

        {
          this.state.searchString ?
            <List style={{ position: 'relative', overflow: 'auto', maxHeight: 600 }}>
              {
                this.state.searchedCharacters.map(character => <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <Character character={character} />
                </Grid>)
              }
            </List> :
            <InfiniteScroll
              dataLength={this.state.characters.length}
              next={this.fetchMoreData.bind(this)}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              height={600}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.state.characters.map(curCharacter => (
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <Character character={curCharacter} />
                </Grid>
              ))}
            </InfiniteScroll>
        }
      </div>
    )
  }
}
export default CharacterList;
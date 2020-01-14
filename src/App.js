import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {}
});

class App extends Component {
  state = {
    completed: 0
    
  }

  componentDidMount() {
    //생명주기상 생성 후 컴포넌트 로딩 후, 마지막 커밋 단계에서 실행이 됨.
    this.timer = setInterval(this._progress, 10); //progress 함수를 호출을 10밀리세컨트마다 하는 타이머 설정.
    //10밀리세컨에 1씩, 즉 1초당 0->100으로 원이 뱅글뱅글.. 원 속도 조절은 여기서 함.
    this._getMovie();
  }

  _getMovie = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  };
  
  _callApi = () => {
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  };

  _setMovie() {
    let index = 1;
    const movies = this.state.movies.map((movie, key) => {
      return (
        <Movie
          key={movie.id}
          index={index++}
          title={movie.title}
          poster={movie.medium_cover_image}
          rating={movie.rating}
          synopsis={movie.synopsis}
        
        />
      );
    });
    return movies;
  }

  _progress = () => {
    const { completed } = this.state; //상태값 받아옴
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }); //상태값을 확인하고 1씩 증가. 원 꽉차면 0으로..
  }; //진행 상태를 나타내는 서클 (로딩 구현 부)

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><h1>번호</h1></TableCell>
              <TableCell><h1>이미지</h1></TableCell>
              <TableCell><h1>이름</h1></TableCell>
              <TableCell><h1>평점</h1></TableCell>
              <TableCell><h1>시놉시스</h1></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.movies ? (
              this._setMovie()
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

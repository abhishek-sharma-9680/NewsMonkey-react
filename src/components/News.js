import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    category: 'general'
  }

  static propTypes = {
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title=`${this.props.category}-NewMonkey`
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=101186af5b2f4cb8b071bd30297c8ffa&page=1&pageSize=8`;
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  handlePrevClick = async () => {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=101186af5b2f4cb8b071bd30297c8ffa&page=${this.state.page - 1}&pageSize=8`;
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  handleNextClick = async () => {
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=101186af5b2f4cb8b071bd30297c8ffa&page=${this.state.page + 1}&pageSize=8`;
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  fetchMoreData=async()=>{
    this.setState({page:this.state.page+1})
     
    // this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=101186af5b2f4cb8b071bd30297c8ffa&page=${this.state.page + 1}&pageSize=8`;
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({
      articles:this.state.articles.concat(parseData.articles),
       page: this.state.page + 1,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  render() {
    return (
      <div className="container">
        <h2 className='text-center my-3'>NewsMonkey - Top {this.props.category} Headlines</h2>
       

        <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    // inverse={true} //
    hasMore={this.state.articles.length!==this.state.totalResults}
    loader={<Spinner/>}
   
  >
       <div className='container'>
        <div className='row'>
          {
             this.state.articles.map((elements) => {
              return (
                <div className="col-md-4" key={elements.url}>
                  <NewsItem title={elements.title} description={elements.description} imageUrl={elements.urlToImage} newsurl={elements.url} />
                </div>
              )
            })
          }
        </div>
         {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 8)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>  */}
      </div>
      </InfiniteScroll>
      </div>
    
    )
  }
}

export default News

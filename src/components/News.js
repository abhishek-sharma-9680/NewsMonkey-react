import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Function to fetch initial news
  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=101186af5b2f4cb8b071bd30297c8ffa&page=1&pageSize=8`;
    let data = await fetch(url);
    props.setProgress(40);
    let parseData = await data.json();
    props.setProgress(70);

    setArticles(parseData.articles || []);
    setTotalResults(parseData.totalResults || 0);
    setPage(1);
    setLoading(false);

    props.setProgress(100);
  };

  // Runs when category changes
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  // Function to fetch more news for InfiniteScroll
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=101186af5b2f4cb8b071bd30297c8ffa&page=${nextPage}&pageSize=8`;
    let data = await fetch(url);
    let parseData = await data.json();

    setArticles((prevArticles) => prevArticles.concat(parseData.articles || []));
    setTotalResults(parseData.totalResults || 0);
    setPage(nextPage);
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey - Top {props.category} Headlines
      </h2>

      {loading && <Spinner />} {/* Spinner for first load */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  category: "general",
};

News.propTypes = {
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;

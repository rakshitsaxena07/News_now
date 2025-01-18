import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "General",
  };

  constructor(props) {
    super(props);
    console.log("Constructor from news element");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      pageSize: 9,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  componentDidMount() {
    console.log("ComponentDidMount from news element");
    this.fetchNews(this.state.page);
  }

  fetchNews = async (page) => {
    console.log('API Key:', process.env.REACT_APP_API_KEY);

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${this.state.pageSize}`;

    try {
      this.setState({ loading: true });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({
        articles: data.articles,
        loading: false,
        totalResults: data.totalResults,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      const prevPage = this.state.page - 1;
      this.setState({ page: prevPage });
      this.fetchNews(prevPage);
    }
  };

  handleNextClick = async () => {
    const totalPages = Math.ceil(this.state.totalResults / this.state.pageSize);
    if (this.state.page < totalPages) {
      const nextPage = this.state.page + 1;
      this.setState({ page: nextPage });
      this.fetchNews(nextPage);
    }
  };

  render() {
    const totalPages = Math.ceil(this.state.totalResults / this.state.pageSize);

    // Apply styles based on dark mode state
    const containerStyle = {
      backgroundColor: this.props.darkMode ? "#042743" : "#fff",
      color: this.props.darkMode ? "#fff" : "#000",
    };

    return (
      <div className="container my-3" style={containerStyle}>
        <h1 className="text-center">Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage || "default-image.jpg"}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    darkMode={this.props.darkMode} // Passing darkMode prop here
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark my-4"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>

          <button
            disabled={this.state.page >= totalPages}
            type="button"
            className="btn btn-dark my-4"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

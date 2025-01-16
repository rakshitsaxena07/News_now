import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  constructor() {
    super();
    console.log("Constructor from news element");
    this.state = {
      article: [],
      loading: false,
      page: 1, // Initialize page state
      totalResults: 0, // Total number of articles
      pageSize: 9, // Articles per page
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount from news element");
    this.fetchNews(this.state.page); // Use the initial page state
  }

  fetchNews = async (page) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fae3e4053a6a45c89dc6a62d20895da8&page=${page}&pageSize=${this.state.pageSize}`;

    try {
      this.setState({ loading: true });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      this.setState({
        article: data.articles,
        loading: false,
        totalResults: data.totalResults, // Store the total number of articles
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  handlePreviousClick = async () => {
    console.log("Previous button clicked");

    if (this.state.page > 1) {
      const prevPage = this.state.page - 1;
      this.setState({ page: prevPage }); // Update page state
      this.fetchNews(prevPage); // Fetch news for the updated page
    }
  };

  handleNextClick = async () => {
    console.log("Next button clicked");

    const totalPages = Math.ceil(this.state.totalResults / this.state.pageSize); // Calculate total pages

    if (this.state.page < totalPages) {
      const nextPage = this.state.page + 1;
      this.setState({ page: nextPage }); // Update page state
      this.fetchNews(nextPage); // Fetch news for the updated page
    }
  };

  render() {
    console.log("Render from news element");
    const totalPages = Math.ceil(this.state.totalResults / this.state.pageSize); // Calculate total pages

    return (
      <div className="container my-3">
        <h1 className="text-center">Top Headlines</h1>

        <div className="row">
          {this.state.article.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage || "default-image.jpg"}
                  newsurl={element.url}
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

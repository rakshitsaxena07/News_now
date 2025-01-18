import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } = this.props;

    // Apply dark mode styles conditionally
    const cardStyle = {
      backgroundColor: this.props.darkMode ? '#333' : '#fff',
      color: this.props.darkMode ? '#fff' : '#000',
    };

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", ...cardStyle }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body" style={{ color: this.props.darkMode ? '#fff' : '#000' }}>
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className={this.props.darkMode ? "text-light" : "text-body-secondary"}>
                By {author ? author : "unknown"} on {date} 3 mins ago
              </small>
            </p>
            <a href={newsurl} target="blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;

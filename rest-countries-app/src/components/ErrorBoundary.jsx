import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-5">
          <h2>😿 Oops! Something went wrong.</h2>
          <p>
            Try refreshing the page or <a href="/">logging in again</a>.
          </p>
          <img
            src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
            alt="Error cat"
            style={{ maxWidth: "300px", marginTop: "20px" }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

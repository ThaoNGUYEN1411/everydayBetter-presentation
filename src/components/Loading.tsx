import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="loading_container">
      <div className="loading_spinner"></div>
      <p className="loading_text">Loading...</p>
    </div>
  );
};

export default Loading;

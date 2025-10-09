import React from 'react';

// Make sure to include the Bootstrap CSS in your project's entry point (e.g., index.html)
// for the styling of this component to work correctly.
// You can add this line to your public/index.html <head> section:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

/**
 * A "heavy" and visually appealing Call-to-Action component for a church website,
 * encouraging users to visit their dashboard.
 * It features a dark gradient background, a "glassmorphism" card effect, and compelling text.
 */
const DashboardCTA: React.FC = () => {
  const dashboardUrl = 'https://accfikolewebsite-dashboard.vercel.app/';

  // Styles for the main container with the gradient background
  const containerStyle: React.CSSProperties = {
    // background: 'linear-gradient(135deg, rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100))',
    padding: '6rem 0',
    color: '#fff',
    textAlign: 'center' 
  };

  // Styles for the "glass" card effect
  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1rem',
    padding: '3.5rem',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  };
  
  const buttonStyle: React.CSSProperties = {
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <div style={cardStyle}>
              <h1 className="display-4 fw-bold text-white mb-4">
                Step Into Our Community
              </h1>
              <p className="fs-4 col-md-10 mx-auto text-white-75 mb-5">
                Engage with our church family through chat, manage your giving, and explore a rich library of hymns. Stay connected with events, our media blog, the prayer wall, and so much more. Your spiritual journey and connection are just a click away.
              </p>
              <a
                href={dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-lg mt-3 px-5 py-3 fw-bold"
                role="button"
                style={buttonStyle}
              >
                Explore Your Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-short ms-2" viewBox="0 0 16 16" style={{ verticalAlign: 'text-bottom' }}>
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCTA;



import React from "react";
import { FaHandHoldingHeart, FaUniversity } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const DonationInfo: React.FC = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" data-aos="fade-down">
        Support the Ministry
      </h2>

      {/* Intro Section */}
      <div className="text-center mb-5" data-aos="fade-up">
        <p className="lead">
          “Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.” <br />
          <strong>– 2 Corinthians 9:7</strong>
        </p>
        <p>
          Your generous donations help us spread the gospel, support students in need, and fund fellowship activities.
        </p>
      </div>

      {/* Bank Info Card */}
      <div className="card mb-4 shadow-sm" data-aos="zoom-in">
        <div className="card-body">
          <h5 className="card-title">
            <FaUniversity className="me-2 text-primary" />
            Bank Transfer Details
          </h5>
          <ul className="list-unstyled mt-3">
            <li><strong>Bank Name:</strong> Momo psb</li>
            <li><strong>Account Name:</strong> Toluwani Adebule</li>
            <li><strong>Account Number:</strong> 7025953133</li>
            <li><strong>Reference:</strong> Your Name / Offering / Pledge</li>
          </ul>
        </div>
      </div>

      {/* Optional Pledge Form */}
      <div className="card shadow-sm" data-aos="zoom-in-up">
        <div className="card-body">
          <h5 className="card-title">
            <FaHandHoldingHeart className="me-2 text-success" />
            Make a Pledge / Leave a Message
          </h5>
          <form className="mt-3">
            <div className="mb-3">
              <label className="form-label">Your Name (Optional)</label>
              <input type="text" className="form-control" placeholder="Olusegun Ifeoluwa" />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount (₦)</label>
              <input type="number" className="form-control" placeholder="1000000" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message / Prayer / Pledge</label>
              <textarea className="form-control" rows={3} placeholder="I would like to support the building project..." />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Contact or Inquiry */}
      <div className="text-center mt-5" data-aos="fade-up">
        <p>
          <AiOutlineMail className="me-2" />
          Have questions? Reach us at:{" "}
          <a href="mailto:accfikolechapter001@gmail.com">accfikolechapter001@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default DonationInfo;

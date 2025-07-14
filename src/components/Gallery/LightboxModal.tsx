// src/components/Gallery/LightboxModal.tsx
import React, { useEffect } from "react";
import { Modal } from "bootstrap";

interface LightboxModalProps {
  image: string;
  onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  // initialise Bootstrap modal once component mounts
  useEffect(() => {
    const modalEl = document.getElementById("lightboxModal");
    const modal = new Modal(modalEl!);
    modal.show();

    const onHidden = () => onClose();
    modalEl!.addEventListener("hidden.bs.modal", onHidden);

    return () => {
      modalEl!.removeEventListener("hidden.bs.modal", onHidden);
      modal.hide();
    };
  }, [onClose]);

  // share handler (graceful fallback)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "ACCF Gallery", url: image });
      } catch {
        /* user cancelled or error */
      }
    } else {
      alert("Sharing isn’t supported on this browser.");
    }
  };

  return (
    <div
      className="modal fade"
      id="lightboxModal"
      tabIndex={-1}
      aria-labelledby="lightboxLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-dark border-0">
          <div className="modal-body p-0">
            <img
              src={image}
              alt="Large view"
              className="img-fluid w-100 rounded-top"
            />
          </div>
          <div className="modal-footer border-0 justify-content-center">
            <a
              href={image}
              download
              className="btn btn-outline-success me-2"
            >
              Download
            </a>
            <button
              className="btn btn-outline-info"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              type="button"
              className="btn btn-outline-light ms-2"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;

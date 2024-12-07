import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link


const Speaker = ({ speaker }) => {
  const { _id, Speakername, Speakeremail, position, Speakerimage } = speaker;

  return (
    // <div className="col-lg-3 col-md-6 p-2">
      <div className="speaker-box position-relative overflow-hidden text-white">
        <img className="speaker-image rounded w-100"  height={380} src={`/uploads/speakerImages/${Speakerimage}`} alt={`Image of ${Speakername}`} />
        <div className="box-content position-absolute bottom-0 z-1">
          <h6 className="speaker-title d-block text-white pb-1">
            <Link to={`/speakers/${_id}`}>{Speakername}</Link>
          </h6>
          <span className="speaker-post d-block pb-2">{Speakeremail}</span>
          <span className="speaker-post d-block pb-2">{position}</span>
          <ul className="social-link pb-2 ps-0">
            <li className="d-inline-block"><a href="#" className="rounded d-block me-1"><i className="fa fa-facebook"></i></a></li>
            <li className="d-inline-block"><a href="#" className="rounded d-block me-1"><i className="fa fa-twitter"></i></a></li>
            <li className="d-inline-block"><a href="#" className="rounded d-block me-1"><i className="fa fa-pinterest-p"></i></a></li>
          </ul>
        </div>
      </div>
    // </div>
  );
};

export default Speaker;

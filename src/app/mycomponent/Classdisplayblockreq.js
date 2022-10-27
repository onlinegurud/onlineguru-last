import { React } from 'react';
import './Classdisplayblock.css';
import axios from 'axios.js';

const Classdisplayblockreq = (props) => {
  const update_req = () => {
    props.update_req_pop();
  };

  return (
    <div className="outer-div">
      <img src="https://site.groupe-psa.com/content/uploads/sites/9/2016/12/white-background-2-768x450.jpg"></img>
      <div className="inner-div">
        <h2></h2>
        <h4></h4>
        <h4></h4>
      </div>
      <button id="class-req" style={{ background: 'white' }} onClick={update_req}>
        +
      </button>
    </div>
  );
};

export default Classdisplayblockreq;

import React from "react";
import PropType from "prop-types";

// import './Person.css'
// import styles from './Person.css'; //برای style دادنه modules

const Person = ({ fullname, deleted, changed }) => {
  return (
    <div className="card text-white bg-info mb=3 mt-3 w-25 mx-auto">
    {/* // <div className={styles.Person}> // برای modules است */}
      <div className="card-body text-center">
        <p className="d-block">{`${fullname}`}</p>
        <div className="input-group justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder={fullname}
            onChange={changed}
          />
          <div className="input-group-iprepend">
            <button className='btn btn-sm btn-danger fa fa-trash' onClick={deleted} />
          </div>
        </div>
      </div>
    </div>
  );
};

Person.propTypes = {
  fullname: PropType.string,
  deleted: PropType.func,   //func به معنی function هست
  changed: PropType.func,
}

export default Person;

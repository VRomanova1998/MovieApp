import React from 'react';
import './request-form.css';

interface Formprops {
  onChangeLabel: (value: string) => void;
  label: string;
}

const RequestForm = (props: Formprops) => {
  const changeRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeLabel(e.target.value);
  };
  return (
    <React.Fragment>
      <input
        className="input"
        type="search"
        value={props.label}
        placeholder="Type to search..."
        onChange={changeRequest}
      />
    </React.Fragment>
  );
};

export default RequestForm;

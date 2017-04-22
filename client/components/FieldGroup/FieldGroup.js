import React, { PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
};

export default FieldGroup;

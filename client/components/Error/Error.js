import React, { PropTypes } from 'react';

const NotAuthen = props => {
  console.log(props);
  return (
    <div>
        {props.params.httpCode === '401' && <h1>Chua dang nhap</h1>}
        {props.params.httpCode === '403' && <h1>Khong co quyen</h1>}
    </div>
    );
};

NotAuthen.propTypes = {
  params: PropTypes.object,
};

export default NotAuthen;

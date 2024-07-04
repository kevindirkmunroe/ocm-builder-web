import React from 'react';
const Checkbox = (props) => {
  return <label>
            <input
              type="checkbox"
              style={{
                margin: 8,
              }}
              checked={props.val}
              onChange={() => {props.setValue(!props.val)}}
            />
            {props.label}
          </label>
}

export default Checkbox;

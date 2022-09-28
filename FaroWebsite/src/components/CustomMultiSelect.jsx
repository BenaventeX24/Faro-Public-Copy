import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { style } from '../utils/data'

const CustomMultiSelect = ({ onChange, options, placeholder, name, value }) => {
  return (
    <Select
      defaultValue="no select"
      name={name}
      isMulti
      options={options}
      value={value}
      onChange={(item) => onChange(item)}
      placeholder={placeholder}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={style}
    />
  )
}

export default CustomMultiSelect

CustomMultiSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.array
}

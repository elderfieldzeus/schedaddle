import React from 'react'

interface SelectTimeProps {
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
}

const SelectTime: React.FC<SelectTimeProps> = ({handleChange, value}) => {
  return (
    <select onChange={handleChange} value={value}>
        <option value="7:00">7:00 AM</option>
        <option value="7:30">7:30 AM</option>
        <option value="8:00">8:00 AM</option>
        <option value="8:30">8:30 AM</option>
        <option value="9:00">9:00 AM</option>
        <option value="9:30">9:30 AM</option>
        <option value="10:00">10:00 AM</option>
        <option value="10:30">10:30 AM</option>
        <option value="11:00">11:00 AM</option>
        <option value="11:30">11:30 AM</option>
        <option value="12:00">12:00 PM</option>
        <option value="12:30">12:30 PM</option>
        <option value="13:00">1:00 PM</option>
        <option value="13:30">1:30 PM</option>
        <option value="14:00">2:00 PM</option>
        <option value="14:30">2:30 PM</option>
        <option value="15:00">3:00 PM</option>
        <option value="15:30">3:30 PM</option>
        <option value="16:00">4:00 PM</option>
        <option value="16:30">4:30 PM</option>
        <option value="17:00">5:00 PM</option>
        <option value="17:30">5:30 PM</option>
        <option value="18:00">6:00 PM</option>
        <option value="18:30">6:30 PM</option>
        <option value="19:00">7:00 PM</option>
        <option value="19:30">7:30 PM</option>
        <option value="20:00">8:00 PM</option>
        <option value="20:30">8:30 PM</option>
        <option value="21:00">9:00 PM</option>
    </select>
  )
}

export default SelectTime

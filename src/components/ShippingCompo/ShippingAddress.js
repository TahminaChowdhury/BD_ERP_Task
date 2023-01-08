import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Country } from 'country-state-city';

const ShippingAddress = ({
  countryName,
  divisionName,
  distrcitName,
  sub_districtName,
  unionName,
}) => {
  const [countries, setCountries] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sub_districts, setSub_districts] = useState([]);
  const [unions, setUnions] = useState([]);
  const [enable, setEnable] = useState(true);
  const [disEnable, setDisEnable] = useState(true);
  const [subDisEnable, setSubDisEnable] = useState(true);
  const [unionEnable, setUnionEnable] = useState(true);
  const [zipcodeEnable, setZipcodeEnable] = useState(true);
  const [villageEnable, setvillageEnable] = useState(true);

  // Show Info
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  // Country select
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // State or division select
  const handleDivision = (e) => {
    const countryId = e.target.value;
    if (countryId === 'BD' && countryId !== '') {
      axios
        .get(
          'https://country-state-city-server-production.up.railway.app/divisions'
        )
        .then((res) => setDivisions(res.data));
      setEnable(false);
    } else {
      setEnable(true);
    }
  };
  // District select
  const handleDistrict = (e) => {
    const id = e.target.value;
    if (id !== '') {
      axios
        .get(
          `https://country-state-city-server-production.up.railway.app/districts/${id}`
        )
        .then((res) => setDistricts(res.data));
      setEnable(false);
    } else {
      setEnable(true);
    }
  };

  // Sub district select
  const handleSubDistrict = (e) => {
    const id = e.target.value;
    if (id !== '') {
      axios
        .get(
          `https://country-state-city-server-production.up.railway.app/sub_districts/${id}`
        )
        .then((res) => setSub_districts(res.data));
      setEnable(false);
    } else {
      setEnable(true);
    }
  };

  // Union select
  const handleUnion = (e) => {
    const id = e.target.value;
    if (id !== '') {
      axios
        .get(
          `https://country-state-city-server-production.up.railway.app/unions/${id}`
        )
        .then((res) => setUnions(res.data));
      setEnable(false);
    } else {
      setEnable(true);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h5 style={{ marginBottom: '10px' }}>SHIPPING ADDRESS</h5>
        <h5
          onClick={() => handleShow()}
          style={{
            cursor: 'pointer',
            paddingLeft: '10px',
            color: 'blueviolet',
            textDecoration: 'underline',
          }}
        >
          <i class="fa-solid fa-arrow-down"></i> Copy Billing Address
        </h5>
      </div>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Attention
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter person/site name"
            style={{ padding: '5px' }}
          />
        </div>
        {/* Country */}
        <div className="form-group">
          <label className="form-label" htmlFor="country">
            Country
          </label>
          <select
            name="country"
            onChange={(e) => handleDivision(e)}
            style={{ padding: '5px' }}
          >
            <option value={show === true ? countryName : ''}>
              {show === true ? countryName : 'Please Select'}
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State or Division select*/}
        <div className="form-group">
          <label className="form-label" htmlFor="division">
            Division/Province/State
          </label>
          <select
            name="division"
            disabled={show === true ? !enable : enable}
            onChange={(e) => handleDistrict(e)}
            style={{ padding: '5px' }}
          >
            <option value={show === true ? divisionName : ''}>
              {show === true ? divisionName : 'Please Select'}
            </option>
            {divisions.map((division, index) => (
              <option key={index} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="form-group">
          <label className="form-label" htmlFor="district">
            District
          </label>
          <select
            name="district"
            disabled={show === true ? !disEnable : disEnable}
            onChange={(e) => handleSubDistrict(e)}
            style={{ padding: '5px' }}
          >
            <option value={show === true ? distrcitName : ''}>
              {show === true ? distrcitName : 'Please Select'}
            </option>
            {districts.map((district, index) => (
              <option key={index} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="form-group">
          <label className="form-label" htmlFor="sub-district">
            City/Sub-district/Thana
          </label>
          <select
            name="sub-district"
            disabled={show === true ? !subDisEnable : subDisEnable}
            onChange={(e) => handleUnion(e)}
            style={{ padding: '5px' }}
          >
            <option value={show === true ? sub_districtName : ''}>
              {show === true ? sub_districtName : 'Please Select'}
            </option>
            {sub_districts.map((sub_districts, index) => (
              <option key={index} value={sub_districts.id}>
                {sub_districts.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unions */}
        <div className="form-group">
          <label className="form-label" htmlFor="unions">
            Union/Area/Town
          </label>
          <select
            name="unions"
            disabled={show === true ? !unionEnable : unionEnable}
            style={{ padding: '5px' }}
          >
            <option value={show === true ? unionName : ''}>
              {show === true ? unionName : 'Please Select'}
            </option>
            {unions.map((unions, index) => (
              <option key={index} value={unions.id}>
                {unions.name}
              </option>
            ))}
          </select>
        </div>

        {/* zipcode */}
        <div className="form-group">
          <label className="form-label" htmlFor="zipcode">
            Zipcode
          </label>
          <select
            name="zipcode"
            disabled={zipcodeEnable}
            style={{ padding: '5px' }}
          >
            <option value="">Please Search</option>
          </select>
        </div>

        {/* Village */}
        <div className="form-group">
          <label className="form-label" htmlFor="village">
            Street Address/Village
          </label>
          <select
            name="village"
            disabled={villageEnable}
            style={{ padding: '5px' }}
          >
            <option value="">Please Search</option>
          </select>
        </div>

        {/* House */}
        <div className="form-group">
          <label className="form-label" htmlFor="house">
            House/Suite/Appartment no
          </label>
          <input type="text" name="house" style={{ padding: '5px' }} />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            style={{ padding: '5px' }}
          />
        </div>

        {/* Fax */}
        <div className="form-group">
          <label className="form-label" htmlFor="fax">
            Fax
          </label>
          <input type="number" name="fax" id="fax" style={{ padding: '5px' }} />
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;

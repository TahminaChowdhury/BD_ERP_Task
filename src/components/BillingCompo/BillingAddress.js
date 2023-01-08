import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './BillingAddress.css';
import { Country } from 'country-state-city';
import ShippingAddress from '../ShippingCompo/ShippingAddress';

const BillingAddress = () => {
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

  // store info
  const [countryName, setCountryname] = useState('');
  const [divisionName, setDivisionName] = useState('');
  const [distrcitName, setDistrcitName] = useState('');
  const [sub_districtName, setSub_districtName] = useState('');
  const [unionName, setUnionname] = useState('');

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // State or division select
  const handleDivision = (e) => {
    const [countryCode, name] = e.target.value.split(',');
    setCountryname(name);
    console.log(countryCode, name);
    if (countryCode === 'BD' && countryCode !== '') {
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

  const handleDistrict = (e) => {
    const [id, name] = e.target.value.split(',');
    setDivisionName(name);
    if (id !== '') {
      axios
        .get(
          `https://country-state-city-server-production.up.railway.app/districts/${id}`
        )
        .then((res) => setDistricts(res.data));
      setDisEnable(false);
    } else {
      setDisEnable(true);
    }
  };

  const handleSubDistrict = (e) => {
    const [id, name] = e.target.value.split(',');
    setDistrcitName(name);
    if (id !== '') {
      axios
        .get(
          `https://country-state-city-server-production.up.railway.app/sub_districts/${id}`
        )
        .then((res) => setSub_districts(res.data));
      setSubDisEnable(false);
    } else {
      setSubDisEnable(true);
    }
  };
  const handleUnion = (e) => {
    const [id, name] = e.target.value.split(',');
    setSub_districtName(name);
    if (id !== '') {
      axios
        .get(
          `https://country-state-city-server-production.up.railway.app/unions/${id}`
        )
        .then((res) => setUnions(res.data));
      setUnionEnable(false);
    } else {
      setUnionEnable(true);
    }
  };
  const handleUnionName = (e) => {
    const [id, name] = e.target.value.split(',');
    setUnionname(name);
  };
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ width: '100%', padding: '0px 50px' }}>
        <h5 style={{ marginBottom: '10px' }}>BILLING ADDRESS</h5>
        <form>
          {/* Country */}
          <div className="form-group">
            <label className="form-label" htmlFor="country">
              Country
            </label>
            <select name="country" onChange={(e) => handleDivision(e)}>
              <option value="">Please Search</option>
              {countries.map((country, index) => (
                <option
                  key={index}
                  value={`${country.isoCode}, ${country.name}`}
                >
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
              disabled={enable}
              onChange={(e) => handleDistrict(e)}
            >
              <option value="">Please Search</option>
              {divisions.map((division, index) => (
                <option key={index} value={`${division.id}, ${division.name}`}>
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
              disabled={disEnable}
              onChange={(e) => handleSubDistrict(e)}
            >
              <option value="">Please Search</option>
              {districts.map((district, index) => (
                <option key={index} value={`${district.id}, ${district.name}`}>
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
              disabled={subDisEnable}
              onChange={(e) => handleUnion(e)}
            >
              <option value="">Please Search</option>
              {sub_districts.map((sub_districts, index) => (
                <option
                  key={index}
                  value={`${sub_districts.id}, ${sub_districts.name}`}
                >
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
              disabled={unionEnable}
              onClick={(e) => handleUnionName(e)}
            >
              <option value="">Please Search</option>
              {unions.map((unions, index) => (
                <option key={index} value={`${unions.id}, ${unions.name}`}>
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
            <select name="zipcode" disabled={zipcodeEnable}>
              <option value="">Please Search</option>
            </select>
          </div>

          {/* Village */}
          <div className="form-group">
            <label className="form-label" htmlFor="village">
              Street Address/Village
            </label>
            <select name="village" disabled={villageEnable}>
              <option value="">Please Search</option>
            </select>
          </div>

          {/* House */}
          <div className="form-group">
            <label className="form-label" htmlFor="house">
              House/Suite/Appartment no
            </label>
            <input type="text" name="house" />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input type="number" name="phone" id="phone" />
          </div>

          {/* Fax */}
          <div className="form-group">
            <label className="form-label" htmlFor="fax">
              Fax
            </label>
            <input type="number" name="fax" id="fax" />
          </div>
        </form>
      </div>

      <div style={{ width: '100%', padding: '0px 50px' }}>
        <ShippingAddress
          countryName={countryName}
          divisionName={divisionName}
          distrcitName={distrcitName}
          sub_districtName={sub_districtName}
          unionName={unionName}
        />
      </div>
    </div>
  );
};

export default BillingAddress;

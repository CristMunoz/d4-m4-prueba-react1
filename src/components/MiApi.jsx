import React from 'react'
import { useState, useEffect } from 'react';
import ModalDetalleMonedas from './ModalDetalleMonedas';
import { Spinner } from 'react-bootstrap';

const MiApi = () => {
  // Estado para los datos
  const [dataCoins, setDataCoins] = useState([]);
  const [coinDetail, setCoinDetail] = useState(null);
  
  // Función que hace el llamado a la API
  useEffect(() => {
    getDataCoins();
  }, []);

  const getDataCoins = () => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then((response) => response.json())
    .then(data => {
      // console.log(data)
      setDataCoins(data)
    })
    .catch((err) => console.log(err));
  };

  // Estado para el modal
  const [openModal, setOpenModal] = useState(false);

  // Estado para el input de búsqueda
  const [formData, setFormData] = useState({search: "",});
  const {search} = formData;

  // Función para que el input reciba el nombre de la moneda
  const handleOnChange = (e) => {
    console.log(e);
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  // Funciones para que al momento de dar click a la fila, muestre el modal con la información de la moneda
  const handleDetails = (data) => {
    console.log(data)
    setCoinDetail(data);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Función para buscar el tipo de moneda en el input
  console.log(search);
  const getSearch = (search) => {
    const dataResult = dataCoins.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    console.log(dataResult);
    if(dataResult.length > 0) {
      setDataCoins(dataResult);
    } else {
      getDataCoins();
    }
  };
    
  return (
    <div>
      <ModalDetalleMonedas 
      openModal={openModal} 
      handleOpenModal={handleOpenModal} 
      coinDetail={coinDetail}
      />
      <div className="p-1">
        <h1 className="fs-1 my-2 fw-bold text-center">Cryptocoins Market</h1>
        <div className="clearfix my-4">
          <input 
            className="form-control-lg"
            name="search"
            value={search}
            placeholder="Search cryptocoin"
            size="lg"
            onChange={handleOnChange}       
            />

          <button 
            type="submit" 
            className="btn btn-secondary btn-md float-center m-1" 
            onClick={() => getSearch(search)}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="27" 
              height="27" 
              fill="currentColor" 
              className="bi bi-search" 
              viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>

          <button 
            type="button" 
            className="btn btn-secondary btn-md float-center m-1" 
            onClick={() => getDataCoins()}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="27" 
              height="27" 
              fill="currentColor" 
              className="bi bi-arrow-clockwise" 
              viewBox="0 0 16 16">
              <path 
              fillRule="evenodd" 
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path 
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
              />
            </svg>
          </button>
        </div>         
      </div>
      {dataCoins && dataCoins.length > 0 ? (
      <table className="table text-white table-color">
        <thead>
          <tr className="fw-bold">
            <th>#</th>
            <th>Coins</th>
            <th>Price</th>
            <th>Low 24h</th>
            <th>High 24h</th>
          </tr>
        </thead>
        <tbody >
          {dataCoins && dataCoins.map((data, index) => (
            <tr className="fw-light table-row" key={data.id} onClick={() => handleDetails(data)}>
              <td>{index + 1}</td>
              <td>
                <img src={data.image} alt={data.name} style={{width:"1.5em"}} className="m-1"/>
                {data.name}
                <b className="text-uppercase fw-bold m-2">{data.symbol}</b>
              </td>
              <td>$ {data.current_price.toLocaleString()}</td>
              <td className="text-danger fw-bold">$ {data.low_24h.toLocaleString()}</td>
              <td className="text-success fw-bold">$ {data.high_24h.toLocaleString()}</td>
            </tr>
          ))}        
        </tbody>
      </table>
       ) : (
        <div className="p-5 my-5 text-center">
          <Spinner animation="border" variant="primary"/>
        </div>
      )}
    </div>   
  );
};

export default MiApi
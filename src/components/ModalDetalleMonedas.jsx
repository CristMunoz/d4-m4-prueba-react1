import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalDetalleMonedas = ({openModal, handleOpenModal, coinDetail}) => {
  console.log(coinDetail);
  const tableCoinModal = (
    <table className="table table-striped text-white">
      <thead>
        <tr>
          <th>
            <img src={coinDetail?.image} alt={coinDetail?.name} style={{width:"3em"}} className="mx-2"/>
            <h2>{coinDetail?.name}</h2>
          </th>
          <th className="text-end">
            <h2>$ {coinDetail?.current_price.toLocaleString()}</h2>
          </th>
        </tr>
        <tr>
          <th>
            <h6>24h High/Low</h6>
          </th>
          <th className="text-white text-end">
              <h6>
                <span className="text-success">$ {coinDetail?.high_24h.toLocaleString()}</span> / <span className="text-danger">$ {coinDetail?.low_24h.toLocaleString()}</span>
              </h6>
          </th>
        </tr>
        <tr>
          <th>
            <h6>Price Change 24h</h6>
          </th>
          <th className="text-white text-end">
            <h6>$ {coinDetail?.price_change_24h.toLocaleString()}</h6>
          </th>
        </tr>
        <tr>
          <th>
            <h6>Price Change 24h (%)</h6>
          </th>
          <th className="text-white text-end">
            <h6>{coinDetail?.price_change_percentage_24h.toLocaleString()} %</h6>
          </th>
        </tr>
        <tr>
          <th>
            <h6>Ath Change Percentage</h6>
          </th>
          <th className="text-white text-end">
            <h6>{coinDetail?.ath.toLocaleString()} %</h6>
          </th>
        </tr>
        <tr>
          <th>
            <h6>Total Supply</h6>
          </th>
          <th className="text-white text-end">
            <h6>$ {coinDetail?.total_supply.toLocaleString()}</h6>
          </th>
        </tr>
        <tr>
          <th>
            <h6>Total Volume</h6>
          </th>
          <th className="text-white text-end">
            <h6>$ {coinDetail?.total_volume.toLocaleString()}</h6>
          </th>
        </tr>
      </thead>
    </table>
  );

  return (
    <Modal
      show={openModal}
      onHide={handleOpenModal}
      backdrop="static"
      keyboard={false}>
      <Modal.Header style={{backgroundColor:"#282c34", color:"white", border:"none"}}/>
      <Modal.Body style={{backgroundColor:"#282c34", color:"white", border:"none"}}>
        {tableCoinModal}
      </Modal.Body>
      <Modal.Footer style={{backgroundColor:"#282c34", color:"white", border:"none"}}>
        <Button variant="secondary" onClick={handleOpenModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDetalleMonedas



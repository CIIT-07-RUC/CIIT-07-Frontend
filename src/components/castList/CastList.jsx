import './index.scss';

import { useContext } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Login } from '../login/Login';
import { ThemeContext } from '../../index';
import Table from 'react-bootstrap/Table';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function CastList(props) {
  const navigate = useNavigate();

  const redirectToCastPage = (id) =>{
    navigate(`/cast/${id}`, {replace:true});
    window.location.reload();
  }
  console.log("props.props.tableData", props.tableData)

	return (
    <>
    <Container className='cast-list__component bg-light'>
    <h4 className='text-center mb-4'>{props.title}</h4>
    <Table striped="columns">
      <thead>
        <tr>
          {
            (props.tableHeads).map((el, key) => (
              <>
                <th>{el}</th>
              </>
            ))
          }
       
        </tr>
      </thead>
      <tbody>
      {
        (props.tableData).map((el, key) => (

          <tr style={{ cursor: 'pointer '}}  onClick={() => redirectToCastPage(el.item1)}>
            <td>{el.item1} </td>
            <td>{el.item2}</td>
            <td>{el.item3}</td>
            <td>{el.item4}</td>
          </tr>

        ))
      }
        
      </tbody>
    </Table>
    </Container>
     
    </>
	);
}

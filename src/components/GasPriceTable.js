import React from 'react';
import { Table } from 'reactstrap';

const GasPriceTable = (props) => {
  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Xăng RON 95-III</td>
          <td>14.970</td>
          <td>0%</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Xăng ES RON 92-II</td>
          <td>14.400</td>
          <td>0.01%</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Dầu DO 0,05S-II</td>
          <td>12.390</td>
          <td>0.02%</td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Dầu KO</td>
          <td>10.270</td>
          <td>0.02%</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default GasPriceTable;
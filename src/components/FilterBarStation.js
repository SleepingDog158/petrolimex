import React, { Component } from "react";
import { UncontrolledCollapse, Button} from 'reactstrap';

export const FilterbarStation = () => {
  return (
    <div>
         <Button color="primary" id="toggler" style={{ marginBottom: '1rem',  marginLeft:"30px", marginTop:"0px"}}>
      Bộ lọc
    </Button>
    <UncontrolledCollapse toggler="#toggler">
    <table striped className="mb-3 ml-3">
        <tr>
          <td className="p-1">
            Mặt hàng:
            <input
              type="select"
              className="form-control"
              style={{ width: "300px" }}
            />
          </td>
          <td className="p-1">
            Công ty:
            <input
              type="text"
              className="form-control"
              style={{ width: "300px" }}
            />
          </td>
          <td className="p-1">
            Từ ngày:
            <input type="date" className="form-control" />
          </td>

          <td className="p-1">
            Đến ngày:
            <input type="date" className="form-control" />
          </td>
        </tr>
      </table>
    </UncontrolledCollapse>
      
    </div>
  );
};

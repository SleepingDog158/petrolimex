import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    const { data } =await Axios.post("http://localhost:6060/getDrivers/", {
      clientId: 1,
    });
    if (data) {
      setDrivers(data.drivers);
    }
  };

  const onCheckDriver = (driverId, contractId) => {
    setDrivers(
      drivers.map((driver) => {
        if (driver.driverId === driverId) {
          let driverTemp = {
            ...driver,
            contractId: contractId,
          };
          return driverTemp;
        } else {
          return driver;
        }
      })
    );
  };

  const onDeleteDriver = (driverId, contractId) => {
    setDrivers(
      drivers.map((driver) => {
        if (driver.driverId === driverId) {
          let driverTemp = {
            ...driver,
            contractId: null,
          };
          return driverTemp;
        } else {
          return driver;
        }
      })
    );
  };

  const onUpdate = () => {
    toast.info("Thay đổi thành công", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
    });

    // post
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return {
    drivers,
    onCheckDriver,
    onDeleteDriver,
    onUpdate,
    setDrivers,
  };
}

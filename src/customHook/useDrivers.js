import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    const { data } = await Axios.get(
      "https://1ne1c.sse.codesandbox.io/drivers"
    );
    if (data) {
      setDrivers(data);
    }
  };

  const onCheckDriver = (driverId, contractId) => {
    setDrivers(
      drivers.map((driver) => {
        if (driver.id === driverId) {
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
        if (driver.id === driverId) {
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

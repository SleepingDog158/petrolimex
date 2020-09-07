import React, { useEffect, useMemo, useState, Component } from 'react'
import axios from "axios"
import ModalEdit from "./ModalExample"

export const StationList = () => {
    useEffect(async() => {
        const result = await axios.get("https://4x5nd.sse.codesandbox.io/stations");
        console.log(result.data);
        setStations(result.data);
    }, []);

    return (
        <div></div>
    )
}

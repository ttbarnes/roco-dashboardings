import React, { useState } from "react";
import Table from "./Table";

const SearchBox = ({ handleOnChange }) => {
  return (
    <>
      <input type='text' placeholder='Player name' onChange={(ev) => handleOnChange(ev.target.value)} />
    </>
  );
};

const DashboardContent = ({ players }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <h1>Roco dashboardings</h1>

      <p><small>Don't play with these people on your team.</small></p>

      <SearchBox handleOnChange={setSearch} />

      <Table
        players={players}
        filterByName={search}
      />
    </>
  );
};


export default DashboardContent;

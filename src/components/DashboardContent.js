import React, { useState } from "react";
import Table from "./Table";

const sortAlphabetically = (arr) =>
  arr.sort((a, b) => a.node.frontmatter.name.localeCompare(b.node.frontmatter.name));

const SearchBox = ({ handleOnChange }) => {
  return (
    <>
      <input type='text' placeholder='Player name' onChange={(ev) => handleOnChange(ev.target.value)} />
    </>
  );
};

const DashboardContent = ({ players }) => {
  const [searchString, setSearch] = useState('');

  const filteredData = players.filter((p) => {
    const player = p.node.frontmatter;

    if (player.name.toLowerCase().includes(searchString.toLocaleLowerCase())) {
      return player;
    }

    return null;
  });

  const sortedData = sortAlphabetically(filteredData);

  return (
    <>
      <h1>Roco dashboardings</h1>

      <p><small>Don't play with these people on your team.</small></p>

      <SearchBox handleOnChange={setSearch} />

      <Table
        players={sortedData}
        nameFilter={searchString}
      />
    </>
  );
};


export default DashboardContent;

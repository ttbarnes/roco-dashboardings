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

  const totalRunInDie = players.filter((p) => p.node.frontmatter.runsInGetsKilled).length;
  const totalAfk = players.filter((p) => p.node.frontmatter.isAFK).length;
  const totalToxic = players.filter((p) => p.node.frontmatter.isToxic).length;

  const totalLowDamage = players.filter((p) => p.node.frontmatter.comments.includes(' damage')).length;


  const getNumbersFromString = (str) => {
    var num = str.replace(/[^0-9]/g, '');
    return parseInt(num, 10);
  };

  const totalZeroDamage = players.filter((p) => {

    let damageString;
    if (p.node.frontmatter.comments.includes(' 0 damage')) {
      return p;
    }

    return null;
  }).length;

  const totalDamage199orLess = players.filter((p) => {
    const comments = p.node.frontmatter.comments;

    let damageString;
    if (comments.includes(' damage') && !comments.includes(' 0 damage')) {
      damageString = comments.substring(comments.indexOf('damage') - 4, comments.indexOf('damage') + 4);

      const damageNumber = getNumbersFromString(damageString);

      if (damageNumber < 200) {
        return p;
      }
    }

    return null;
  }).length;

  const totalDamage200to499 = players.filter((p) => {
    const comments = p.node.frontmatter.comments;

    let damageString;
    if (comments.includes(' damage') && !comments.includes(' 0 damage')) {
      damageString = comments.substring(comments.indexOf('damage') - 4, comments.indexOf('damage') + 4);

      const damageNumber = getNumbersFromString(damageString);

      if (damageNumber > 199 && damageNumber < 500) {
        return p;
      }
    }

    return null;
  }).length;

  const totalDamage500to1000 = players.filter((p) => {
    const comments = p.node.frontmatter.comments;

    let damageString;
    if (comments.includes(' damage') && !comments.includes(' 0 damage')) {
      damageString = comments.substring(comments.indexOf('damage') - 4, comments.indexOf('damage') + 4);

      const damageNumber = getNumbersFromString(damageString);

      if (damageNumber > 499 && damageNumber < 1000) {
        return p;
      }
    }

    return null;
  }).length;

  const totalZeroRevivesOrQuickResAsMedic = players.filter((p) => {
    const comments = p.node.frontmatter.comments.toLowerCase();

    if (comments.includes('0 revive') || comments.includes('quick rev')) {
      return p;
    }

    return null;
  }).length;

  const totalAwful = players.filter((p) => {
    const comments = p.node.frontmatter.comments.toLowerCase();

    if (comments.includes('awful')) {
      return p;
    }

    return null;
  }).length;

  return (
    <>
      <h1>Roco dashboardings</h1>

      <p><small>Don't play with these people on your team.</small></p>

      <SearchBox handleOnChange={setSearch} />

      <Table
        players={sortedData}
        searchString={searchString}
      />

      <br />
      <h2>Totals</h2>

      <ul style={{ marginLeft: 0, paddingLeft: '1em' }}>
        <li style={{ marginBottom: '.5em' }}>Run in and die: {totalRunInDie}</li>
        <li style={{ marginBottom: '.5em' }}>AFK: {totalAfk}</li>
        <li style={{ marginBottom: '.5em' }}>Toxic: {totalToxic}</li>
        <li style={{ marginBottom: '.5em' }}>No revives or quick hands as Saint or Dahlia: {totalZeroRevivesOrQuickResAsMedic}</li>
        <li style={{ marginBottom: '.5em' }}>Marked as awful: {totalAwful}</li>
      </ul>

      <h3>Low damage</h3>

      <ul style={{ marginLeft: 0, paddingLeft: '1em' }}>
        <li style={{ marginBottom: '.5em' }}>Total recorded: {totalLowDamage}</li>

        <li style={{ marginBottom: '.5em' }}>
          <p>Breakdown:</p>

          <ul style={{ marginLeft: 0, paddingLeft: '1em' }}>
            <li style={{ marginBottom: '.5em' }}>Zero damage: {totalZeroDamage}</li>
            <li style={{ marginBottom: '.5em' }}>0-199 damage: {totalDamage199orLess}</li>

            <li style={{ marginBottom: '.5em' }}>200-499 damage: {totalDamage200to499}</li>
            <li style={{ marginBottom: '.5em' }}>501-1000 damage: {totalDamage500to1000}</li>
          </ul>
        </li>
      </ul>

      <br />
      <p><small>Disclaimer: some of these stats do not account for every recorded instance - some are missing.</small></p>
    </>
  );
};


export default DashboardContent;

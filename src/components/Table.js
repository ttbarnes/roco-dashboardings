import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const sortAlphabetically = (arr) => 
  arr.sort((a, b) => a.node.frontmatter.name.localeCompare(b.node.frontmatter.name));

const PlayersTable = ({ players, filterByName }) => {
  if (!players) {
    return null;
  }

  const freshPlayers = [ ...players ];

  const totalPlayers = freshPlayers.length;

  const nameFilter = filterByName.toLowerCase();

  const filteredData = freshPlayers.filter((p) => {
    const player = p.node.frontmatter;

    if (player.name.toLowerCase().includes(nameFilter)) {
      return player;
    }

    return null;
  });

  const sortedData = sortAlphabetically(filteredData);

  return (
    <>
      {sortedData.length ? (
        <>
          {nameFilter ? (
            <p className='warning-text'><small> Found {sortedData.length} out of {totalPlayers}</small></p>
          ) : (
            <p><small>Showing {totalPlayers} players</small></p>
          )}
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Comments</Th>
                <Th>AFK</Th>
                <Th>Runs in gets killed</Th>
                <Th>Toxic</Th>
              </Tr>
            </Thead>

            <Tbody>
              {sortedData.map((player) => (
                <Tr key={player.node.frontmatter.name}>
                  <Td><strong>{player.node.frontmatter.name}</strong></Td>

                  <Td>{player.node.frontmatter.comments ? player.node.frontmatter.comments : '-'}</Td>

                  <Td>{player.node.frontmatter.isAFK ? '✅ Yes' : '-'}</Td>

                  <Td>{player.node.frontmatter.runsInGetsKilled ? '✅ Yes' : '-'}</Td>

                  <Td>{player.node.frontmatter.isToxic ? '✅ Yes' : '-'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ): ( 
        <p><small>No players found.</small></p>
      )}
    </>
  )
}

export default PlayersTable;

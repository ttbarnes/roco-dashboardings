import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const PlayersTable = ({ players, searchString }) => {
  if (!players) {
    return null;
  }

  const totalPlayers = players.length;

  return (
    <>
      {players.length ? (
        <>
          {searchString ? (
            <p className='warning-text'><small> Found {players.length} out of {totalPlayers}</small></p>
          ) : (
            <p><small>Showing {totalPlayers} players</small></p>
          )}
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Comments</Th>
                <Th>AFK</Th>
                <Th>Run in die</Th>
                <Th>Toxic</Th>
              </Tr>
            </Thead>

            <Tbody>
              {players.map((player) => (
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

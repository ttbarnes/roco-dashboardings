import React from "react";

const Table = ({ players, filterByName }) => {
  if (!players) {
    return null;
  }

  const totalPlayers = players.length;

  const nameFilter = filterByName.toLowerCase();

  const filteredData = players.filter((p) => {
    const player = p.node.frontmatter;

    if (player.name.toLowerCase().includes(nameFilter)) {
      return player;
    }

    return null;
  });

  return (
    <>
      {filteredData.length ? (
        <>
          {nameFilter ? (
            <p className='warning-text'><small> Found {players.length} out of {totalPlayers}</small></p>
          ) : (
            <p><small>Showing {totalPlayers} players</small></p>
          )}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Comments</th>
                <th>AFK</th>
                <th>Runs in gets killed</th>
                <th>Toxic</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((player) => (
                <tr key={player.node.frontmatter.name}>
                  <td>{player.node.frontmatter.name}</td>

                  <td>{player.node.frontmatter.comments ? player.node.frontmatter.comments : '-'}</td>

                  <td>{player.node.frontmatter.isAFK ? '✅ Yes' : '-'}</td>

                  <td>{player.node.frontmatter.runsInGetsKilled ? '✅ Yes' : '-'}</td>

                  <td>{player.node.frontmatter.isToxic ? '✅ Yes' : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ): ( 
        <p><small>No players found.</small></p>
      )}
    </>
  )
}

export default Table;

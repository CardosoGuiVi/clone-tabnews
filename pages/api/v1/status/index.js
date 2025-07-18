import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const { rows: resultVersion } = await database.query("SHOW SERVER_VERSION;");
  const { rows: resultMaxConnections } = await database.query(
    "SHOW MAX_CONNECTIONS;",
  );
  const { rows: resultActiveConnections } = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE datname='local_db' AND state='active';",
  );

  response.status(200).json({
    updated_at: updatedAt,
    database: {
      version: parseInt(resultVersion[0].server_version),
      max_connections: parseInt(resultMaxConnections[0].max_connections),
      active_connections: parseInt(resultActiveConnections[0].count),
    },
  });
}

export default status;

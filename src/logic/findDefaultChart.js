export function findDefaultChart ({ configFile, selectedFields }) {
  if (!configFile || selectedFields.includes(undefined)) {
    return null
  }
  const [,, chart, description] = (configFile ?? [])
    .find(([fieldx, fieldy]) =>
      JSON.stringify([fieldx, fieldy]) === JSON.stringify(selectedFields) ||
       JSON.stringify([fieldy, fieldx]) === JSON.stringify(selectedFields))
  return { chart, description }
}

const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1230401557908946944/5AyFJUUee0o26hH1Qf1KB5k4mpaUrTYUDUv-clWIvPRn_E3omKDZlnODNPFh_ZDjC69I");
  request.setRequestHeader('Content-type', 'application/json');

  const involvedDriverID = getUserIDFromFullName(incidentDetails.involved_driver, userData);
  const otherDriversIDs = incidentDetails.other_drivers.split(',').map(driver => getUserIDFromFullName(driver.trim(), userData));

  const params = {
      username: "PSGIL Steward Bot V1.0",
      avatar_url: "",
      content: `New incident added:\n
          Category: ${incidentDetails.category}\n
          League/Race: ${incidentDetails.league_race}\n
          Created Driver: ${incidentDetails.created_driver}\n
          Involved Driver: <@${involvedDriverID}>\n
          Other Drivers: ${otherDriversIDs.map(id => `<@${id}>`).join(', ')}\n
          Session Type: ${incidentDetails.session_type}\n
          Lap: ${incidentDetails.lap}\n
          Evidence: ${incidentDetails.evidence}\n
          Evidence2: ${incidentDetails.evidence2}\n
          Description: ${incidentDetails.description}`
  };

  request.send(JSON.stringify(params));
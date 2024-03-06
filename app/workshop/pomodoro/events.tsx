"use client"

import Script from "next/script";
import {useLayoutEffect, useState} from "react";
import {Button} from "@mui/material";

type EventType = {
  summary: string,
  creator: { email: string }
};

export default function Events({apiKey, clientId}: {apiKey: string, clientId: string}) {
  const CLIENT_ID = clientId;
  const API_KEY = apiKey;

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  let tokenClient: any;
  let gapiInited = false;
  let gisInited = false;

  const [authLabel, setAuthLabel] = useState("Authorize");

  function handleOnApiLoad() {
    // @ts-ignore
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    // @ts-ignore
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }
  function handleOnGsiLoad() {
    tokenClient = initTokenClient();
    gisInited = true;
    maybeEnableButtons();
  }

  function handleAuthClick() {
    if (!tokenClient) tokenClient = initTokenClient();
    tokenClient.callback = async (resp: any) => {
      console.log('handleAuthClick response', resp)
      if (resp.error !== undefined) {
        throw (resp);
      }
      document.getElementById('signout_button')!.style.visibility = 'visible';
      setAuthLabel("Refresh");
      await listUpcomingEvents();
    };

    // @ts-ignore
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    // @ts-ignore
    const token = gapi.client.getToken();
    if (token !== null) {
      // @ts-ignore
      google.accounts.oauth2.revoke(token.access_token);
      // @ts-ignore
      gapi.client.setToken('');
      setAuthLabel("Authorize");
      document.getElementById('signout_button')!.style.visibility = 'hidden';
    }
  }
  function initTokenClient() {
    // @ts-ignore
    return google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
    });
  }
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('signout_button')!.style.visibility = 'hidden';
    }
  }
  async function listUpcomingEvents(): Promise<any> {
    let response;
    let responseAS;
    const now = new Date();
    try {
      const request = {
        'calendarId': 'maciejolsz@gmail.com',
        'timeMin': (now).toISOString(),
        'timeMax': (new Date(now.getTime() + 14*24*60*60*1000)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      const requestAS = {
        'calendarId': 'maciej.olszewski@amsterdamstandard.com',
        'timeMin': (now).toISOString(),
        'timeMax': (new Date(now.getTime() + 14*24*60*60*1000)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      // @ts-ignore
      response = await gapi.client.calendar.events.list(request);
      // @ts-ignore
      responseAS = await gapi.client.calendar.events.list(requestAS);
    } catch (err) {
      if (err instanceof Error) document.getElementById('err')!.innerText = err.message;
      return;
    }
    const events = response.result.items
      .concat(responseAS.result.items)

    if (!events || events.length == 0) return;

    // Flatten to string to display
    // OUTPUT
    // todo: do something bruv
    return events;
  }

  useLayoutEffect(() => {
    document.getElementById('signout_button')!.style.visibility = 'hidden';
  }, []);

  return <>
    <Button id="authorize_button" onClick={handleAuthClick}>{authLabel}</Button>
    <Button id="signout_button" onClick={handleSignoutClick}>Sign Out</Button>
    {/* todo: move this buttons to tasks/pomodoro */}
    <pre id="err"></pre>
    <Script src={"https://apis.google.com/js/api.js"} defer={true} async={true} onLoad={handleOnApiLoad}/>
    <Script src={"https://accounts.google.com/gsi/client"} defer={true} async={true} onLoad={handleOnGsiLoad}/>
  </>;
}

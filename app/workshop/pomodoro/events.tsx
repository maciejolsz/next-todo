"use client"

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

import {Button} from "@mui/material";

import {GoogleCalEventType} from "@/app/lib/types";

export default function Events({apiKey, clientId}: {apiKey: string, clientId: string}) {
  const [authLabel, setAuthLabel] = useState("Authorize to load events");
  const [fetchedEvents, setFetchedEvents] = useState([]);

  let tokenClient: any;
  const CLIENT_ID = clientId;
  const API_KEY = apiKey;
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

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
  }

  function handleOnGsiLoad() {
    tokenClient = initTokenClient();
  }

  function handleAuthClick() {
    if (!tokenClient) tokenClient = initTokenClient();
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
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

  function initTokenClient() {
    // @ts-ignore
    return google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
    });
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
        'maxResults': 1,
        'orderBy': 'startTime',
      };
      const requestAS = {
        'calendarId': 'maciej.olszewski@amsterdamstandard.com',
        'timeMin': (now).toISOString(),
        'timeMax': (new Date(now.getTime() + 14*24*60*60*1000)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 1,
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
    setFetchedEvents(events);
  }

  return <>
    <Button id="authorize_button" fullWidth onClick={handleAuthClick}>{authLabel}</Button>

    <div>
      { fetchedEvents &&
        fetchedEvents.map((event: GoogleCalEventType) => {
          const date = new Date(event.start.dateTime as string);
          return <Link href={event.hangoutLink} key={event.id}>
            <div className={`calendar-event-single border-orange-rgb text-orange-rgb hover:bg-orange-rgb hover:text-white-rgb`}>
              {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}<br />
              {event.summary}<br />
            </div>
          </Link>
        })
      }
    </div>

    {/* some err note */}
    <pre id="err"></pre>
    <Script src={"https://apis.google.com/js/api.js"} defer={true} async={true} onLoad={handleOnApiLoad}/>
    <Script src={"https://accounts.google.com/gsi/client"} defer={true} async={true} onLoad={handleOnGsiLoad}/>
  </>;
}

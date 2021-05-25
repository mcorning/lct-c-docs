# LCT-Policies

LCT architecture decisions are based on clear Privacy and personal data control policies.

## Privacy Notice

All information necessary to enable Local Contact Tracing (LCT) is stored on local devices under the control of the device owner/data generator. Data generators are data controllers, as well. Information necessary to enable local contact tracing includes:

* Publicly recognizable names of places (Public Places or Rooms) where people gather
* Nickname, avatar, or even real ID of visitors to those public places
* Each Visitor records the Public Places and dates visited on a calendar component in the LCT app.

Data used by LCT is always less than fourteen days old. LCT client app automatically deletes data on the client older than fourteen days. LCT server deletes virus exposure graph nodes older than fourteen days.

## Data Collection

Each time a visitor enters a public space, they log the calendar event to the exposure graph using a Web Socket message sent to the LCT server. The LCT server uses a REST API to communicate with the RedisGraph client component running on the LCT server.

If a visitor subsequently tests positive, the visitor uses the LCT client to warn the LCT server of possible virus exposure. The LCT server pings the RedisGraph for any userIds of visitors who shared the same space at the same time with the visitor who sent the warning.

The server sends a message to all visitors with possible exposure that they should get tested. The alert contains no specifics about the incident. The only extra information in the alert is the reason for the warning. These reasons include:

```js
      WarningOptions: [
        {
          icon: 'mdi-alert',
          text: 'I tested positive for COVID-19',
        },
        {
          icon: 'mdi-account-group',
          text: 'I was near a COVID carrier',
        },
        {
          icon: 'mdi-medical-bag',
          text: 'I present COVID symptoms',
        },
        {
          icon: 'mdi-account-alert',
          text: 'LCT warned me of exposure',
        },
      ],

```

## Data Categories

The LCT client app has two major Javascript data structures, Visit and Place. The LCT server uses several structures to monitor pending exposure alerts. The server calls on RedisGraph which is a directed acyclic graph or a [property graph](https://github.com/opencypher/openCypher/blob/master/docs/property-graph-model.adoc).

Visitors can revisit the same place, so the first thing visitors track in the Map component is the place itself. Each visited place is an entity in the Place collection. The Visitor adds places over time. Deleting a visit has no effect on the Place collection. This means that if all the visits get deleted, the Recent Visits list will remember those past visits. This is especially useful for Gatherings (where they is no public name to the place) such as hiking or bike trips.

On the Calendar, each visit to a place is unique in time. Each visit to the same place is different in time but not in space. Each visit points to a single record in the Place collection, so visits do not have to store any spatial data.

On the Graph, each visit represents an edge (with temporal data) between two nodes: the visitor and the place. Each visit by the same visitor to the same place adds an arc to the graph. This way the graph can determine which visitors shared the same space at the same time.

### Place Collection

The Place collection receives a record each time:

1) the visitor selects a new place on the map
2) then chooses to mark the visit on their calendar

::: warning
If the visitor merely clicks the map alone, no place is added to the collection until they use the place to mark their calendar.
:::

Each place in the collection consists in these properties:

```js
  static fields() {
    return {
      // From Map component (for the graph component (calendar uses only name))
      // we are using googlemaps property names to eliminate naming errors
      name: this.string(''), // POI or "Gathering" name
      formatted_address: this.string(''), // Street address (if available)
      place_id: this.string(''), // Unique ID of space or place
      plus_code: this.string(''), // Global address string
      lat: this.number(), // Latitude of visited space/place
      lng: this.number(), // Longitude of visited space/place
    };
  }
```

As visitors use LCT, they are building a personal map they can use and reuse (even when the map is *not available online*).

The Place collection is unchanged if a visitor *revisits* the same place. When marking the calendar a new visit uses an old place_id.

::: tip Note
There is no personally identifying information stored in the Place collection. One can only imply the association of a place with a person because the data is on a personal device (the device owner may not be the person who added the Place to the collection).
:::

Past visits appear on the Map component two ways:

* As unique entries in the list behind the `Recent Visits` button
* As `markers` on the map (if the map is online)

::: warning
The only way to delete a marker is to delete from the calendar *all* visits to that place.
:::

Markers on the Map component indicate the location of a visit. On Google maps, markers consist in the following data:

::: tip Note
LCT uses vue2-google-maps component. This component includes a marker component. The marker component has a markers array property. If you add an element to that array, the component creates the marker. LCT does not issue a call directly to the googlemaps marker API.
:::

### Visit Collection

Visits on the Calendar component indicate the temporal value that complements the location of the visit. 

The LCT client stores the following data in Web Storage on the visitor's device:

```js
export default class Visit extends Model {
  static entity = 'visits';

  static fields() {
    return {
      id: this.attr(null), // Unique generated value

      // From Map component markers' tag object (for the graph component (calendar uses only name))
      name: this.string(''), // POI or "Gathering"
      placeId: this.string(''), // Unique ID of space or place

      // From Calendar component
      marked: this.string(''), // DateTime Visit made it to the calendar
      color: this.string('secondary'), // New event: Secondary. Logged event: Primary
      start: this.number(''), // Epoch milliseconds of Visit start
      end: this.number(''), // Epoch milliseconds of Visit end
      date: this.string(''), // Date string of start to event values
      interval: this.string(''), // String composed of start and end timestamps
      timed: this.boolean(true), // True means Visit isn't all day
      category: this.string('You'), // used for COVID-safe appointments

      // From the graph component
      loggedNodeId: this.string(''), // ID of the graph node for this Visit
      graphName: this.string(''), // graphname may be 'Sand box' for users' playground
    };
  }
```

### The Virus Exposure Graph

The exposure graph needs minimal data for the exposure alert protocol:

```js
  [
    {
      "nodes": [
        {
          "identity": 2, // used by graph algorithm to identify exposed visitors
          "properties": {
            "name": "weeFox",
            "userID": "74fad7d39d1fadf8"  // used for exposure alerts
          },
          "labels": [
            "visitor"
          ]
        },
        {
          "identity": 1, // used by graph algorithm to identify exposed visitors
          "properties": {
            "name": "Fika Sisters Coffeehouse" 
          },
          "labels": [
            "space"
          ]
        }
      ],
      "edges": [
        {
          "identity": 1,
          "properties": {
            "start": 1621018800000,  // used by graph algorithm to identify exposed visitors
            "end": 1621022400000,
            "date": "Fri May 14 2021",
            "interval": "12:00 PM - 1:00 PM"
          },
          "type": "visited",
          "start": 2, // used by graph algorithm to identify exposed visitors
          "end": 1 // used by graph algorithm to identify exposed visitors
        }
      ]
    }
  ],

```

::: warning
Most of the data in the exposure graph is not needed for the alerting protocol. The current version of LCT stores the data only to aid in debugging. Once the graph traversal algorithm is judged reliable, we will no longer store the developer-friendly data in the graph
:::

## Data Sharing

LCT involuntary data sharing in the following ways:

### Personal Devices

Minimizes *details* in stored data 
No personal identifying data is stored anywhere
Maximizes the data stored on devices under the physical control of the visitor

### LCT Server and Virus Exposure Graph

Further minimizes stored data *shared* with the LCT server and exposure graph 
Obfuscates the data used to connect a visitor's device with the server during exposure alerts

LCT uses web sockets, so most of the data risk comes from there.

::: tip
See [WebSockets Security: Main Attacks and Risks](https://www.vaadata.com/blog/websockets-security-attacks-risks/) for a detailed analysis of Web Socket vulnerability
:::

Future versions of LCT may incorporate additional security controls noted in the analysis above.


## Data Security and Retention

LCT is designed to eliminate barriers to participation. 

Each visitor using LCT holds all of their visit data on their personal device using Web storage (localStorage for simple strings like nicknames, and IndexedDB for complex data like visits and appointments).

LCT processes information just sufficient to give all parties maximum situation awareness regarding the prevalence of COVID in their community. Visitors can delete data on their local device whenever they want. The only caveat is that absent data, they may not see some virus exposure alerts.

COVID-19 exposure data has a limited lifetime. Currently, LCT deletes exposure graph nodes older than 14 days. That is, the server alerts visitors using messages sent to the graph in the last fourteen days.

## Complaints

Since LCT is based on messages, LCT can use the same technology to provide support to users and a venue to complain about the network. Only parties in the network can see these complaints.

LCT Admins are responsible for handling complaints. LCT has a *Feedback* page from the More Menu (upper right corner of app). You one or more of the communications options to complain to LCT Admins.

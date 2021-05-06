# The Map Component

LCT binds space and time to identify possible exposures to COVID-19. The Map is the first component in LCT because the visitor must have a space before they can have a time of possible exposure. Visitors use the Map component directly or indirectly.

## The Nature of LCT Visits

Each Visit is a point in space-time. The data that constitutes a Visit has three sources:

* A currently selected point on the map (captured by a Marker and stored in localStorage as MarkerData)
* An entry in the Recent Visits lists (see below)
* An entry in the Visits entity (stored in the browser's IndexedDB database)

## Direct Map Interaction

Visitors interact directly with the map by clicking the map at:

* a labeled Place
* a marker
* a blank space

## Indirect Map Interaction

Visitor interact with the map indirectly by:

* entering the name of a place
* selecting a named place from the Recent Visits list

## Recent Visits

The set of recent visits comes from the IndexedDB Visit entity. This means its data is from fully formed Visits (visits that made it to the calendar component, at least). If the visitor deletes a calendar entry, the Recent Visits list loses an entry.

> This version of LCT uses googleMaps. Future versions of LCT will support alternative mapping platforms beginning with OpenStreetMaps.

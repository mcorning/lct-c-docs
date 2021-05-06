# Map Component Technical Details

This section describes how data flows from the Map to the Calendar and from the Calendar to the Map. We describe the usual sequence of events.

Our goal here is to trace the way location latitude and longitude (along with some kind of descriptive natural language name) get from the map component, to the calendar (that adds time to the Visit), to the graph (whose algorithm can identify other Visits sharing the same space-time values).

## The Visit Definition

The Visit object contains the history of the Visit. Data comes from all three major components (viz., Map, Calendar, and Graph).

```js
{
      id: this.attr(null),              // Unique generated value
      
      // From Map component (for the graph component (calendar uses only name))
      name: this.string(''),            // POI or "Gathering"
      placeId: this.string(''),         // Unique ID of space or place
      lat: this.number(),               // Latitude of Visit space/place
      lng: this.number(),               // Longitude of Visit space/place

      // From Calendar component
      marked: this.string(''),          // DateTime Visit made it to the calendar
      color: this.string('secondary'),  // New event: Secondary. Logged event: Primary 
      start: this.number(''),           // Epoch milliseconds of Visit start
      end: this.number(''),             // Epoch milliseconds of Visit end
      interval: this.string(''),        // Date string of start to event values
      timed: this.boolean(true),        // True means Visit isn't all day

      // From the graph component
      logged: this.string(''),          // ID of the graph node for this Visit

    }

```

## The Marker Definition

The Marker comes from the Map component. It serves two purposes. First, it stores all the data for each visitor interaction with the map. Markers are cached in localStorage and get set when the map reopens. The second use of a Marker is to share a subset of its data with the calendar (viz., name, lat, lng). These values get copied to the Visit object that the Calendar component effects.

```js
    {
        // for tooltips and visible marker labels
        title: title,                               // "Place" or "Gathering"
        label: { text: label, color: 'white' },     // label is assigned a value before
        
        // to cache place data for logging
        // displayed in map and sent to Calendar
        name,                   // POI name or name given by Visitor
        placeId,                // For known places, a unique identifier
        position,               // Latitude and Longitude of space or place
        // displayed in map
        address,                // Address or Plus_Code of public space

        map: this.map,          // Used by mapping platform to show markers
    }

```

## Coming to Terms

Mapping platforms all share the same generic set of terms. LCT incorporates these variables into its design.

### Icons

Icons have colors and images. This blog post provides a list that googleMaps implements:

<https://www.blog.google/products/maps/google-maps-gets-new-look/>


### Points of Interest

A POI is related to the icons in the mapping platform. LCT will use POI data for Visits, as appropriate.

### Markers

Visitors add Markers to their map. Markers convert a POI into a destination, the space in the space-time identity of a Visit.


## Map to Calendar

The first thing a visitor does is select a point on the map. Since LCT starts with no visits, the map has icons but no markers. The visitor is most likely to select a public place either by name or by selecting a building on the map.

Our goal is to capture the `currentPlace` variable (passed to the calendar5 component) wtih the following data:

* Name
* Address
* Position
* PlaceId

Let's convert a POI into a Visit.

### Steps

The map component has a click event handler that does the following with the optional `placeId` and the `location` data taken from the map:

1. Sets the `center` coordinates of the map to the `location` of the selected place
2. Since we clicked a category marker we dereference the mapping platform with the `placeId` to get Place details
3. We use the Place details to render an InfoWindow on the map
4. From the InfoWindow we can
   * delete the marker or
   * mark our calendar or
   * use the close button to dismiss the dialog

## Autocomplete

Since we expect LCT to center on a small community or large organization, how do we pick the political or administrative center on the map if the mapping platform does not provide a category marker?

We use the autocomplete field to specify the objective. For instance, typing "Sisters City Hall" will return its address and will place a marker on the map.
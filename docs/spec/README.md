# Local Contact Tracing Architecture

LCT consists in three main components across a PWA client, a Node server, and a RedisGraph server.

## LCT Client

The client PWA has two main components:

* Map (currently implemented with vue2-googgle-maps)
* Calendar (implemented in Vuetify)

## Vuex/Vuex-ORM/localForage

LCT uses Vuex as a central store of Visit data. We wrap Vuex inside vuex-orm, and we augment Vuex-ORM with vuex-orm-localForage so we can store Visit data with indexedDB on the client (with a database name taken from the URL in the browser).

The Map uses Visit data to produce a list of Recent Visits.

When a visitor adds a marker to the Map, the place data is transformed to a selectedSpace prop sent to the Calendar.

When the Calendar renders, the selectedSpace is transformed into a Visit instance in IndexedDb on the client.

This new visit updates the visits field in the Calendar, and the Calendar renders all visits with their appropriate color (indicating whether the visit has made it to the exposure graph on the server).

NOTE: If you want to understand how Vuex and Vuex-ORM work, see https://vuejsfeed.com/blog/vuex-object-relational-mapping-example-application

# Calendar Overview

## Routine Visits

Mouse clicks on the Map component bring up a dialog that includes the "Mark your calendar" option. This optien adds a visit to the Calendar component. These are routine visits. You log the visit to the server when you enter the public space.

## Appointments

Appointments are special visits. Some public places require an appointment to enter the space. The public space keeps a list of open slots in the public calendar. For visitors making appointments, LCT displays their personal calendar and the public calendar side by side. Visitors take open slots by clicking on the public calendar.

Public places that require an appointment have their own Room on the LCT server provided by Socket.io (the technology that manages messages from visitors).

This kind of public place uses a special form on the LCT app to specify open lots on the public calendar. Saving these open slots to local storage also saves them on the server as a Map object owned by the public place.

When a visitor selects a public place with a public calendar on the LCT Map component, the server returns the current list of openings from the data for the public place stored in the Room object on the server.

| Public Place                        | Server                              | Visitor                                           |
| ------------------------------------|:-----------------------------------:| -------------------------------------------------:|
| 1) Onboard with a Public Calendar   | 2) Room added with default openings |                                                   |
| 3) Edit Public Calendar             | 4) Store openings in Room           | 5) Select a public place with a public calendar   |
|                                     |                                     | 6) Select an opening                              |
|                                     |                                     | 7) Private calendar event matches the opening     |
|                                     |  8) Alert public place of choice    |                                                   |
| 9) Confirm the appointment          | 10) Alert Visitor                   |                                                   |
|                                     | 11) Remove opening from Room        |                                                   |

Here's a typical business scenario:

### A Safe Haircut in the Age of COVID

Tony has a barbershop. Nico works with Tony on the second chair. Nico tells Tony about LCT, so Tony takes a stab at it.

Tony starts LCT, clicks the `Set Me Up` button, enters his (nick)name. Since Tony runs a public business, he decides to use his given name.  Thinking about how long he stays in one place away from the shop, Tony leaves the one hour average stay value unchanged. By default, when he adds a non-work event to his calendar, they will be one hour each.

After logging in the first time, LCT sends Tony to the Spaces component. Since Tony's "Outlaw Barbershop" does not appear as Point of Interest on the Google map, Tony enters the shop name in the search box.

The search returns Tony's establishment, adds a marker to the map, and brings up the action dialog in the center of his screen.

This dialog gives Tony three options:

1) Delete the marker from the map
2) Go to work
3) Mark his calendar with a non-work event

Tony chooses the `"At Work"` button. This gives Tony another configuration dialog.

Oregon law requires appointments for barbershops, so Tony switches on the Appointments button. When he does he sees two more configuration options. The default for how long haircuts is thirty minutes, so he leaves the text field unchanged. Tony enters his name and his second chair, Nico, to the list of service providers.

The Oultaw Barber Shop happens to open and close at 8AM and 5PM respectively, so he leaves the time pickers alone.

After Tony clicks the `Absolutely` button, Tony sees his split-screen calendar. LCT assumes that the open and close times also define his shift in the shop. This eight hour calendar event is on the left side of the calendar.

Since Tony switched on `Appointments` and entered appointment times, LCT populates the right side of his calendar with two openings every thirty minutes. Tony can change these default events at will. For example, he can remove slots for his lunch break. When Tony is satisfied, he logs the appointments to the LCT server. The server stores the values in a virtual Room with Tony's name on it.

### Making an Appointment to Cut Your Hair Without Contracting the Virus

One of Tony's old customers, Michael, uses LCT, as well. Michael's hair is getting more out of control than the pandemic, so he clicks on the Outlaw Barbrshop marker. Unlike Tony, Michael selects the `Mark My Calendar` button on the map dialog. Like Tony, Michael sees a split-screen calendar. Like Tony, the left side includes all his visits to public places that day. And like Tony, the right side of the calendar lists those very same events that Tony stored on the server. Michael picks a mid-morning opening. The left side entry text changes from "Opening..." to "Michael..." and a new calendar event shows up on his personal calender in the same time slot. When Michael marks his calendar, LCT sends a message to the server to noting the mid-morning opening Michael chose. 

An alert shows up on Tony's LCT app, and he confirms the opening is still available. The server then deletes the opening from Tony's virtual Room on the server and sends a confirmation alert to Michael.

If somebody else wants to get a haircut at the same time, they will only see one event in the thirty minute time slot. If they choose it, Nico will take the gig.
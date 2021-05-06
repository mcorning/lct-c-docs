# Introducing Local Contact Tracing

A Covid-19 Early Warning System for small communities and large organizations.

## Why do we need LCT?

Each of us can directly help end the pandemic by going about our daily business armed with LCT.

LCT accomplishes this goal by focusing users into areas where *the odds of interacting with each other are highest*.

## How does LCT end the pandemic?

If exposed to the virus, people who use LCT will get tested as soon as possible. 
As necessary, self-quarantine happens in parallel across the community in real time.
So, the virus (and its variants) can enter an LCT community, but the odds of leaving are vanishingly small.

### What's the difference?

LCT uses time to fight the virus. That is, LCT deprives the virus of time to spread and replicate. 
And if LCT communities replicate around the world like the virus, the virus doesn't have a chance.

### Test and Trace

Conventional wisdom starts contact tracing after someone tests positive for the virus. This is the "test and trace" strategy. 
There are at least two major problems with test and trace:

First, people must have a reason to get tested before contact tracing even starts.
Second, infected people may not be in a state of mind to remember all the dates, times, and places they have been for two weeks.
In other words, Test and Trace is time-consuming, inefficient, and error-prone.

::: tip Note
 LCT complements all other mitigation strategies. For example, a bi-product of LCT is a list of places the user has visited in the last fourteen days. Human contact tracers can use this data to do their part.
:::

### Trace and Test

When fighting a pandemic, order matters: LCT uses a Trace and Test strategy. 
Using LCT, citizens log their daily activity on a simple calendar using a simple map to identify specific locations accurately.

If someone shows symptoms (or for any other reason gets tested), they simply push a button, and LCT will alert anybody else who shared space simultaneously with the infected person.

Now, with LCT, people have a reason to get tested right away.

If they test positive, they, too, press a button and let other people know they, too, are at risk and should get tested.

On the other hand, if you test negative, go about your business as usual...until you can't.

::: tip Note
Since the virus is so widespread already, it has had millions (soon billions) of chances to mutate. This means that even vaccinated people are not safe from the virus permanently.
 But this does not reduce the power of LCT to fight back. Whatever virus enters an LCT community has little chance of surviving the stay.
:::

## Call to Action

To Save the Day:

1. Pick a place (mark your map)
2. Pick a time (mark your calendar)
3. Enter the place at that time (log your visit to the server)

If you become infected:

1. Push the Warning button
2. Quarantine
3. Get better
4. Do it all again

## Essential LCT

LCT has two design principles:

* protect your privacy
* be simple as possible (and no simpler)

This section has two parts. First, we outline how data flows through LCT to keep communities safe from the viurs. Next, we summarize the three steps and two user interfaces visitors use to meet this goal.

### Workflow

Here is the simplest scenario for communities at risk:

* Two strangers log visits in LCT to the same space at the same time
* One visitor later tests positive
* That visitor uses LCT to send an exposure warning to the server
* The server alerts the other stranger who shared that same space and time
* The exposed visitor get tested right away

This COVID early warning system works better as more people use LCT. That is, when more visits are logged on the LCT server graph, more exposed visitors can get tested. Those who test positive send their own exposure warning to the community. This minimizes the opporturnities for the virus to mutate and spread.

With LCT on guard, the virus (even those more dangerous COVID-19 variants) simply has no where to go.

### User Interface

LCT works because it links space and time to individuals going about their business. Visits start with a (public) `space` so the first user interface is a *map*. Visitors can specify a place by clicking the map or by entering the name of the place in a text field.

The second step is to specify a `time interval` for the visit. Visitors use a *calendar* interface to manage the time span for the visit.

The third step is to send this space-time data to a server. Visitors select a calendar event and use the `Tab` key or the `graph button` at the bottom of the calendar to log the visit on the server.

Should a visitor test positive, they use the `Warning` button on LCT to send a message to the server of all the places visited in the last two weeks. The server stores this data in a graph, and it uses a graph algorithm to alert other contemporaneous visitors of possible exposure to the virus.

## VuePress

We used Vuepress to build this LCT documentation. Since LCT is designed to be replicated (at least as fast as the virus), use this information to bring your own LCT online as soon as possible.

VuePress is composed of two parts: a [minimalistic static site generator](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core) with a Vue-powered [theming system](https://v1.vuepress.vuejs.org/theme/) and [Plugin API](https://v1.vuepress.vuejs.org/plugin/), and a [default theme](https://v1.vuepress.vuejs.org/theme/default-theme-config.html) optimized for writing technical documentation. It was created to support the documentation needs of Vue's own sub projects.

Each page generated by VuePress has its own pre-rendered static HTML, providing great loading performance and is SEO-friendly. Once the page is loaded, however, Vue takes over the static content and turns it into a full Single-Page Application (SPA). Additional pages are fetched on demand as the user navigates around the site.

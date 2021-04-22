# Local Contact Tracing Admin

LCT works best when its users have a high probability of interacting. This is why LCT is called Local. For this reason, in the best case, each community or large organization should adminsiter their own LCT instance.

The variables in the LCT architecture require configuration and administration:

* Map
* Graph

We will use the example from the first installation of LCT in the US: Sisters, OR.

## Safe in Sisters

The idea for LCT came from residents of a small town in Central Oregon at the foothills of the Cascade mountains who wanted to reopen their tourist economy without reopening the pandemic.

Sisters residents access the LCT web site for Sisters. This site sets the center of the LCT map to Sisters City Hall.

As residents log their visits (both in town and in the surrounding country), a specific RedisGraph database builds the exposure graph for these residents only. If, perhaps by travelling to nearby Bend, OR (far more dangerous that little Sisters) they get exposed and test positive for the virus, they send an warning of possible exposure to the exposure graph. A graph algorithm then alerts any other person who shared the same space of possible exposure recommending testing.

> The constraint is not where you live, it's where you congregate. So if a Bend resident worked in Sisters, they would use the Sisters instance of LCT because the odds of infection in Sisters is greater than Bend because, say 90% of the Bend resident interacts with people in Sisters.

## University of Manchester

The second instance of LCT was set up on the main campus of University of Manchester in Manchester England by a group of students cooperating with the developer in Sisters. The Univesity as ten times as many students on campus as there are residents in the entire town of Sisters. And Manchester is perhaps 100 times the size of the University.

So what makes something local?

Again, the driving criterion is odds of interaction. At the University, there are two basic groups of people who would be considered local. Students in the same classroom at the same time is the first group. The second group that makes the first group more local are students of the same academic discipline.

So, for example, LCT was developed and used by computer science students and teachers. Local was the set of classrooms used by computer science teachers. The map for LCT-UOM centers on the campus. The students configured their own RedisGraph database to store all the visits to computer science classrooms. If epidemiological data shows lower precedence of COVID among computer science students (including those students who do *not* use LCT themselves), then LCT can help lower incidence in the rest of the student body, *one academic discipline at a time*.

## Why LCT, then?

LCT is designed to minimize the time between:

    * original exposure
    * testing and 
    * treatment. 

Which means:

* early treatment is more likely to be successfull and
* community spread (especially with asymptomic carriers) is minimal.

Which produces safer communities and large organizations.


# LCT Configuration

There are two levels of configuration in LCT. Administrators only have to worry about the big global variables. Developers have a few low-level config files to manage. 

Global LCT configuration parameters are held in ENVIRONMENT variables.

These variable values are stored as secrets in the deployment infrastructure. For example, Heroku lets you store secrets securely inside their build environment. Github, too, has a more complicated way of storing sensitive data (with the advantage of store once use everywhere).

> NOTE: Github will flag your repository is it senses that you have inadvertently stored API keys in source code. Be sure your keys are not pushed to your LCT repository

## Developer Configuration files

config file | useage
--------------- | --------------------
srv/config.js | graphname for Production or for Development

## Admin Configuration files

config file | useage
--------------- | --------------------
src/maps/mapsconfig.json | lat/lng of community

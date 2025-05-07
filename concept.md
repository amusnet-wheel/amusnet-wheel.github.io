# Architecture and Tooling
- page.js, lit-html
- ES6
- TypeScript -OR- JSDoc
- Configuration storage is globally accessible
- Screens work independently and modally (as state machine)
- Results pool is adjusted when prize inventory runs out
# Screens
## Intro screen
- static graphics and copy
## Wheel with rules and button
- receive list of prizes
- generate wheel elements
- setup interaction
## Wheel spin
- pull result from pool
- calculate speed and position for stop animation
- animate wheel and stop animation
## Prize popup
- receive prize
- create popup and animate it
- setup interaction
- if claimed, remove prize from inventory
- adjust result pool
## Quiz popup
- pull question from pool
- create popup and animate it
- setup interaction
- animate correct and incorrect results
## Configuration
- storage methods
- input elements for prizes and their count, name of the event and other variables
- setup interaction
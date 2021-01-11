# Transport for London Status Updater
## Built in React for the 21st century

As part of my learning of API hunting, and building web apps in React, I present to the world my React App for Londoners, who want to know if their underground train is running.

### Now at version 0.5.0, safe and secure

One downfall of React is the inability to be able to hide your credentials when logging into APIs. I got around this by employing a tiny Raspberry Pi computer in a secret location, which does the API leg work, and uploads it for this web app to use. This keeps the ID and Key secure.

#### What else is coming?

I'd like to add the following:

- A notification when there is a change in status of a line, either audio, or a popup, or both.
- I think I am still not meeting TFL standards when there is more than two alerts on one line. Sadly, it's not easy to test until that happens live.

If you find any bugs in this software, or would like to see more features displayed, please email me at development@newsworthyvision.com

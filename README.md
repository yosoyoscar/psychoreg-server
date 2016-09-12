# psychoreg

Coursera's Full Stack Web Development Capstone Project - Server & Web app

A simple app that will help parents and psychologists to register children's behavior. To properly diagnose some children disorders, psychologists usually need a register of a child behaviour on a particular topic over a period of time. Traditionally, parents register that information using pen and paper, so they often can't register the behavior in the moment it happens (less and less people carry around pen and paper nowadays). This leads to incomplete and inaccurate data, frustration among parents and a maybe­not­optimal diagnosis in the end.

Benefits to psychologists:

 - Better diagnosis based on better information.
 - Register information available everywhere.
 - Build recognition among parents and stand out from other psychologists.

Benefits to parents:

 - Mobile app to register their children behaviour, both parents may register the information using their own mobile device, no more need to share a sheet of paper, or merging the information at the end of the day.
 - Quickly register their children's behavior on­demand with just a couple of taps.

Tested on Bluemix

Useful commands:
 npm install
 npm start
 lb-ng server/server.js lb-services.js

Test users:
 {username:'psycho1', password:'1234'}
 {username:'psycho2', password:'1234'}

Known bugs:
 Deleting a child doesn't delete his/her behaviours

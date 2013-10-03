#[Talking House](http://talkinghouse.herokuapp.com/new)

![Plan outline](images/color-mockup.jpg)

A [web application](http://talkinghouse.herokuapp.com/new)for projecting video-captured facial features onto a house, streamed from a performer computer to a projector computer over webRTC.

For example, I'll be trying to project it on a house in this pattern:

![Plan outline](outline.jpg)

Consists of three node applications:  Performer, Projector, and Server.

You should `npm install` in the root directory as well as the `projector` and `performer` directories.  From there, a simple `npm start` should get the program running for you on port 8084.  Visit `localhost:8084/new` to generate a unique room link, for streaming a single performance to a specific (or even multiple) projectors.
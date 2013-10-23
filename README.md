#[Talking House](http://talkinghouse.herokuapp.com/new)

![Plan outline](images/color-mockup.jpg)

A [web application](http://talkinghouse.herokuapp.com/new)for projecting video-captured facial features onto a house, streamed from a performer computer to a projector computer over webRTC.

Right now the web applications (performer and projector windows) look like this:
![Screenshot](images/screenshot1.jpg)

For example, I'll be trying to project it on a house in this pattern:

![Plan outline](outline.jpg)

Consists of three node applications:  Performer, Projector, and Server.

You should `npm install` in the root directory as well as the `projector` and `performer` directories.  From there, a simple `npm start` should get the program running for you on port 8084.  Visit `localhost:8084/new` to generate a unique room link, for streaming a single performance to a specific (or even multiple) projectors.

If you want to customize the regions to grab and display, edit `/lib/defaults.js`.

##Advanced Configuration

Sometimes that customization won't be enough.  For example, sometimes you want multiple projectors, each displaying a different region of the source footage.  For this purpose, I've added a couple advanced features right into the heart of the Projector.

###window.selection

The `window.selection` object is a global array that contains the current projector's settings.  You can access these by going into your browser's Javascript console.  Most browsers today have these in some capacity, for example Chrome has one you can access by holding `command-option-J` on a mac, or `control-alt-J` on a PC.

The window.selection object by default is a list of the three selection objects.  Each selection object follows this form:
    {
      source: [  //Where this selection is cut from
        x,
        y,
        width,
        height
      ],
      destination: [  //Where this selection is placed
        fractionInX,
        fractionInY,
        scaleRatio
      ] 
    }

###Saving your selection

Once you've edited your window.selection objects, you may want to save this configuration for later use.  Currently you can save your current window.selection by calling the global function `window.updateQueryString()`.  This function will take the current selection object, and encode it into the URL query string, reloading the page, and giving you a link you can save for later that will preserve the current selection.

For example, if the performer generated the ID `gomc0M`, and the program were being run on the default port (8084), these links would create projector views for each of the three default slices:

####Right Window/Left Eye:
`http://localhost:8084/projector?id=gomc0M&selection=%5B%7B%22source%22%3A%5B330%2C125%2C120%2C90%5D%2C%22destination%22%3A%5B0%2C0%2C1%5D%7D%5D`

###Mouth:
`http://localhost:8084/projector?id=gomc0M&selection=%5B%7B%22source%22%3A%5B275%2C260%2C100%2C130%5D%2C%22destination%22%3A%5B0%2C0%2C1%5D%7D%5D`

###Left Window/Right Eye:
http://localhost:8084/projector?id=gomc0M&selection=%5B%7B%22source%22%3A%5B200%2C125%2C120%2C90%5D%2C%22destination%22%3A%5B0%2C0%2C1%5D%7D%5D
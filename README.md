#Talking House
![Plan outline](outline.jpg)
A web application for projecting video-captured facial features onto a house, streamed from a performer computer to a projector computer over webRTC.

Currently running unencrypted connections, because it's just for my private network.  If you want to use this over the internet, you should convert all the connections in `index.js` to use `https`.
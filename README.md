# Project 2: Beatsync

![beatsync logo on a black loading screen with slogan "have your say" underneath](/public/images/app-screenshots/loading-screen-real.png)

## The Idea

The app is designed to give the user an idea of the venue before they go. I have been to many events where I was disappointed with certain aspects which made the event less fun overall. If I knew about them before I got there I could better prepare or not go at all!

[Test it out!][app]

[app]: https://projectbeatsync.netlify.app/

## Accessing the code

To check out my code you can go to my [Github repo][git]

[git]: https://github.com/joemarney/unit-2-project-beatsync

## Brief

- Public Trello Board
  - User Stories
  - Wireframe Designs
  - ERD
  - Stretch Goals
- Node/Express/MongoDB application with full CRUD.
- Utilises EJS Templates for rendering.
- Session-based authentication.
- Organised Directory Structure.
- At least one data entity in addition to the User model.
- Authorisation implemented into the application.
- Online deployment.

### Timeframe

We had a week to complete the project. Working independently.

## Technologies Used

- Trello
- Figma
- Node JS
- Express JS
- JavaScript
- HTML
- CSS
- Google Fonts
- VS Code
- GitHub
- Chrome Dev Tools
- ChatGPT
- dbDiagram.io
- MongoDB
- Cloudinary
- Netlify

## Planning

I created my wire frame design on Figma with my stretch goals in mind. Below are some screenshots of how I originally wanted the app to take shape.  
![wire frame design of loading screen with beatsync logo in a red font centred on a black screen with the slogan below in white "have your say"](/public/images/wireframe-design/loading-screen.png)
![wire frame design of the profile page of the beatsync app showing a following section and an upcoming events section](/public/images/wireframe-design/profile-page.png)

### Trello Board

You can check out my [Trello board][trello]. This includes my ERD, Routing table and stretch goals.

[trello]: https://trello.com/b/7YQQwM53/unit-2-project-beatsync

## Coding Process

```javascript
app.get("/", (req, res) => {
  return res.render("index.ejs");
});
app.get("/home", (req, res) => {
  return res.render("home.ejs");
});
app.get("*", (req, res) => {
  res.render("404.ejs");
});
```

I started by making my server.js file. I added in my landing page. While designing my application I had mobile users in mind and most apps have a nice themed loading screen before reaching a home page. I recreated this using my "/" path as the loading screen which then refreshes after 2 seconds automatically redirecting the user to my home page. The 404 page picks up every path that doesn't match a path I have already defined. It does this using the "\*".

```javascript
router.get("/profile", authenticated, async (req, res) => {
  try {
    const userProfile = await User.findById(req.session.user._id).populate("likedVenues").populate("feedbackGiven");
    return res.render("auth/profile.ejs", { profile: userProfile });
  } catch (error) {
    console.log(error);
  }
});
```

This is my code block for the user profile. I am populating 2 virtual fields which are attached to my models I created for the user. This allows the favourites and feedback given section to fill up when the user favourites a venue or when they give feedback.
The code attached to this page is:

```javascript
<h2 class="title">Favourites:</h2>
    <% profile.likedVenues.forEach(like => { %>
      <ul>
        <% if(like.logo) { %>
        <li id="profile-list"><a class="on-screen-buttons" href="/venues/<%= like._id %>"><%= like.name %>
            <img class="favourites-logo" src="<%= like.logo %>">
          </a>
          </li>
        </ul>
        <% } else {  %>
          <li id="profile-list"><a class="on-screen-buttons" href="/venues/<%= like._id %>"><%= like.name %>
          </a>
          </li>
        </ul>
      <% }}) %>
      <% if (profile.likedVenues.length <= 0) { %>
        <p>You haven't favourited any venues yet!</p>
       <% } %>
      <h2 class="title">Feedback Given:</h2>
      <p id="success"><% if(message) { %><%= message %><% } %></p>
      <% if (profile.feedbackGiven.length <= 0) { %>
       <p>You haven't given any feedback yet!</p>
      <% } %>
      <div id="feedback-container">
        <% profile.feedbackGiven.forEach(venue => { %>
          <% venue.feedback.forEach(rating => { %>
            <% if (rating.user.equals(user._id)) { %>
              <form action="/venues/<%= venue._id %>/feedback/<%= rating.id %>?_method=DELETE" method="post">
                <ul>
                  <%= venue.name %>
              <li>
                <p class="feedback-box">
                  <small><%= new Date(rating.createdAt).toDateString() %></small><br/>
                  Toilets: <%= rating.toilet %> ★<br/>
                  Smoking Area: <%= rating.smokeArea %> ★<br/>
                  Security: <%= rating.security %> ★<br/>
                  Sound-System: <%= rating.soundSystem %> ★<br/>
                  Bar Prices: <%= rating.barPrices %> ★
                  <button class="delete-feedback-btn" type="submit"><img class="delete-feedback-icon" src="/images/delete-64.png"></button>
                </p>
              </li>
            </ul>
          </form>
          <% } %>
       <% }) %>
        <% }) %>
      </div>
```

I am very proud of this logic. The first forEach loop iterates through the `likedVenues` array within the `profiles` object. It creates a list of links tied to the venues the user has liked, displaying them on their profile so they can quickly access them.
The next set of forEach targets the `feedbackGiven`. The information I needed to access was a nested array inside another array. I found this very interesting to try and code as I needed to `console.log` out every step to see where I could access what I needed. It felt like I was writing real functional code.

The first way I tried involved using the same `forEach` as the previous `likedVenues` one. It gave me the feedback given but only showed up when the user had the specific venue liked as well. I wanted the information to show up on their profile separately and regardless of whether they any venues liked or if they have given any feedback at all. With some help from my instructor we found that I only needed to change two bits of code to make it function how I wanted it to.

## Challenges

- I found some aspects of this project challenging such as creating virtual fields within schemas and linking them to other models. I spent a long time reading through Mongoose documentation trying to work it out. I did have to ask for help from my instructors but after talking it through with them I do have a better understanding of how it works and where `.populate()` is needed and what it does.
- Another part I found difficult was creating the seed for filling my database for testing purposes. I realised that moving my file uploads to a third party (Cloudinary) meant that my profile page would break because it couldn't recognise a file path for the avatar. This issue still remains in the code.
- Deploying the app online had its hurdles too. Netlify would not load the page as it was not communicating with MongoDB. I kept getting timeout errors after changing little pieces of my code to see if it was that. In the end I had to change the network access to allow from any IP address on MongoDB. After that it worked perfectly. If my database held important information obviously you couldn't do this and you would need to find another way round it.

## Wins

- Compared to project 1, I found my footing much quicker this time round. The EJS templates and their logic was easier for me to understand what was happening and why. I really enjoyed aspects of the code like passing object literals to different pages so you can access and display information dynamically.
- Utilising forEach loops on my profile page stands out to me as I managed to figure it out on my own. The fact I had to iterate through an object but the information was another layer down so writing another forEach to access the array I wanted was a satisfying accomplishment.
- I had conditional logic throughout my templates to ensure I was only showing pictures when they were actually available. I found that if you don't have If statements to switch them off you get a placeholder image in the position where the image is supposed to be which often makes the page look bad.
- Making use of the `<meta>` tag with a refresh to make my loading screen and 404 error screen.

## Bugs

- I have found that I can only upload certain photos as logos and avatars. I have a suspicion that it may have to do with file size or dimensions but I don't know for sure. I need to do more research.

## Stretch Goals

I do have some stretch goals I set at the beginning of my project. Now after reaching MVP and deployment there are some things I would either revisit or know for next time:

- I would like to add an edit profile screen so the user can change their details when they wish.
- I would like to eventually add events to the app so it can show upcoming events as well as venues.
- I think a carousel on the home page would make my site look more professional and usable. The homepage just being blank right now with a button to open a list is boring.
- I want to add `@media (max-width)` to the forms so they don't stretch to 100% of the screen. I made the app with mobile users in mind originally but neglected the fact it would look strange on desktop.
- I also want to look at implementing more user friendly error messages. When you input a username that doesn't exist my app just shows a blank white page with an error message. I think the error should be displayed on the original page using the locals object.

## Attributions

- [Icons DB](https://www.iconsdb.com/)

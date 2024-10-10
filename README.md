# Project 2: Beatsync

![beatsync logo on a black loading screen with slogan "have your say" underneath](/assets/app-screenshots/loading-screen-real.png)

## The Idea

The app is designed to give the user an idea of the venue before they go. I have been to many events where I was disappointed with certain aspects which made the event less fun overall. If I knew about them before I got there I could better prepare or not go at all!

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
- JavaScript
- HTML
- CSS
- Google Fonts
- VS Code
- GitHub
- Chrome Dev Tools
- ChatGPT
- dbDiagram.io

## Planning

As with the first project, I created my wire frame design with Figma. I did not learn from last time and again designed something a bit too ambitiously.
![wire frame design of the homepage of the beatsync app showing 8 genres of music on a black background with a navigational bar at the bottom of the screen](/assets/wireframe-design/guest-home-page.png)
![wire frame design of the profile page of the beatsync app showing a following section and an upcoming events section](/assets/wireframe-design/profile-page.png)

### Trello Board

You can check out my [Trello board][trello].

[trello]: https://trello.com/b/7YQQwM53/unit-2-project-beatsync

## Coding Process

## Challenges

I found some aspects of this project challenging such as creating virtual fields within schemas and linking them to other models. I spent a long time reading through Mongoose documentation trying to work it out. I did have to ask for help from my instructors but after talking it through with them I do have a better understanding of how it works and where .populate() is needed and what it does.
Another part I found difficult was creating the seed for filling my database for testing purposes. I realised that moving my file uploads to a third party(Cloudinary) it meant that my profile page would break because it couldn't recognise a file path for the avatar. This issue still remains in the code.

## Wins

Compared to project 1 I found my footing much quicker this time round. The EJS templates and their logic was easier for me to understand what was happening and why. I really enjoyed aspects of the code like passing object literals to different pages so you can access and display information dynamically.
Utilising forEach loops on my profile page stands out to me as I managed to figure it out on my own. The fact I had to iterate through an object but the information was another layer down so writing another forEach to access the array I wanted made me feel like I was coding!
I had conditional logic throughout my templates to ensure I was only showing pictures when they were actually available. I found that if you don't have If statements to switch them off you get a placeholder image in the position where the image is supposed to be which often makes the page look bad.

## Bugs

I have found that I can only upload certain photos as logos and avatars. I have a suspicion that it may have to do with file size or dimensions but I don't know for sure. I need to do more research.

## Stretch Goals

I do have some stretch goals I set at the beginning of my project. Now after reaching MVP and deployment there are some things I would either revisit or know for next time:

- I would like to add an edit profile screen so the user can change their details when they wish.
- I would like to eventually add events to the app so it can show upcoming events as well as venues.

## Attributions

- [Icons DB](https://www.iconsdb.com/)

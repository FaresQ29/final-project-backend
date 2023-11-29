# final-project-backend

# Description
A social media user profile based webapp. Users can interact with each other in various manners such as adding each other as friends, chatting, or joining similar communities. 

# User
- Register: 
Users can register a new account to be able to use and visualize the contents of the site

- Login:
Users can login with their registered account and use the site

- Logout:
Users can securely logout to prevent unauthorized access to their content.

- 404:
When users try to access a non existing page they will be encountered with a 404 error page with feedback message.

- Profiles
Once logged, the users have a profile page with their information (mostly editable). They can post status updates to their page. 
Users can view profiles of other users

- Communities:
Users can create and administrate communities. Users can join other communities and interact with other members of the same community.
Admin Users can delete and edit community information and remove members.
Regular users can only edit/delete their own posts.

- Chat room
Users can chat with each other as long as they're friends. They can remove and edit their chats.

# Backlog
- Add private and public web pages

# Client / Frontend
### React Router Routes (React App)

| Path      |  Component| Permissions                | Behaviour  |
| :-------- | :-------  | :------------------------- | :-------   |
| `/home`  | `HomePage`  | Anonymous only | Presents the website and its features. Instructs users to register/login to enter website. |
| `/register`  | `RegisterPage`  | Anonymous only | Users create a new account, on valid completion they will be navigated to their profile page. |
| `/login`  | `LoginPage`  | Anonymous only | User enters their valid email and password to login. Will be taken to their profile page. |
| `/profile`  | `ProfilePage`  | Private route. | Users Profile page that allows them to post status updates, edit/view their information, manage their friend list |
| `/profile-edit`  | `ProfileEdit`  | Private route. | Where users can edit their information. |
| `/user/all`  | `UsersListPage`  | Private route. | Can view/search a list of all registered members to add as a friend |
| `/user/:id`  | `UserPage`  | Private route.| Can see other user's profiles and your own.  |
| `/communities`  | `CommunitiesList`  | Private route| Shows a list of all available communities to join |
| `/community/id`  | `Community`  | Private route| Community Page |
| `/chat`  | `Chat`  | Private route| Opens the users Chat page where they can see all their conversations (or lack of) with various users  |

### Pages:
- `HomePage`
- `Register/Login Page`
- `ProfilePage`
- `ProfileEdit`
- `Users`
- `Users/:id`
- `Chat` 
- `Communities` 
- `Community/:id` 

### Components:
- `User Card`
- `Community Card`
- `Nav`




## Actions
- **Auth**
  - `auth` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User**
  - `user` :
    - `.getCurrentUser()`
    - `.editCurrentUser(id, obj)`

- **chat**
  - `chat` :
    - `.editChat(chatId)`
    - `.removeChat(chatId)`
    - `.getChat(chatID)`

- **community**
  - `community` :
    - `.createNewCommunity(obj)`
    - `.removeCommunity(communityId)`
    - `.editCommunity(communityId, obj)`



# Server / Backend
## Models
**User model**
```javascript
{
    name: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}],
    communities: [{type: Schema.Types.ObjectId, ref: "Community"}],
    userDetails: {
        dateOfBirth: String,
        profileImg: String,
        bio: String,
        location: String
    }
}
```
** Chat Logs Model**
```javascript
{
    chatLogs: [{text: String, date: Date()}],
    userOne: {type: Schema.Types.ObjectId, ref: "User"},
    userTwo: {type: Schema.Types.ObjectId, ref: "User"}
}
```

** Community Model**
```javascript
{
    communityName: {type: String, required: true, unique: true},
    dateCreated: {type: String, required: true},
    communityBio: {type: String, required: true},
    communityAdmin: [{type: Schema.Types.ObjectId, ref: "User"}],
    communityMembers: [{type: Schema.Types.ObjectId, ref: "User"}],
    communityContent: [ 
        {
            post: String,
            comments : [{userComment: String, commentAuthor: [{type: Schema.Types.ObjectId, ref: "User"}]}]
        }
    ]

}
``` 


## Backend Routes

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/verify`    |          | 200            | 404          | Check if user is logged in and return profile page or main home page |
| POST        | `/auth/register`    | {name, email, password}            | 200            | 404          | Registers a new user to the backend|
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user | 
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user  |
| GET         | `/user/all`     |            |            200    | 404          | Gets all users   |
| GET         | `/user/:id`     |            |            201    | 400          | Gets specific user   |
| PUT         | `/user/:id`   | { name, bio }                | 201            | 400          | edit player                                                  |
| GET         | `/communities`     |            |                | 400          | Shows all communities       |
| GET         | `/community/:id` |                              |                |              | Show specific community                                  |
| POST        | `/communities`     | { communityName, communityBio}       | 201            | 400          | Create and save a new community                          |
| PUT         | `/community/:id`    | { communityId,  editedCommunity}       | 200           | 400          | edits a community  |
| DELETE      | `/community/:id` |         | 201            | 400          | delete community                                           |
| GET         | `/chat/:id`         |                    |                |              | Shows a specific chatlog                             |
| POST        | `/chat/:id`         |      {text, date}                         | 200           | 404          | adds a new chat | 
| PUT         | `/chat/:id`         |      {text}                         | 201           | 401         | edits a new chat | 
| DELETE      | `/chat/:id`         |      {text}                         | 200         | 400         | deletes a new chat | 
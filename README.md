## GitHub Followers

## Description:

- Create a service that allows for a user to search for a GitHub user.
- On a successful search return, display the user's GitHub handle, follower count, and a list of the user's followers (just the avatar is fine).
- Create a "load more" button that, when clicked, fetches the next pageload of followers. This button should persist until there are no more pages of followers to fetch. 

## Technical choices:

- Bootstrap allowed me to address most UI needs. As far as layout, I played around with alternative ways of listing more results per page, through use of multiple columns, but made results overwhelming. 
- Animate.CSS was added for some emphasis on title and returned user search results. 
- Initially I used plain JS, however with ever mounting html creation code, jQuery minimized that. Of course data requests were made from specific endpoints, which upon success, call functions to display HTML of user and follower results data.
- Valuable additions for user, may include sort functionality, and potential pagination structure, however the assigned "Load More" button, along with the "Back to Search" anchor keeps things simple, and easy. 

## Other projects:

- https://www.github.com/raquellorenzana
- https://www.codepen.io/raquellorenzana

## About me:

- https://www.devraq.com
- https://www.linkedin.com/in/raquellorenzana

## Hosted challenge:

- As github provides a way to deploy on https://username.github.io/repo_name, you can find the project at this URL: https://raquellorenzana.github.io/githubfollowerschallenge

## License

This project is under the MIT license. See the complete [LICENSE](LICENSE).



# Debouncing-in-Youtube-search-Api-suggestions
Created with CodeSandbox
Normally youtube search Api is called on every key press, means every time we make a change in youtube text field

We have to implement debouncing on that on every onChange event it will not call the api

We have to make the api call if the diffrence between the two api call is greater than T(here we are keeping 200ms)

If the diffrence between the keypress is less than 200ms, decline the api call.

The api call is declined by using a componentWillUnmount which calls an clearTimeout.

And we are storing the youtube suggestions objects in a redux so that if we click backspace in search bar, we donot need to do service calls for those letters for which we have already created service calls.

In this way we are limiting the number of service calls.

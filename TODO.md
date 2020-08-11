## Features

* Show messages from the subscribed to queue
* Show available queues for the Service Bus
* Select the queue to use from the list

## Error Handling

* Make the form active only is the connection to the service bus exists
* Share the error handling code on the form - maybe just a component with a template?
* Improve validation on the input for 'Connection String' (check for Endpoint, SharedAccessKeyName, SharedAccessKey)
* Add errors to each element along with summary above them all

## Questions

* Consider if the queue client should be passed up to the app or if other components should be children of the connection component - probably the latter

## Nice to haves

* Install Bulma rather than linking to the CDN version
* Add stop subscribing button

---

## Features implemented

* Store form values client side to prevent having to re-enter them
* Pass the queue client to the app so it can be used by other components
* Automatically connect to the Service Bus when the app loads, if the connection string is available in local storage
* Automatically connect to the queue (from local storage) when the app loads

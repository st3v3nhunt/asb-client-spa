## Features

* Store the message in local storage to save having to paste it in all the time
* Turn on sender button only when the queue has been connected to
* Add auto id generation to the sender
* List out the messages as they are sent
* Add clear message button to the receiver
* Add clear message button to the sender
* Add button for disconnecting from the service bus (effectively closing the connection)
* Add button for disconnecting from the queue (effectively closing the connection)
* Namespace the message against the queue in local storage

* Add ability to save messages and recall them so there is access to a selection of pre-saved messages
* Enable the interface to have multiple queues receiving messages, possibly tabs?
* Add message sending ability
* Improve the layout (ongoing)
* Show available queues for the Service Bus
* Select the queue to use from the list
* Install Bulma rather than linking to the CDN version
* Add some tests

## Error Handling

* Handle unknown queue (or ensure only valid queues can be selected)
* Share the error handling code on the form - maybe just a component with a template?
* Improve validation on the input for 'Connection String' (check for Endpoint, SharedAccessKeyName, SharedAccessKey)
* Add errors to each element along with summary above them all

## Questions

* Consider if the queue client should be passed up to the app or if other components should be children of the connection component - probably the latter

---

## Features implemented

* Store form values client side to prevent having to re-enter them
* Pass the queue client to the app so it can be used by other components
* Automatically connect to the Service Bus when the app loads, if the connection string is available in local storage
* Automatically connect to the queue (from local storage) when the app loads
* Show messages from the subscribed to queue
* Add stop subscribing button
* Make the form active only is the connection to the service bus exists

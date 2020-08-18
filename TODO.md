## Features

* Refactor `disableConnectButton` in QueueClient
* Add back-end data store to save what currently goes in local storage
* Show available queues for the Service Bus
* Select the queue to use from the list
* Add ability to save messages and recall them so there is access to a selection of pre-saved messages
* Add ability to specify the constraints for all message properties and dynamically generate them for each message
* Review `console.log` statements, is there a standard way of turning logging on or off in the project?
* Namespace the message against the queue in local storage
* Enable the interface to have multiple queues receiving messages, possibly tabs?
* Install Bulma rather than linking to the CDN version
* Add some tests

## Error Handling

* Handle unknown queue (or ensure only valid queues can be selected)
* Share the error handling code on the form - maybe just a component with a template?
* Improve validation on the input for 'Connection String' (check for Endpoint, SharedAccessKeyName, SharedAccessKey)
* Add errors to each element along with summary above them all

---

## Features implemented

* Store form values client side to prevent having to re-enter them
* Pass the queue client to the app so it can be used by other components
* Automatically connect to the Service Bus when the app loads, if the connection string is available in local storage
* Automatically connect to the queue (from local storage) when the app loads
* Show messages from the subscribed to queue
* Add stop subscribing button
* Make the form active only is the connection to the service bus exists
* Store the message in local storage to save having to paste it in all the time
* Add button for disconnecting from the service bus (effectively closing the connection)
* Add button for disconnecting from the queue (effectively closing the connection)
* Turn on sender button only when the queue has been connected to
* [reverted] Dynamically set the height of the message box to show all of the content
* Disable 'unsubscribe' button when disconnecting from service bus
* Disable 'unsubscribe' button when disconnecting from queue client
* Add message for service bus being connected
* Add message for queue client being connected
* Fix issue with 'subscribed to QUEUE' message when not subscribed
* Disable connection string input once connected to service bus
* Disable queue name input once connected to queue
* Add message sending ability
* Improve the layout (ongoing)
* Add clear message button to the receiver
* List out the messages as they are sent
* Add clear message button to the sender
* Add count for the number of messages sent
* Add count for the number of messages received
* Add auto id generation to the sender
* Get this deployed to a cloud service
* Update README

## Features to implement

* Consider if the queue client should be passed up to the app or if other
  components should be children of the connection component - probably the latter
* Improve validation on the input for 'Connection String' (check for Endpoint,
  SharedAccessKeyName, SharedAccessKey)
* Show available queues for the Service Bus
* Select the queue to use from the list
* Add errors to each element along with summary above them all
* Install Bulma rather than linking to the CDN version

---

## Features implemented

* Store form values client side to prevent having to re-enter them
* Pass the queue client to the app so it can be used by other components

# GraphQL requests

## Get all available flights

```graphql
query GetAllAvailableFlights($date: Date!) {
  allAvailableFlights(date: $date) {
    id
    origin
    destination
    availableSeats {
      class
      price
    }
  }
}
```

## Book a flight

```graphql
mutation BookFlight(
  $date: Date!
  $class: ClassEnum!
  $expectedPrice: Int!
  $flightId: String!
  $name: String!
) {
  success: bookFlight(
    date: $date
    flightId: $flightId
    class: $class
    expectedPrice: $expectedPrice
    name: $name
  )
}
```

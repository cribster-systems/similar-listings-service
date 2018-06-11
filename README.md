# Cribster: similar listings service

> Project description

## Related Projects

  - https://github.com/cribster-systems/images-service
  - https://github.com/cribster-systems/booking-service-module
  - https://github.com/cribster-systems/reviews-service-module

## Development
For this project, I scaled the backend of a microservice for a housing rental platform after inheriting a legacy codebase. To simulate production scale, 10 million records were added to the database.

Stress Testing (local machine) using Artillery:
```
config:
  target: 'http://localhost:3333'
  phases:
    - duration: 20
      arrivalRate: 20
scenarios:
  - flow:
    - loop:
      - get:
          url: "/rooms/{{ $loopCount }}/similar_listings"
          count: 5
```

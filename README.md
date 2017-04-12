# Managing contacts

Node.js RESTful Web Service built on express and mongoose. The API provide endpoints 
to create, update, remove and list contacts and to get the history of each contact.

## Setup
 - `npm install`
 - Set MongoDB URI to config or use MONGODB_URI env variable

## CLI

- `npm start` - runs server
- `grunt test` - executes tests and linter

## Endpoints

### _List contacts with pagination_
| Item     | Value    |
| --------|---------|
|ref | /api/v1/contacts|
| method | GET|
| query params | skip (default = 0) , limit (default = 50) |
| example | /api/v1/contacts?skip=0&limit=10 |
| response | { count: 2, contacts : [ ] }|

### _Create new contact_
| Item     | Value    |
| --------|---------|
|ref | /api/v1/contacts|
| method | POST|
| body | `name: required, address: required, contactNumber: required, email: required, company: required, picture: optional` |
| response | contact |

### _Update contact_
| Item     | Value    |
| --------|---------|
|ref | /api/v1/contacts/:id|
| method | PUT|
| body | `name: required, address: required, contactNumber: required, email: required, company: required, picture: optional` |
| response | contact |

### _Delete contact_
| Item     | Value    |
| --------|---------|
|ref | /api/v1/contacts/:id|
| method | DELETE|
| response | contact |

### _Contact history_
| Item     | Value    |
| --------|---------|
|ref | /api/v1/contacts/:id/history|
| method | GET|
| response | [contactHistory] |
 

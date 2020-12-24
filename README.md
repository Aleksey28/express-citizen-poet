# The backend of the project "Citizen poet"

## Description API

### Registration and login to the system

+ POST http://178.154.224.210/signup - registration user
    + Input
        + email
        + password
        + firstName
        + secondName
        + middleName
        + birthDate
        + avatar
    + Output
        + _id - user's ID
        + email - user's E-mail

+ POST http://178.154.224.210/signin - authorization user
    + Input
        + email - user's E-mail
        + password - user's password
    + Output
        + token - user's token

### User

+ GET http://178.154.224.210/users - get list of users
    + Output
        + list of users
            + email
            + firstName
            + secondName
            + middleName
            + birthDate
            + avatar

+ GET http://178.154.224.210/users/:id - get data by user ID
    + Output
        + email
        + firstName
        + secondName
        + middleName
        + birthDate
        + avatar

+ POST http://178.154.224.210/users/me - change data current user
    + Input
        + email
        + firstName
        + secondName
        + middleName
        + birthDate
        + avatar
    + Output
        + email - user's E-mail
        + firstName
        + secondName
        + middleName
        + birthDate
        + avatar

### Petition

+ GET http://178.154.224.210/petitions - get list of petitions
    + Output
        + list of petitions
            + title
            + description
            + department
            + owner
            + likes[]
            + comments[]
            + createdAt

+ GET http://178.154.224.210/petitions/me - get current user's petitions
    + Output
        + list of petitions
            + title
            + description
            + department
            + owner
            + likes[]
            + comments[]
            + createdAt

+ POST http://178.154.224.210/petitions - create new petition
    + Input
        + title
        + description
        + department
    + Output
        + title
        + description
        + department
        + owner
        + likes[]
        + comments[]
        + createdAt

+ DELETE http://178.154.224.210/petitions/:petitionId - delete petition by ID
    + Output
        + title
        + description
        + department
        + owner
        + likes[]
        + comments[]
        + createdAt

+ PUT http://178.154.224.210/petitions/:petitionId/likes - like petition
    + Output
        + title
        + description
        + department
        + owner
        + likes[]
        + comments[]
        + createdAt

+ DELETE http://178.154.224.210/petitions/:petitionId/likes - delete like petition
    + Output
        + title
        + description
        + department
        + owner
        + likes[]
        + comments[]
        + createdAt

+ PUT http://178.154.224.210/petitions/:petitionId/comments - comment petition
    + Input
        + text
    + Output
        + title
        + description
        + department
        + owner
        + likes[]
        + comments[]
        + createdAt

### Poems

+ GET http://178.154.224.210/poems?strToTranslate - get translate from strToTranslate
    + Output
        + translation


# FluidParking HTTP Server
## _Http server for parking management_



Responses are formated in JSON.
- Dates are formated in timestamp (milliseconds)

## How to launch

- Clone the repository or download
- Create a MySQL database and import ```fluidparking.sql``` from project's root
- Run ```npm install``` from project's root
- Create a ```.env``` file in project's root and write DB\_NAME, DB\_HOST, DB\_USER, DB\_PASSWORD and SERVER\_PORT fields
- Run ```npm start```

## Requests Guide

These are the possible requests:

- `/getuserall` - Get all users
    - Parameters: None
    - Response: {succes: Boolean, data: [<UserData>, ...]}
- `/verifyuser` - Verify user auth data
    - Parameters: id, mdp
    - Response: {succes: Boolean, data: <UserData>}
- `/verifyadmin` - Verify admin auth data
    - Parameters: None
    - Response: {succes: Boolean, data: <AdminData>}
- `/getadminbyid` - Get an admin
    - Parameters: id
    - Response: {succes: Boolean, data: <AdminData>}
- `/getuserbyid` - Get an user
    - Parameters: id
    - Response: {succes: Boolean, data: <UserData>}
- `/adduser` - Register a new user
    - Parameters: nom, prenoms, numeroPiece, typePiece, dateNaissance, adresse, tel, mdp
    - Response: {succes: Boolean}
- `/searchplace` - Search a convenient place for reservation
    - Parameters: datedebut, datefin, longitudeproximite, lattitudeproximite
    - Response: {succes: Boolean, data: [<PlaceData>, ...]}
- `/reserverplace` - Set up a reservation for an user
    - Parameters: idplace, iduser, datedebut, datefin, sommePayee
    - Response: {succes: Boolean}
- `/cancelreservation` - Cancel a reservation for an user
    - Parameters: idreservation
    - Response: {succes: Boolean}
- `/endreservation` - End a reservation for and user who wants to free his place earlier
    - Parameters: idreservation
    - Response: {succes: Boolean}
- `/getreservationsbyuser` - Get all reservations initiated by an user
    - Parameters: iduser
    - Response: {succes: Boolean, data: [<ReservationData>, ...]}
- `/getplace` - Get parking place data
    - Parameters: idplace
    - Response: {succes: Boolean, data: <PlaceData>}
- `/getfreeparkingplaces` - Get all free places in a parking
    - Parameters: idparking
    - Response: {succes: Boolean, data: [<PlaceData>, ...]}
- `/getparkingplaces` - Get all places in a parking
    - Parameters: idparking
    - Response: {succes: Boolean, data: [<PlaceData>, ...]}
- `/getparking` - Get parking data
    - Parameters: idparking
    - Response: {succes: Boolean, data: <ParkingData>}
- `/getparkingfreeplacescount` - Count all free places in a parking
    - Parameters: idparking
    - Response: {succes: Boolean, data: Integer}
- `/setplaceoccupation` - Change occupation state of a place
    - Parameters: idplace, occupation (1 or 0)
    - Response: {succes: Boolean>}
- `/getplaceoccupation` - Get the occupation state of a place
    - Parameters: idplace
    - Response: {succes: Boolean, data: Boolean}
- `/sendnotif` - Send a notification to an user
    - Parameters: iduser, texte
    - Response: {succes: Boolean}
- `/getnotifbyuser` - Get all notifications of an user
    - Parameters: iduser
    - Response: {succes: Boolean, data: <NotificationData>}
- `/setparkingprices` - Modify prices of a parking
    - Parameters: idparking, prixmort, prixplein
    - Response: {succes: Boolean}
- `/setnotiflu` - Declare that an user has read his notifications
    - Parameters: iduser
    - Response: {succes: Boolean}
- `/getreservation` - Get a reservation
    - Parameters: idreservation
    - Response: {succes: Boolean, data: <ReservationData>}
- `/getparkingparties` - Get all sections of a parking
    - Parameters: idparking
    - Response: {succes: Boolean, data: [<SectionData>, ...]}
- `/ajoutersolde` - Add money to user account
    - Parameters: iduser, montant
    - Response: {succes: Boolean}
- `/retirersolde` - Remove money to user account
    - Parameters: iduser, montant
    - Response: {succes: Boolean}


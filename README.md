# Parking App
## Sign in using your password and license plate number and keep track of how much you spend on parking

### Model Structure
We have two tables. The tables are linked by plate.
1. Vechicles
    * plate
    * state
    * make
    * model
    * year
    * password

2. Park
    * plate
    * amount
    * location
    * date

### Api Routes

1. Posts
    * Posting the vechicle
    * Posting the park

2. Gets
    * All parking information by plate number with a total money spent YTD

3. Delete
    * Parking rows

### Views

1. Index page with 2 buttons and plate and password input fields
    * Add Park (verifies password and brings you to Your Plate Page).
    * Add Vehicle
        * pulls up a modal to add info.

2. Your Plate Page to allow parking input and show you a total amount spent for the year with a sexy graph.



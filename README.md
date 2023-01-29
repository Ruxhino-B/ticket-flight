# ticket-flight

This Project is Test Project Required by Lufthansa Company

**It took me 17 hours to complete this project**
Project is hosted online and you will find in https://test.ruxhino.al/

Based on requirements, projet must have Login page and role, Admin, user

To login as admin


username: Admin

password: admin1234

To Login as User


username: user

password user1234

**Please be sure to enter username, password exactly because it is key sensitive**


![Screenshot from 2023-01-29 17-39-42](https://user-images.githubusercontent.com/32514053/215340936-48367b23-82bd-4397-86f2-815d4a71b26c.png)

If username or password is incorect I create a handler error that make show mat-error

![Screenshot from 2023-01-29 19-00-57](https://user-images.githubusercontent.com/32514053/215346290-e6658844-fa1b-4cad-bac0-93a7f8e6917e.png)

If I try to login as USER role with correct username and password it will redirect to '<empty link>' that will show a List of Tickets Angular component
![Screenshot from 2023-01-29 19-06-01](https://user-images.githubusercontent.com/32514053/215346500-92b8d65b-2b5f-49ed-8978-9ab8b2c38f36.png)

If I try to login as ADMIN role, it will redirect me to 'dashboard' Dashboard component. 

**Please check detail like User photo, Admin photo and text change depend who is logged in.**

Dashboard component is hide from user role. To hide this I have used "guard" check auth.guards.ts, role.guard.ts

![Screenshot from 2023-01-29 19-10-52](https://user-images.githubusercontent.com/32514053/215346684-0b64afe0-53e8-4fda-8462-304e341043c0.png)

Those charts are created using this GET https://app-test.ruxhino.al/ticket

As you see from output, this is a general api but I filter output to find all outbound airport as (London, Frankfurt...) and count them. 

check file dashboard.component.ts

**But backend is design in that way that require TOKEN to get output**

Example of GET response to https://app-test.ruxhino.al/ticket

![Screenshot from 2023-01-29 19-17-09](https://user-images.githubusercontent.com/32514053/215347542-d2494cfd-1f22-48c4-a940-773a6cd413da.png)

Admin role can check all ticket list

User role can check only ticket created by him.

Both roles use the same API link and same imput but I filter the output in frontend.(This is bed because it it more safe and fast to filter this information in back end using filter with 
request.user but i do it in this way because I try to use the backend options as les as possible like firebase)
check file ticket-view.component.ts 

![Screenshot from 2023-01-29 19-26-23](https://user-images.githubusercontent.com/32514053/215348551-735bcdfa-7507-428b-82fd-880a18a4547e.png)

This is a table using angular material table. user can filter ticket using filter like in Material Angualr Documentation.(But I dont realy like this kind of filtering, but it is easy to implement)
Check ticket-view.component.ts

User (admin role/user role) can update ticket. I use MatDial to show like modal popup (check ticket-view.component.ts) I use MatDialogConfig to move data from one component to another(from ticket-view component to ticket-update component)

![Screenshot from 2023-01-29 19-49-06](https://user-images.githubusercontent.com/32514053/215348933-a42bae3f-457a-400d-a907-0686864d185e.png)

On submit I used this.matDialogRef.close(); and reload data to view list of tickets with udpate. check ticket-update.ts

Create Ticket

![Screenshot from 2023-01-29 19-56-48](https://user-images.githubusercontent.com/32514053/215349319-24702a5c-2218-407c-bc6f-66140a6787ef.png)

I have created FormGroup to get data from user and post it to backend.

Angular offers different way of form but this is best way because developer can use some of Validtadors offer by Angular.

Example Validators.required, Validators.max(10000) (This is the validator that I use to controll the price)

I used FromGroup.Valid to check if all Validators are off and to make submit button clicable

![Screenshot from 2023-01-29 20-04-46](https://user-images.githubusercontent.com/32514053/215349733-5f54b094-cec7-48fe-a85d-ee15b2c649b8.png)

![Screenshot from 2023-01-29 20-14-37](https://user-images.githubusercontent.com/32514053/215350368-eda6acb5-1c48-410f-8722-09a2881c2ae5.png)


This kind of date range it doesn't give opportunity to flight into to past :D (From_date > To_date is impossible)

If user try to Enter same data 2 time Application give this error


![Screenshot from 2023-01-29 20-08-14](https://user-images.githubusercontent.com/32514053/215350329-290a7ce5-84e3-4754-aaad-4faf07c115a9.png)

Solution for this is:

I get all information from database and using for loop i create an unique string for each flight

const ticketMix = ticket.inbound + ticket.outbound + ticket.ticket_type + ticket.from_date + ticket.seat_number;

and I push it on Variable as array

this.tickeMixtList.push(ticketMix.toLowerCase())

I make the same think with data that I get from FormGroup and I check if this FormGroup data string exit in TicketMixList create from database.

For more check ticket-create.component.ts


UML Diagram
![Blank diagram](https://user-images.githubusercontent.com/32514053/215353052-4f7af399-ae21-4802-a8bd-995da81cfd56.png)



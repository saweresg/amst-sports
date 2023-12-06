# AMST Sports
In my local church, we recently built a new gymnasium!
This was very Exciting, we had people renting it, we had leagues, and we had many kids programs

all of this was great, but we did not have a streamlined way for people to register and find out about all of this
some people would occassionaly rent it, but it was not very common
so I decided to make a website make it much easier for people outside of the Church to rent the court, and where they can easily find out about other things we are doing

the frontend was designed by me using figma, and then implemented using ReactJS and CSS
I created a simple visually apealing design, that is easy to use!
users can see which days and times are currently available, and can view which slots they have already booked

Payments are integrated with the Stripe API to make it easy for users to checkout

the backend was created with NodeJS, Express, MongoDB
I created a REST api for the updating and retrieving information abobut the bookings themseleves and the users
When a succesfull payment is made the appropiate information is updated in the database, as the user will now see these slots in "My Bookings", and will see them no longer available for purchase

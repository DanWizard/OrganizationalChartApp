# OrganizationalChartApp

### Overview

This is a fully resoponsive, single page, React application utilizing a Ruby on Rails backend API. This application is meant to display the heiarchal realationships found in a **single** organization.

### Setup

To build rails backend API run: 

```
rails serve -b 0.0.0.0
```
This should run your application on localhost:3000

Next,

to build React frontend run: 

```
npm start

```
React deault is to run on port 3000 so you will then 
be prompted with:

```
? Something is already running on port 3000.

Would you like to run the app on another port instead? (Y/n)
```

type:

```
Y
```

Then,

**Go to localhost:3001 to see the app!**

### Usage

The application allows you to create, read, update, and delete to and from your database. The database stores:

```
name: string
title: string  
manager_id: integer 
```

There is a one-to-many self-Join on the table through the manager_id column. 

So one member can have one manager and one member can have many suborindates.

###### Realtional Tree Chart

In order to have the relationship data display correctly, once the first member is created all subsequent created members should be assigned to an existing manager in the hierarchy.

###### Creating

press:

``
<button>Add member</button>
``

The form modal should appear.

To submit the form you will need to pass these validatoins for each input box:

```
name length > 2
title length > 2
```
If you want to do display the heirachal data make sure you include who their manager is in the select box.

###### Updating

press:

```

```

The form modal should appear.

To submit the form you will need to pass these validatoins for each input box:

```
name length > 2
title length > 2
```
If you want to do display the heirachal data make sure you include who their manager is in the select box.

###### Deleting

press:

``
Red X icon
``

deleting a member with subordinates will remove the chart




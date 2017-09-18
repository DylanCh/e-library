Library inventory app using Node.js, Express.js, MongoDB, Bower, Pug (Jade), AngularJS, Bootstrap

1, To start the database:
chmod 755 createConnection.sh
and 
- (Mac) sh createConnection.sh
or
- (Linux) ./createConnection.sh

2, Install packages (in this order, because bower packages are installed after the bower npm library is installed)
npm i 
bower install

3, (Optional) add the existing books
node testInsert.js
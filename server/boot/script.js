module.exports = function (app) {
  var cloudantDB = app.dataSources.cloudant;
  cloudantDB.automigrate('Customer', function (err) {
    if (err) throw (err);
    var Customer = app.models.Customer;
    Customer.find({ where: { username: 'oscar' }, limit: 1 }, function (err, users) {
      //console.log('users:' + JSON.stringify(users));
      //if (!users || users.length == 0) {
      if (!users) {

        console.log('Creating user oscar');
        Customer.create([
          { username: 'oscar', email: 'admin@admin.com', password: '1234' }
        ], function (err, users) {
          if (err) return debug(err);

          var Role = app.models.Role;
          var RoleMapping = app.models.RoleMapping;

          Role.destroyAll();
          RoleMapping.destroyAll();

          //create the admin role
          Role.create({
            name: 'admin'
          }, function (err, role) {
            if (err) return debug(err);

            //make admin
            role.principals.create({
              principalType: RoleMapping.USER,
              principalId: users[0].id
            }, function (err, principal) {
              if (err) throw (err);
            });
          });
        })
      }
      else {

      }

    });
  });
};
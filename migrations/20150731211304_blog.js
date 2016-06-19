
exports.up = function(knex, Promise) {

	return Promise.all([

        knex.schema.createTable('nasdaq', function(table) {
            table.increments('id').primary();
            table.string('index');
            table.float('value');
            table.float('net');
						table.datetime('date');
            //table.timestamps();
        })




    ])

};

exports.down = function(knex, Promise) {

	return Promise.all([
        knex.schema.dropTable('nasdaq')

    ])

};

/// <reference path="../node/node.d.ts" />

interface Sequelize
{
    /**
     * Instantiate sequelize with name of database and username
     * @param database database name
     * @param username user name
     */
    new(database:string, username:string):Sequelize;

    /**
     * Instantiate sequelize with name of database, username and password
     * @param database database name
     * @param username user name
     * @param password password
     */
    new(database:string, username:string, password: string):Sequelize;

    /**
     * Instantiate sequelize with name of database, username, password, and options.
     * @param database database name
     * @param username user name
     * @param password password
     * @param options options. @see SequelizeOptions
     */
    new(database:string, username:string, password: string, options:SequelizeOptions):Sequelize;

    /**
     * Instantiate sequelize with name of database, username, and options.
     *
     * @param database database name
     * @param username user name
     * @param options options. @see SequelizeOptions
     */
    new(database:string, username:string, options:SequelizeOptions):Sequelize;

    /**
     * Instantiate sequlize with an URI
     * @param connectionString A full database URI
     * @param options Options for sequelize. @see SequelizeOptions
     */
    new(connectionString:string, options:SequelizeOptions):Sequelize;

    /**
     * Models are stored here under the name given to sequelize.define
     */
    models:Array<SequelizeModel<any>>;

    /**
     * A reference to sequelize utilities. Most users will not need to use these utils directly. However, you might want
     * to use Sequelize.Utils._, which is a reference to the lodash library, if you don't already have it imported in
     * your project.
     */
    Utils:SequelizeUtils;

    /**
     * A modified version of bluebird promises, that allows listening for sql events.
     *
     * @see SequelizePromise
     */
    Promise:SequelizePromise;

    /**
     * Exposes the validator.js object, so you can extend it with custom validation functions. The validator is exposed
     * both on the instance, and on the constructor.
     *
     * @see SequelizeValidator
     */
    Validator:SequelizeValidator;

    /**
     * A reference to the sequelize transaction class. Use this to access isolationLevels when creating a transaction.
     *
     * @see SequelizeTransaction
     */
    Transaction:SequelizeTransaction;

    /**
     * A general error class.
     */
    Error:Error;

    /**
     * Emitted when a validation fails.
     *
     * @see SequelizeValidationError
     */
    ValidationError:SequelizeValidationError;

    /**
     * Returns the specified dialect.
     */
    getDialect():string;

    /**
     * Returns the singleton instance of QueryInterface.
     */
    getQueryInterface():SequelizeQueryInterface;

    /**
     * Returns the singleton instance of Migrator.
     * @param options Migration options
     * @param force A flag that defines if the migrator should get instantiated or not.
     */
    getMigrator(options?:SequelizeMigratorOptions, force?: boolean):SequelizeMigrator;

    /**
     * Define a new model, representing a table in the DB.
     *
     * @param daoName The name of the entity (table). Typically specified in singular form.
     * @param attributes A hash of attributes to define. Each attribute can be either a string name for the attribute
     *                   or can be an object defining the attribute and its options. Note attributes is not fully
     *                   typed since TypeScript does not support union types--it can be either a string or an
     *                   options object. @see SequelizeAttributeOptions.
     * @param options Table options. @see SequelizeDefineOptions.
     */
    define(daoName:string, attributes:Object, options?:SequelizeDefineOptions):SequelizeModel;

    /**
     * Fetch a DAO factory which is already defined.
     *
     * @param daoName The name of a model defined with Sequelize.define.
     */
    model(daoName:string):SequelizeModel;

    /**
     * Checks whether a model with the given name is defined.
     *
     * @param daoName The name of a model defined with Sequelize.define.
     */
    isDefined(daoName:string):boolean;

    /**
     * Imports a model defined in another file.
     *
     * @param path  The path to the file that holds the model you want to import. If the part is relative, it will be
     *              resolved relatively to the calling file
     */
    import(path:string):SequelizeModel;

    /**
     * Execute a query on the DB, with the posibility to bypass all the sequelize goodness.
     *
     * @param sql           SQL statement to execute.
     *
     * @param callee        If callee is provided, the selected data will be used to build an instance of the DAO represented
     *                      by the factory. Equivalent to calling Model.build with the values provided by the query.
     *
     * @param options       Query options.
     *
     * @param replacements  Either an object of named parameter replacements in the format :param or an array of
     *                      unnamed replacements to replace ? in your SQL.
     */
    query(sql:string, callee?:Function, options?:SequelizeQueryOptions, replacements?:any):SequelizeEventEmitter;

    /**
     * Create a new database schema.
     *
     * @param schema Name of the schema.
     */
    createSchema(schema:string):SequelizeEventEmitter;

    /**
     * Show all defined schemas.
     */
    showAllSchemas():SequelizeEventEmitter;

    /**
     * Drop a single schema.
     *
     * @param schema Name of the schema.
     */
    dropSchema(schema):SequelizeEventEmitter;

    /**
     * Drop all schemas.
     */
    dropAllSchemas():SequelizeEventEmitter;

    /**
     * Sync all defined DAOs to the DB.
     *
     * @param options Options.
     */
    sync(options?:SequelizeSyncOptions):SequelizeEventEmitter;

    /**
     * Drop all tables defined through this sequelize instance. This is done by calling Model.drop on each model.
     *
     * @param options The options passed to each call to Model.drop.
     */
    drop(options:SequelizeDropOptions):SequelizeEventEmitter;

    /**
     * Test the connection by trying to authenticate. Alias for 'validate'.
     */
    authenticate():SequelizeEventEmitter;

    /**
     * Creates a object representing a database function. This can be used in search queries, both in where and order
     * parts, and as default values in column definitions. If you want to refer to columns in your function, you should
     * use sequelize.col, so that the columns are properly interpreted as columns and not a strings.
     *
     * @param fn The function you want to call.
     * @param args All further arguments will be passed as arguments to the function.
     */
    fn(fn:string, ...args:Array<any>):any;

    /**
     * Creates a object representing a column in the DB. This is often useful in conjunction with sequelize.fn, since
     * raw string arguments to fn will be escaped.
     *
     * @param col The name of the column
     */
    col(col:string):SequelizeCol;

    /**
     * Creates a object representing a call to the cast function.
     *
     * @param val The value to cast.
     * @param type The type to cast it to.
     */
    cast(val:any, type:string):SequelizeCast;

    /**
     * Creates a object representing a literal, i.e. something that will not be escaped.
     *
     * @param val Value to convert to a literal.
     */
    literal(val:any):SequelizeLiteral;

    /**
     * An AND query.
     *
     * @param args Each argument (string or object) will be joined by AND.
     */
    and(...args:Array<any>):SequelizeAnd;

    /**
     * An OR query.
     *
     * @param args Each argument (string or object) will be joined by OR.
     */
    or(...args:Array<any>):SequelizeOr;

    /**
     * A way of specifying attr = condition. Mostly used internally.
     *
     * @param attr          The attribute
     * @param condition     The condition. Can be both a simply type, or a further condition (.or, .and, .literal etc.)
     */
    where(attr:string, condition:any):SequelizeWhere;j

    /**
     * Start a transaction. When using transactions, you should pass the transaction in the options argument in order
     * for the query to happen under that transaction.
     *
     * @param callback  Called when the transaction has been set up and is ready for use. Callback takes error and
     *                  transaction arguments (overload available for just transaction argument too).
     */
    transaction(callback:(err:Error, transaction:SequelizeTransaction) => void):SequelizeTransaction;

    /**
     * Start a transaction. When using transactions, you should pass the transaction in the options argument in order
     * for the query to happen under that transaction.
     *
     * @param options   Transaction options.
     * @param callback  Called when the transaction has been set up and is ready for use. Callback takes error and
     *                  transaction arguments (overload available for just transaction argument too).
     */
    transaction(options:SequelizeTransactionOptions, callback:(err:Error, transaction:SequelizeTransaction) => void):SequelizeTransaction;

    /**
     * Start a transaction. When using transactions, you should pass the transaction in the options argument in order
     * for the query to happen under that transaction.
     *
     * @param callback  Called when the transaction has been set up and is ready for use. Callback takes transaction
     *                  argument (overload available for error and transaction arguments too).
     */
    transaction(callback:(transaction:SequelizeTransaction) => void):SequelizeTransaction;

    /**
     * Start a transaction. When using transactions, you should pass the transaction in the options argument in order
     * for the query to happen under that transaction.
     *
     * @param options   Transaction options.
     * @param callback  Called when the transaction has been set up and is ready for use. Callback takes transaction
     *                  argument (overload available for error and transaction arguments too).
     */
    transaction(options:SequelizeTransactionOptions, callback:(transaction:SequelizeTransaction) => void):SequelizeTransaction;
}

interface SequelizeModel<T> extends SequelizeHooks, SequelizeAssociations
{
    /**
     * A reference to the sequelize instance.
     */
    sequelize:Sequelize;

    /**
     * Sync this Model to the DB, that is create the table. Upon success, the callback will be called with the model
     * instance (this).
     */
    sync():SequelziePromiseT<SequelizeModel<T>>;

    /**
     * Drop the table represented by this Model.
     *
     * @param options
     */
    drop(options?: SequelizeDropOptions):SequelizePromise;

    /**
     * Apply a schema to this model. For postgres, this will actually place the schema in front of the table name -
     * "schema"."tableName", while the schema will be prepended to the table name for mysql and sqlite -
     * 'schema.tablename'.
     *
     * @param schema    The name of the schema.
     * @param options   Schema options.
     */
    schema(schema:string, options?:SequelizeSchemaOptions):SequelizeModel;

    /**
     * Get the tablename of the model, taking schema into account. The method will return The name as a string if the
     * model has no schema, or an object with tableName, schema and delimiter properties.
     */
    getTableName():any;

    /**
     * Apply a scope created in define to the model.
     *
     * @param options The scope(s) to apply. Scopes can either be passed as consecutive arguments, or as an array of
     *                arguments. To apply simple scopes, pass them as strings. For scope function, pass an object,
     *                with a method property. The value can either be a string, if the method does not take any
     *                arguments, or an array, where the first element is the name of the method, and consecutive
     *                elements are arguments to that method. Pass null to remove all scopes, including the default.
     */
    scope(options:any):SequelizeModel;

    /**
     * Search for multiple instances..
     *
     * @param options       A hash of options to describe the scope of the search.
     * @param queryOptions  Set the query options, e.g. raw, specifying that you want raw data instead of built
     *                      Instances. See sequelize.query for options.
     */
    findAll(options?:SequelizeFindOptions, queryOptions?:SequelizeQueryOptions):SequelizePromiseT<Array<T>>;

    /**
     * Search for a single instance. This applies LIMIT 1, so the listener will always be called with a single instance.
     *
     * @param options   A hash of options to describe the scope of the search, or a number to search by id.
     * @param queryOptions  Set the query options, e.g. raw, specifying that you want raw data instead of built
     *                      Instances. See sequelize.query for options
     */
    find(options?:SequelizeFindOptions, queryOptions?:SequelizeQueryOptions):SequelizePromiseT<T>;

    /**
     * Run an aggregation method on the specified field.
     *
     * @param field                 The field to aggregate over. Can be a field name or *.
     * @param aggregateFunction     The function to use for aggregation, e.g. sum, max etc.
     * @param options               Query options, particularly options.dataType.
     */
    aggregate<V>(field:string, aggregateFunction:string, options:SequelizeFindOptions):SequelizePromiseT<V>;

    /**
     * Count the number of records matching the provided where clause.
     *
     * @param options Conditions and options for the query.
     */
    count(options?:SequelizeFindOptions):SequelizePromiseT<number>;

    /**
     * Find all the rows matching your query, within a specified offset / limit, and get the total number of rows
     * matching your query. This is very usefull for paging.
     *
     * @param findOptions   Filtering options
     * @param queryOptions  Query options
     */
    findAndCountAll(findOptions?: SequelizeFindOptions, queryOptions?:SequelizeQueryOptions):SequelizePromiseT<SequelizeFindAndCountResult<T>>;

    /**
     * Find the maximum value of field.
     *
     * @param field
     * @param options
     */
    max<V>(field:string, options?:SequelizeFindOptions):SequelizePromiseT<V>;

    /**
     * Find the minimum value of field.
     *
     * @param field
     * @param options
     */
    min<V>(field:string, options?:SequelizeFindOptions):SequelizePromiseT<V>;

    /**
     * Find the sum of field.
     *
     * @param field
     * @param options
     */
    sum(field:string, options?:SequelizeFindOptions):SequelizePromiseT<number>;

    /**
     * Builds a new model instance. Values is an object of key value pairs, must be defined but can be empty.
     *
     * @param values    Object from which to build entity instance.
     * @param options   Object construction options.
     */
    build(values:T, options?:SequelizeBuildOptions):T;

    /**
     * Builds a new model instance and calls save on it..
     *
     * @param values
     * @param options
     */
    create(values:T, options?:SequelizeCopyOptions):SequelizePromiseT<T>;

    /**
     * Find a row that matches the query, or build (but don't save) the row if none is found. The successfull result
     * of the promise will be (instance, initialized) - Make sure to use .spread().
     *
     * @param where     A hash of search attributes. Note that this method differs from finders, in that the syntax
     *                  is { attr1: 42 } and NOT { where: { attr1: 42}}. This may be subject to change in 2.0
     * @param defaults  Default values to use if building a new instance
     * @param options   Options passed to the find call
     */
    findOrInitialize(where:Object, defaults?:T, options?:SequelizeQueryOptions):SequelizePromiseT<T>;

    /**
     * Find a row that matches the query, or build and save the row if none is found The successfull result of the
     * promise will be (instance, created) - Make sure to use .spread().
     *
     * @param where     A hash of search attributes. Note that this method differs from finders, in that the syntax is
     *                  { attr1: 42 } and NOT { where: { attr1: 42}}. This is subject to change in 2.0
     * @param defaults  Default values to use if creating a new instance
     * @param options   Options passed to the find and create calls.
     */
    findOrCreate(where:Object, defaults?:T, options?:SequelizeFindOrCreateOptions):SequelizePromiseT<T>;

    /**
     * Create and insert multiple instances in bulk.
     *
     * @param records   List of objects (key/value pairs) to create instances from.
     * @param options
     */
    bulkCreate(records:Array, options?:SequelizeBulkCreateOptions):SequelizePromiseT<Array<T>>;

    /**
     * Delete multiple instances.
     */
    destroy(where?:Object, options?:SequelizeDestroyOptions):SequelizePromise;

    /**
     * Update multiple instances that match the where options.
     *
     * @param attrValueHash A hash of fields to change and their new values
     * @param where         Options to describe the scope of the search. Note that these options are not wrapped in a
     *                      { where: ... } is in find / findAll calls etc. This is probably due to change in 2.0.
     */
    update(attrValueHash:T, where:Object, options?:SequelizeUpdateOptions):SequelizePromise;

    /**
     * Run a describe query on the table. The result will be return to the listener as a hash of attributes and their
     * types.
     */
    describe():SequelizePromiseT<Object>;

    /**
     *  A proxy to the node-sql query builder, which allows you to build your query through a chain of method calls.
     *  The returned instance already has all the fields property populated with the field of the model.
     */
    dataset():any;
}

interface SequelizeInstance<TInstance, TPojo>
{
    /**
     * Returns true if this instance has not yet been persisted to the database.
     */
    isNewRecord:boolean;

    /**
     * Returns the Model the instance was created from.
     */
    Model:SequelizeModel<TInstance>;

    /**
     * A reference to the sequelize instance.
     */
    sequelize:Sequelize;

    /**
     * If timestamps and paranoid are enabled, returns whether the deletedAt timestamp of this instance is set.
     * Otherwise, always returns false.
     */
    isDeleted:boolean;

    /**
     * Get the values of this Instance. Proxies to this.get.
     */
    values:TPojo;

    /**
     * A getter for this.changed(). Returns true if any keys have changed.
     */
    isDirty:Boolean;

    /**
     *  Get the values of the primary keys of this instance.
     */
    primaryKeyValues:TPojo;

    /**
     * Get the value of the underlying data value.
     *
     * @param key   Field to retrieve.
     */
    getDataValue(key:string):any;

    /**
     * Update the underlying data value.
     *
     * @param key   Field to set.
     * @param value Value to set.
     */
    setDataValue(key:string, value:any):void;

    /**
     * Retrieves the value for the key when specified. If no key is given, returns all values of the instance, also
     * invoking virtual getters.
     */
    get(key?:string):any;

    /**
     * Set is used to update values on the instance (the sequelize representation of the instance that is, remember
     * that nothing will be persisted before you actually call save).
     */
    set(key:string, value:any, options?:SequelizeSetOptions):void;

    /**
     * If changed is called with a string it will return a boolean indicating whether the value of that key in
     * dataValues is different from the value in _previousDataValues. If changed is called without an argument, it will
     * return an array of keys that have changed.
     */
    changed(key?:string):any;

    /**
     * Returns the previous value for key from _previousDataValues.
     */
    previous(key:string):any;

    /**
     * Validate this instance, and if the validation passes, persist it to the database.
     */
    save(fields?:Array<string>, options?:SequelizeSaveOptions):SequelizePromiseT<TInstance>;

    /**
     * Refresh the current instance in-place, i.e. update the object with current data from the DB and return the same
     * object. This is different from doing a find(Instance.id), because that would create and return a new instance.
     * With this method, all references to the Instance are updated with the new data and no new objects are created.
     */
    reload(options?:SequelizeFindOptions):SequelizePromiseT<TInstance>;

    /**
     * Validate the attribute of this instance according to validation rules set in the model definition.
     */
    validate(options?:SequelizeValidateOptions):SequelizePromiseT<Error>;

    /**
     * This is the same as calling setAttributes, then calling save.
     */
    updateAttributes(updates:TPojo, options:SequelizeSaveOptions):SequelizePromiseT<TInstance>;

    /**
     * Destroy the row corresponding to this instance. Depending on your setting for paranoid, the row will either be
     * completely deleted, or have its deletedAt timestamp set to the current time.
     *
     * @param options   Allows caller to specify if delete should be forced.
     */
    destroy(options?:SequelizeDestroyInstanceOptions):SequelizePromise;

    /**
     * Increment the value of one or more columns. This is done in the database, which means it does not use the
     * values currently stored on the Instance.
     *
     * @param fields    If a string is provided, that column is incremented by the value of by given in options. If an
     *                  array is provided, the same is true for each column. If and object is provided, each column is
     *                  incremented by the value given.
     * @param options   Increment options.
     */
    increment(fields:any, options?:SequelizeIncrementOptions):SequelizePromise;

    /**
     * Decrement the value of one or more columns. This is done in the database, which means it does not use the
     * values currently stored on the Instance.
     *
     * @param fields    If a string is provided, that column is decremented by the value of by given in options. If an
     *                  array is provided, the same is true for each column. If and object is provided, each column is
     *                  decremented by the value given.
     * @param options   Decrement options.
     */
    decrement(fields:any, options?:SequelizeIncrementOptions):SequelizePromise;

    /**
     * Check whether all values of this and other Instance are the same.
     */
    equal(other:TInstance):boolean;

    /**
     * Check if this is eqaul to one of others by calling equals.
     *
     * @param others    Other instances to compare to.
     */
    equalsOneOf(others:Array<TInstance>):boolean;

    /**
     * Convert the instance to a JSON representation. Proxies to calling get with no keys. This means get all values
     * gotten from the DB, and apply all custom getters.
     */
    toJSON():TPojo;
}

interface SequelizeTransaction extends SequelizeTransactionStatic
{
    /**
     * The possible isolation levels to use when starting a transaction
     */
    ISOLATION_LEVELS:SequelizeTransactionIsolationLevels;

    /**
     * Possible options for row locking. Used in conjuction with find calls.
     */
    LOCK:SequelizeTransactionLocks;
}

interface SequelizeTransactionStatic
{
    /**
     * The possible isolation levels to use when starting a transaction
     */
    ISOLATION_LEVELS:SequelizeTransactionIsolationLevels;

    /**
     * Possible options for row locking. Used in conjuction with find calls.
     */
    LOCK:SequelizeTransactionLocks;
}

interface SequelizeTransactionIsolationLevels
{
    READ_UNCOMMITTED:string;// "READ UNCOMMITTED"
    READ_COMMITTED:string;  // "READ COMMITTED"
    REPEATABLE_READ:string; // "REPEATABLE READ"
    SERIALIZABLE:string;    // "SERIALIZABLE"
}

interface SequelizeTransactionLocks
{
    UPDATE:string;  // UPDATE
    SHARE:string;   // SHARE
}

interface SequelizeHooks
{

    /**
     * Add a named hook to the model.
     *
     * @param hooktype
     */
    addHook(hooktype:string, name:string, fn:(...args:Array<any>) => void):boolean;

    /**
     * Add a hook to the model.
     *
     * @param hooktype
     */
    addHook(hooktype:string, fn:(...args:Array<any>) => void):boolean;

    /**
     * A named hook that is run before validation.
     */
    beforeValidate<T>(name:string, validator:(dao:T, callback: (err?:Error) => void) => void):void;

    /**
     * A hook that is run before validation.
     */
    beforeValidate<T>(validator:(dao:T, callback: (err?:Error) => void) => void):void;

    /**
     * A named hook that is run before validation.
     */
    afterValidate<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run before validation.
     */
    afterValidate<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run before creating a single instance.
     */
    beforeCreate<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run before creating a single instance.
     */
    beforeCreate<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run after creating a single instance.
     */
    afterCreate<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run after creating a single instance.
     */
    afterCreate<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run before destroying a single instance.
     */
    beforeDestroy<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run before destroying a single instance.
     */
    beforeDestroy<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run after destroying a single instance.
     */
    afterDestroy<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run after destroying a single instance.
     */
    afterDestroy<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run before updating a single instance.
     */
    beforeUpdate<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run before updating a single instance.
     */
    beforeUpdate<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run after updating a single instance.
     */
    afterUpdate<T>(name:string, validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run after updating a single instance.
     */
    afterUpdate<T>(validator:(dao:T, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run before creating instances in bulk.
     */
    beforeBulkCreate<T>(name:string, validator:(daos:Array<T>, fields:Array<string>, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run before creating instances in bulk.
     */
    beforeBulkCreate<T>(validator:(daos:Array<T>, fields:Array<string>, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run after creating instances in bulk.
     */
    afterBulkCreate<T>(name:string, validator:(daos:Array<T>, fields:Array<string>, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A hook that is run after creating instances in bulk.
     */
    afterBulkCreate<T>(validator:(daos:Array<T>, fields:Array<string>, callback: (err?:Error, dao?:T) => void) => void):void;

    /**
     * A named hook that is run before destroying instances in bulk.
     */
    beforeBulkDestroy<T>(name:string, validator:(where:Object, callback: (err?:Error, where?:Object) => void) => void):void;

    /**
     * A hook that is run before destroying instances in bulk.
     */
    beforeBulkDestroy<T>(validator:(where:Object, callback: (err?:Error, where?:Object) => void) => void):void;

    /**
     * A named hook that is run after destroying instances in bulk.
     */
    afterBulkDestroy<T>(name:string, validator:(where:Object, callback: (err?:Error, where?:Object) => void) => void):void;

    /**
     * A hook that is run after destroying instances in bulk.
     */
    afterBulkDestroy<T>(validator:(where:Object, callback: (err?:Error, where?:Object) => void) => void):void;

    /**
     * A named hook that is run before updating instances in bulk.
     */
    beforeBulkUpdate<T>(name:string, validator:(instances:Array<T>, where:Object, callback: (err?:Error, instances?:Array<T>, where?:Object) => void) => void):void;

    /**
     * A hook that is run before updating instances in bulk.
     */
    beforeBulkUpdate<T>(validator:(instances:Array<T>, where:Object, callback: (err?:Error, instances?:Array<T>, where?:Object) => void) => void):void;

    /**
     * A named hook that is run after updating instances in bulk.
     */
    afterBulkUpdate<T>(name:string, validator:(instances:Array<T>, where:Object, callback: (err?:Error, instances?:Array<T>, where?:Object) => void) => void):void;

    /**
     * A hook that is run after updating instances in bulk.
     */
    afterBulkUpdate<T>(validator:(instances:Array<T>, where:Object, callback: (err?:Error, instances?:Array<T>, where?:Object) => void) => void):void;
}

interface SequelizeAssociations
{
    /**
     * Creates an association between this (the source) and the provided target. The foreign key is added on the target.
     *
     * @param target
     * @param options
     */
    hasOne<T>(target:SequelizeModel<T>, options?:SequelizeAssociationOptions):void;

    /**
     * Creates an association between this (the source) and the provided target. The foreign key is added on the source.
     *
     * @param target
     * @param options
     */
    belongsTo<T>(target:SequelizeModel<T>, options?:SequelizeAssociationOptions):void;

    /**
     * Create an association that is either 1:m or n:m.
     *
     * @param target
     * @param options
     */
    hasMany<T>(target:SequelizeModel<T>, options?:SequelizeAssociationOptions):void;
}

interface SequelizeEventEmitter extends NodeJS.EventEmitter
{
    /**
     * Create a new emitter instance.
     *
     * @param handler
     */
    new(handler:(emitter:SequelizeEventEmitter) => void):SequelizeEventEmitter;

    /**
     * Run the function that was passed when the emitter was instantiated.
     */
    run():SequelizeEventEmitter;

    /**
     * Listen for success events.
     *
     * @param onSuccess
     */
    success(onSuccess:(result:any) => void):SequelizeEventEmitter;

    /**
     * Alias for success(handler). Listen for success events.
     *
     * @param onSuccess
     */
    ok(onSuccess:(result:any) => void):SequelizeEventEmitter;

    /**
     * Listen for error events.
     *
     * @param onError
     */
    error(onError:(err:Error) => void):SequelizeEventEmitter;

    /**
     * Alias for error(handler). Listen for error events.
     *
     * @param onError
     */
    fail(onError:(err:Error) => void):SequelizeEventEmitter;

    /**
     * Alias for error(handler). Listen for error events.
     *
     * @param onError
     */
    failure(onError:(err:Error) => void):SequelizeEventEmitter;

    /**
     * Listen for both success and error events.
     *
     * @param onDone
     */
    done(onDone:(err:Error, result:any) => void):SequelizeEventEmitter;

    /**
     * Alias for done(handler). Listen for both success and error events.
     *
     * @param onDone
     */
    complete(onDone:(err:Error, result:any) => void):SequelizeEventEmitter;

    /**
     * Attach a function that is called every time the function that created this emitter executes a query.
     *
     * @param onSQL
     */
    sql(onSQL:(sql:string) => void):SequelizeEventEmitter;

    /**
     * Proxy every event of this event emitter to another one.
     *
     * @param emitter   The event emitter that should receive the events.
     * @param options   Contains an array of the events to proxy. Defaults to sql, error and success
     */
    proxy(emitter:SequelizeEventEmitter, options?:SequelizeProxyOptions):SequelizeEventEmitter;


}

interface SequelizeOptions
{
    /**
     * The dialect you of the database you are connecting to. One of mysql, postgres, sqlite and mariadb. 
     * Default is mysql.
     */
    dialect?: string;

    /**
     * If specified, load the dialect library from this path. For example, if you want to use pg.js instead of pg when 
     * connecting to a pg database, you should specify 'pg.js' here
     */
    dialectModulePath?:string;

    /**
     * The host of the relational database. Default 'localhost'.
     */
    host?:string;

    /**
     * Integer	The port of the relational database.
     */
    port?:number;

    /**
     * The protocol of the relational database. Default 'tcp'.
     */
    protocol?:string;

    /**
     * Default options for model definitions. See sequelize.define for options.
     */
    define?:SequelizeDefineOptions;

    /**
     * Default options for sequelize.query
     */
    query?:SequelizeQueryOptions;

    /**
     * Default options for sequelize.sync
     */

    sync?:SequelizeSyncOptions;
    /**                                                                                                                                                                                                                        logging=console.log]	Function	A function that gets executed everytime Sequelize would log something.
     * A flag that defines if null values should be passed to SQL queries or not.
     */
    omitNull?:boolean;

    /**
     * Boolean	Queue queries, so that only maxConcurrentQueries number of queries are executing at once. If false, all
     * queries will be executed immediately.
      */
    queue?:boolean;

    /**
     * The maximum number of queries that should be executed at once if queue is true.
     */
    maxConcurrentQueries?:number;

    /**
     * A flag that defines if native library shall be used or not. Currently only has an effect for postgres
     */
    native?:boolean;

    /**
     * Use read / write replication. To enable replication, pass an object, with two properties, read and write. Write
     * should be an object (a single server for handling writes), and read an array of object (several servers to
     * handle reads). Each read/write server can have the following properties?: host, port, username, password, database
     */
    replication?:SequelizeReplicationOptions;

    /**
     * Connection pool options.
     *
     */
    pool?:SequelizePoolOptions;

    /**
     * Set to false to make table names and attributes case-insensitive on Postgres and skip double quoting of them.
     * Default true.
     */
    quoteIdentifiers?:boolean;
}

interface SequelizePoolOptions
{
    maxConnections?:number;

    minConnections?:number;

    /**
     * The maximum time, in milliseconds, that a connection can be idle before being released.
     */
    maxIdleTime?:number;

    /**
     * A function that validates a connection. Called with client. The default function checks that client is an
     * object, and that its state is not disconnected
     */
    validateConnection?:(client?: SequelizeClient) => boolean;
}

interface SequelizeAttributeOptions
{
    /**
     * A string or a data type
     */
    type?:string;

    /**
     * If false, the column will have a NOT NULL constraint, and a not null validation will be run before an instance
     * is saved.
     */
    allowNull?:boolean;

    /**
     * A literal default value, a javascript function, or an SQL function (see sequelize.fn)
     */
    defaultValue?:any;

    /**
     * If true, the column will get a unique constraint. If a string is provided, the column will be part of a
     * composite unique index. If multiple columns have the same string, they will be part of the same unique index.
     */
    unique?:any;

    primaryKey?:boolean;

    /**
     * If set, sequelize will map the attribute name to a different name in the database.
     */
    field?:string;

    autoIncrement?:boolean;

    comment?:string;

    /**
     * If this column references another table, provide it here as a Model, or a string.
     */
    references?:any;

    /**
     * The column of the foreign table that this column references. Default 'id'.
     */
    referencesKey?:string;

    /**
     * What should happen when the referenced key is updated. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or
     * NO ACTION.
     */
    onUpdate?:string;

    /**
     * What should happen when the referenced key is deleted. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or
     * NO ACTION.
     */
    onDelete?:string;

    /**
     * Provide a custom getter for this column. Use this.getDataValue(String) to manipulate the underlying values.
     */
    get?:() => any;

    /**
     * Provide a custom setter for this column. Use this.setDataValue(String, Value) to manipulate the underlying values.
     */
    set?:(value?:any) => void;

    /**
     * An object of validations to execute for this column every time the model is saved. Can be either the name of a
     * validation provided by validator.js, a validation function provided by extending validator.js (see the
     * DAOValidator property for more details), or a custom validation function. Custom validation functions are called
     * with the value of the field, and can possibly take a second callback argument, to signal that they are
     * asynchronous. If the validator is sync, it should throw in the case of a failed validation, it it is async,
     * the callback should be called with the error text.
      */
    validate?:any;
}

interface SequelizeDefineOptions
{
    /**
     * Define the default search scope to use for this model. Scopes have the same form as the options passed to
     * find / findAll.
     */
    defaultScope?:SequelizeFindOptions;

    /**
     * More scopes, defined in the same way as defaultScope above. See Model.scope for more information about how
     * scopes are defined, and what you can do with them
     */
    scopes?:Object;

    /**
     * Don't persits null values. This means that all columns with null values will not be saved.
     */
    omitNull?:boolean;

    /**
     * Adds createdAt and updatedAt timestamps to the model. Default true.
     */
    timestamps?:boolean;

    /**
     * Calling destroy will not delete the model, but instead set a deletedAt timestamp if this is true. Needs
     * timestamps=true to work. Default false.
     */
    paranoid?:boolean;

    /**
     * Converts all camelCased columns to underscored if true. Default false.
     */
    underscored?:boolean;

    /**
     * Converts camelCased model names to underscored tablenames if true. Default false.
     */
    underscoredAll?:boolean;

    /**
     * If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name. Otherwise, the
     * dao name will be pluralized. Default false.
     */
    freezeTableName?:boolean;

    /**
     * Override the name of the createdAt column if a string is provided, or disable it if false. Timestamps must be true.
     */
    createdAt?:any;

    /**
     * Override the name of the updatedAt column if a string is provided, or disable it if false. Timestamps must be true.
     */
    updatedAt?:any;

    /**
     * Override the name of the deletedAt column if a string is provided, or disable it if false. Timestamps must be true.
     */
    deletedAt?:any;

    /**
     * Defaults to pluralized DAO name, unless freezeTableName is true, in which case it uses DAO name verbatim.
     */
    tableName?:string;

    /**
     * Provide getter functions that work like those defined per column. If you provide a getter method with the same
     * name as a column, it will be used to access the value of that column. If you provide a name that does not match
     * a column, this function will act as a virtual getter, that can fetch multiple other values.
     */
    getterMethods?:Object;

    /**
     * Provide setter functions that work like those defined per column. If you provide a setter method with the same
     * name as a column, it will be used to update the value of that column. If you provide a name that does not match
     * a column, this function will act as a virtual setter, that can act on and set other values, but will not be
     * persisted
     */
    setterMethods?:Object;

    /**
     * Provide functions that are added to each instance (DAO).
     */
    instanceMethods?:Object;

    /**
     * Provide functions that are added to the model (Model).
     */
    classMethods?:Object;

    /**
     * Default 'public'.
     */
    schema?:string;
    engine?:string;
    charset?:string;
    comment?:string;
    collate?:string;

    /**
     * An object of hook function that are called before and after certain lifecycle events. The possible hooks are?:
     * beforeValidate, afterValidate, beforeBulkCreate, beforeBulkDestroy, beforeBulkUpdate, beforeCreate,
     * beforeDestroy, beforeUpdate, afterCreate, afterDestroy, afterUpdate, afterBulkCreate, afterBulkDestory and
     * afterBulkUpdate. See Hooks for more information about hook functions and their signatures. Each property can
     * either be a function, or an array of functions.
     */
    hooks?:SequelizeHooks;

    /**
     * An object of model wide validations. Validations have access to all model values via this. If the validator
     * function takes an argument, it is assumed to be async, and is called with a callback that accepts an optional
     * error.
     */
    validate?:Object;
}

interface SequelizeQueryOptions
{
    /**
     * If true, sequelize will not try to format the results of the query, or build an instance of a model from the
     * result.
     */
    raw?:boolean;

    /**
     * The transaction that the query should be executed under.
     */
    transaction?:SequelizeTransaction;

    /**
     * The type of query you are executing. The query type affects how results are formatted before they are passed
     * back. If no type is provided sequelize will try to guess the right type based on the sql, and fall back to
     * SELECT. The type is a string, but Sequelize.QueryTypes is provided is convenience shortcuts. Current options
     * are SELECT, BULKUPDATE and BULKDELETE.
     *
     * Default is SELECT.
     */
    type?:string;

    /**
     * Lock the selected rows in either share or update mode. Possible options are transaction.LOCK.UPDATE and
     * transaction.LOCK.SHARE. See transaction.LOCK for an example.
     */
    lock?:string;

    /**
     * For aggregate function calls, the type of the result. If field is a field in this Model, the default will be the
     * type of that field, otherwise defaults to float.
     */
    dataType?:any;
}

interface SequelizeSyncOptions
{
    /**
     * If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table.
     * Default false.
     */
    force?:boolean;

    /**
     * A function that logs sql queries, or false for no logging.
     */
    logging?:any;

    /**
     * The schema that the tables should be created in. This can be overriden for each table in sequelize.define.
     * Default 'public'.
     */
    schema?:string;
}

interface SequelizeDropOptions
{
    /**
     * Also drop all objects depending on this table, such as views. Only works in postgres.
     *
     * Default false.
     */
    cascade?:boolean;
}

interface SequelizeSchemaOptions
{
    /**
     * The character(s) that separates the schema name from the table name. Default '.'.
     */
    schemaDelimiter?:string;
}

interface SequelizeFindOptions
{
    /**
     * A hash of attributes to describe your search.
     */
    where?:any;

    /**
     * A list of the attributes (columns) that you want to select.
     */
    attributes?:Array<string>;

    /**
     * A list of associations to eagerly load. Supported is either { include?: [ Model1, Model2, ...] } or { include?:
     * [ { model?: Model1, as?: 'Alias' } ] }. If your association are set up with an as (eg. X.hasMany(Y, { as?: 'Z },
     * you need to specify Z in the as attribute when eager loading Y). When using the object form, you can also
     * specify attributes to specify what columns to load, where to limit the relations, and include to load further
     * nested relations
     */
    include?:any;

    /**
     * Specifies an ordering. If a string is provided, it will be esacped. Using an array, you can provide several
     * columns / functions to order by. Each element can be further wrapped in a two-element array. The first element
     * is the column / function to order by, the second is the direction. For example?: order?: [['name', 'DESC']]. In
     * this way the column will be escaped, but the direction will not.
     */
    order?:any;

    limit?:number;

    offset?:number;
}

interface SequelizeBuildOptions
{
    /**
     * If set to true, values will ignore field and virtual setters. Default false.
     */
    raw?:boolean;

    /**
     * Default true.
     */
    isNewRecord?:boolean;

    /**
     * Default true.
     */
    isDirty?:boolean;

    /**
     * an array of include options - Used to build prefetched/included model instances. See set.
     */
    include?:Array<any>;
}

interface SequelizeCopyOptions extends SequelizeBuildOptions
{
    /**
     * If set, only columns matching those in fields will be saved.
     */
    fields?:Array<string>;

    /**
     *
     */
    transaction?:SequelizeTransaction;
}

interface SequelizeFindOrCreateOptions extends SequelizeFindOptions, SequelizeQueryOptions
{

}

interface SequelizeBulkCreateOptions
{
    /**
     * Fields to insert (defaults to all fields).
     */
    fields?:Array<string>;

    /**
     * Should each row be subject to validation before it is inserted. The whole insert will fail if one row fails
     * validation. Default false.
     */
    validate?:boolean;

    /**
     * Run before / after create hooks for each individual Instance? BulkCreate hooks will still be run. Default false;
     */
    hooks?:boolean;

    /**
     * Ignore duplicate values for primary keys? (not supported by postgres). Default false.
     */
    ignoreDuplicates?:boolean;
}

interface SequelizeDestroyOptions
{
    /**
     * If set to true, destroy will find all records within the where parameter and will execute before-/ after
     * bulkDestroy hooks on each row.
     */
    hooks?:boolean;

    /**
     * How many rows to delete
     */
    limit?:number;

    /**
     * If set to true, dialects that support it will use TRUNCATE instead of DELETE FROM. If a table is truncated the
     * where and limit options are ignored.
     */
    truncate?:boolean;
}

interface SequelizeDestroyInstanceOptions
{
    /**
     * If set to true, paranoid models will actually be deleted.
     */
    force:boolean;
}

interface SequelizeUpdateOptions
{
    /**
     * Should each row be subject to validation before it is inserted. The whole insert will fail if one row fails
     * validation. Default true.
     */
    validate?:boolean;

    /**
     * Run before / after bulkUpdate hooks? Default false.
     */
    hooks?:boolean;

    /**
     * How many rows to update (only for mysql and mariadb).
     */
    limit?:number;
}

interface SequelizeSetOptions
{
    /**
     * If set to true, field and virtual setters will be ignored. Default false.
     */
    raw?:boolean;

    /**
     * Clear all previously set data values. Default false.
     */
    reset?:boolean;

    include?:Object;
}

interface SequelizeSaveOptions
{
    /**
     * An alternative way of setting which fields should be persisted.
     */
    fields?:Object;

    /**
     * If true, the updatedAt timestamp will not be updated. Default false.
     */
    silent?:boolean;

    transaction?:SequelizeTransaction;
}

interface SequelizeValidateOptions
{
    /**
     * An array of strings. All properties that are in this array will not be validated.
     */
    skip:Array<string>;
}

interface SequelizeIncrementOptions
{
    /**
     * The number to increment by. Default 1.
     */
    by?:number;

    transaction?:SequelizeTransaction;
}

interface SequelizeProxyOptions
{
    /**
     * An array of the events to proxy. Defaults to sql, error and success.
     */
    events:Array<string>;
}

interface SequelizeAssociationOptions
{
    /**
     * Set to true to run before-/afterDestroy hooks when an associated model is deleted because of a cascade. For
     * example if User.hasOne(Profile, {onDelete: 'cascade', hooks:true}), the before-/afterDestroy hooks for profile
     * will be called when a user is deleted. Otherwise the profile will be deleted without invoking any hooks.
     * Default false.
     */
    hooks?:boolean;

    /**
     * The name of the table that is used to join source and target in n:m associations. Can also be a sequelize model
     * if you want to define the junction table yourself and add extra attributes to it.
     */
    through?:any;

    /**
     * The alias of this model. If you create multiple associations between the same tables, you should provide an
     * alias to be able to distinguish between them. If you provide an alias when creating the assocition, you should
     * provide the same alias when eager loading and when getting assocated models. Defaults to the singularized
     * version of target.name
     */
    as?:string;

    /**
     * The name of the foreign key in the target table. Defaults to the name of source + primary key of source.
     */
    foreignKey?:string;

    /**
     * What should happen when the referenced key is deleted. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or
     * NO ACTION. Default SET NULL.
     */
    onDelete?:string;

    /**
     * What should happen when the referenced key is updated. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or
     * NO ACTION. Default CASCADE.
     */
    onUpdate?:string;

    /**
     * Should on update and on delete constraints be enabled on the foreign key.
     */
    constraints?:boolean;
}

interface SequelizeFindAndCountResult<T>
{
    /**
     * The matching model instances.
     */
    rows?:Array<T>;

    /**
     * The total number of rows. This may be more than the rows returned if a limit and/or offset was supplied.
     */
    count?:number;
}
interface SequelizeCol
{
    /**
     * Column name.
     */
    col:string;
}

interface SequelizeCast
{
    /**
     * The value to cast.
     */
    val:any;

    /**
     * The type to cast it to.
     */
    type:string;
}

interface SequelizeLiteral
{
    val: any;
}

interface SequelizeAnd
{
    /**
     * Each argument (string or object) will be joined by AND.
     */
    args:Array<any>;
}

interface SequelizeOr
{
    /**
     * Each argument (string or object) will be joined by OR.
     */
    args:Array<any>;
}

interface SequelizeWhere
{
    /**
     * The attribute.
     */
    attribute:string;

    /**
     * The condition. Can be both a simply type, or a further condition (.or, .and, .literal etc.).
     */
    logic:any;
}

interface SequelizeTransactionOptions
{
    /**
     *
     */
    autocommit:boolean;

    /**
     * One of: 'READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'. Default 'REPEATABLE READ'.
     */
    isolationLevel:string;
}

interface SequelizePromise
{
    /**
     * Listen for events, event emitter style. Mostly for backwards compatibility with SequelizeEventEmitter.
     *
     * @param evt Event
     * @param fct Handler
     */
    on(evt:string, fct:() => void):void;

    /**
     * Emit an event from the emitter.
     *
     * @param type  The type of event.
     * @param value All other arguments will be passed to the event listeners.
     */
    emit(type:string, ...value:Array<any>):void;

    /**
     * Listen for success events.
     */
    success(onSuccess:() => void):SequelizePromise;

    /**
     * Alias for success(handler). Listen for success events.
     */
    ok(onSuccess:() => void):SequelizePromise;

    /**
     * Listen for error events.
     *
     * @param onError Error handler.
     */
    error(onError: (err?:Error) => void):SequelizePromise;

    /**
     * Alias for error(handler). Listen for error events.
     *
     * @param onError Error handler.
     */
    fail(onError: (err?:Error) => void):SequelizePromise;

    /**
     * Alias for error(handler). Listen for error events.
     *
     * @param onError Error handler.
     */
    failure(onError: (err?:Error) => void):SequelizePromise;

    /**
     * Listen for both success and error events..
     */
    done(handler:(err:Error, result?:any) => void):SequelizePromise;

    /**
     * Alias for done(handler). Listen for both success and error events..
     */
    complete(handler:(err:Error, result?:any) => void):SequelizePromise;

    /**
     * Attach a function that is called every time the function that created this emitter executes a query.
     *
     * @param onSQL
     */
    sql(onSQL:(sql:string) => void):SequelizePromise;

    /**
     * Proxy every event of this promise to another one.
     *
     * @param promise   The promise that should receive the events.
     * @param options   Contains an array of the events to proxy. Defaults to sql, error and success
     */
    proxy(promise:SequelizePromise, options?:SequelizeProxyOptions):SequelizePromise;
}

interface SequelizePromiseT<T> extends SequelizePromise
{
    /**
     * Listen for events, event emitter style. Mostly for backwards compatibility with SequelizeEventEmitter.
     *
     * @param evt Event
     * @param fct Handler
     */
    on(evt:string, fct:(t:T) => void):void;

    /**
     * Emit an event from the emitter.
     *
     * @param type  The type of event.
     * @param value All other arguments will be passed to the event listeners.
     */
    emit(type:string, ...value:Array<T>):void;

    /**
     * Listen for success events.
     */
    success(onSuccess:(t:T) => void):SequelizePromiseT<T>;

    /**
     * Alias for success(handler). Listen for success events.
     */
    ok(onSuccess:(t:T) => void):SequelizePromiseT<T>;

    /**
     * Listen for both success and error events..
     */
    done(handler:(err:Error, result:T) => void):SequelizePromiseT<T>;

    /**
     * Alias for done(handler). Listen for both success and error events..
     */
    complete(handler:(err:Error, result:T) => void):SequelizePromiseT<T>;

    /**
     * Attach a function that is called every time the function that created this emitter executes a query.
     *
     * @param onSQL
     */
    sql(onSQL:(sql:string) => void):SequelizePromiseT<T>;

    /**
     * Proxy every event of this promise to another one.
     *
     * @param promise   The promise that should receive the events.
     * @param options   Contains an array of the events to proxy. Defaults to sql, error and success
     */
    proxy(promise:SequelizePromiseT<T>, options?:SequelizeProxyOptions):SequelizePromiseT<T>;
}

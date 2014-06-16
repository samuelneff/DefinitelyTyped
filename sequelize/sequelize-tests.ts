
/// <reference path="sequelize.d.ts" />

var chai
, assert
, Support
, DataTypes:sequelize.DataTypes = null
, dialect:string = "mysql"
, Sequelize:sequelize.SequelizeStatic = null // : SequelizeStatic
, config = {}
, moment
, Transaction // :SequelizeTransactionStatic
, path
, sinon;

declare var _:_.LoDashStatic;

chai.config.includeStack = true;

function qq(str:string):string {
    if (dialect == 'postgres' || dialect == 'sqlite') {
        return '"' + str + '"';
    } else if (Support.dialectIsMySQL()) {
        return '`' + str + '`'
    } else {
        return str;
    }
}

interface DaoPojo
{
    name: string;
}

interface DaoInstance extends sequelize.Instance<DaoInstance, DaoPojo>, DaoPojo
{
}

interface DaoModel extends sequelize.Model<DaoInstance, DaoPojo>
{
}

var sequelize:sequelize.Sequelize = new Sequelize('testsdb', 'root', null, { logging: false, define: { underscored:true } });
var Dao:DaoModel = sequelize.define<DaoInstance, DaoPojo>('dao', {name: "string"});
Dao.findAll({where: {name: "whatever"}}).complete(function(err, results:Array<DaoInstance>){});

sequelize.config.port = 1234;
sequelize.config.host = '127.0.0.1';

sequelize = new Sequelize('sqlite://test.sqlite');
sequelize = new Sequelize('sqlite://test.sqlite/');
sequelize = new Sequelize('sqlite://test.sqlite/lol?reconnect=true');

var getConnectionUri = _.template('<%= protocol %>://<%= username %>:<%= password %>@<%= host %><% if(port) { %>:<%= port %><% } %>/<%= database %>');
var connectionUri = getConnectionUri(_.extend(config[dialect], {protocol: 'postgres'}));
sequelize = new Sequelize(connectionUri);
var connectionUri = getConnectionUri(_.extend(config[dialect], {protocol: 'postgresql'}));
sequelize = new Sequelize(connectionUri);

sequelize.authenticate().success(function() {});

sequelize.validate();
sequelize.authenticate();

var s:string = sequelize.getDialect();

var b:boolean = sequelize.isDefined('Project');

Dao = sequelize.model<DaoInstance, DaoPojo>('dao');

sequelize.options.quoteIdentifiers = true;

var insertQuery:string = "INSERT INTO " + Dao.tableName + " VALUES ('john')";

Dao.sync({ force: true }).success(function() {});


sequelize.query(insertQuery, null, { raw: true }).complete(function(err:Error, result:Array<string>) {    });

sequelize.query(insertQuery).complete(function(err, result) { });

sequelize.query(insertQuery).success(function() {});

sequelize.query("select * from users").complete(function(err:Error, users:Array<{username:string}>) { });

sequelize.options.quoteIdentifiers = false;
sequelize.query(insertQuery).success(function() {});

var tickChar = (dialect === 'postgres') ? '"' : '`';
var sql      = "select 1 as " + Sequelize.Utils.addTicks('foo.bar.baz', tickChar);

sequelize.query('select ? as foo, ? as bar', null, { raw: true }, [ 1, 2 ]).success(function(result:Array<{foo:number; bar:number}>) {});

sequelize.query('select :one as foo, :two as bar, \'00:00\' as baz', null, { raw: true }, { one: 1, two: 2 }).success(function(result:Array<{foo:number; bar:number}>) { });

sequelize.query('select :one as foo, :two as bar', null, { raw: true }, {});

sequelize.query('select :one as foo, :two as bar', null, { raw: true }, 'foobar');


console.log(sequelize.daoFactoryManager.all.length);

sequelize.define('foo', { title: DataTypes.STRING });
console.log(DataTypes.STRING.toString());

interface FooPojo
{
    bar:string;
}

interface FooInstance extends sequelize.Instance<FooInstance, FooPojo>, FooPojo
{
    
}

interface FooModel extends sequelize.Model<FooInstance, FooPojo>
{
    
}

var fooDao:FooModel = sequelize.define<FooInstance, FooPojo>('foo', {bar: DataTypes.STRING}, {collate: 'utf8_bin'});

console.log(fooDao.options.collate);

var globalClassMethod     = sinon.spy()
    , globalInstanceMethod  = sinon.spy()
    , localClassMethod      = sinon.spy()
    , localInstanceMethod   = sinon.spy();

sequelize = new Sequelize('', '', '', {
        define: {
            classMethods : {
                globalClassMethod : function() {},
                overrideMe: globalClassMethod
            },
            instanceMethods : {
                globalInstanceMethod : function() {},
                overrideMe: globalInstanceMethod
            }
        }});
    

fooDao = sequelize.define<FooInstance, FooPojo>('foo', {bar: DataTypes.STRING}, {
    classMethods : { localClassMethod : function() {} }
});

console.log(typeof fooDao.options.classMethods.globalClassMethod);
console.log(typeof fooDao.options.classMethods.localClassMethod);
console.log(typeof fooDao.options.instanceMethods.globalInstanceMethod);

interface FotoPojo
{
    name: string;
}
interface FotoInstance extends sequelize.Instance<FotoInstance, FotoPojo>, FotoPojo
{

}

interface FotoModel extends sequelize.Model<FotoInstance, FotoPojo>
{

}

var FotoModel:FotoModel = sequelize.define<FotoInstance, FotoPojo>('Foto', { name: DataTypes.STRING }, { tableName: 'photos' });
FotoModel.sync({ force: true }).success(function() {
    sequelize.getQueryInterface().showAllTables().success(function(tableNames:Array<string>) {
        console.log(tableNames);
    });
});

FotoModel.create({name: 'bla'}).success(function(foto:FotoInstance) {
    console.log(foto.name);
});

var a = sequelize.define('Application', {
    authorID: { type: Sequelize.BIGINT, allowNull: false, references: 'User', referencesKey: 'id' }
});

interface BlockPojo
{
    id:number;
    name:string;
}

interface BlockInstance extends sequelize.Instance<BlockInstance, BlockPojo>, BlockPojo { }

interface BlockModel extends sequelize.Model<BlockInstance, BlockPojo> {}

var Block:BlockModel = sequelize.define<BlockInstance, BlockPojo>("block", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING
}, {
    tableName: "block",
    timestamps: false,
    paranoid: false
});

Block.hasMany(Block, {
    as: 'childBlocks',
    foreignKey: 'parent',
    joinTableName: 'link_block_block',
    useJunctionTable: true,
    foreignKeyConstraint: true
});
Block.belongsTo(Block, {
    as: 'parentBlocks',
    foreignKey: 'child',
    joinTableName: 'link_block_block',
    useJunctionTable: true,
    foreignKeyConstraint: true
});


sequelize.sync({ force: true, logging: false });

Block.drop().success(function() {});

Block = sequelize.import<BlockInstance, BlockPojo>("block");


var enums:sequelize.DataTypeEnum = DataTypes.ENUM('scheduled', 'active', 'finished');
var type:sequelize.DataTypeEnum = DataTypes.ENUM;

var type2:sequelize.DataTypeBigInt = DataTypes.BIGINT;

console.log(Block.rawAttributes[0][0]);
console.log(Block.rawAttributes[sql][0]);

sequelize.transaction();

sequelize.transaction(function(t:sequelize.Transaction) { t.commit(); t.rollback(); });

sql = sequelize.getQueryInterface().QueryGenerator.selectQuery('TransactionTests', { attributes: [['count(*)', 'cnt']] });

var transaction:sequelize.Transaction = null;

sequelize.query(sql, null, { plain: true, raw: true, transaction: transaction });


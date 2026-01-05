const {EntitySchema} = require('typeorm');
module.exports = new EntitySchema({
    name: 'Tasks',
    tableName:'tasks',

    columns: {
        id: {
            primary: true,
            type:'uuid',
            generated: 'uuid',
        },
        title: {
            type:'varchar',
            length:255,
            nullable:false
        },
        description: {
            type:'text',
            nullable:true
        },
        status: {
            type:'enum',
            enum:['todo','inprogress','done'],
            default:'todo',
            nullable:false
        },
        createdAt: {
            type:'timestamp',
            default:() => "CURRENT_TIMESTAMP",
        },
        updatedAt: {
            type:'timestamp',
            default:() => "CURRENT_TIMESTAMP",
            onUpdate:() => "CURRENT_TIMESTAMP"
        }
    }
})
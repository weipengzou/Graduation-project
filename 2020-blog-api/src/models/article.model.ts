import { modelOptions, Prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'blog',
    timestamps: {
      createdAt: false,
      updatedAt: false,
    },
  },
})
class BlogSchema {
  @Prop({ required: true })
  data: string
  @Prop({ required: true })
  user: any
  @Prop()
  previousHash: string
  @Prop({ required: true })
  hash: string
  @Prop({ required: true })
  local: object
}
@modelOptions({
  schemaOptions: {
    collection: 'blog_backupA',
    timestamps: {
      createdAt: false,
      updatedAt: false,
    },
  },
})
class BlogSchemaBackupA {
  @Prop({ required: true })
  data: string
  @Prop({ required: true })
  user: any
  @Prop()
  previousHash: string
  @Prop({ required: true })
  hash: string
  @Prop({ required: true })
  local: object
}
@modelOptions({
  schemaOptions: {
    collection: 'blog_backupB',
    timestamps: {
      createdAt: false,
      updatedAt: false,
    },
  },
})
class BlogSchemaBackupB {
  @Prop({ required: true })
  data: string
  @Prop({ required: true })
  user: any
  @Prop()
  previousHash: string
  @Prop({ required: true })
  hash: string
  @Prop({ required: true })
  local: object
}

export { BlogSchema, BlogSchemaBackupA, BlogSchemaBackupB }

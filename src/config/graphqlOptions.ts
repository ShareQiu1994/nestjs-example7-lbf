import { registerAs } from '@nestjs/config'; // 配置命名空间

export default registerAs('graphqlOptions', () => ({
  playground: true, // 开启调试界面
  context: ({ req }) => ({ req }), // 如果需要graphql加入鉴权 必须注入上下文 req
  autoSchemaFile: 'schema.gql', // 放个该名字的空文件，底层会读取Nest形式的schema然后生成graphql原始的sehema里面
  installSubscriptionHandlers: true, // 使用订阅就要开启这个参数
}));

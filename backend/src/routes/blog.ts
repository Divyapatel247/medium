import { Hono } from "hono"

  export const blogRouter = new Hono<{
      Bindings: {
          DATABASE_URL: string;
          JWT_SECRET: string;
      }
  }>();

  blogRouter.post('/api/v1/blog', (c) => {
    return c.text('blog route')
  })
  blogRouter.put('/api/v1/blog', (c) => {
   return c.text('blog route to update')
  })
  blogRouter.get('/api/v1/blog/:id', (c) => {
    const id = c.req.param('id')
      console.log(id);
      return c.text('get blog route')
  })
  blogRouter.get('/api/v1/blog/bulk', (c) => {
    return c.text('get bulk blog')
  })
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


userRouter.post('/api/v1/user/signup', async(c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    const body: {
      name: string;
      email: string;
      password: string
    } = await c.req.json()
      try {
          const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      })
      const jwt = await sign({id:user.id},c.env.JWT_SECRET)
      
          return c.json({jwt})
      } catch(e) {
          return c.status(403);
      }
  })
  
  userRouter.post('/api/v1/user/signin',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body:{email:string,password:string} = await c.req.json();
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        }
      })
      if(user?.password === body.password) {
        const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
        return c.json({jwt})
      }
    } catch (error) {
      return c.status(403);
    }
  
  })